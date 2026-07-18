import type { Metadata } from "next"
import ProgramsClientPage from "./client-page"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Empowerment Programs - Summer Shapes, MuST, & SSP",
  description: "Explore YESJ's 10+ pathways to transformation. From English immersion in 'Summer Shapes' to vocational training and 'Each One - Teach Ten' learning centers.",
  keywords: ["Summer Shapes English Program", "Vocational Training Andhra", "Scholar Support Programme", "Skill Development for Youth", "Free Residential Training"],
  alternates: { canonical: `${siteConfig.url}/programs` },
  openGraph: {
    url: `${siteConfig.url}/programs`,
    title: "Empowerment Programs - Summer Shapes, MuST, & SSP",
    description: "Explore YESJ's 10+ pathways to transformation. From English immersion in 'Summer Shapes' to vocational training and 'Each One - Teach Ten' learning centers.",
  },
}

export default function ProgramsPage() {
  return <ProgramsClientPage />
}
