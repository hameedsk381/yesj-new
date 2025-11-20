"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  bgClass?: string
}

export default function PageHeader({ title, description, bgClass = "bg-blue-50" }: PageHeaderProps) {
  return (
    <section className={`w-full py-16 md:py-24 ${bgClass}`}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl text-primary">{title}</h1>
            {description && (
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
