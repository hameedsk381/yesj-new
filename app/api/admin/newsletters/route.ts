import { NextRequest, NextResponse } from "next/server"
import { db, schema } from "@/lib/db"
import { desc, eq } from "drizzle-orm"

// Note: Authentication is handled by middleware for /admin/* routes
export async function GET(request: NextRequest) {
  try {
    const newsletters = await db.select().from(schema.newsletters)
      .orderBy(desc(schema.newsletters.subscribedAt))

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Newsletter ID is required" },
        { status: 400 }
      )
    }

    await db.delete(schema.newsletters)
      .where(eq(schema.newsletters.id, parseInt(id)))

    return NextResponse.json({
      success: true,
      message: "Newsletter subscriber deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete newsletter subscriber",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
