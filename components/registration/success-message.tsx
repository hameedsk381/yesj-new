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
        <CheckCircle className="h-16 w-16 text-tertiary" />
      </div>
      <h2 className="text-2xl font-light text-primary mb-4">Application Submitted Successfully!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-4">
        Thank you for applying to YESJ. Your application has been received and is being processed.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/">
          <Button className="rounded-md bg-primary hover:bg-primary/90 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
