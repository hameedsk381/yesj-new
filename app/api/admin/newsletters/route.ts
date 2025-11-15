import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { db, schema } from "@/lib/db"
import { desc } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const headersList = headers()
    const token = headersList.get("authorization")?.replace("Bearer ", "")

    if (!token || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const newsletters = db.select().from(schema.newsletters)
      .orderBy(desc(schema.newsletters.subscribedAt))
      .all()

    return NextResponse.json({
      success: true,
      data: newsletters,
      count: newsletters.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch newsletters",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
