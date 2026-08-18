import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }

    const body = await req.json()
    const updateData: Record<string, any> = {}

    const allowedFields = ["budgetId", "fund", "category", "description", "amount", "expenseDate", "paidTo", "paymentMode", "billNumber", "notes"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = field === "amount" ? parseFloat(body[field]).toFixed(2) : body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(expenses).set(updateData).where(eq(expenses.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Expense PATCH error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }

    await db.delete(expenses).where(eq(expenses.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Expense DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}