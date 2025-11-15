"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Carousel } from "@/components/ui/carousel"

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const carouselImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250518-WA0053.jpg-e2MTkZg1HsdxBzPxQBbliv3vs2U2r1.jpeg",
      alt: "APTSAICUF members participating in the #EmpowerHerPeriod awareness campaign",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250518-WA0052.jpg-p3oCH80RViVhUZWJIOMzFQYeMr5cJf.jpeg",
      alt: "Young students raising awareness about menstruation taboos with AICUF",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250518-WA0054.jpg-wW05yWzg2y5waswZ9KLRaWaC2hwta0.jpeg",
      alt: "AICUF members at YESJ Centre giving thumbs up during a gathering",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-maroon"></div>
                <span className="text-sm font-light text-maroon">Celebrating 100 Years</span>
              </div>
              <h1 className="text-3xl font-light tracking-tighter sm:text-5xl xl:text-6xl/none text-maroon">
                Andhra-Telangana All India Catholic University Federation
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl font-extralight">
                Empowering Catholic students to be agents of social change through faith, justice, and leadership since
                1924.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-2 min-[400px]:flex-row pt-4"
            >
              <Link href="/register">
                <Button className="inline-flex h-10 items-center justify-center rounded-none px-8 bg-maroon hover:bg-maroon/90 text-white">
                  Join APTSAICUF
                </Button>
              </Link>
              <Button
                variant="outline"
                className="inline-flex h-10 items-center justify-center rounded-none border-primary hover:bg-blue-50 text-primary"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <Carousel className="w-full h-[350px] rounded-lg shadow-lg overflow-hidden">
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
