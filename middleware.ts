import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const RAW_JWT_SECRET = process.env.JWT_SECRET
if (!RAW_JWT_SECRET || RAW_JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET environment variable must be set to a strong value (>=32 chars).")
}
const JWT_SECRET = new TextEncoder().encode(RAW_JWT_SECRET)

const STATE_CHANGING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"])

function isSameSiteOrigin(request: NextRequest): boolean {
    const origin = request.headers.get("origin")
    const referer = request.headers.get("referer")
    const expected = process.env.NEXT_PUBLIC_SITE_URL

    // If neither is present (e.g. native fetch with omit), reject for state-changing requests.
    if (!origin && !referer) return false

    if (expected) {
        try {
            const expectedOrigin = new URL(expected).origin
            if (origin && origin === expectedOrigin) return true
            if (referer && new URL(referer).origin === expectedOrigin) return true
            return false
        } catch {
            // fall through to host-based check
        }
    }

    // Fallback: compare against the request host.
    const host = request.headers.get("host")
    if (!host) return false
    const proto = request.headers.get("x-forwarded-proto") || "https"
    const requestOrigin = `${proto}://${host}`
    if (origin && origin === requestOrigin) return true
    if (referer) {
        try {
            if (new URL(referer).origin === requestOrigin) return true
        } catch {
            return false
        }
    }
    return false
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value

    // Protect admin API routes (auth + CSRF Origin check on state-changing methods).
    if (path.startsWith("/api/admin")) {
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET)
            if (payload.role !== "admin") {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 })
            }
        } catch {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        if (STATE_CHANGING_METHODS.has(request.method) && !isSameSiteOrigin(request)) {
            return NextResponse.json({ error: "Cross-origin request blocked" }, { status: 403 })
        }
        return NextResponse.next()
    }

    // Protect admin pages
    if (path.startsWith("/admin")) {
        if (path === "/admin/login") {
            if (token) {
                try {
                    const { payload } = await jwtVerify(token, JWT_SECRET)
                    if (payload.role === "admin") {
                        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
                    }
                } catch (error) {
                    // Invalid token, allow access to login page
                }
            }
            return NextResponse.next()
        }

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }

        try {
            const { payload } = await jwtVerify(token, JWT_SECRET)
            if (payload.role !== "admin") {
                return NextResponse.redirect(new URL("/admin/login", request.url))
            }
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }

    // Protect member routes
    if (path.startsWith("/member")) {
        if (path === "/member/login" || path.startsWith("/member/passkey")) {
            return NextResponse.next()
        }

        if (!token) {
            return NextResponse.redirect(new URL("/member/login", request.url))
        }

        try {
            await jwtVerify(token, JWT_SECRET)
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL("/member/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/member/:path*", "/api/admin/:path*"],
}
