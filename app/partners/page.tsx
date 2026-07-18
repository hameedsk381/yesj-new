import type { Metadata } from "next"
import PartnersClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "Partners & Collaborators | YESJ",
  description: "Meet the organizations supporting YESJ's mission. Coromandel International, Deichman Foundation, NorthSouth Foundation, and more partners in youth empowerment.",
  path: "/partners",
})

export default function PartnersPage() {
  return <PartnersClientPage />
}
