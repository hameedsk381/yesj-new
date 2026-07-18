import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import VolunteerClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Volunteer - Give Your Time & Skills | YESJ",
  description: "Join YESJ as a volunteer. Contribute to youth empowerment through camps, events, mentorship, and community programs across Andhra Pradesh and Telangana.",
  alternates: { canonical: `${siteConfig.url}/volunteer` },
  openGraph: {
    url: `${siteConfig.url}/volunteer`,
    title: "Volunteer - Give Your Time & Skills | YESJ",
    description: "Join YESJ as a volunteer and contribute to youth empowerment across Andhra Pradesh and Telangana.",
  },
}

export default function VolunteerPage() {
  return <VolunteerClientPage />
}
