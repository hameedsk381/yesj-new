import type { Metadata } from "next"
import ImpactClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Our Impact - 70,000+ Stories of Transformation",
  description: "See the measurable transformation achieved by YESJ. Explore success stories, statistics, and the reach of our youth empowerment initiatives across 15+ districts.",
  path: "/impact",
  keywords: ["YESJ Success Stories", "Youth Impact Statistics India", "Social Change Telugu States", "NGO Impact Andhra Pradesh"],
})

export default function ImpactPage() {
  return <ImpactClientPage />
}
