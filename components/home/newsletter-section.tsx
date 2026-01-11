"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

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

      setMessage({ type: "success", text: "Successfully joined the resonance!" })
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
    <section className="relative overflow-hidden py-24 bg-white" aria-labelledby="newsletter-heading">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-[3.5rem] p-12 md:p-20 bg-gray-50/50 border-gray-100 text-center space-y-8"
        >
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Join the <span className="text-secondary italic">Resonance.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
              Get monthly stories of transformation, program updates, and volunteer opportunities delivered with purpose to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your impact begins with an email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full h-16 bg-white border-2 border-transparent focus:border-primary rounded-3xl px-8 outline-none shadow-sm transition-all text-gray-900"
                  aria-required="true"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-16 rounded-3xl bg-primary hover:bg-primary/90 text-white px-8 font-bold text-lg shadow-xl shadow-primary/20 flex items-center gap-2 group shrink-0"
                aria-label={isSubmitting ? "Submitting your email" : "Subscribe to newsletter"}
              >
                {isSubmitting ? "Syncing..." : "Sync Now"}
                <Send className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? "animate-pulse" : ""}`} aria-hidden="true" />
              </Button>
            </div>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className={`text-sm mt-4 font-bold ${message.type === "success" ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {message.text}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
            NO SPAM. ONLY PURE IMPACT. UNFOLLOW ANYTIME.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
