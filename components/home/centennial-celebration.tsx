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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10"></div>
          <Image
            src="/images/get-involved-bg.jpg"
            alt="Silhouette of youth with raised arms against sunset, empowering stance"
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
                <span className="inline-block text-2xl font-light border-b-2 border-white pb-2 mb-2">Partnering for Greater Impact</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Alone we can do so little; together we can do so much</h2>
                <p className="text-lg md:text-xl font-extralight">
                  "Alone we can do so little; together we can do so much" – Helen Keller
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button className="bg-white text-primary hover:bg-white/90 rounded-none">Become a Partner</Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
