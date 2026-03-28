import { Metadata } from "next"
import MediaClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Media & Echoes | YESJ Digital Wing",
  description: "Explore the YESJ Digital Media Wing including Youth Blaze, PEP Pause, and YES-J Echoes. Engaging youth through modern media channels.",
  keywords: ["Youth Blaze", "PEP Pause", "YES-J Echoes", "Jesuit Youth Media", "Social Consciousness Videos"],
}

export default function MediaPage() {
  return <MediaClientPage />
}
