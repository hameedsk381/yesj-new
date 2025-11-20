"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import Image from "next/image"
import Lightbox from "@/components/lightbox"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const recentImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whatsp%20Image%202025-05-18%20at%204.58.11%20PM-tgCf7upklaBi6FE6Tryb4wOsB3jtlF.jpeg",
      alt: "YESJ Members with Indian Flag",
      description: "YESJ Members celebrating patriotism with the Indian flag",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%20205-05-18%20at%204.58.12%20PM-S6UFLR9WfDNY2GYgbyHyoFZPf0nLb1.jpeg",
      alt: "YESJ Women's Chapter Activity",
      description: "Women's chapter members participating in an educational workshop",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%202025-05-18%20at%204.58.14%20PM-YG2rNq7sDeF58VRiPd4Y2L5djd3zuk.jpeg",
      alt: "YESJ Conference Participants",
      description: "Regional conference participants with faculty and spiritual leaders",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%202025-05-18%20at%204.58.34%20PM-HLAVJBLZoAml0R415IZITUC9Hqytuo.jpeg",
      alt: "YESJ Cultural Exhibition",
      description: "Andhra Pradesh chapter members at a cultural food exhibition",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-1%20at%204.58.35%20PM-Jr1kSptdYDYsgj17H7qYHTI1yVDvUB.jpeg",
      alt: "YESJ Campus Installation",
      description: "YESJ permanent installation on campus grounds",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg",
      alt: "Youth Empowering Service Certificate Ceremony",
      description: "Students receiving certificates at YES-J Christmas event",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-19-eN65t7FeFIU0KHZvHfMQcBg0iakwXI.jpeg",
      alt: "YESJ Women's Chapter",
      description: "Women's chapter members with faculty and spiritual leaders",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-05-18%20at%204.58.08%20PM-igdHve2uOiZdR0qGHkZVQ5QU2irlwr.jpeg",
      alt: "Joseph's College YESJ Chapter",
      description: "YESJ members at Joseph's College for Women receiving recognition",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.1-laM6KEOcXevAzwId6tbkOQDE3y0KMn.jpeg",
      alt: "YESJ Anti-Drug Campaign",
      description: "YESJ members participating in #DRUGFREE365 awareness campaign",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.08%20PM-jEtMoapURWvv8VFzvHmhIQkMrXDzcH.jpeg",
      alt: "YESJ Cultural Performance",
      description: "YESJ members performing at VASUDHAIVA 25 in Hyderabad",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acuf4-Fa4YLR8Do4Mw1Kn6012WGzUdUhwR6p.jpeg",
      alt: "YESJ Award Ceremony",
      description: "Award Ceremony at Andhra Loyola College MAGIS & YESJ Units",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf5-bkf0Kxo0FK4XG4BNigyOZ3l0EinUE2.jpeg",
      alt: "YESJ Flood Relief Efforts",
      description: "YESJ Members Participating in Flood Relief Efforts",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf3-5T4TaAUggVZTsz5PYecfwwkkdgt1xe.jpeg",
      alt: "YESJ Student Awareness Campaign",
      description: "Student Awareness Campaign and Creative Expressions",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf6-ctYtO69Jfm5By78MTGHzT7gO2SoU54.jpeg",
      alt: "YESJ Members Group Photo",
      description: "YESJ Regional Conference Group Photo",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf2-xbFCelykLM73SyDcujcgpNHQGKgwGu.jpeg",
      alt: "YESJ Flag Raising Ceremony",
      description: "YESJ Flag Raising Ceremony with Student Members",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf1-owoq2CuFOpRHrTCHMmVcaJl9tmK08g.jpeg",
      alt: "YESJ Centenary Display",
      description: "YESJ Marching Into Centenary - 100 Years Photo Display",
    },
  ]

  const categories = [
    { id: "leadership", title: "Leadership Development", description: "Photos from our leadership training programs" },
    {
      id: "social",
      title: "Social Service",
      description: "Our members engaged in community service and social action",
    },
    {
      id: "cultural",
      title: "Cultural Activities",
      description: "Performances and cultural events organized by YESJ",
    },
  ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Lightbox
        images={recentImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      <Header />
      <main className="flex-1">
        <PageHeader title="Photo Gallery" description="Glimpses of our activities and events over the years." />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Recent Activities"
              description="Photos from our most recent events and initiatives"
              subtitle="2024-2025"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={image.alt}
                    className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-light">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {categories.map((category) => (
          <section
            key={category.id}
            className={`w-full py-12 md:py-20 ${category.id === "social" ? "bg-blue-50" : "bg-white"}`}
          >
            <div className="container px-4 md:px-6">
              <SectionHeader title={category.title} description={category.description} subtitle="YESJ in Action" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="group relative overflow-hidden">
                    <Image
                      src={`/${category.id}-${num}.png`}
                      width={300}
                      height={300}
                      alt={`${category.title} Image ${num}`}
                      className="aspect-square object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-light">YESJ {category.title} Initiative</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
