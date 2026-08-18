import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { volunteers, volunteerActivities } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")?.trim()

    const conditions = []
    if (status) {
      conditions.push(eq(volunteers.status, status))
    }
    if (search) {
      conditions.push(
        or(
          like(volunteers.fullName, `%${search}%`),
          like(volunteers.email, `%${search}%`),
          like(volunteers.phone, `%${search}%`),
          like(volunteers.occupation, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(volunteers)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    const rows = await (() => {
      let q = db
        .select()
        .from(volunteers)
        .orderBy(desc(volunteers.createdAt))
        .limit(limit)
        .offset(offset)
      if (whereClause) {
        q = q.where(whereClause) as any
      }
      return q
    })()

    // Aggregate total hours and activity count per volunteer
    const items = []
    for (const v of rows) {
      const hoursRes = await db
        .select({ sum: sql<string>`coalesce(sum(${volunteerActivities.hours}),0)`, count: sql<number>`count(*)` })
        .from(volunteerActivities)
        .where(eq(volunteerActivities.volunteerId, v.id))
      items.push({
        ...v,
        totalHours: Number(hoursRes[0]?.sum || 0),
        activityCount: Number(hoursRes[0]?.count || 0),
      })
    }

    return adminJsonResponse({
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Volunteers GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const fullName = (body.fullName || "").trim()
    if (!fullName) {
      return adminJsonResponse({ error: "Volunteer name is required" }, { status: 400 })
    }

    const result = await db.insert(volunteers).values({
      fullName,
      email: (body.email || "").trim() || null,
      phone: (body.phone || "").trim() || null,
      address: body.address || null,
      gender: body.gender || null,
      age: body.age ? parseInt(body.age, 10) || null : null,
      occupation: body.occupation || null,
      skills: body.skills ? (Array.isArray(body.skills) ? body.skills : []) : null,
      availability: body.availability || null,
      status: body.status || "active",
      joinedAt: body.joinedAt || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Volunteers POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}