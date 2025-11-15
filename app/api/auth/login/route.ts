import { NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "default-token-change-this"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 }
      )
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      logger.info("Admin login successful", { username })

      return NextResponse.json({
        success: true,
        token: ADMIN_TOKEN,
        user: {
          username,
          role: "admin",
        },
      })
    }

    logger.warn("Admin login failed - invalid credentials", { username })

    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials",
      },
      { status: 401 }
    )
  } catch (error) {
    logger.error("Admin login error", {}, error as Error)

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      { status: 500 }
    )
  }
}
