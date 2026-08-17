import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return adminJsonResponse({ error: "Invalid ID" }, { status: 400 })
    }
    const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    if (!course) {
      return adminJsonResponse({ error: "Course not found" }, { status: 404 })
    }
    return adminJsonResponse(course)
  } catch (error) {
    console.error("Course GET error:", error)
    return adminJsonResponse({ error: "Failed to fetch course" }, { status: 500 })
  }
}

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
    const allowedFields = ["title", "description", "shortDescription", "imagePath", "price", "startDate", "endDate", "maxStudents", "isActive", "registrationOpen", "slug"]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "price" || field === "maxStudents") {
          updateData[field] = body[field] !== null ? Number(body[field]) : null
        } else if (field === "startDate" || field === "endDate") {
          updateData[field] = body[field] ? new Date(body[field]) : null
        } else {
          updateData[field] = body[field]
        }
      }
    }

    if (updateData.slug) {
      const existing = await db.select().from(courses).where(eq(courses.slug, updateData.slug)).limit(1)
      if (existing.length > 0 && existing[0].id !== id) {
        return adminJsonResponse({ error: "A course with this slug already exists" }, { status: 409 })
      }
    }

    const [updated] = await db.update(courses).set(updateData).where(eq(courses.id, id))
    return adminJsonResponse(updated)
  } catch (error) {
    console.error("Course PATCH error:", error)
    return adminJsonResponse({ error: "Failed to update course" }, { status: 500 })
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
    await db.delete(courses).where(eq(courses.id, id))
    return adminJsonResponse({ success: true })
  } catch (error) {
    console.error("Course DELETE error:", error)
    return adminJsonResponse({ error: "Failed to delete course" }, { status: 500 })
  }
}
