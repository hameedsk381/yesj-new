import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "About YESJ - Our Story and Jesuit Foundation",
  description: "Learn about the Jesuit foundation of YESJ. Discover our story, the YES philosophy, and the principles guiding youth empowerment across Andhra Pradesh and Telangana since 2016.",
  path: "/about",
  keywords: ["YESJ History", "Jesuit Mission Telugu states", "Fr. Bala Bollineni SJ", "Ignatian Pedagogy", "Youth Philosophy YES"],
})

export default function AboutPage() {
  return <AboutClientPage />
}
