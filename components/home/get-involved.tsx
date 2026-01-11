"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function GetInvolved() {
  const options = [
    {
      id: 1,
      title: "I'm a Youth Seeking Support",
      description: "Ready to transform your life? Explore our programs and take the first step toward your dreams.",
      buttonText: "Explore Programs",
      buttonLink: "/programs",
      image: "/website/IMG_5986.JPG",
      color: "from-blue-600/80 to-blue-900/80"
    },
    {
      id: 2,
      title: "I Want to Volunteer",
      description: "Be part of something bigger. Give your time, talent, and treasure to empower the next generation.",
      buttonText: "Join the Movement",
      buttonLink: "/get-involved",
      image: "/website/IMG_8159.JPG",
      color: "from-teal-600/80 to-teal-900/80"
    },
    {
      id: 3,
      title: "I Want to Donate",
      description: "Transform a life today. Every donation breaks the cycle of poverty and builds futures.",
      buttonText: "Donate Now",
      buttonLink: "/donate",
      image: "/website/IMG_5899.JPG",
      color: "from-secondary/80 to-secondary/90"
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200"
            >
              <img
                src={option.image}
                alt={option.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${option.color} flex flex-col justify-end p-10 text-white`}>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold leading-tight">{option.title}</h3>
                  <p className="text-white/80 font-light text-lg">{option.description}</p>
                  <Link href={option.buttonLink} className="inline-block pt-4">
                    <Button className="btn-premium rounded-full bg-white text-gray-900 hover:bg-white/90 px-8 h-14 text-lg border-none shadow-xl">
                      {option.buttonText} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

