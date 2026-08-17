"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { newsletters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(254),
})

export type NewsletterActionResult = {
  success: boolean
  message: string
  error?: string
}

export async function subscribeNewsletterAction(
  formData: FormData | { email: string }
): Promise<NewsletterActionResult> {
  const emailRaw = formData instanceof FormData ? formData.get("email") : formData.email

  const parsed = newsletterSchema.safeParse({ email: emailRaw })
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid email address",
      error: "VALIDATION_ERROR",
    }
  }

  const { email } = parsed.data

  try {
    const existing = await db.query.newsletters.findFirst({
      where: eq(newsletters.email, email),
    })

    if (existing) {
      return {
        success: true,
        message: "You are already subscribed to our newsletter.",
      }
    }

    await db.insert(newsletters).values({
      email,
      isActive: true,
    })

    revalidatePath("/")

    return {
      success: true,
      message: "Thank you for subscribing to YESJ updates!",
    }
  } catch (error) {
    console.error("Newsletter action error:", error)
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
      error: "SERVER_ERROR",
    }
  }
}
