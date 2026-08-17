import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { newsletters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

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

    await db.delete(newsletters).where(eq(newsletters.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Newsletter DELETE error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
