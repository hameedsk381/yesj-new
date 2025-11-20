import { NextRequest, NextResponse } from "next/server"

// Mock data for newsletters
const mockNewsletters = [
  {
    id: 1,
    email: "john@example.com",
    subscribedAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: 2,
    email: "jane@example.com",
    subscribedAt: new Date("2024-01-16T14:20:00Z")
  }
]

// Note: Authentication is handled by middleware for /admin/* routes
export async function GET(request: NextRequest) {
  try {
    // Return mock newsletters data
    return NextResponse.json({
      success: true,
      data: mockNewsletters,
      count: mockNewsletters.length,
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

    // Mock delete operation - in a real implementation, this would delete the newsletter subscriber
    // For now, we just return a success response
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
