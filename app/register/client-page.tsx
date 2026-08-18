"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import RegistrationForm from "@/components/registration/registration-form"

export default function RegisterClientPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-background pt-32 lg:pt-36">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-light text-primary mb-4 lg:text-5xl">
                Membership Registration
              </h1>
              <p className="text-muted-foreground font-extralight text-lg">
                Join the YES-J movement. Apply for membership by filling in the form below.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-50/60">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}