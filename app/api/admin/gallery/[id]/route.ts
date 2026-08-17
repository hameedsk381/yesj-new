import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { galleries } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"
import { deleteFile } from "@/lib/storage"

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

    if (body.title !== undefined) updateData.title = String(body.title)
    if (body.description !== undefined) updateData.description = String(body.description)
    if (body.category !== undefined) updateData.category = String(body.category)
    if (body.imagePath !== undefined) updateData.imagePath = String(body.imagePath)

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(galleries).set(updateData).where(eq(galleries.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Gallery PATCH error:", error)
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

    const [existing] = await db.select().from(galleries).where(eq(galleries.id, id)).limit(1)
    await db.delete(galleries).where(eq(galleries.id, id))

    if (existing?.imagePath) {
      try {
        await deleteFile(existing.imagePath)
      } catch (fileErr) {
        console.error("Gallery image delete error:", fileErr)
      }
    }

    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Gallery DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
