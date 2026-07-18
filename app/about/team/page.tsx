import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import TeamClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Team - Leadership & Founders | YESJ",
  description: "Meet the team behind YESJ. Learn about Fr. Bala Bollineni SJ, the founding director, and the dedicated staff driving youth empowerment across Andhra Pradesh and Telangana.",
  alternates: { canonical: `${siteConfig.url}/about/team` },
  openGraph: {
    url: `${siteConfig.url}/about/team`,
    title: "Team - Leadership & Founders | YESJ",
    description: "Meet the team behind YESJ. Learn about Fr. Bala Bollineni SJ and the dedicated staff driving youth empowerment.",
  },
}

export default function TeamPage() {
  return <TeamClientPage />
}
