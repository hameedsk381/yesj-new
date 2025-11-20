"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ImpactCounter() {
  const [counters, setCounters] = useState([
    { id: 1, end: 50000, label: "Youth Directly Impacted", prefix: "", suffix: "+" },
    { id: 2, end: 10, label: "Comprehensive Programs", prefix: "", suffix: "+" },
    { id: 3, end: 15, label: "Districts Across Telugu States", prefix: "", suffix: "" },
    { id: 4, end: 3000, label: "Youth Leaders Trained", prefix: "", suffix: "+" },
    { id: 5, end: 500, label: "Volunteers Mobilized Annually", prefix: "", suffix: "+" },
    { id: 6, end: 85, label: "Employment/Education Success Rate", prefix: "", suffix: "%" },
  ])

  const [animatedCounters, setAnimatedCounters] = useState(
    counters.map(counter => ({ ...counter, current: 0 }))
  )

  useEffect(() => {
    const duration = 3000 // Animation duration in ms
    const steps = 60 // Number of steps in animation
    const stepDuration = duration / steps

    const interval = setInterval(() => {
      setAnimatedCounters(prev => 
        prev.map(counter => {
          if (counter.current >= counter.end) return counter
          const increment = Math.ceil(counter.end / steps)
          const nextValue = Math.min(counter.current + increment, counter.end)
          return { ...counter, current: nextValue }
        })
      )
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-20 md:py-32 bg-blue-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary mb-4">Our Impact</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-extralight mx-auto">
            These aren't just numbers. They're transformed lives, rebuilt families, and reimagined futures.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {animatedCounters.map((counter, index) => (
            <motion.div
              key={counter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counter.prefix}
                {counter.current.toLocaleString()}
                {counter.suffix}
              </div>
              <p className="text-sm text-muted-foreground font-extralight">{counter.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
