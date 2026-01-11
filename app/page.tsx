import type { Metadata } from "next"
import HomeClientPage from "./client-home"

export const metadata: Metadata = {
  title: "YESJ - Youth Empowering Service Jesuits | Official Website",
  description: "YESJ (Youth Empowering Service - Jesuits) empowers marginalized youth in Andhra Pradesh and Telangana through skill development, English immersion, and leadership programs. Join 50,000+ transformed lives.",
}

export default function HomePage() {
  return <HomeClientPage />
}
