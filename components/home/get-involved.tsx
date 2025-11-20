"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GetInvolved() {
  const involvementOptions = [
    {
      id: 1,
      title: "I'm a Youth Seeking Support",
      description: "Ready to transform your life? Explore our programs and take the first step toward your dreams.",
      buttonText: "Explore Programs",
      buttonLink: "/programs",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "I Want to Volunteer",
      description: "Be part of something bigger. Give your time, talent, and treasure to empower the next generation.",
      buttonText: "Join the Movement",
      buttonLink: "/volunteer",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "I Want to Donate",
      description: "Transform a life today. Every donation breaks the cycle of poverty and builds futures.",
      buttonText: "Donate Now",
      buttonLink: "/donate",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary mb-4">Get Involved</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {involvementOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-lg border border-primary/10 p-8 transition-all hover:shadow-lg ${option.bgColor}`}
            >
              <h3 className="text-xl font-light mb-4 text-primary">{option.title}</h3>
              <p className="text-muted-foreground font-extralight mb-6">{option.description}</p>
              <Link href={option.buttonLink}>
                <Button variant="outline" className="rounded-none border-secondary hover:bg-pink-50 text-secondary">
                  {option.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
