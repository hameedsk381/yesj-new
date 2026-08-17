"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { subscribeNewsletterAction } from "@/app/actions/newsletter"

const newsletterPoints = [
  "Monthly stories of transformation",
  "Programme updates and announcements",
  "Volunteer and partnership opportunities",
]

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await subscribeNewsletterAction({ email })
      if (!result.success) {
        throw new Error(result.message)
      }

      setMessage({ type: "success", text: result.message })
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
    <section aria-labelledby="newsletter-heading" className="border-b border-border bg-background">
      <div className="container px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-md border border-border bg-card p-8 sm:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary uppercase tracking-widest">Stay in touch</p>
              <h2
                id="newsletter-heading"
                className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl font-serif"
              >
                Subscribe for steady updates, not noise.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                Stay connected to programme updates, stories of transformation, and practical ways
                to support youth across the region.
              </p>

              <ul className="grid gap-2 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                {newsletterPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-md border border-input bg-white px-4 outline-none transition-colors focus:border-primary"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="h-11 w-full sm:w-auto">
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </Button>

              {message ? (
                <p
                  role="alert"
                  className={`text-sm ${message.type === "success" ? "text-tertiary" : "text-destructive"}`}
                >
                  {message.text}
                </p>
              ) : null}

              <p className="text-xs text-muted-foreground">
                No spam. Only programme updates, stories, and ways to support the work.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
