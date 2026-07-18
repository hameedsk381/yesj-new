import type { Metadata } from "next"
import ProgramsClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Empowerment Programs - Summer Shapes, MuST, & SSP",
  description: "Explore YESJ's 10+ pathways to transformation. From English immersion in 'Summer Shapes' to vocational training and 'Each One - Teach Ten' learning centers.",
  path: "/programs",
  keywords: ["Summer Shapes English Program", "Vocational Training Andhra", "Scholar Support Programme", "Skill Development for Youth", "Free Residential Training"],
})

export default function ProgramsPage() {
  return <ProgramsClientPage />
}
