import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { courseRegistrations, courses } from "@/lib/db/schema"
import { eq, desc, and, sql } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    const conditions = []
    if (courseId) {
      const id = Number(courseId)
      if (!isNaN(id)) {
        conditions.push(eq(courseRegistrations.courseId, id))
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(courseRegistrations)

    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select({
        id: courseRegistrations.id,
        courseId: courseRegistrations.courseId,
        name: courseRegistrations.name,
        email: courseRegistrations.email,
        phone: courseRegistrations.phone,
        fields: courseRegistrations.fields,
        paymentMode: courseRegistrations.paymentMode,
        amount: courseRegistrations.amount,
        paymentStatus: courseRegistrations.paymentStatus,
        status: courseRegistrations.status,
        createdAt: courseRegistrations.createdAt,
        courseTitle: courses.title,
      })
      .from(courseRegistrations)
      .leftJoin(courses, eq(courseRegistrations.courseId, courses.id))
      .orderBy(desc(courseRegistrations.createdAt))
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
    console.error("Course registrations GET error:", error)
    return adminJsonResponse({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
