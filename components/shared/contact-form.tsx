"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setSubmitSuccess(true)
    reset()
    setIsSubmitting(false)
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl bg-white/40 border-white/40"
    >
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
        <p className="text-gray-500 font-light">We love to hear from dreamers and doers.</p>
      </div>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 text-green-700 p-8 rounded-3xl text-center"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
          <p className="font-light">Your resonance has reached us. Expect a YES soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-4">Full Name</label>
              <input
                {...register("name")}
                className="w-full h-14 bg-white/50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 outline-none transition-all"
                placeholder="Ex. Rahul Kumar"
              />
              {errors.name && <p className="text-xs text-red-500 px-4">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-4">Email Address</label>
              <input
                {...register("email")}
                className="w-full h-14 bg-white/50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 outline-none transition-all"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 px-4">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-4">Subject</label>
            <input
              {...register("subject")}
              className="w-full h-14 bg-white/50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 outline-none transition-all"
              placeholder="How can we help you?"
            />
            {errors.subject && <p className="text-xs text-red-500 px-4">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-4">Your Message</label>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full bg-white/50 border-2 border-transparent focus:border-primary focus:bg-white rounded-[2rem] p-6 outline-none transition-all resize-none"
              placeholder="Tell us about your dreams or inquiry..."
            />
            {errors.message && <p className="text-xs text-red-500 px-4">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl text-lg font-bold border-none flex items-center gap-2 group"
          >
            {isSubmitting ? "Sending resonance..." : "Send Resonance"}
            <Send className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? "animate-pulse" : ""}`} />
          </Button>
        </form>
      )}
    </motion.div>
  )
}

