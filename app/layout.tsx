import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import SkipLink from "@/components/skip-link"
import GoogleAnalytics from "@/components/analytics"
import { siteConfig } from "@/lib/config"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL('https://yesj.in'),
  title: {
    default: "YESJ - Youth Empowering Service Jesuits",
    template: "%s | YESJ"
  },
  description:
    "Empowering 50,000+ youth across Telugu states to break barriers and build futures. Join YESJ to make a difference in your community.",
  keywords: ["YESJ", "Youth Empowering Service Jesuits", "Youth", "Service", "Jesuits", "Leadership", "Social Justice", "Volunteering", "Telugu States", "Transformation"],
  authors: [{ name: "YESJ Team" }],
  creator: "YESJ",
  publisher: "YESJ",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yesj.in",
    siteName: "YESJ",
    title: "YESJ - Youth Empowering Service Jesuits",
    description: "Empowering 50,000+ youth across Telugu states to break barriers and build futures. Join YESJ to make a difference.",
    images: [
      {
        url: "https://yesj.in/YESJ_Logo_Black-eaf43d27.png",
        width: 1200,
        height: 630,
        alt: "YESJ Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YESJ - Youth Empowering Service Jesuits",
    description: "Empowering 50,000+ youth across Telugu states to break barriers and build futures. Join YESJ to make a difference.",
    images: ["https://yesj.in/YESJ_Logo_Black-eaf43d27.png"],
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
    canonical: "https://yesj.in",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <GoogleAnalytics />
        <SkipLink />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
