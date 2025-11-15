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
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm font-light text-primary">Our Story</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-maroon">About APTSAICUF</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              The Andhra-Telangana All India Catholic University Federation (APTSAICUF) is a movement of university
              students committed to creating a more just society.
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
              src="/aicuf-centennial-logo.png"
              width={300}
              height={300}
              alt="AICUF Centennial Logo"
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
              Founded in 1924, APTSAICUF has grown into a regional movement with thousands of members across Andhra
              Pradesh and Telangana. Our members are committed to the principles of truth, justice, and love as taught
              by Jesus Christ.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted-foreground font-extralight">
              We believe in the power of young people to transform society. Through our programs, we provide
              opportunities for students to develop leadership skills, engage in social analysis, and take action on
              issues affecting their communities.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-4">
              <Link href="/about">
                <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                  Read Our Full History
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
