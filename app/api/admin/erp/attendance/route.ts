import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { attendance, staff } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")?.trim()
    const status = searchParams.get("status")?.trim()

    const conditions = []
    if (date) {
      conditions.push(sql`${attendance.date} = ${date}`)
    }
    if (status) {
      conditions.push(eq(attendance.status, status))
    }
    if (search) {
      conditions.push(like(staff.fullName, `%${search}%`))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: attendance.id,
        staffId: attendance.staffId,
        staffName: staff.fullName,
        date: attendance.date,
        status: attendance.status,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
        notes: attendance.notes,
        createdAt: attendance.createdAt,
      })
      .from(attendance)
      .leftJoin(staff, eq(attendance.staffId, staff.id))

    const countBase = db
      .select({ count: sql<number>`count(*)` })
      .from(attendance)
      .leftJoin(staff, eq(attendance.staffId, staff.id))

    const totalRes = whereClause ? await countBase.where(whereClause) : await countBase
    const total = Number(totalRes[0]?.count || 0)

    let query = base.orderBy(desc(attendance.date)).limit(limit).offset(offset)
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
    })
  } catch (error) {
    console.error("Attendance GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const staffId = parseInt(body.staffId, 10)

    if (isNaN(staffId)) {
      return adminJsonResponse({ error: "Please select a staff member" }, { status: 400 })
    }
    if (!body.date) {
      return adminJsonResponse({ error: "Date is required" }, { status: 400 })
    }

    // Prevent duplicate attendance record for same staff+date
    const [existing] = await db
      .select()
      .from(attendance)
      .where(and(eq(attendance.staffId, staffId), eq(attendance.date, body.date)))
      .limit(1)

    if (existing) {
      return adminJsonResponse(
        { error: "Attendance already recorded for this staff member on this date. Edit the existing record instead." },
        { status: 400 }
      )
    }

    const result = await db.insert(attendance).values({
      staffId,
      date: body.date,
      status: body.status || "present",
      checkIn: body.checkIn || null,
      checkOut: body.checkOut || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Attendance POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}