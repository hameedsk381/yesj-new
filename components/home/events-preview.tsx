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
      date: "June 15-20, 2025",
      title: "National Leadership Camp",
      description: "A week-long residential camp focusing on leadership development and social analysis.",
      location: "Chennai, Tamil Nadu",
    },
    {
      date: "July 8, 2025",
      title: "Interfaith Dialogue",
      description: "A panel discussion on the role of faith in promoting social harmony and peace.",
      location: "Mumbai, Maharashtra",
    },
    {
      date: "August 12-14, 2025",
      title: "Regional Conference",
      description: 'A three-day conference on "Youth for Climate Justice" with workshops and action planning.',
      location: "Bangalore, Karnataka",
    },
  ]

  return (
    <section id="events" className="w-full py-20 md:py-32 bg-blue-50">
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
              <div className="h-1 w-12 bg-maroon"></div>
              <span className="text-sm font-light text-maroon">Join Us</span>
              <div className="h-1 w-12 bg-maroon"></div>
            </div>
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-maroon">Upcoming Events</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              Join us for these upcoming events and activities.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground font-extralight">{event.date}</span>
              </div>
              <h3 className="text-xl font-light mb-2 text-maroon">{event.title}</h3>
              <p className="text-muted-foreground font-extralight">{event.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-extralight">{event.location}</span>
              </div>
              <Link href="/register">
                <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">
                  Register Now
                </Button>
              </Link>
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
          <Link href="/events">
            <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
              View All Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
