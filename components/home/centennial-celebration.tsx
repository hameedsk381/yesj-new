"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CentennialCelebration() {
  return (
    <section className="w-full py-20 md:py-32 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-primary/90 z-10"></div>
          <Image
            src="/celebration-bg.png"
            alt="APTSAICUF Celebration"
            width={1200}
            height={400}
            className="w-full h-[400px] object-cover"
          />
          <div className="relative z-20 p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex flex-col items-center"
              >
                <Image
                  src="/aicuf-centennial-logo.png"
                  alt="AICUF Centennial Logo"
                  width={120}
                  height={120}
                  className="mb-4"
                />
                <span className="inline-block text-2xl font-light border-b-2 border-white pb-2 mb-2">1924 - 2024</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Celebrating 100 Years</h2>
                <p className="text-lg md:text-xl font-extralight">
                  A century of empowering students, building communities, and working for social justice.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button className="bg-white text-maroon hover:bg-white/90 rounded-none">Join the Celebration</Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
