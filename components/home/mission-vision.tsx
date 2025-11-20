"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MissionVision() {
  return (
    <section id="mission" className="w-full py-20 md:py-32 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-block text-sm text-primary mb-2">Our Mission</div>
            <h2 className="text-3xl font-light tracking-tighter md:text-4xl/tight text-primary">
              Building a Just World
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              Our purpose is to assist in building a just world by transforming the lives of young people. We educate and encourage them to understand and analyze the socio-economic, cultural, and political aspects of society, stimulating their conscience to bring social commitment to build the Kingdom of God in India and the globalized world.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
              We aspire to light the aspirational torch for young people who do not have the resources and guidance to a better life, helping them find purpose and meaning in their lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-block text-sm text-primary mb-2">Our Vision</div>
            <h2 className="text-3xl font-light tracking-tighter md:text-4xl/tight text-primary">
              More Than a Program - A Sacred Calling
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              We see poverty not as personal failure but as structural sin demanding prophetic response.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
              We approach youth not as beneficiaries but as protagonists of their own liberation.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
              We don't offer charity; we accompany transformation through long-term relationships.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
              We believe empowerment is kingdom-building—establishing justice and peace on earth.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/about">
                <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                  Explore Programs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
