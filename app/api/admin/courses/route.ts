import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const all = await db.select().from(courses).orderBy(desc(courses.createdAt))
    return NextResponse.json(all)
  } catch (error) {
    console.error("Courses GET error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, title, description, shortDescription, imagePath, price, startDate, endDate, maxStudents, isActive, registrationOpen } = body

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 })
    }

    const existing = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1)
    if (existing.length > 0) {
      return NextResponse.json({ error: "A course with this slug already exists" }, { status: 409 })
    }

    const [inserted] = await db.insert(courses).values({
      slug,
      title,
      description: description || null,
      shortDescription: shortDescription || null,
      imagePath: imagePath || null,
      price: price ? Number(price) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      maxStudents: maxStudents ? Number(maxStudents) : null,
      isActive: isActive !== false,
      registrationOpen: registrationOpen !== false,
    })

    const [course] = await db.select().from(courses).where(eq(courses.id, inserted.insertId)).limit(1)
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error("Courses POST error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
