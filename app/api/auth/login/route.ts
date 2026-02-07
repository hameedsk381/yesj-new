import { NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(req: Request) {
  try {
    const { email, password, requireAdmin } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Call FastAPI backend
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const baseUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000/api/v1"
    const backendUrl = `${baseUrl}/login/access-token`

    // Note: In production, use env var for backend URL
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.detail || "Invalid credentials" },
        { status: res.status }
      )
    }

    const data = await res.json()
    const token = data.access_token

    // Decode token to check role if needed (or trust backend logic if specific endpoint used)
    // Here we can just proceed as the token contains the role and middleware will verify it.

    // Create response with cookie
    const response = NextResponse.json({ success: true })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days (consistent with backend)
      path: "/",
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
