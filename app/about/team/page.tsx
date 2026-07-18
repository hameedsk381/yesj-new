import type { Metadata } from "next"
import TeamClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Team - Leadership & Founders | YESJ",
  description: "Meet the team behind YESJ. Learn about Fr. Bala Bollineni SJ, the founding director, and the dedicated staff driving youth empowerment across Andhra Pradesh and Telangana.",
  path: "/about/team",
})

export default function TeamPage() {
  return <TeamClientPage />
}
