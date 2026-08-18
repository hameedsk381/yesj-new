import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { budgets } from "@/lib/db/schema"
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

    const allowedFields = ["fiscalYear", "fund", "category", "allocated", "notes"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = field === "allocated" ? parseFloat(body[field]).toFixed(2) : body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(budgets).set(updateData).where(eq(budgets.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Budget PATCH error:", error)
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

    await db.delete(budgets).where(eq(budgets.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Budget DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}