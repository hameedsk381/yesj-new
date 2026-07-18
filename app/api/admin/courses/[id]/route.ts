import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }
    const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }
    return NextResponse.json(course)
  } catch (error) {
    console.error("Course GET error:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
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
        return NextResponse.json({ error: "A course with this slug already exists" }, { status: 409 })
      }
    }

    const [updated] = await db.update(courses).set(updateData).where(eq(courses.id, id))
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Course PATCH error:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }
    await db.delete(courses).where(eq(courses.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Course DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
