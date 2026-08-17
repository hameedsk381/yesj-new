"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { contacts } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { checkRateLimit } from "@/lib/rate-limit"
import { RATE_LIMIT } from "@/lib/constants"

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(254),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
})

export type ContactActionResult = {
  success: boolean
  message: string
  error?: string
}

export async function submitContactAction(
  data: { name: string; email: string; subject?: string; message: string }
): Promise<ContactActionResult> {
  const reqHeaders = headers()
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    reqHeaders.get("x-real-ip") ||
    "unknown"

  const rateLimit = checkRateLimit(`contact:${ip}`, RATE_LIMIT.CONTACT)
  if (!rateLimit.success) {
    return {
      success: false,
      message: "Too many contact submissions. Please wait a few minutes before trying again.",
      error: "RATE_LIMITED",
    }
  }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid contact form input",
      error: "VALIDATION_ERROR",
    }
  }

  const { name, email, subject, message } = parsed.data

  try {
    await db.insert(contacts).values({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      status: "unread",
    })

    revalidatePath("/contact")

    return {
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon!",
    }
  } catch (error) {
    console.error("Contact form action error:", error)
    return {
      success: false,
      message: "An unexpected error occurred while sending your message. Please try again.",
      error: "SERVER_ERROR",
    }
  }
}
