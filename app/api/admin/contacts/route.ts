import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import connectDB from "@/lib/db/connect"
import Contact from "@/lib/db/models/Contact"

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

    await connectDB()

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
