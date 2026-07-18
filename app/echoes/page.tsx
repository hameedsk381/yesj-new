import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import EchoesClientPage from "./client-page"

export const metadata: Metadata = {
  title: "YES-J Echoes - Publications & Resources",
  description: "Browse YES-J Echoes, the digital publication of YESJ. Download magazines, journals, and resources documenting youth empowerment across Andhra and Telangana.",
  alternates: { canonical: `${siteConfig.url}/echoes` },
  openGraph: {
    url: `${siteConfig.url}/echoes`,
    title: "YES-J Echoes - Publications & Resources",
    description: "Browse YES-J Echoes, the digital publication of YESJ.",
  },
}

export default function EchoesPage() {
  return <EchoesClientPage />
}
