import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { courseRegistrations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }
    await db.delete(courseRegistrations).where(eq(courseRegistrations.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Course registration DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}
