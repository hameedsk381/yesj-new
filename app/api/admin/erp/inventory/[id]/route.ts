import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { inventoryItems } from "@/lib/db/schema"
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

    const allowedFields = ["name", "category", "quantity", "unit", "minQuantity", "unitCost", "supplier", "location", "notes"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = field === "quantity" || field === "minQuantity" || field === "unitCost"
          ? (body[field] ? parseFloat(body[field]).toFixed(2) : null)
          : body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(inventoryItems).set(updateData).where(eq(inventoryItems.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Inventory PATCH error:", error)
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

    await db.delete(inventoryItems).where(eq(inventoryItems.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Inventory DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}