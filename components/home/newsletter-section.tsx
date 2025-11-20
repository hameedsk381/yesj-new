"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to subscribe")
      }

      setMessage({ type: "success", text: "Thank you for subscribing!" })
      setEmail("")
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="w-full py-20 md:py-32 bg-blue-50">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-light tracking-tighter md:text-4xl/tight text-primary">Stay Connected</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
            Monthly YESJ Newsletter: Transformation stories, Program updates, Volunteer opportunities, Ways to get involved
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-sm space-y-2"
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:opacity-50"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="rounded-none bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </form>
          {message && (
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
          <p className="text-xs text-muted-foreground font-extralight">
            Never miss a story. Subscribe for monthly inspiration delivered to your inbox.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
