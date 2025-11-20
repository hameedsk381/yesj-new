"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Carousel } from "@/components/ui/carousel"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      src: "/website/IMG_5899.JPG",
      alt: "Youth empowerment program in action",
      tagline: "YOUR DREAMS DESERVE A YES",
      description: "Empowering 50,000+ youth across Telugu states to break barriers and build futures"
    },
    {
      src: "/website/IMG_5986.JPG",
      alt: "Students engaged in educational activities",
      tagline: "EDUCATION TRANSFORMS LIVES",
      description: "Unlocking potential through quality learning experiences and skill development"
    },
    {
      src: "/website/IMG_6787.JPG",
      alt: "Community service and volunteer work",
      tagline: "SERVICE CREATES CHANGE",
      description: "Building stronger communities through dedicated service and volunteerism"
    },
    {
      src: "/website/IMG_7254.JPG",
      alt: "Leadership training session",
      tagline: "LEADERSHIP EMPOWERS",
      description: "Developing tomorrow's leaders with confidence and vision"
    },
    {
      src: "/website/IMG_8159.JPG",
      alt: "Cultural celebration and unity",
      tagline: "UNITY STRENGTHENS",
      description: "Celebrating diversity while building bridges across communities"
    },
  ]

  // Update current slide when carousel changes
  useEffect(() => {
    const handleSlideChange = () => {
      // This would be triggered by the carousel component
      // For now, we'll simulate it with a simple interval
    }
    
    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <section className="w-full py-8 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-8 xl:grid-cols-2 xl:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {carouselImages[currentSlide]?.tagline || "YOUR DREAMS DESERVE A YES"}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl font-extralight">
                {carouselImages[currentSlide]?.description || "Empowering 50,000+ youth across Telugu states to break barriers and build futures"}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-3 min-[400px]:flex-row pt-2"
            >
              <Link href="/programs">
                <Button className="inline-flex h-12 items-center justify-center rounded-none px-6 md:px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-base">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/echoes">
                <Button
                  variant="outline"
                  className="inline-flex h-12 items-center justify-center rounded-none border-accent hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 text-accent text-base"
                >
                  Read Our Echoes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <Carousel 
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg shadow-lg overflow-hidden"
              onSlideChange={(index) => setCurrentSlide(index)}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="relative w-full h-full">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
