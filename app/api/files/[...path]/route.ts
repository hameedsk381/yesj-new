export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"
import { getFile, getBucketName } from "@/lib/storage"

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join("/")
    
    if (!filePath) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 }
      )
    }

    // Extract just the file key if a full URL was passed
    let fileKey = filePath
    if (filePath.startsWith("http")) {
      const urlMatch = filePath.match(/\/[^/]+\/(.+)$/)
      if (urlMatch) {
        fileKey = urlMatch[1]
      }
    }

    console.log("[File Download] Transitioning to GCS fetch:", {
      originalPath: filePath,
      extractedKey: fileKey,
      bucket: getBucketName(),
    })

    // Get the file from GCS
    const { buffer, metadata } = await getFile(fileKey)
    
    // Determine if this is a download or view request
    const download = request.nextUrl.searchParams.get("download")
    const filename = fileKey.split("/").pop() || "file"

    // Set appropriate headers
    const headers = new Headers()
    const contentType = metadata.contentType || "application/octet-stream"
    headers.set("Content-Type", contentType)
    headers.set("Content-Length", buffer.length.toString())
    
    if (download === "true") {
      headers.set("Content-Disposition", `attachment; filename="${filename}"`)
    } else {
      headers.set("Content-Disposition", `inline; filename="${filename}"`)
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error fetching file from GCS:", error)
    
    // Check for GCS not found error (usually 404 in the download() call)
    if ((error as any).code === 404) {
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
