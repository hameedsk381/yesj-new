import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { staff } from "@/lib/db/schema"
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
    const department = searchParams.get("department")?.trim()

    const conditions = []
    if (status) {
      conditions.push(eq(staff.status, status))
    }
    if (department) {
      conditions.push(eq(staff.department, department))
    }
    if (search) {
      conditions.push(
        or(
          like(staff.fullName, `%${search}%`),
          like(staff.email, `%${search}%`),
          like(staff.phone, `%${search}%`),
          like(staff.role, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(staff)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    const sumRes = whereClause
      ? await db
          .select({ sum: sql<string>`coalesce(sum(${staff.salary}),0)` })
          .from(staff)
          .where(whereClause)
      : await db
          .select({ sum: sql<string>`coalesce(sum(${staff.salary}),0)` })
          .from(staff)
    const totalSalary = Number(sumRes[0]?.sum || 0)

    let query = db
      .select()
      .from(staff)
      .orderBy(desc(staff.createdAt))
      .limit(limit)
      .offset(offset)

    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      totalSalary,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Staff GET error:", error)
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
      return adminJsonResponse({ error: "Staff name is required" }, { status: 400 })
    }

    const result = await db.insert(staff).values({
      fullName,
      email: (body.email || "").trim() || null,
      phone: (body.phone || "").trim() || null,
      role: body.role || null,
      department: body.department || null,
      designation: body.designation || null,
      joinDate: body.joinDate || null,
      employmentType: body.employmentType || "full-time",
      salary: body.salary ? parseFloat(body.salary).toFixed(2) : null,
      bankAccount: body.bankAccount || null,
      bankName: body.bankName || null,
      ifscCode: body.ifscCode || null,
      address: body.address || null,
      status: body.status || "active",
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Staff POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}