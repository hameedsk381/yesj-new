"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GalleryPreview() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whatsp%20Image%202025-05-18%20at%204.58.11%20PM-tgCf7upklaBi6FE6Tryb4wOsB3jtlF.jpeg",
      alt: "APTSAICUF Members with Indian Flag",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%20205-05-18%20at%204.58.12%20PM-S6UFLR9WfDNY2GYgbyHyoFZPf0nLb1.jpeg",
      alt: "APTSAICUF Women's Chapter Activity",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%202025-05-18%20at%204.58.14%20PM-YG2rNq7sDeF58VRiPd4Y2L5djd3zuk.jpeg",
      alt: "APTSAICUF Conference Participants",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%202025-05-18%20at%204.58.34%20PM-HLAVJBLZoAml0R415IZITUC9Hqytuo.jpeg",
      alt: "APTSAICUF Cultural Exhibition",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-1%20at%204.58.35%20PM-Jr1kSptdYDYsgj17H7qYHTI1yVDvUB.jpeg",
      alt: "AICUF Campus Installation",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg",
      alt: "Youth Empowering Service Certificate Ceremony",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-19-eN65t7FeFIU0KHZvHfMQcBg0iakwXI.jpeg",
      alt: "AICUF Women's Chapter",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-05-18%20at%204.58.08%20PM-igdHve2uOiZdR0qGHkZVQ5QU2irlwr.jpeg",
      alt: "Joseph's College AICUF Chapter",
    },
  ]

  return (
    <section id="gallery" className="w-full py-20 md:py-32 bg-blue-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary">Transformation Stories</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              This Is What YES Looks Like. 50,000 lives transformed. 50,000 stories of hope. Here are just a few.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-lg"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                width={300}
                height={300}
                alt={image.alt}
                className="aspect-square object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/stories">
            <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
              Read More Success Stories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
