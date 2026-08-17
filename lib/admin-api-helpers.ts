import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export const NO_CACHE_HEADERS = {
  "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
}

export async function requireAdmin(req: NextRequest) {
  try {
    const session = await getSession(req)
    if (!session || session.role !== "admin") {
      return {
        session: null,
        errorResponse: NextResponse.json(
          { error: "Unauthorized" },
          { status: 401, headers: NO_CACHE_HEADERS }
        ),
      }
    }
    return { session, errorResponse: null }
  } catch (error) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: NO_CACHE_HEADERS }
      ),
    }
  }
}

export function parsePaginationParams(req: NextRequest, defaultLimit = 25, maxLimit = 100) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1)
  const limit = Math.min(
    maxLimit,
    Math.max(1, parseInt(searchParams.get("limit") || `${defaultLimit}`, 10) || defaultLimit)
  )
  const offset = (page - 1) * limit
  const search = searchParams.get("search")?.trim() || ""

  return { page, limit, offset, search }
}

export function adminJsonResponse(
  data: any,
  init?: { status?: number; headers?: Record<string, string> }
) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: {
      ...NO_CACHE_HEADERS,
      ...(init?.headers || {}),
    },
  })
}
