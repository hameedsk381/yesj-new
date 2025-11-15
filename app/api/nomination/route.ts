import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"
import { RATE_LIMIT } from "@/lib/constants"
import { logger } from "@/lib/logger"
import connectDB from "@/lib/db/connect"
import Nomination from "@/lib/db/models/Nomination"
import { uploadFile } from "@/lib/minio"

const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    
    const rateLimitResult = checkRateLimit(`nomination:${ip}`, RATE_LIMIT.NOMINATION)

    if (!rateLimitResult.success) {
      logger.warn("Nomination rate limit exceeded", { ip })
      return NextResponse.json(
        {
          success: false,
          message: "Too many nomination attempts. Please try again later.",
        },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    
    const name = formData.get("name") as string
    const unitName = formData.get("unitName") as string
    const contestingFor = formData.get("contestingFor") as string
    const educationQualification = formData.get("educationQualification") as string
    const nocFile = formData.get("nocFile") as File

    if (!name || !unitName || !contestingFor || !educationQualification || !nocFile) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      )
    }

    if (nocFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "File size exceeds 10MB limit",
        },
        { status: 400 }
      )
    }

    const bytes = await nocFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const fileExtension = nocFile.name.split(".").pop()
    const fileName = `noc-${timestamp}.${fileExtension}`
    const contentType = nocFile.type || "application/octet-stream"

    // Upload to MinIO
    const fileUrl = await uploadFile(buffer, fileName, contentType)

    logger.info("NOC file uploaded to MinIO", {
      fileName,
      size: nocFile.size,
      url: fileUrl,
    })

    await connectDB()

    const nomination = await Nomination.create({
      name,
      unitName,
      contestingFor,
      educationQualification,
      nocFilePath: fileUrl,
      nocFileName: nocFile.name,
      status: "pending",
    })

    logger.info("Nomination saved to database", {
      id: nomination._id,
      name,
      contestingFor,
    })

    return NextResponse.json({
      success: true,
      message: "Nomination submitted successfully",
      data: {
        nominationId: nomination._id,
        name,
        contestingFor,
      },
    })
  } catch (error) {
    logger.error(
      "Nomination submission failed",
      { error: error instanceof Error ? error.message : "Unknown error" },
      error as Error
    )

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit nomination",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
