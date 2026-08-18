import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { assets } from "@/lib/db/schema"
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

    const allowedFields = ["name", "category", "description", "serialNumber", "condition", "status", "location", "assignedTo", "purchaseDate", "purchaseCost", "notes"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = field === "purchaseCost" ? (body[field] ? parseFloat(body[field]).toFixed(2) : null) : body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(assets).set(updateData).where(eq(assets.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Asset PATCH error:", error)
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

    await db.delete(assets).where(eq(assets.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Asset DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}