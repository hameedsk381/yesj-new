"use client"

import { useState, type FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.details || payload.detail || payload.error || "Subscription failed")
      }

      setStatus("success")
      setMessage("Thank you for subscribing.")
      setEmail("")
      window.setTimeout(() => setStatus("idle"), 3000)
    } catch (error) {
      console.error(error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Subscription failed. Please try again.")
    }
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Label htmlFor="footer-newsletter-email" className="sr-only">
          Email address for newsletter
        </Label>
        <Input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          className="h-12 flex-1 rounded-full border-primary-foreground/30 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-2 focus-visible:ring-primary-foreground"
          disabled={status === "loading" || status === "success"}
          aria-invalid={status === "error"}
          aria-describedby={message ? "footer-newsletter-status" : undefined}
        />
        <Button
          type="submit"
          variant="accent"
          disabled={status === "loading" || status === "success"}
          className="h-12 rounded-full px-5 text-sm font-semibold"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Subscribe Now"}
        </Button>
      </form>

      {message ? (
        <div
          id="footer-newsletter-status"
          aria-live="polite"
          className={`text-sm font-medium ${status === "success" ? "text-primary-foreground" : "text-destructive"}`}
        >
          {message}
        </div>
      ) : null}
    </div>
  )
}
