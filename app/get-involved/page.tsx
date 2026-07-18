import { Metadata } from "next"
import GetInvolvedClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Get Involved & Support | YESJ",
  description: "Join the YES-J movement. Whether you want to volunteer, donate, partner as a corporate entity, or apply for our youth programs, there is a place for you here.",
  keywords: ["Volunteer YES-J", "Donate YES-J", "Support Jesuits in Andhra", "CSR Partnerships", "Youth Empowerment Volunteer"],
  alternates: { canonical: `${siteConfig.url}/get-involved` },
  openGraph: {
    url: `${siteConfig.url}/get-involved`,
    title: "Get Involved & Support | YESJ",
    description: "Join the YES-J movement. Whether you want to volunteer, donate, partner as a corporate entity, or apply for our youth programs.",
  },
}

export default function GetInvolvedPage() {
  return <GetInvolvedClientPage />
}
