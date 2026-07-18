import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courseRegistrations, courses } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    const conditions = []
    if (courseId) {
      const id = Number(courseId)
      if (!isNaN(id)) {
        conditions.push(eq(courseRegistrations.courseId, id))
      }
    }

    let query = db.select({
      id: courseRegistrations.id,
      courseId: courseRegistrations.courseId,
      name: courseRegistrations.name,
      email: courseRegistrations.email,
      phone: courseRegistrations.phone,
      fields: courseRegistrations.fields,
      paymentMode: courseRegistrations.paymentMode,
      amount: courseRegistrations.amount,
      paymentStatus: courseRegistrations.paymentStatus,
      status: courseRegistrations.status,
      createdAt: courseRegistrations.createdAt,
      courseTitle: courses.title,
    })
    .from(courseRegistrations)
    .leftJoin(courses, eq(courseRegistrations.courseId, courses.id))
    .orderBy(desc(courseRegistrations.createdAt))

    for (const condition of conditions) {
      query = query.where(condition)
    }

    const all = await query
    return NextResponse.json(all)
  } catch (error) {
    console.error("Course registrations GET error:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
