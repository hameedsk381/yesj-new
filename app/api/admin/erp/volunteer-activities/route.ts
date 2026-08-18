import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { volunteerActivities, volunteers } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const volunteerId = searchParams.get("volunteerId")?.trim()
    const activityType = searchParams.get("activityType")?.trim()

    const conditions = []
    if (volunteerId) {
      const parsed = parseInt(volunteerId, 10)
      if (!isNaN(parsed)) {
        conditions.push(eq(volunteerActivities.volunteerId, parsed))
      }
    }
    if (activityType) {
      conditions.push(eq(volunteerActivities.activityType, activityType))
    }
    if (search) {
      conditions.push(
        or(
          like(volunteerActivities.description, `%${search}%`),
          like(volunteerActivities.program, `%${search}%`),
          like(volunteers.fullName, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: volunteerActivities.id,
        volunteerId: volunteerActivities.volunteerId,
        volunteerName: volunteers.fullName,
        program: volunteerActivities.program,
        activityType: volunteerActivities.activityType,
        description: volunteerActivities.description,
        hours: volunteerActivities.hours,
        activityDate: volunteerActivities.activityDate,
        notes: volunteerActivities.notes,
        createdAt: volunteerActivities.createdAt,
      })
      .from(volunteerActivities)
      .leftJoin(volunteers, eq(volunteerActivities.volunteerId, volunteers.id))

    const countBase = db
      .select({ count: sql<number>`count(*)` })
      .from(volunteerActivities)
      .leftJoin(volunteers, eq(volunteerActivities.volunteerId, volunteers.id))

    const totalRes = whereClause ? await countBase.where(whereClause) : await countBase
    const total = Number(totalRes[0]?.count || 0)

    const sumRes = whereClause
      ? await db
          .select({ sum: sql<string>`coalesce(sum(${volunteerActivities.hours}),0)` })
          .from(volunteerActivities)
          .where(whereClause)
      : await db
          .select({ sum: sql<string>`coalesce(sum(${volunteerActivities.hours}),0)` })
          .from(volunteerActivities)
    const totalHours = Number(sumRes[0]?.sum || 0)

    let query = base.orderBy(desc(volunteerActivities.activityDate)).limit(limit).offset(offset)
    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      totalHours,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Volunteer activities GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const volunteerId = parseInt(body.volunteerId, 10)
    const hours = parseFloat(body.hours)

    if (isNaN(volunteerId)) {
      return adminJsonResponse({ error: "Please select a volunteer" }, { status: 400 })
    }
    if (isNaN(hours) || hours <= 0) {
      return adminJsonResponse({ error: "Hours must be greater than zero" }, { status: 400 })
    }
    if (!body.activityDate) {
      return adminJsonResponse({ error: "Activity date is required" }, { status: 400 })
    }

    const [volunteer] = await db.select().from(volunteers).where(eq(volunteers.id, volunteerId)).limit(1)
    if (!volunteer) {
      return adminJsonResponse({ error: "Volunteer not found" }, { status: 400 })
    }

    const result = await db.insert(volunteerActivities).values({
      volunteerId,
      program: body.program || null,
      activityType: body.activityType || null,
      description: body.description || null,
      hours: hours.toFixed(1),
      activityDate: body.activityDate,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Volunteer activities POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}