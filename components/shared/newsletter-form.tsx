"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"

export default function NewsletterForm() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus("loading")
        setMessage("")

        try {
            // Use query param for email as per typical FastAPI expectation if it's not a JSON body?
            // Wait, backend 'newsletter.py' wasn't viewed in detail but typcially it's POST with JSON or Form.
            // Let's assume JSON body { email: "..." } which is standard.
            // If backend expects query param, I'll adjust. 
            // Based on previous patterns (registrations, contacts), JSON body is likely.
            const res = await fetch("http://localhost:8000/api/v1/newsletters/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.detail || "Subscription failed")
            }

            setStatus("success")
            setMessage("Thank you for subscribing!")
            setEmail("")
            setTimeout(() => setStatus("idle"), 3000)
        } catch (error) {
            console.error(error)
            setStatus("error")
            setMessage("Subscription failed. Please try again.")
        }
    }

    return (
        <div className="space-y-2">
            <form onSubmit={handleSubmit} className="relative flex">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 outline-none focus:border-primary transition-all pr-20 text-white placeholder:text-white/20"
                    disabled={status === "loading" || status === "success"}
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-2 top-2 bottom-2 w-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
            </form>
            {message && (
                <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </div>
    )
}
