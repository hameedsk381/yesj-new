"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Users, GraduationCap, MapPin, ShieldCheck, UserCheck, BarChart } from "lucide-react"

const counters = [
  { id: 1, end: 50000, label: "Youth Directly Impacted", suffix: "+", icon: <Users className="w-8 h-8" /> },
  { id: 2, end: 10, label: "Comprehensive Programs", suffix: "+", icon: <ShieldCheck className="w-8 h-8" /> },
  { id: 3, end: 15, label: "Districts Across Telugu States", suffix: "", icon: <MapPin className="w-8 h-8" /> },
  { id: 4, end: 3000, label: "Youth Leaders Trained", suffix: "+", icon: <UserCheck className="w-8 h-8" /> },
  { id: 5, end: 500, label: "Volunteers Mobilized Annually", suffix: "+", icon: <GraduationCap className="w-8 h-8" /> },
  { id: 6, end: 85, label: "Employment Success Rate", suffix: "%", icon: <BarChart className="w-8 h-8" /> },
]

function CounterItem({ end, label, suffix, icon, index }: any) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    let startTime: number
    const duration = 2000

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end])

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform cursor-default group"
    >
      <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-4xl font-bold tracking-tight text-gray-900">
          {count.toLocaleString()}{suffix}
        </div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider pt-2">{label}</p>
      </div>
    </motion.div>
  )
}

export default function ImpactCounter() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight"
          >
            Our <span className="gradient-text">Impact</span> in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 font-light"
          >
            These aren&apos;t just numbers. They&apos;re transformed lives, rebuilt families, and reimagined futures.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <CounterItem key={counter.id} {...counter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

