import type { Metadata } from "next"
import ProgramsClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Empowerment Programs - Summer Shapes, MuST, & SSP",
  description: "Explore YESJ's 10+ pathways to transformation. From English immersion in 'Summer Shapes' to vocational training and 'Each One - Teach Ten' learning centers.",
  keywords: ["Summer Shapes English Program", "Vocational Training Andhra", "Scholar Support Programme", "Skill Development for Youth", "Free Residential Training"],
}

export default function ProgramsPage() {
  return <ProgramsClientPage />
}
