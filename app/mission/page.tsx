import type { Metadata } from "next"
import MissionClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Mission & Vision - The YES Identity",
  description: "Discover the SEE-JUDGE-ACT methodology of YESJ. Our vision is a just and humane world where every young person has the resources to thrive.",
  keywords: ["See Judge Act Methodology", "Jesuit Youth Vision", "Social commitment youth", "Andhra Loyola College YESJ"],
  alternates: { canonical: `${siteConfig.url}/mission` },
  openGraph: {
    url: `${siteConfig.url}/mission`,
    title: "Mission & Vision - The YES Identity",
    description: "Discover the SEE-JUDGE-ACT methodology of YESJ. Our vision is a just and humane world where every young person has the resources to thrive.",
  },
}

export default function MissionPage() {
  return <MissionClientPage />
}
