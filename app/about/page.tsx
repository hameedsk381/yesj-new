import type { Metadata } from "next"
import AboutClientPage from "./client-page"

export const metadata: Metadata = {
  title: "About YESJ - Our Story and Jesuit Foundation",
  description: "Learn about the radical love and theological foundation of YESJ. Discover our story, the YES philosophy, and the Ignatian pillars that guide our youth empowerment mission since 2015.",
  keywords: ["YESJ History", "Jesuit Mission Telugu states", "Fr. Bala Bollineni SJ", "Ignatian Pedagogy", "Youth Philosophy YES"],
}

export default function AboutPage() {
  return <AboutClientPage />
}
