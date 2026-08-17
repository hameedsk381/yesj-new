import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { hashPassword } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }

    const body = await req.json()
    const updateData: Record<string, any> = {}

    if (body.fullName !== undefined) updateData.fullName = body.fullName
    if (body.email !== undefined) {
      const email = body.email.toLowerCase()
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1)
      if (existing.length > 0 && existing[0].id !== id) {
        return adminJsonResponse({ error: "Email already in use" }, { status: 409 })
      }
      updateData.email = email
    }
    if (body.password) {
      updateData.hashedPassword = await hashPassword(body.password)
    }
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.isSuperuser !== undefined) updateData.isSuperuser = body.isSuperuser

    await db.update(users).set(updateData).where(eq(users.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Users PATCH error:", error)
    return adminJsonResponse({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }
    await db.delete(users).where(eq(users.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Users DELETE error:", error)
    return adminJsonResponse({ error: "Failed to delete user" }, { status: 500 })
  }
}
