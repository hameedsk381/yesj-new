import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { beneficiaries } from "@/lib/db/schema"
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
    const program = searchParams.get("program")?.trim()
    const category = searchParams.get("category")?.trim()

    const conditions = []
    if (status) {
      conditions.push(eq(beneficiaries.status, status))
    }
    if (program) {
      conditions.push(eq(beneficiaries.program, program))
    }
    if (category) {
      conditions.push(eq(beneficiaries.category, category))
    }
    if (search) {
      conditions.push(
        or(
          like(beneficiaries.fullName, `%${search}%`),
          like(beneficiaries.phone, `%${search}%`),
          like(beneficiaries.email, `%${search}%`),
          like(beneficiaries.city, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(beneficiaries)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(beneficiaries)
      .orderBy(desc(beneficiaries.createdAt))
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
    })
  } catch (error) {
    console.error("Beneficiaries GET error:", error)
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
      return adminJsonResponse({ error: "Beneficiary name is required" }, { status: 400 })
    }

    const result = await db.insert(beneficiaries).values({
      fullName,
      gender: body.gender || null,
      dateOfBirth: body.dateOfBirth || null,
      age: body.age ? parseInt(body.age, 10) : null,
      phone: (body.phone || "").trim() || null,
      email: (body.email || "").trim() || null,
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      category: body.category || null,
      program: body.program || null,
      status: body.status || "active",
      enrolledDate: body.enrolledDate || null,
      guardianName: body.guardianName || null,
      guardianPhone: body.guardianPhone || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Beneficiaries POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}