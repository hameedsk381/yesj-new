import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import CentreForExcellenceClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Centre for Excellence | YESJ Youth Hub",
  description: "YESJ's Centre for Excellence at Andhra Loyola College, Vijayawada. A dedicated space for youth training, leadership development, and community formation.",
  alternates: { canonical: `${siteConfig.url}/centre-for-excellence` },
  openGraph: {
    url: `${siteConfig.url}/centre-for-excellence`,
    title: "Centre for Excellence | YESJ Youth Hub",
    description: "YESJ's Centre for Excellence at Andhra Loyola College, Vijayawada.",
  },
}

export default function CentreForExcellencePage() {
  return <CentreForExcellenceClientPage />
}
