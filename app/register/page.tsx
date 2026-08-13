import { Metadata } from "next"
import RegisterClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Membership & Leadership Registration | YESJ",
  description: "Apply for YESJ membership or contest a leadership position. Join the Youth Empowering Service - Jesuits movement in Andhra Pradesh and Telangana.",
  path: "/register",
  keywords: ["YESJ membership", "YESJ registration", "Join YESJ", "YESJ leadership", "Youth Empowering Service Jesuits", "AICUF youth"],
})

export default function RegisterPage() {
  return <RegisterClientPage />
}