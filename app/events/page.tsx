import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import EventsClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Events & Youth Summits | YESJ",
  description: "Explore upcoming and past events organized by YESJ. Youth summits, formation camps, community gatherings, and leadership workshops across Andhra Pradesh and Telangana.",
  alternates: { canonical: `${siteConfig.url}/events` },
  openGraph: {
    url: `${siteConfig.url}/events`,
    title: "Events & Youth Summits | YESJ",
    description: "Explore upcoming and past events organized by YESJ. Youth summits, formation camps, and leadership workshops.",
  },
}

export default function EventsPage() {
  return <EventsClientPage />
}
