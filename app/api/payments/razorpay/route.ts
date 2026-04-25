export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { db } from "@/lib/db"
import { summerCourseRegistrations } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "dummy", // Fallback to dummy so it doesn't crash if env is somehow missing momentarily
      key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy",
    })

    const { amount, currency, receipt, registrationData } = await req.json()

    if (!amount || !currency || !registrationData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const options = {
      amount: Math.round(amount * 100), // Ensure it's an integer
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    // Save registration as pending in DB
    await db.insert(summerCourseRegistrations).values({
      studentName: registrationData.studentName,
      parentName: registrationData.parentName,
      email: registrationData.email,
      phone: registrationData.phone,
      age: parseInt(registrationData.age),
      courseId: registrationData.course,
      courseTitle: registrationData.courseTitle,
      batch: registrationData.batch,
      paymentMode: registrationData.paymentMode,
      amount: amount,
      razorpayOrderId: order.id,
      paymentStatus: "pending",
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 })
  }
}
