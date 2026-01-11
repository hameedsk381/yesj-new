"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Lightbox from "@/components/lightbox"
import { Maximize2, Camera, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const recentImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whatsp%20Image%202025-05-18%20at%204.58.11%20PM-tgCf7upklaBi6FE6Tryb4wOsB3jtlF.jpeg",
      alt: "YESJ Members with Indian Flag",
      description: "Celebrating patriotism with the Indian flag.",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%20205-05-18%20at%204.58.12%20PM-S6UFLR9WfDNY2GYgbyHyoFZPf0nLb1.jpeg",
      alt: "YESJ Women's Chapter Activity",
      description: "Women's chapter educational workshop.",
      span: "col-span-1"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%202025-05-18%20at%204.58.14%20PM-YG2rNq7sDeF58VRiPd4Y2L5djd3zuk.jpeg",
      alt: "YESJ Conference Participants",
      description: "Regional conference moments.",
      span: "col-span-1"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%202025-05-18%20at%204.58.34%20PM-HLAVJBLZoAml0R415IZITUC9Hqytuo.jpeg",
      alt: "YESJ Cultural Exhibition",
      description: "Andhra Pradesh chapter at a cultural exhibition.",
      span: "col-span-1"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-1%20at%204.58.35%20PM-Jr1kSptdYDYsgj17H7qYHTI1yVDvUB.jpeg",
      alt: "YESJ Campus Installation",
      description: "YESJ permanent installation on campus.",
      span: "col-span-1"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg",
      alt: "Youth Empowering Service Certificate Ceremony",
      description: "Certificate ceremony at Christmas event.",
      span: "md:col-span-2"
    }
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
        {/* Gallery Hero */}
        <section className="py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                Captured <span className="text-primary italic">YES.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                A visual journey through the moments that define our mission across Telugu heartlands.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </section>

        {/* Masonry Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
              {recentImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-[3rem] cursor-pointer shadow-lg border border-gray-100 ${image.span || ""}`}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    fill
                    alt={image.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="glass-card p-6 rounded-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Activity</p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{image.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button className="rounded-full bg-gray-900 hover:bg-black text-white px-10 h-16 text-xl font-bold flex items-center gap-3 group">
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Load More Memories
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Leadership", desc: "Forging the future stars of Andhra & Telangana.", count: 124 },
                { title: "Social Service", desc: "Being the hands and feet of change in villages.", count: 256 },
                { title: "Cultural", desc: "Celebrating the rich heritage of Telugu youth.", count: 89 }
              ].map((cat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-white rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                >
                  <h3 className="text-3xl font-black mb-4">{cat.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-8">{cat.desc}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-primary font-bold">{cat.count} Photos</span>
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

