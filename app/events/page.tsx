import type { Metadata } from "next"
import EventsClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Events & Youth Summits | YESJ",
  description: "Explore upcoming and past events organized by YESJ. Youth summits, formation camps, community gatherings, and leadership workshops across Andhra Pradesh and Telangana.",
  path: "/events",
})

export default function EventsPage() {
  return <EventsClientPage />
}
