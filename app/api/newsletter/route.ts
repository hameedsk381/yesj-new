import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"
import { sanitizeEmail } from "@/lib/sanitize"
import { RATE_LIMIT } from "@/lib/constants"
import { logger } from "@/lib/logger"
import { sendEmail, getNewsletterWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    
    const rateLimitResult = checkRateLimit(`newsletter:${ip}`, RATE_LIMIT.NEWSLETTER)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many subscription attempts. Please try again later.",
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    const data = await request.json()
    const email = sanitizeEmail(data.email || '')

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      )
    }

    console.log("Newsletter subscription:", {
      email,
      timestamp: new Date().toISOString(),
    })

    // Send welcome email
    const emailHtml = getNewsletterWelcomeEmail(email)
    
    await sendEmail({
      to: email,
      subject: 'Welcome to APTSAICUF Newsletter',
      html: emailHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      email,
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      }
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to subscribe to newsletter",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
