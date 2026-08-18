import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { donors } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const donorType = searchParams.get("donorType")?.trim()

    const conditions = []
    if (donorType) {
      conditions.push(eq(donors.donorType, donorType))
    }
    if (search) {
      conditions.push(
        or(
          like(donors.fullName, `%${search}%`),
          like(donors.email, `%${search}%`),
          like(donors.phone, `%${search}%`),
          like(donors.panNumber, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(donors)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(donors)
      .orderBy(desc(donors.createdAt))
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
    console.error("Donors GET error:", error)
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
      return adminJsonResponse({ error: "Donor name is required" }, { status: 400 })
    }

    const result = await db.insert(donors).values({
      fullName,
      email: (body.email || "").trim() || null,
      phone: (body.phone || "").trim() || null,
      address: body.address || null,
      donorType: body.donorType || "individual",
      panNumber: (body.panNumber || "").trim() || null,
      source: (body.source || "").trim() || null,
      notes: body.notes || null,
      isActive: true,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Donors POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}