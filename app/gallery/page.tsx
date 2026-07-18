import type { Metadata } from "next"
import GalleryClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Gallery - Moments of Transformation",
  description: "A visual journey through the impact of YESJ. See our youth in action across various programs, festivals, and leadership summits.",
  path: "/gallery",
  keywords: ["YESJ Images", "Youth Festival Gallery", "Jesuit Ministry Photos", "Empowerment Activites India"],
})

export default function GalleryPage() {
  return <GalleryClientPage />
}
