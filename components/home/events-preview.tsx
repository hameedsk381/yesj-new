"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventsPreview() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const events = [
    {
      date: "🔥 URGENT",
      title: "Summer Shapes 2025 Applications Open!",
      description: "Limited seats. Apply by Dec 31st",
      location: "Residential Program",
    },
    {
      date: "📢 NEW",
      title: "Scholar Support Program now accepting applications",
      description: "For academic year 2025-26",
      location: "Scholarships Available",
    },
    {
      date: "🎉 CELEBRATING",
      title: "10 years of empowering youth",
      description: "50,000+ lives transformed",
      location: "Milestone Achievement",
    },
  ]

  return (
    <section id="events" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-secondary/5">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm font-light text-primary">Join Us</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl text-primary">Latest from YESJ</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl font-extralight">
              Resonating Hope. Stay connected with our latest programs, stories, and impact.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden border border-primary/10 p-5 md:p-6 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground font-extralight">{event.date}</span>
              </div>
              <h3 className="text-xl font-light mb-2 text-primary">{event.title}</h3>
              <p className="text-muted-foreground font-extralight text-sm md:text-base">{event.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-extralight">{event.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10 md:mt-12"
        >
          <Link href="/echoes">
            <Button variant="outline" className="rounded-none border-accent hover:bg-accent/10 text-accent px-6 py-3 md:px-8 md:py-4 hover:text-accent">
              Read Our Echoes
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}