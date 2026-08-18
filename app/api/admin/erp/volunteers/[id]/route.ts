import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { volunteers } from "@/lib/db/schema"
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

    const allowedFields = ["fullName", "email", "phone", "address", "gender", "age", "occupation", "skills", "availability", "status", "joinedAt", "notes"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "age") {
          updateData[field] = body[field] ? parseInt(body[field], 10) || null : null
        } else if (field === "skills") {
          updateData[field] = Array.isArray(body[field]) ? body[field] : []
        } else if (field === "joinedAt") {
          updateData[field] = body[field] || null
        } else {
          updateData[field] = body[field]
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(volunteers).set(updateData).where(eq(volunteers.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Volunteer PATCH error:", error)
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

    await db.delete(volunteers).where(eq(volunteers.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Volunteer DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}