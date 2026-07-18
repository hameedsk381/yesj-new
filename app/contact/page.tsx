import type { Metadata } from "next"
import ContactClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Contact YESJ - Get in Touch",
  description: "Reach out to YESJ's Youth Centre for Excellence at Andhra Loyola College, Vijayawada. Call +91-868-672-7202 or email info@yesj.org.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactClientPage />
}
