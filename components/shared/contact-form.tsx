"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const programLabels: Record<string, string> = {
  pep: "PEP",
  magic: "MAGIC",
  must: "MuST",
  "summer-shapes": "Summer Shapes",
  ssp: "SSP",
  "joy-desk": "JoY Desk",
  vip: "VIP",
  "compassion-connect": "Compassion Connect",
  sthri: "STHRI",
  ogod: "O GOD",
  magis: "MAGIS / Yuvotsavaalu",
  eott: "Each One Teach Ten",
}

function formatQueryValue(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function buildPrefill(searchParams: ReturnType<typeof useSearchParams>) {
  const subject = searchParams.get("subject")?.trim()
  const program = searchParams.get("program")?.trim()
  const type = searchParams.get("type")?.trim()
  const topic = searchParams.get("topic")?.trim()
  const area = searchParams.get("area")?.trim()

  const programLabel = program ? programLabels[program] ?? formatQueryValue(program) : null
  const contextBits = [type, topic, area].filter(Boolean).map((item) => formatQueryValue(item as string))

  const resolvedSubject =
    subject ||
    (programLabel
      ? `Program Inquiry: ${programLabel}${contextBits.length ? ` - ${contextBits.join(" / ")}` : ""}`
      : "")

  const resolvedMessage =
    programLabel || subject
      ? [
          "Hello YES-J team,",
          "",
          programLabel ? `I am reaching out regarding ${programLabel}.` : "I would like to get in touch.",
          contextBits.length ? `Context: ${contextBits.join(", ")}.` : null,
          "",
          "Please share the next steps.",
        ]
          .filter(Boolean)
          .join("\n")
      : ""

  return {
    label: subject || programLabel || "",
    subject: resolvedSubject,
    message: resolvedMessage,
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const searchParams = useSearchParams()
  const prefill = buildPrefill(searchParams)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    if (prefill.subject && !getValues("subject")) {
      setValue("subject", prefill.subject)
    }

    if (prefill.message && !getValues("message")) {
      setValue("message", prefill.message)
    }
  }, [getValues, prefill.message, prefill.subject, setValue])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.details || payload?.error || "Failed to send message")
      }

      setSubmitSuccess(true)
      reset()
      window.setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to send message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card rounded-md p-8 md:p-12 shadow-2xl bg-white/40 border-white/40"
    >
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
        <p className="text-muted-foreground font-light">We love to hear from dreamers and doers.</p>
        {prefill.label ? (
          <p className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
            Request context detected: {prefill.label}
          </p>
        ) : null}
      </div>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 text-primary p-8 rounded-md text-center"
          aria-live="polite"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary" aria-hidden="true" />
          <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
          <p className="font-light">Your message has reached us. Expect a response soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="h-12 bg-background/70"
                placeholder="Ex. Rahul Kumar"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-xs text-destructive px-2" role="alert">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="h-12 bg-background/70"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive px-2" role="alert">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
              Subject
            </Label>
            <Input
              id="subject"
              {...register("subject")}
              className="h-12 bg-background/70"
              placeholder="How can we help you?"
              aria-invalid={!!errors.subject}
            />
            {errors.subject && <p className="text-xs text-destructive px-2" role="alert">{errors.subject.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
              Your Message
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              rows={5}
              className="bg-background/70 resize-none"
              placeholder="Tell us about your dreams or inquiry..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-xs text-destructive px-2" role="alert">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-14 mt-4 rounded-md bg-primary hover:bg-primary/90 text-white shadow-xl text-base font-semibold border-none flex items-center justify-center gap-2 group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {isSubmitting ? "Sending message..." : "Send Message"}
            <Send className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? "animate-pulse" : ""} motion-reduce:transition-none motion-reduce:transform-none`} aria-hidden="true" />
          </Button>
          {submitError ? (
            <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {submitError}
            </p>
          ) : null}
        </form>
      )}
    </motion.div>
  )
}

