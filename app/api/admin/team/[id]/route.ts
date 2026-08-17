import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { teamMembers } from "@/lib/db/schema"
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

    const allowedFields = ["name", "role", "bio", "twitterUrl", "linkedinUrl", "imagePath"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(teamMembers).set(updateData).where(eq(teamMembers.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Team member PATCH error:", error)
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

    const [existing] = await db.select().from(teamMembers).where(eq(teamMembers.id, id)).limit(1)
    await db.delete(teamMembers).where(eq(teamMembers.id, id))

    if (existing?.imagePath) {
      try {
        await deleteFile(existing.imagePath)
      } catch (fileErr) {
        console.error("Team image delete error:", fileErr)
      }
    }

    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Team member DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
