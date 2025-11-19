import { NextRequest, NextResponse } from "next/server"
import { minioClient, BUCKET_NAME } from "@/lib/minio"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Verify authentication - files should only be accessible to admins
    const token = request.cookies.get("token")?.value
    
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      
      // Verify admin role
      if (payload.role !== 'admin') {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      )
    }

    const filePath = params.path.join("/")
    
    if (!filePath) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 }
      )
    }

    // Get the file from MinIO
    const stream = await minioClient.getObject(BUCKET_NAME, filePath)
    
    // Get file metadata
    const stat = await minioClient.statObject(BUCKET_NAME, filePath)
    
    // Convert stream to buffer
    const chunks: Buffer[] = []
    for await (const chunk of stream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Determine if this is a download or view request
    const download = request.nextUrl.searchParams.get("download")
    const filename = filePath.split("/").pop() || "file"

    // Set appropriate headers
    const headers = new Headers()
    headers.set("Content-Type", stat.metaData["content-type"] || "application/octet-stream")
    headers.set("Content-Length", buffer.length.toString())
    
    if (download === "true") {
      headers.set("Content-Disposition", `attachment; filename="${filename}"`)
    } else {
      headers.set("Content-Disposition", `inline; filename="${filename}"`)
    }

    return new NextResponse(buffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error fetching file from MinIO:", error)
    
    if ((error as any).code === "NoSuchKey") {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    )
  }
}
