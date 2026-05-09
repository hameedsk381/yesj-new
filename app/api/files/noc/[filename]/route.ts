export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join, resolve, basename } from "path"
import { existsSync } from "fs"

const SAFE_FILENAME = /^[A-Za-z0-9._-]+$/

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const rawFilename = params.filename
    const filename = decodeURIComponent(rawFilename)

    // Reject anything that could traverse: separators, null bytes, dotfiles, ..
    if (
      !filename ||
      filename.includes("\0") ||
      filename.includes("/") ||
      filename.includes("\\") ||
      filename.startsWith(".") ||
      filename !== basename(filename) ||
      !SAFE_FILENAME.test(filename)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid filename" },
        { status: 400 }
      )
    }

    const baseDir = resolve(process.cwd(), "public", "uploads", "noc")
    const filePath = resolve(baseDir, filename)

    // Defense-in-depth: ensure the resolved path stays inside baseDir
    if (filePath !== join(baseDir, filename) || !filePath.startsWith(baseDir)) {
      return NextResponse.json(
        { success: false, message: "Invalid filename" },
        { status: 400 }
      )
    }

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      )
    }

    const fileBuffer = await readFile(filePath)
    const extension = filename.split(".").pop()?.toLowerCase()

    // Set appropriate content type
    let contentType = "application/octet-stream"
    if (extension === "pdf") {
      contentType = "application/pdf"
    } else if (["jpg", "jpeg"].includes(extension || "")) {
      contentType = "image/jpeg"
    } else if (extension === "png") {
      contentType = "image/png"
    } else if (extension === "gif") {
      contentType = "image/gif"
    } else if (extension === "webp") {
      contentType = "image/webp"
    }

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json(
      { success: false, message: "Error reading file" },
      { status: 500 }
    )
  }
}
