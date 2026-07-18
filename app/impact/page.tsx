import type { Metadata } from "next"
import ImpactClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Our Impact - 70,000+ Stories of Transformation",
  description: "See the measurable transformation achieved by YESJ. Explore success stories, statistics, and the reach of our youth empowerment initiatives across 15+ districts.",
  keywords: ["YESJ Success Stories", "Youth Impact Statistics India", "Social Change Telugu States", "NGO Impact Andhra Pradesh"],
  alternates: { canonical: `${siteConfig.url}/impact` },
  openGraph: {
    url: `${siteConfig.url}/impact`,
    title: "Our Impact - 70,000+ Stories of Transformation",
    description: "See the measurable transformation achieved by YESJ. Explore success stories, statistics, and the reach of our youth empowerment initiatives across 15+ districts.",
  },
}

export default function ImpactPage() {
  return <ImpactClientPage />
}
