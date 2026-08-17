import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { echoes } from "@/lib/db/schema"
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

    const allowedFields = ["title", "edition", "description", "releaseDate", "filePath", "thumbnailPath"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "releaseDate") {
          updateData[field] = body[field] ? new Date(body[field]) : new Date()
        } else {
          updateData[field] = body[field]
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(echoes).set(updateData).where(eq(echoes.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Echoes PATCH error:", error)
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

    const [existing] = await db.select().from(echoes).where(eq(echoes.id, id)).limit(1)
    await db.delete(echoes).where(eq(echoes.id, id))

    if (existing?.filePath) {
      try {
        await deleteFile(existing.filePath)
      } catch (fileErr) {
        console.error("Echoes file delete error:", fileErr)
      }
    }
    if (existing?.thumbnailPath) {
      try {
        await deleteFile(existing.thumbnailPath)
      } catch (fileErr) {
        console.error("Echoes thumbnail delete error:", fileErr)
      }
    }

    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Echoes DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
