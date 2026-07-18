import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug)).limit(1)
    if (!course || !course.isActive) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }
    return NextResponse.json(course)
  } catch (error) {
    console.error("Public course GET error:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}
