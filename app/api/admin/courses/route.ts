import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq, desc, sql, like, or } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)

    let whereClause = undefined
    if (search) {
      whereClause = or(
        like(courses.title, `%${search}%`),
        like(courses.slug, `%${search}%`)
      )
    }

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(courses)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(courses)
      .orderBy(desc(courses.createdAt))
      .limit(limit)
      .offset(offset)

    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    }, {
      headers: {
        "X-Total-Count": total.toString(),
      },
    })
  } catch (error) {
    console.error("Courses GET error:", error)
    return adminJsonResponse({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const { slug, title, description, shortDescription, imagePath, price, startDate, endDate, maxStudents, isActive, registrationOpen } = body

    if (!slug || !title) {
      return adminJsonResponse({ error: "Slug and title are required" }, { status: 400 })
    }

    const existing = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1)
    if (existing.length > 0) {
      return adminJsonResponse({ error: "A course with this slug already exists" }, { status: 409 })
    }

    const [inserted] = await db.insert(courses).values({
      slug,
      title,
      description: description || null,
      shortDescription: shortDescription || null,
      imagePath: imagePath || null,
      price: price ? Number(price) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      maxStudents: maxStudents ? Number(maxStudents) : null,
      isActive: isActive !== false,
      registrationOpen: registrationOpen !== false,
    })

    const [course] = await db.select().from(courses).where(eq(courses.id, inserted.insertId)).limit(1)
    return adminJsonResponse(course, { status: 201 })
  } catch (error) {
    console.error("Courses POST error:", error)
    return adminJsonResponse({ error: "Failed to create course" }, { status: 500 })
  }
}
