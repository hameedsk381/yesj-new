"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    tag: "Youth Empowering Service - Jesuits",
    title: "We Say YES When the World Says No.",
    desc: "Empowering underprivileged youth across Andhra Pradesh & Telangana through education, skills, faith, and dignity — since 2016.",
    image: "/website/IMG_8159.JPG",
    accent: "text-primary",
  },
  {
    id: 2,
    tag: "Summer Shapes",
    title: "English Immersion. Character Growth.",
    desc: "Our 30-day residential program for degree students builds confidence, communication, and a vision for the future.",
    image: "/website/IMG_6787.JPG",
    accent: "text-primary",
  },
  {
    id: 3,
    tag: "MuST & Vocational",
    title: "Skills that Empower. Careers that Last.",
    desc: "From driving and hospitality to nursing and vocational training, we bridge the gap between potential and employment.",
    image: "/website/IMG_5986.JPG",
    accent: "text-accent",
  },
  {
    id: 4,
    tag: "Scholar Support (SSP)",
    title: "No Dream Should Die for Lack of Funding.",
    desc: "Supporting talented rural students through higher education with scholarships, mentorship, and accompaniment.",
    image: "/website/IMG_7254.JPG",
    accent: "text-secondary",
  },
]

const heroStats = [
  { value: "50,000+", label: "young people reached" },
  { value: "12", label: "active programmes" },
  { value: "2", label: "states served" },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section aria-labelledby="hero-heading" className="relative h-screen min-h-[700px] w-full overflow-hidden bg-gray-950 bg-grain">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div
            initial={{ scale: 1.15, filter: "blur(4px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 12, ease: "linear" }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlays for cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/40 z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </motion.div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container px-6 lg:px-12">
              <div className="max-w-6xl space-y-10">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex items-center gap-3"
                  >
                    <span className={cn("h-[1px] w-12 bg-current opacity-50", slides[currentSlide].accent)} />
                    <p className={cn("text-xs md:text-sm font-bold uppercase tracking-[0.4em]", slides[currentSlide].accent)}>
                      {slides[currentSlide].tag}
                    </p>
                  </motion.div>
                  
                  <motion.h1
                    id="hero-heading"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white leading-[1] tracking-tight text-balance"
                  >
                    {currentSlide === 0 ? (
                      <>
                        We Say <span className="text-primary italic animate-pulse-glow">YES</span> <br /> 
                        When the World <br /> Says <span className="italic opacity-80">No.</span>
                      </>
                    ) : (
                      slides[currentSlide].title
                    )}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-base md:text-xl text-white/70 font-light max-w-2xl leading-relaxed text-balance border-l border-white/20 pl-6"
                  >
                    {slides[currentSlide].desc}
                  </motion.p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-10 pt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-wrap gap-6"
                  >
                    <Button asChild size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-bold shadow-2xl shadow-primary/40 border-none transition-all hover:scale-105 active:scale-95 group overflow-hidden relative">
                      <Link href="/programs" className="relative z-10 flex items-center gap-2">
                         Explore Programs
                         <motion.span 
                           initial={{ x: 0 }}
                           whileHover={{ x: 5 }}
                           className="inline-block"
                         >
                           →
                         </motion.span>
                         <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity animate-gradient -z-10" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-10 border-white/20 hover:border-white/40 text-white rounded-full text-lg font-bold backdrop-blur-md transition-all hover:bg-white/10">
                      <Link href="/donate">Support Us</Link>
                    </Button>
                  </motion.div>

                  {/* Micro Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="flex gap-8 md:gap-12 pt-0 md:pt-0 md:pl-10 border-t md:border-t-0 md:border-l border-white/10"
                  >
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="text-xl md:text-2xl font-serif font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-6">
        <div className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
          <button 
            onClick={prevSlide}
            className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all duration-700 rounded-full ${
                  currentSlide === i ? "w-10 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" : "w-3 bg-white/10 hover:bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 md:left-12 z-30 hidden lg:flex flex-col items-center gap-6"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-primary/50 to-white/0" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold vertical-text">Scroll Down</span>
      </motion.div>
    </section>
  )
}


