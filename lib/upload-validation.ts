// Shared validation for user-supplied file uploads. Enforces type/size limits
// and produces safe storage keys so attacker-controlled file.name can't escape
// the intended folder or get served back as executable content.

import crypto from "crypto"
import { extname } from "path"

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10 MB

const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
])

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
])

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"])
const DOCUMENT_EXTENSIONS = new Set([".pdf"])

export type AllowedKind = "image" | "document" | "image-or-document"

export interface ValidatedUpload {
  ok: true
  storageKey: string
  contentType: string
  size: number
}

export interface InvalidUpload {
  ok: false
  error: string
}

export function validateAndBuildKey(
  file: File,
  folder: string,
  kind: AllowedKind = "image-or-document",
  maxBytes: number = MAX_UPLOAD_BYTES
): ValidatedUpload | InvalidUpload {
  if (!file || file.size === 0) {
    return { ok: false, error: "File is required" }
  }
  if (file.size > maxBytes) {
    return { ok: false, error: `File exceeds ${maxBytes} bytes` }
  }

  const ext = extname(file.name || "").toLowerCase()
  const mime = (file.type || "").toLowerCase()

  let allowedMimes: Set<string>
  let allowedExts: Set<string>
  if (kind === "image") {
    allowedMimes = IMAGE_MIME_TYPES
    allowedExts = IMAGE_EXTENSIONS
  } else if (kind === "document") {
    allowedMimes = DOCUMENT_MIME_TYPES
    allowedExts = DOCUMENT_EXTENSIONS
  } else {
    allowedMimes = new Set([...IMAGE_MIME_TYPES, ...DOCUMENT_MIME_TYPES])
    allowedExts = new Set([...IMAGE_EXTENSIONS, ...DOCUMENT_EXTENSIONS])
  }

  if (!allowedMimes.has(mime)) {
    return { ok: false, error: `Unsupported file type: ${mime || "unknown"}` }
  }
  if (!allowedExts.has(ext)) {
    return { ok: false, error: `Unsupported file extension: ${ext || "none"}` }
  }

  // Build storage key entirely from server-controlled values; ignore file.name.
  const safeFolder = folder.replace(/[^A-Za-z0-9_-]/g, "") || "uploads"
  const storageKey = `${safeFolder}/${crypto.randomUUID()}${ext}`

  return { ok: true, storageKey, contentType: mime, size: file.size }
}
