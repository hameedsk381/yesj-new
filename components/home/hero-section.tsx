"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const carouselSlides = [
  {
    src: "/website/IMG_5899.JPG",
    alt: "YESJ Youth Movement - Empowering diverse youth in South India",
    tagline: "YOUR DREAMS DESERVE A YES",
    description: "YESJ (Youth Empowering Service - Jesuits) is transforming 55,000+ lives through radical love and systematic empowerment across Telugu states.",
    cta1: { label: "Our Story", href: "/about" },
    cta2: { label: "View Programs", href: "/programs" }
  },
  {
    src: "/website/IMG_5986.JPG",
    alt: "MuST Vocational Training - Skill development for marginalized youth",
    tagline: "FROM MARGINS TO MAINSTREAM",
    description: "Breaking the cycle of poverty through certified vocational training, placement support, and residential skill development programs.",
    cta1: { label: "Skills Training", href: "/programs" },
    cta2: { label: "Apply Today", href: "/programs" }
  },
  {
    src: "/website/IMG_6787.JPG",
    alt: "Summer Shapes Program - English immersion and leadership training",
    tagline: "SPEAK YOUR SUCCESS",
    description: "Mastering English communication and soft skills. Our 'Summer Shapes' immersion program opens doors to global opportunities.",
    cta1: { label: "Summer Shapes", href: "/programs" },
    cta2: { label: "Learn More", href: "/about" }
  }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % carouselSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.8 }
    })
  }

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] md:h-screen bg-black overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={carouselSlides[current].src}
              alt={carouselSlides[current].alt}
              fill
              className="object-cover brightness-50"
              priority
            />
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-20 pointer-events-none z-[1]"></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 flex items-center z-10">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    YESJ Movement
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[0.9] tracking-tight drop-shadow-xl"
                  >
                    {carouselSlides[current].tagline.split(' ').map((word, i) => (
                      <span key={i} className={i === 2 ? "text-primary italic" : ""}>{word} </span>
                    ))}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed"
                  >
                    {carouselSlides[current].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Link href={carouselSlides[current].cta1.href}>
                      <Button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-2xl shadow-primary/20 flex items-center gap-2 group">
                        {carouselSlides[current].cta1.label}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href={carouselSlides[current].cta2.href}>
                      <Button variant="ghost" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md text-lg font-bold">
                        {carouselSlides[current].cta2.label}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Responsive Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 flex items-center gap-6 z-10">
        <div className="flex gap-2">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all rounded-full ${i === current ? "w-12 bg-primary" : "w-6 bg-white/20 hover:bg-white/40"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prevSlide} aria-label="Previous slide" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} aria-label="Next slide" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
      </div>
    </section>
  )
}
