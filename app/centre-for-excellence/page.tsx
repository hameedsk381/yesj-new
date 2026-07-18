import type { Metadata } from "next"
import CentreForExcellenceClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Centre for Excellence | YESJ Youth Hub",
  description: "YESJ's Centre for Excellence at Andhra Loyola College, Vijayawada. A dedicated space for youth training, leadership development, and community formation.",
  path: "/centre-for-excellence",
})

export default function CentreForExcellencePage() {
  return <CentreForExcellenceClientPage />
}
