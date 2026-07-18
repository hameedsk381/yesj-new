import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const all = await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt))
    return NextResponse.json(all)
  } catch (error) {
    console.error("Public courses GET error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
