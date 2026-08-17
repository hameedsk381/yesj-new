import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"
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

    if (body.status !== undefined) {
      updateData.status = String(body.status)
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(registrations)
      .set(updateData)
      .where(eq(registrations.id, id))

    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Registration PATCH error:", error)
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

    await db.delete(registrations).where(eq(registrations.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Registration DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
