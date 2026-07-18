import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "About YESJ - Our Story and Jesuit Foundation",
  description: "Learn about the Jesuit foundation of YESJ. Discover our story, the YES philosophy, and the principles guiding youth empowerment across Andhra Pradesh and Telangana since 2016.",
  keywords: ["YESJ History", "Jesuit Mission Telugu states", "Fr. Bala Bollineni SJ", "Ignatian Pedagogy", "Youth Philosophy YES"],
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    url: `${siteConfig.url}/about`,
    title: "About YESJ - Our Story and Jesuit Foundation",
    description: "Learn about the Jesuit foundation of YESJ. Discover our story, the YES philosophy, and the principles guiding youth empowerment across Andhra Pradesh and Telangana since 2016.",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
