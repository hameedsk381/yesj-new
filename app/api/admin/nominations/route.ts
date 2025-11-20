import { NextRequest, NextResponse } from "next/server"

// Mock data for nominations
const mockNominations = [
  {
    id: 1,
    name: "John Doe",
    unitName: "Hyderabad Unit",
    contestingFor: "President",
    educationQualification: "MBA from XYZ University",
    nocFilePath: "noc/12345.pdf",
    nocFileName: "noc_12345.pdf",
    status: "pending",
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: 2,
    name: "Jane Smith",
    unitName: "Vijayawada Unit",
    contestingFor: "Vice President",
    educationQualification: "PhD in Social Sciences",
    nocFilePath: "noc/67890.pdf",
    nocFileName: "noc_67890.pdf",
    status: "approved",
    createdAt: new Date("2024-01-16T14:20:00Z")
  }
]

// Note: Authentication is handled by middleware for /admin/* routes
export async function GET(request: NextRequest) {
  try {
    // Return mock nominations data
    return NextResponse.json({
      success: true,
      data: mockNominations,
      count: mockNominations.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch nominations",
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
        { success: false, message: "Nomination ID is required" },
        { status: 400 }
      )
    }

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Valid status is required (pending, approved, rejected)" },
        { status: 400 }
      )
    }

    // Mock update operation - in a real implementation, this would update the nomination
    // For now, we just return a success response
    return NextResponse.json({
      success: true,
      message: "Nomination status updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update nomination",
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
        { success: false, message: "Nomination ID is required" },
        { status: 400 }
      )
    }

    // Mock delete operation - in a real implementation, this would delete the nomination
    // For now, we just return a success response
    return NextResponse.json({
      success: true,
      message: "Nomination deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete nomination",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
