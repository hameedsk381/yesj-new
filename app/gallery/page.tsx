import type { Metadata } from "next"
import GalleryClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Gallery - Moments of Transformation",
  description: "A visual journey through the impact of YESJ. See our youth in action across various programs, festivals, and leadership summits.",
  keywords: ["YESJ Images", "Youth Festival Gallery", "Jesuit Ministry Photos", "Empowerment Activites India"],
  alternates: { canonical: `${siteConfig.url}/gallery` },
  openGraph: {
    url: `${siteConfig.url}/gallery`,
    title: "Gallery - Moments of Transformation",
    description: "A visual journey through the impact of YESJ. See our youth in action across various programs, festivals, and leadership summits.",
  },
}

export default function GalleryPage() {
  return <GalleryClientPage />
}
