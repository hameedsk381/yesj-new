import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key")

export async function POST(req: Request) {
  try {
    const { email, password, requireAdmin } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock user data for quick deployment without database
    const mockUsers = [
      {
        id: 1,
        emailId: "admin@yesj.in",
        password: "$2a$10$8K1p/a0dURXAm7QiTRqUzuN0/SpuDMaM1YWefl5f6O.9C256hD/vO", // bcrypt hash for "admin123"
        role: "admin",
        name: "Admin User"
      },
      {
        id: 2,
        emailId: "user@yesj.in",
        password: "$2a$10$8K1p/a0dURXAm7QiTRqUzuN0/SpuDMaM1YWefl5f6O.9C256hD/vO", // bcrypt hash for "admin123"
        role: "member",
        name: "Regular User"
      }
    ];

    // Find user by email
    const user = mockUsers.find(u => u.emailId === email);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if admin role is required (for admin login)
    if (requireAdmin && user.role !== 'admin') {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 })
    }

    // Check if user has a password set
    if (!user.password) {
      return NextResponse.json(
        { error: "Account exists but no password set. Please contact admin." },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT
    const token = await new SignJWT({
      id: user.id,
      email: user.emailId,
      role: user.role
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    // Create response with cookie
    const response = NextResponse.json({ success: true, role: user.role })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
