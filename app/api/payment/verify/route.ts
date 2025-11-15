import { NextRequest, NextResponse } from "next/server"
import { verifyPayment } from "@/lib/payment"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { orderId, paymentId, signature } = data

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const isValid = await verifyPayment(orderId, paymentId, signature)

    if (!isValid) {
      logger.warn("Payment verification failed", {
        orderId,
        paymentId,
      })

      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 }
      )
    }

    logger.info("Payment verified successfully", {
      orderId,
      paymentId,
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    })
  } catch (error) {
    logger.error("Payment verification API error", {
      error: error instanceof Error ? error.message : "Unknown error",
    }, error as Error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment",
      },
      { status: 500 }
    )
  }
}
