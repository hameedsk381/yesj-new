"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const defaultSlides = [
  {
    id: 1,
    image: "https://storage.googleapis.com/yesj/website/IMG_8159.JPG",
    title: "Accompaniment that stays with young people",
    description: "YESJ builds confidence, community, and concrete pathways for youth who are often left out of opportunity.",
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/yesj/website/IMG_6787.JPG",
    title: "Formation rooted in dignity and access",
    description: "From English immersion to leadership and scholarships, each program responds to a barrier that shapes real lives.",
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/yesj/website/IMG_5986.JPG",
    title: "Practical support across Andhra and Telangana",
    description: "Residential training, mentoring, volunteering, and community outreach help young people move with confidence into work and leadership.",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [slides, setSlides] = useState<any[]>(defaultSlides)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/api/homepage')
        if (res.ok) {
          const data = await res.json()
          if (data.hero && data.hero.length > 0) {
            setSlides(data.hero.map((item: any) => ({
              id: item.id,
              image: item.image?.url || item.image || "/placeholder.svg",
              title: item.title,
              description: item.description
            })))
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero slides', err)
      }
    }
    fetchHero()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), [])
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length), [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    setTouchStart(null)
  }

  return (
    <section
      aria-label="Featured images"
      className="relative w-full overflow-hidden bg-black h-[100svh] min-h-[560px] group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,10,7,0.76)_0%,rgba(14,10,7,0.56)_44%,rgba(14,10,7,0.18)_100%)] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,10,7,0.72),rgba(14,10,7,0.12)_34%,transparent_62%)] z-10 pointer-events-none" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-8 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto h-11 w-11 rounded-md border border-white/14 bg-black/18 text-white/78 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 hover:bg-black/30 hover:text-white sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto h-11 w-11 rounded-md border border-white/14 bg-black/18 text-white/78 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 hover:bg-black/30 hover:text-white sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center w-full">
        <div className="flex gap-2 rounded-md border border-white/12 bg-black/20 px-4 py-3 backdrop-blur-sm">
          {slides.map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrentSlide(i)}
               className={`h-1.5 rounded-full transition-all duration-300 ${
                 currentSlide === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/80"
               }`}
               aria-label={`Go to slide ${i + 1}`}
             />
          ))}
        </div>
      </div>
    </section>
  )
}
