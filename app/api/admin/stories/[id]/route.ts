import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { stories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"
import { deleteFile } from "@/lib/storage"

export const dynamic = "force-dynamic"

export async function GET(
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

    const story = await db.query.stories.findFirst({
      where: eq(stories.id, id),
    })

    if (!story) {
      return adminJsonResponse({ error: "Story not found" }, { status: 404 })
    }

    return adminJsonResponse(story)
  } catch (error) {
    console.error("Story GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const allowedFields = ["title", "slug", "excerpt", "content", "author", "category", "imagePath", "featured"]
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return adminJsonResponse({ error: "No valid fields to update" }, { status: 400 })
    }

    await db.update(stories).set(updateData).where(eq(stories.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Story PATCH error:", error)
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

    const [existing] = await db.select().from(stories).where(eq(stories.id, id)).limit(1)
    await db.delete(stories).where(eq(stories.id, id))

    if (existing?.imagePath) {
      try {
        await deleteFile(existing.imagePath)
      } catch (fileErr) {
        console.error("Story image delete error:", fileErr)
      }
    }

    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Story DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
