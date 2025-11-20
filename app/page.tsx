"use client"
import dynamic from "next/dynamic"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"

const AboutPreview = dynamic(() => import("@/components/home/about-preview"))
const MissionVision = dynamic(() => import("@/components/home/mission-vision"))
const ProgramsPreview = dynamic(() => import("@/components/home/programs-preview"))
const EventsPreview = dynamic(() => import("@/components/home/events-preview"))
const CentennialCelebration = dynamic(() => import("@/components/home/centennial-celebration"))
const GalleryPreview = dynamic(() => import("@/components/home/gallery-preview"))
const ContactPreview = dynamic(() => import("@/components/home/contact-preview"))
const NewsletterSection = dynamic(() => import("@/components/home/newsletter-section"))
const ImpactCounter = dynamic(() => import("@/components/home/impact-counter"))
const GetInvolved = dynamic(() => import("@/components/home/get-involved"))
const TransformationStories = dynamic(() => import("@/components/home/transformation-stories"))

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <HeroSection />
        <div className="w-100 h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src="quoates.jpg" 
            alt="Event Poster"
            className="w-full h-full object-contain"
            width={1200}
            height={600}
          />
        </div>
        <AboutPreview />
        <MissionVision />
        <ImpactCounter />
        <ProgramsPreview />
        <EventsPreview />
        <TransformationStories />
        <GetInvolved />
        <CentennialCelebration />
        <ContactPreview />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
