"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactPreview() {
  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-primary"></div>
                <span className="text-sm font-light text-primary">Get in Touch</span>
              </div>
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary">Contact Us</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
                The harvest is plentiful. Will you answer the call?
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
                Every 8 minutes, a youth in our region drops out of school.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
                Every hour, dozens lose hope in their dreams.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mt-4">
                But every day, YESJ says: Your story doesn't end here.
              </p>
            </div>
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-light">YESJ Centre for Excellence</p>
                  <p className="text-sm text-muted-foreground font-extralight">
                    Andhra Loyola College Campus, Vijayawada, Andhra Pradesh, India - 522 008
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-light">Phone</p>
                  <p className="text-sm text-muted-foreground font-extralight">+91-886-672-7202</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-light">Email</p>
                  <p className="text-sm text-muted-foreground font-extralight">info@yesj.org</p>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <div className="flex flex-wrap gap-2">
                <Link href="/volunteer">
                  <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                    Volunteer
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                    Donate
                  </Button>
                </Link>
                <Link href="/partners">
                  <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-light mb-2 text-primary">Connect With Us</h3>
              <p className="text-muted-foreground font-extralight">
                Follow us on social media to stay updated with our latest activities and events.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 mt-4"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
