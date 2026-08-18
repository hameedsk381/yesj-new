import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { donations, donors } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const fund = searchParams.get("fund")?.trim()

    const conditions = []
    if (fund) {
      conditions.push(eq(donations.fund, fund))
    }
    if (search) {
      conditions.push(
        or(
          like(donations.receiptNumber, `%${search}%`),
          like(donations.paymentReference, `%${search}%`),
          like(donors.fullName, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: donations.id,
        donorId: donations.donorId,
        donorName: donors.fullName,
        amount: donations.amount,
        currency: donations.currency,
        donationDate: donations.donationDate,
        mode: donations.mode,
        paymentReference: donations.paymentReference,
        fund: donations.fund,
        receiptNumber: donations.receiptNumber,
        notes: donations.notes,
        createdAt: donations.createdAt,
      })
      .from(donations)
      .leftJoin(donors, eq(donations.donorId, donors.id))

    const countBase = db
      .select({ count: sql<number>`count(*)` })
      .from(donations)
      .leftJoin(donors, eq(donations.donorId, donors.id))

    const totalRes = whereClause
      ? await countBase.where(whereClause)
      : await countBase
    const total = Number(totalRes[0]?.count || 0)

    const sumRes = whereClause
      ? await db
          .select({ sum: sql<string>`coalesce(sum(${donations.amount}),0)` })
          .from(donations)
          .where(whereClause)
      : await db
          .select({ sum: sql<string>`coalesce(sum(${donations.amount}),0)` })
          .from(donations)
    const totalAmount = Number(sumRes[0]?.sum || 0)

    let query = base.orderBy(desc(donations.donationDate)).limit(limit).offset(offset)
    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      totalAmount,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Donations GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const donorId = parseInt(body.donorId, 10)
    const amount = parseFloat(body.amount)

    if (isNaN(donorId)) {
      return adminJsonResponse({ error: "Please select a donor" }, { status: 400 })
    }
    if (isNaN(amount) || amount <= 0) {
      return adminJsonResponse({ error: "Amount must be greater than zero" }, { status: 400 })
    }
    if (!body.donationDate) {
      return adminJsonResponse({ error: "Donation date is required" }, { status: 400 })
    }

    const result = await db.insert(donations).values({
      donorId,
      amount: amount.toFixed(2),
      currency: body.currency || "INR",
      donationDate: body.donationDate,
      mode: body.mode || "bank",
      paymentReference: body.paymentReference || null,
      fund: body.fund || "General",
      receiptNumber: body.receiptNumber || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Donations POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}