import type { Metadata } from "next"
import DonateClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Donate - Support Youth Empowerment",
  description: "Invest in the future of marginalized youth. Your donations support Summer Shapes, SSP, and vocational training across Andhra and Telangana. 80G Tax Exempted.",
  keywords: ["Sponsor a student India", "Donate to Jesuit ministry", "80G Tax Exemption NGO", "Support rural youth education"],
}

export default function DonatePage() {
  return <DonateClientPage />
}
