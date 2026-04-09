"use client"

import { useState, useEffect } from "react"
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

  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery")
        if (res.ok) {
          const data = await res.json()
          const mapped = data.map((item: any) => ({
            src: item.imagePath || "/placeholder.svg",
            alt: item.title,
            description: item.description,
            span: "col-span-1" // Default span
          }))
          setImages(mapped)
        }
      } catch (e: any) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      <Header />
      <main className="flex-1">
        {/* Gallery Hero */}
        <section className="pt-32 py-16 lg:pt-36 lg:py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-md blur-[100px] -mr-48 -mt-48"></div>
        </section>

        {/* Masonry Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading gallery...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                  {images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className={`group relative overflow-hidden rounded-md cursor-pointer shadow-lg border border-gray-100 ${image.span || ""}`}
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={image.src}
                        fill
                        alt={image.alt}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />

                      {/* Glass Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          className="glass-card p-6 rounded-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Activity</p>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{image.description}</p>
                            </div>
                            <div className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
            )}

            {!loading && images.length > 0 && (
              <div className="mt-16 text-center">
                <Button className="rounded-md bg-gray-900 hover:bg-black text-white px-10 h-16 text-xl font-bold flex items-center gap-3 group">
                  <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Load More Memories
                </Button>
              </div>
            )}
            
            {!loading && images.length === 0 && (
                <div className="text-center py-20 text-gray-400">No photos in the gallery yet.</div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
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
                  className="p-10 bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
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
