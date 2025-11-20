import { NextRequest, NextResponse } from "next/server"

// Mock data for registrations
const mockRegistrations = [
  {
    id: 1,
    registrationId: "REG001",
    applicationType: "Volunteer",
    name: "John Doe",
    gender: "Male",
    registrationNo: "VOL001",
    course: "Computer Science",
    age: "25",
    instagramId: "johndoe",
    mobileNo: "+919876543210",
    whatsappNo: "+919876543210",
    emailId: "john@example.com",
    religion: "Christian",
    address: "123 Main St, Hyderabad",
    skills: "[\"Leadership\", \"Communication\"]",
    otherSkills: "Public Speaking",
    eventExperience: "Organized college fests",
    justSocietyDefinition: "A society that ensures equal opportunities for all",
    communicationExample: "Mediated conflicts in my community",
    yesjVision: "Empowering youth through education and service",
    leadershipPosition: "Class Representative",
    additionalMessage: "I'm passionate about social service",
    password: "hashed_password",
    role: "member",
    createdAt: new Date("2024-01-15T10:30:00Z")
  }
]

// Note: Authentication is handled by middleware for /admin/* routes
export async function GET(request: NextRequest) {
  try {
    // Return mock registrations data
    return NextResponse.json({
      success: true,
      data: mockRegistrations,
      count: mockRegistrations.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch registrations",
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
        { success: false, message: "Registration ID is required" },
        { status: 400 }
      )
    }

    // Mock delete operation - in a real implementation, this would delete the registration
    // For now, we just return a success response
    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete registration",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
