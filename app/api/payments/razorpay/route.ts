export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { z } from "zod"
import { db } from "@/lib/db"
import { summerCourseRegistrations } from "@/lib/db/schema"
import { computeServerAmount } from "@/lib/courses"
import { checkRateLimit } from "@/lib/rate-limit"
import { RATE_LIMIT } from "@/lib/constants"

const registrationSchema = z.object({
  studentName: z.string().trim().min(1).max(120),
  parentName: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().min(7).max(20),
  age: z.coerce.number().int().min(3).max(99),
  course: z.string().trim().min(1).max(50),
  courseTitle: z.string().trim().min(1).max(200),
  batch: z.string().trim().min(1).max(50),
  paymentMode: z.enum(["full", "advance"]),
})

const bodySchema = z.object({
  currency: z.literal("INR").optional().default("INR"),
  receipt: z.string().trim().max(40).optional(),
  registrationData: registrationSchema,
})

function getClientId(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    console.error("Razorpay credentials are not configured")
    return NextResponse.json({ error: "Payment unavailable" }, { status: 503 })
  }

  const limit = checkRateLimit(`razorpay:${getClientId(req)}`, RATE_LIMIT.REGISTRATION)
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const parsed = bodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const { currency, receipt, registrationData } = parsed.data

    const priced = computeServerAmount(registrationData.course, registrationData.paymentMode)
    if (!priced) {
      return NextResponse.json({ error: "Unknown course" }, { status: 400 })
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })

    const order = await razorpay.orders.create({
      amount: priced.amount * 100, // paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    })

    await db.insert(summerCourseRegistrations).values({
      studentName: registrationData.studentName,
      parentName: registrationData.parentName,
      email: registrationData.email,
      phone: registrationData.phone,
      age: registrationData.age,
      courseId: registrationData.course,
      courseTitle: priced.course.title, // server-authoritative
      batch: registrationData.batch,
      paymentMode: registrationData.paymentMode,
      amount: priced.amount,
      razorpayOrderId: order.id,
      paymentStatus: "pending",
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
