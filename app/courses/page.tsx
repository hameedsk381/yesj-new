import type { Metadata } from "next"
import CoursesClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Courses - YESJ",
  description: "Browse skill development courses offered by YESJ. AI for Kids, English Proficiency, Graphic Design and more for youth in Andhra Pradesh and Telangana.",
  alternates: { canonical: `${siteConfig.url}/courses` },
  openGraph: {
    title: "Courses - YESJ",
    description: "Skill development courses for youth empowerment.",
    url: `${siteConfig.url}/courses`,
    siteName: "YESJ",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses - YESJ",
    description: "Skill development courses for youth empowerment.",
  },
}

export default function CoursesPage() {
  return <CoursesClientPage />
}
