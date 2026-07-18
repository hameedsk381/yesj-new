import type { Metadata } from "next"
import StoriesClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Stories - Voices of Transformation | YESJ",
  description: "Read inspiring stories of youth whose lives have been transformed by YESJ's programs. Testimonials, case studies, and personal journeys from Andhra Pradesh and Telangana.",
  path: "/stories",
})

export default function StoriesPage() {
  return <StoriesClientPage />
}
