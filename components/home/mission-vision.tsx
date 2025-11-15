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
            <h2 className="text-3xl font-light tracking-tighter md:text-4xl/tight text-maroon">
              To form students into agents of social change
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              APTSAICUF seeks to form students who are sensitive to social realities and committed to building a more
              just, humane, and equitable society based on Gospel values.
            </p>
            <ul className="grid gap-2 mt-4">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Promote leadership among university students</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Engage in social analysis and action</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Foster interfaith dialogue and harmony</span>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-block text-sm text-primary mb-2">Our Vision</div>
            <h2 className="text-3xl font-light tracking-tighter md:text-4xl/tight text-maroon">
              A just and humane society
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
              We envision a society where human dignity is respected, rights are protected, and all people have the
              opportunity to develop their full potential.
            </p>
            <ul className="grid gap-2 mt-4">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Uphold the dignity and rights of all people</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Work for peace and reconciliation</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="h-4 w-4 text-maroon" />
                <span className="font-extralight">Care for our common home, the Earth</span>
              </motion.li>
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/mission">
                <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                  Learn More About Our Mission
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
