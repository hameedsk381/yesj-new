"use client"

import { motion } from "framer-motion"
import { BookOpen, Heart, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProgramsPreview() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const programs = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary mb-4" />,
      title: "Leadership Training",
      description: "Workshops and seminars to develop leadership skills, critical thinking, and social analysis.",
      link: "/programs#leadership",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg",
    },
    {
      icon: <Heart className="h-8 w-8 text-maroon mb-4" />,
      title: "Social Service",
      description:
        "Opportunities to serve marginalized communities through volunteer work and community development projects.",
      link: "/programs#social-service",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.1-laM6KEOcXevAzwId6tbkOQDE3y0KMn.jpeg",
    },
    {
      icon: <Users className="h-8 w-8 text-primary mb-4" />,
      title: "Faith Formation",
      description:
        "Retreats, prayer meetings, and theological discussions to deepen understanding of faith and its social dimensions.",
      link: "/programs#faith-formation",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-19-eN65t7FeFIU0KHZvHfMQcBg0iakwXI.jpeg",
    },
  ]

  return (
    <section id="programs" className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm font-light text-primary">What We Do</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-maroon">Our Programs</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              APTSAICUF offers a variety of programs to help students develop their leadership skills and engage with
              social issues.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-lg border border-primary/10 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                {program.icon}
                <h3 className="text-xl font-light mb-2 text-maroon">{program.title}</h3>
                <p className="text-muted-foreground font-extralight">{program.description}</p>
                <Link
                  href={program.link}
                  className="mt-4 inline-flex items-center text-sm font-light text-primary group-hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
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
          <Link href="/programs">
            <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
              View All Programs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
