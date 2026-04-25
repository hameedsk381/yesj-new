export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import crypto from "crypto"
import { db } from "@/lib/db"
import { summerCourseRegistrations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature")
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!signature || !secret) {
      return NextResponse.json({ error: "Signature or secret missing" }, { status: 400 })
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)
    console.log("Razorpay Webhook Event:", event.event)

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity
      const orderId = payment.order_id
      
      console.log("Payment Captured for Order:", orderId)
      
      // Update registration status in DB
      const result = await db.update(summerCourseRegistrations)
        .set({ 
          paymentStatus: "paid",
          razorpayPaymentId: payment.id,
          updatedAt: new Date()
        })
        .where(eq(summerCourseRegistrations.razorpayOrderId, orderId))

      // Fetch registration details to send email
      const registration = await db.query.summerCourseRegistrations.findFirst({
        where: eq(summerCourseRegistrations.razorpayOrderId, orderId)
      })

      if (registration) {
        try {
          const { sendEmail, getInvoiceEmail } = await import("@/lib/email")
          const emailHtml = getInvoiceEmail({
            studentName: registration.studentName,
            courseTitle: registration.courseTitle,
            amount: registration.amount,
            orderId: registration.razorpayOrderId || "N/A",
            paymentId: registration.razorpayPaymentId || "N/A",
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            paymentMode: registration.paymentMode
          })

          await sendEmail({
            to: registration.email,
            subject: `Payment Receipt: ${registration.courseTitle} - YESJ`,
            html: emailHtml
          })
          console.log("Invoice email sent to:", registration.email)
        } catch (emailError) {
          console.error("Failed to send invoice email:", emailError)
        }
      }
    }

    return NextResponse.json({ status: "ok" })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
