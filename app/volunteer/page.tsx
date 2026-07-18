import type { Metadata } from "next"
import VolunteerClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Volunteer - Give Your Time & Skills | YESJ",
  description: "Join YESJ as a volunteer. Contribute to youth empowerment through camps, events, mentorship, and community programs across Andhra Pradesh and Telangana.",
  path: "/volunteer",
})

export default function VolunteerPage() {
  return <VolunteerClientPage />
}
