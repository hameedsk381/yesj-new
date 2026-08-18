import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { expenses, budgets } from "@/lib/db/schema"
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
    const category = searchParams.get("category")?.trim()

    const conditions = []
    if (fund) {
      conditions.push(eq(expenses.fund, fund))
    }
    if (category) {
      conditions.push(eq(expenses.category, category))
    }
    if (search) {
      conditions.push(
        or(
          like(expenses.description, `%${search}%`),
          like(expenses.paidTo, `%${search}%`),
          like(expenses.billNumber, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const base = db
      .select({
        id: expenses.id,
        budgetId: expenses.budgetId,
        fund: expenses.fund,
        category: expenses.category,
        description: expenses.description,
        amount: expenses.amount,
        expenseDate: expenses.expenseDate,
        paidTo: expenses.paidTo,
        paymentMode: expenses.paymentMode,
        billNumber: expenses.billNumber,
        notes: expenses.notes,
        createdAt: expenses.createdAt,
      })
      .from(expenses)

    const countBase = db.select({ count: sql<number>`count(*)` }).from(expenses)
    const totalRes = whereClause ? await countBase.where(whereClause) : await countBase
    const total = Number(totalRes[0]?.count || 0)

    const sumRes = whereClause
      ? await db
          .select({ sum: sql<string>`coalesce(sum(${expenses.amount}),0)` })
          .from(expenses)
          .where(whereClause)
      : await db
          .select({ sum: sql<string>`coalesce(sum(${expenses.amount}),0)` })
          .from(expenses)
    const totalAmount = Number(sumRes[0]?.sum || 0)

    let query = base.orderBy(desc(expenses.expenseDate)).limit(limit).offset(offset)
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
    console.error("Expenses GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const amount = parseFloat(body.amount)

    if (!body.fund || !body.category || !body.description) {
      return adminJsonResponse({ error: "Fund, category and description are required" }, { status: 400 })
    }
    if (isNaN(amount) || amount <= 0) {
      return adminJsonResponse({ error: "Amount must be greater than zero" }, { status: 400 })
    }
    if (!body.expenseDate) {
      return adminJsonResponse({ error: "Expense date is required" }, { status: 400 })
    }

    let budgetId: number | null = null
    if (body.budgetId) {
      const parsedBudgetId = parseInt(body.budgetId, 10)
      if (!isNaN(parsedBudgetId)) {
        // Verify budget exists
        const [budget] = await db.select().from(budgets).where(eq(budgets.id, parsedBudgetId)).limit(1)
        if (budget) budgetId = parsedBudgetId
      }
    }

    const result = await db.insert(expenses).values({
      budgetId,
      fund: body.fund,
      category: body.category,
      description: body.description,
      amount: amount.toFixed(2),
      expenseDate: body.expenseDate,
      paidTo: body.paidTo || null,
      paymentMode: body.paymentMode || null,
      billNumber: body.billNumber || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Expenses POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}