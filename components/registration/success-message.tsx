"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-light text-maroon mb-4">Application Submitted Successfully!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Thank you for applying to APTSAICUF. Your application has been received and is being processed. We will contact
        you soon with further information.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/">
          <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
            Return to Home
          </Button>
        </Link>
        <Link href="/events">
          <Button className="rounded-none bg-maroon hover:bg-maroon/90 text-white">Explore Upcoming Events</Button>
        </Link>
      </div>
    </motion.div>
  )
}
