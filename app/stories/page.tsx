import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import StoriesClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Stories - Voices of Transformation | YESJ",
  description: "Read inspiring stories of youth whose lives have been transformed by YESJ's programs. Testimonials, case studies, and personal journeys from Andhra Pradesh and Telangana.",
  alternates: { canonical: `${siteConfig.url}/stories` },
  openGraph: {
    url: `${siteConfig.url}/stories`,
    title: "Stories - Voices of Transformation | YESJ",
    description: "Read inspiring stories of youth whose lives have been transformed by YESJ's programs.",
  },
}

export default function StoriesPage() {
  return <StoriesClientPage />
}
