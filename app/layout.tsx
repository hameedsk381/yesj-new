import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import SkipLink from "@/components/skip-link"
import GoogleAnalytics from "@/components/analytics"
import { siteConfig } from "@/lib/config"
import ChatWidget from "@/components/chat/chat-widget"
import PageTransition from "@/components/layout/page-transition"
import ScrollToTop from "@/components/layout/scroll-to-top"

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata = {
  title: {
    default: "YESJ - Youth Empowering Service Jesuits",
    template: "%s | YESJ - Youth Empowering Service Jesuits"
  },
  description:
    "Official website of YESJ (Youth Empowering Service - Jesuits). Empowering marginalized youth in Andhra Pradesh and Telangana through skill development, English immersion, and leadership programs since 2016.",
  keywords: [
    "YESJ",
    "Youth Empowering Service Jesuits",
    "Andhra Jesuit Province",
    "Summer Shapes Program",
    "Each One Teach Ten",
    "Scholar Support Programme SSP",
    "Personality Enhancement Programme PEP",
    "MAGIC Youth",
    "Jesuit Youth Ministry India",
    "Youth Empowerment Telangana",
    "Andhra Pradesh Youth Development",
    "Vocational Training for Dropouts",
    "Ignatian Spirituality Youth",
    "Jesuits Andhra Telangana",
    "Youth Leadership Training"
  ],
  authors: [{ name: "YESJ Team" }],
  creator: "YESJ",
  publisher: "YESJ",
  category: "Non-profit Organization",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "YESJ",
    title: "YESJ - Empowering Youth for Radical Transformation",
    description: "Empowering 55,000+ youth across Andhra and Telangana. Join the YESJ movement through Summer Shapes, SSP, and vocational training.",
    images: [
      {
        url: `${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`,
        width: 1200,
        height: 630,
        alt: "YESJ Logo - Youth Empowering Service Jesuits"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YESJ - Youth Empowering Service Jesuits",
    description: "Transforming young lives in Telugu states through education, skills, and faith formation.",
    images: [`${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: siteConfig.verification.google,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NonProfitOrganization",
  "name": "YESJ - Youth Empowering Service Jesuits",
  "alternateName": "Youth Empowering Service - Jesuits",
  "url": "https://yesj.in",
  "logo": "https://yesj.in/YESJ_Logo_Black-eaf43d27.png",
  "description": "YESJ is a ministry of the Andhra Jesuit Province dedicated to empowering young people in Telangana and Andhra Pradesh through education and skill training.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vijayawada",
    "addressRegion": "Andhra Pradesh",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-886-672-7202",
    "contactType": "customer service",
    "email": "info@yesj.org"
  },
  "sameAs": [
    "https://instagram.com/yesj.official",
    "https://facebook.com/yesj.official",
    "https://twitter.com/yesj.official",
    "https://youtube.com/yesj.official"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <SkipLink />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <PageTransition>
              {children}
            </PageTransition>
            <ScrollToTop />

            <ChatWidget />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
