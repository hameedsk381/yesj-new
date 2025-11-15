import { NextRequest, NextResponse } from "next/server"
import { initiatePayment } from "@/lib/payment"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { amount, name, email, phone, description, eventId } = data

    if (!amount || !name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const result = await initiatePayment({
      amount: parseFloat(amount),
      name,
      email,
      phone,
      description: description || 'Event Registration',
      eventId,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to initiate payment",
        },
        { status: 500 }
      )
    }

    logger.info("Payment order created", {
      orderId: result.orderId,
      amount,
      email,
    })

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
    })
  } catch (error) {
    logger.error("Payment API error", {
      error: error instanceof Error ? error.message : "Unknown error",
    }, error as Error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process payment request",
      },
      { status: 500 }
    )
  }
}
