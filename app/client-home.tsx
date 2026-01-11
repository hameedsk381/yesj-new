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
        <ImpactCounter />
        <TransformationStories />
        <GetInvolved />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Resonating <span className="text-primary italic">Hope</span></h2>
            <p className="text-center text-gray-500 mb-16 text-xl font-light">Stay connected with our latest programs, stories, and impact</p>
            <LatestNews />
          </div>
        </section>
        <Collaborators />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}

