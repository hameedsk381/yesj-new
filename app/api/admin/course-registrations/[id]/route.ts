import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { courseRegistrations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }
    await db.delete(courseRegistrations).where(eq(courseRegistrations.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Course registration DELETE error:", error)
    return adminJsonResponse({ error: "Failed to delete registration" }, { status: 500 })
  }
}
