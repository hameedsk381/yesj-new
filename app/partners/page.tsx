import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import PartnersClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Partners & Collaborators | YESJ",
  description: "Meet the organizations supporting YESJ's mission. Coromandel International, Deichman Foundation, NorthSouth Foundation, and more partners in youth empowerment.",
  alternates: { canonical: `${siteConfig.url}/partners` },
  openGraph: {
    url: `${siteConfig.url}/partners`,
    title: "Partners & Collaborators | YESJ",
    description: "Meet the organizations supporting YESJ's youth empowerment mission.",
  },
}

export default function PartnersPage() {
  return <PartnersClientPage />
}
