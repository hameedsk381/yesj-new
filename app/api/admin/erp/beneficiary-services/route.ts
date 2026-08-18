import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { beneficiaryServices, beneficiaries } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const beneficiaryId = searchParams.get("beneficiaryId")?.trim()
    const serviceType = searchParams.get("serviceType")?.trim()
    const date = searchParams.get("date")?.trim()

    const conditions = []
    if (beneficiaryId) {
      conditions.push(eq(beneficiaryServices.beneficiaryId, parseInt(beneficiaryId, 10)))
    }
    if (serviceType) {
      conditions.push(eq(beneficiaryServices.serviceType, serviceType))
    }
    if (date) {
      conditions.push(sql`${beneficiaryServices.serviceDate} = ${date}`)
    }
    if (search) {
      conditions.push(
        or(
          like(beneficiaries.fullName, `%${search}%`),
          like(beneficiaryServices.description, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: beneficiaryServices.id,
        beneficiaryId: beneficiaryServices.beneficiaryId,
        beneficiaryName: beneficiaries.fullName,
        serviceType: beneficiaryServices.serviceType,
        description: beneficiaryServices.description,
        amount: beneficiaryServices.amount,
        serviceDate: beneficiaryServices.serviceDate,
        notes: beneficiaryServices.notes,
        createdAt: beneficiaryServices.createdAt,
      })
      .from(beneficiaryServices)
      .leftJoin(beneficiaries, eq(beneficiaryServices.beneficiaryId, beneficiaries.id))

    const countBase = db
      .select({ count: sql<number>`count(*)` })
      .from(beneficiaryServices)
      .leftJoin(beneficiaries, eq(beneficiaryServices.beneficiaryId, beneficiaries.id))

    const totalRes = whereClause ? await countBase.where(whereClause) : await countBase
    const total = Number(totalRes[0]?.count || 0)

    let query = base.orderBy(desc(beneficiaryServices.serviceDate)).limit(limit).offset(offset)
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
    console.error("Beneficiary services GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const beneficiaryId = parseInt(body.beneficiaryId, 10)

    if (isNaN(beneficiaryId)) {
      return adminJsonResponse({ error: "Please select a beneficiary" }, { status: 400 })
    }
    if (!body.serviceDate) {
      return adminJsonResponse({ error: "Service date is required" }, { status: 400 })
    }

    const result = await db.insert(beneficiaryServices).values({
      beneficiaryId,
      serviceType: body.serviceType || "Other",
      description: body.description || null,
      amount: body.amount ? parseFloat(body.amount).toFixed(2) : null,
      serviceDate: body.serviceDate,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Beneficiary services POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}