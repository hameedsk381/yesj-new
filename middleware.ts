import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value

    // Protect admin routes
    if (path.startsWith("/admin")) {
        // If on login page and has valid token, redirect to dashboard
        if (path === "/admin/login") {
            if (token) {
                try {
                    const { payload } = await jwtVerify(token, JWT_SECRET)
                    if (payload.role === 'admin') {
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
            
            // Verify admin role
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL("/admin/login", request.url))
            }
            
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }

    // Protect member routes
    if (path.startsWith("/member")) {
        // Allow access to login and passkey pages
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
    matcher: ["/admin/:path*", "/member/:path*"],
}
