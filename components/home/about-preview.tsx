"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPreview() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="about" className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary">Where Every Youth Shouts YES to Their Dreams</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              A Movement of Hope, A Ministry of Transformation
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/YESJ_Logo_Black-eaf43d27.png"
              width={300}
              height={300}
              alt="YESJ Logo"
              className="mx-auto rounded-full shadow-lg"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col justify-center space-y-4"
          >
            <motion.p variants={fadeInUp} className="text-muted-foreground font-extralight">
              In the heart of India's Telugu states, where 85 million people call home, countless young dreamers face walls too high to climb alone. Poverty. Discrimination. Limited English. Broken education systems. These aren't just statistics. They're stolen futures.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted-foreground font-extralight">
              But here's what we believe: Every young person, regardless of caste, religion, economic background, or past circumstances, carries infinite potential. They don't need charity. They need a launchpad.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted-foreground font-extralight">
              That's YESJ.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted-foreground font-extralight">
              Since 2015, we've been more than a program. We've been a revolution. A Jesuit-rooted movement that walks alongside youth from rural villages to urban slums, transforming "I can't" into "I CAN" and "I WILL."
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-4">
              <Link href="/about">
                <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
