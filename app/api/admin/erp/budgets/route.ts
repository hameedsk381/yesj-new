import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { budgets, expenses } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const fiscalYear = searchParams.get("fiscalYear")?.trim()
    const fund = searchParams.get("fund")?.trim()

    const conditions = []
    if (fiscalYear) {
      conditions.push(eq(budgets.fiscalYear, fiscalYear))
    }
    if (fund) {
      conditions.push(eq(budgets.fund, fund))
    }
    if (search) {
      conditions.push(
        or(
          like(budgets.category, `%${search}%`),
          like(budgets.fund, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(budgets)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    const budgetRows = await (() => {
      let q = db.select().from(budgets).orderBy(desc(budgets.createdAt)).limit(limit).offset(offset)
      if (whereClause) {
        q = q.where(whereClause) as any
      }
      return q
    })()

    // Compute spent per budget from expenses table
    const spentMap: Record<number, number> = {}
    for (const b of budgetRows) {
      const spentRes = await db
        .select({ sum: sql<string>`coalesce(sum(${expenses.amount}),0)` })
        .from(expenses)
        .where(eq(expenses.budgetId, b.id))
      spentMap[b.id] = Number(spentRes[0]?.sum || 0)
    }

    const items = budgetRows.map((b) => ({
      ...b,
      spent: spentMap[b.id] || 0,
      remaining: Number(b.allocated) - (spentMap[b.id] || 0),
    }))

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
    console.error("Budgets GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const allocated = parseFloat(body.allocated)

    if (!body.fiscalYear || !body.fund || !body.category) {
      return adminJsonResponse({ error: "Fiscal year, fund and category are required" }, { status: 400 })
    }
    if (isNaN(allocated) || allocated < 0) {
      return adminJsonResponse({ error: "Allocated amount must be zero or more" }, { status: 400 })
    }

    const result = await db.insert(budgets).values({
      fiscalYear: body.fiscalYear,
      fund: body.fund,
      category: body.category,
      allocated: allocated.toFixed(2),
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Budgets POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}