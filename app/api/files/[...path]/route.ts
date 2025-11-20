import { NextRequest, NextResponse } from "next/server"
import { minioClient, BUCKET_NAME } from "@/lib/minio"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Note: Files are publicly accessible since bucket is public
    // Remove authentication to allow direct URL access
    
    const filePath = params.path.join("/")
    
    if (!filePath) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 }
      )
    }

    // Extract just the file key if a full URL was passed
    // e.g., "http://minio.yesj.com:9000/yesj-uploads/noc/123.jpg" -> "noc/123.jpg"
    let fileKey = filePath
    if (filePath.startsWith("http")) {
      const urlMatch = filePath.match(/\/[^/]+\/(.+)$/)
      if (urlMatch) {
        fileKey = urlMatch[1]
      }
    }

    console.log("[File Download] Attempting to fetch:", {
      originalPath: filePath,
      extractedKey: fileKey,
      bucket: BUCKET_NAME,
    })

    // Get the file from MinIO
    const stream = await minioClient.getObject(BUCKET_NAME, fileKey)
    
    // Get file metadata
    const stat = await minioClient.statObject(BUCKET_NAME, fileKey)
    
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
