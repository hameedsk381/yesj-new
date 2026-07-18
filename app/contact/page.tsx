import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ContactClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Contact YESJ - Get in Touch",
  description: "Reach out to YESJ's Youth Centre for Excellence at Andhra Loyola College, Vijayawada. Call +91-868-672-7202 or email info@yesj.org.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    url: `${siteConfig.url}/contact`,
    title: "Contact YESJ - Get in Touch",
    description: "Reach out to YESJ's Youth Centre for Excellence at Andhra Loyola College, Vijayawada.",
  },
}

export default function ContactPage() {
  return <ContactClientPage />
}
