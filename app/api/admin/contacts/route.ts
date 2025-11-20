import { NextRequest, NextResponse } from "next/server"

// Mock data for contacts
const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "General Inquiry",
    message: "I would like to know more about YESJ programs.",
    status: "unread",
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Volunteer Opportunity",
    message: "I'm interested in volunteering with YESJ.",
    status: "read",
    createdAt: new Date("2024-01-16T14:20:00Z")
  }
]

// Note: Authentication is handled by middleware for /admin/* routes
export async function GET(request: NextRequest) {
  try {
    // Return mock contacts data
    return NextResponse.json({
      success: true,
      data: mockContacts,
      count: mockContacts.length,
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

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required" },
        { status: 400 }
      )
    }

    if (!status || !["unread", "read"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Valid status is required (unread, read)" },
        { status: 400 }
      )
    }

    // Mock update operation - in a real implementation, this would update the contact
    // For now, we just return a success response
    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact",
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
        { success: false, message: "Contact ID is required" },
        { status: 400 }
      )
    }

    // Mock delete operation - in a real implementation, this would delete the contact
    // For now, we just return a success response
    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete contact",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
