"use client"

import dynamic from "next/dynamic"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"
import NotificationBar from "@/components/layout/notification-bar"
import WelcomeSection from "@/components/home/welcome-section"

const ImpactCounter = dynamic(() => import("@/components/home/impact-counter"))
const ProgramsPreview = dynamic(() => import("@/components/home/programs-preview"))
const TransformationStories = dynamic(() => import("@/components/home/transformation-stories"))
const GetInvolved = dynamic(() => import("@/components/home/get-involved"))
const LatestNews = dynamic(() => import("@/components/home/newsletter-section"))
const Collaborators = dynamic(() => import("@/components/home/collaborators"))
const FooterCTA = dynamic(() => import("@/components/home/footer-cta"))

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <HeroSection />
        <WelcomeSection />
        <ProgramsPreview />
        <ImpactCounter />
        <TransformationStories />
        <GetInvolved />
        <LatestNews />
        <Collaborators />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}

