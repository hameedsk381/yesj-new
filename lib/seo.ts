import { siteConfig } from "./config"
import type { Metadata } from "next"

export function sharedMetadata(page: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const url = `${siteConfig.url}${page.path}`
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: "YESJ",
      title: page.title,
      description: page.description,
      images: [
        {
          url: `${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`,
          width: 1200,
          height: 630,
          alt: "YESJ Logo - Youth Empowering Service Jesuits",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`],
    },
  }
}
