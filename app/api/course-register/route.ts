import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courseRegistrations, courses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { courseId, name, email, phone, fields } = await req.json()

    if (!courseId || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const [course] = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1)
    if (!course || !course.isActive || !course.registrationOpen) {
      return NextResponse.json({ error: "Course not available" }, { status: 400 })
    }

    const [registration] = await db.insert(courseRegistrations).values({
      courseId,
      name,
      email: email.toLowerCase(),
      phone,
      fields: fields || null,
    })

    return NextResponse.json({ id: registration.id, success: true }, { status: 201 })
  } catch (error) {
    console.error("Course registration POST error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
