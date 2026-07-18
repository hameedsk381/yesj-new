import type { Metadata } from "next"
import EchoesClientPage from "./client-page"
import { sharedMetadata } from "@/lib/seo"

export const metadata: Metadata = sharedMetadata({
  title: "YES-J Echoes - Publications & Resources",
  description: "Browse YES-J Echoes, the digital publication of YESJ. Download magazines, journals, and resources documenting youth empowerment across Andhra and Telangana.",
  path: "/echoes",
})

export default function EchoesPage() {
  return <EchoesClientPage />
}
