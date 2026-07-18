import type { Metadata } from "next"
import HomeClientPage from "./client-home"

export const metadata: Metadata = {
  title: "YESJ - Youth Empowering Service Jesuits | Official Website",
  description: "YESJ (Youth Empowering Service - Jesuits) empowers marginalized youth in Andhra Pradesh and Telangana through skill development, English immersion, and leadership programs. Join 70,000+ transformed lives.",
  alternates: { canonical: "https://yesj.org" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yesj.org",
    siteName: "YESJ",
    title: "YESJ - Youth Empowering Service Jesuits | Official Website",
    description: "YESJ (Youth Empowering Service - Jesuits) empowers marginalized youth in Andhra Pradesh and Telangana through skill development, English immersion, and leadership programs. Join 70,000+ transformed lives.",
    images: [
      {
        url: "https://yesj.org/YESJ_Logo_Black-eaf43d27.png",
        width: 1200,
        height: 630,
        alt: "YESJ Logo - Youth Empowering Service Jesuits"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YESJ - Youth Empowering Service Jesuits | Official Website",
    description: "YESJ (Youth Empowering Service - Jesuits) empowers marginalized youth in Andhra Pradesh and Telangana through skill development, English immersion, and leadership programs. Join 70,000+ transformed lives.",
    images: ["https://yesj.org/YESJ_Logo_Black-eaf43d27.png"],
  },
}

export default function HomePage() {
  return <HomeClientPage />
}
