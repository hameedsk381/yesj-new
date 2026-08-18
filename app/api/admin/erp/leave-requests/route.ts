import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { leaveRequests, staff } from "@/lib/db/schema"
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
    const leaveType = searchParams.get("leaveType")?.trim()

    const conditions = []
    if (status) {
      conditions.push(eq(leaveRequests.status, status))
    }
    if (leaveType) {
      conditions.push(eq(leaveRequests.leaveType, leaveType))
    }
    if (search) {
      conditions.push(like(staff.fullName, `%${search}%`))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: leaveRequests.id,
        staffId: leaveRequests.staffId,
        staffName: staff.fullName,
        leaveType: leaveRequests.leaveType,
        startDate: leaveRequests.startDate,
        endDate: leaveRequests.endDate,
        reason: leaveRequests.reason,
        status: leaveRequests.status,
        approvedBy: leaveRequests.approvedBy,
        createdAt: leaveRequests.createdAt,
      })
      .from(leaveRequests)
      .leftJoin(staff, eq(leaveRequests.staffId, staff.id))

    const countBase = db
      .select({ count: sql<number>`count(*)` })
      .from(leaveRequests)
      .leftJoin(staff, eq(leaveRequests.staffId, staff.id))

    const totalRes = whereClause ? await countBase.where(whereClause) : await countBase
    const total = Number(totalRes[0]?.count || 0)

    let query = base.orderBy(desc(leaveRequests.createdAt)).limit(limit).offset(offset)
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
    console.error("Leave GET error:", error)
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
    if (!body.startDate || !body.endDate) {
      return adminJsonResponse({ error: "Start and end dates are required" }, { status: 400 })
    }

    const result = await db.insert(leaveRequests).values({
      staffId,
      leaveType: body.leaveType || "casual",
      startDate: body.startDate,
      endDate: body.endDate,
      reason: body.reason || null,
      status: body.status || "pending",
      approvedBy: body.approvedBy || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Leave POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}