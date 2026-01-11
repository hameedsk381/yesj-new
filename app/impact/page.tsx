import type { Metadata } from "next"
import ImpactClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Our Impact - 55,000+ Stories of Transformation",
  description: "See the measurable transformation achieved by YESJ. Explore success stories, statistics, and the reach of our youth empowerment initiatives across 15+ districts.",
  keywords: ["YESJ Success Stories", "Youth Impact Statistics India", "Social Change Telugu States", "NGO Impact Andhra Pradesh"],
}

export default function ImpactPage() {
  return <ImpactClientPage />
}
