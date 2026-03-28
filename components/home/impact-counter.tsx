"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { CalendarDays, Goal, Handshake, MapPin, Star, Users } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Counter = {
  id: number
  label: string
  detail: string
  icon: ReactNode
  value?: number
  suffix?: string
  display?: string
  className?: string
}

const counters: Counter[] = [
  {
    id: 1,
    value: 50000,
    suffix: "+",
    label: "Lives Touched",
    detail: "Through direct accompaniment, training, and community programmes across decades of service.",
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20",
  },
  {
    id: 2,
    value: 243,
    suffix: "+",
    label: "Events Conducted",
    detail: "Workshops, camps, festivals, and youth formation spaces.",
    icon: <CalendarDays className="h-5 w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    value: 12,
    label: "Active Programs",
    detail: "Education, employability, and spiritual formation.",
    icon: <Goal className="h-5 w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    value: 10,
    suffix: "+",
    label: "Years of Service",
    detail: "A decade of work with marginalized youth.",
    icon: <Star className="h-5 w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    display: "2 States",
    label: "AP & Telangana",
    detail: "Serving young people across both Telugu states through dedicated centres.",
    icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
    className: "md:col-span-2 md:row-span-1 bg-secondary/5 border-secondary/20",
  },
  {
    id: 6,
    display: "Free",
    label: "All Programs",
    detail: "Ensuring high-quality training is accessible to all.",
    icon: <Handshake className="h-5 w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
]

function CounterItem({ counter, index }: { counter: Counter; index: number }) {
  const [count, setCount] = useState(0)
  const itemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (counter.display || !counter.value) {
      return
    }

    let frameId = 0
    let startTime = 0

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / 1500, 1)
      setCount(Math.floor(progress * counter.value!))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(() => {
            frameId = window.requestAnimationFrame(step)
          }, index * 100)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
    }
  }, [counter.display, counter.value, index])

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 bg-card p-8 glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
        counter.className
      )}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-secondary/5 blur-3xl group-hover:bg-secondary/10 transition-colors" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {counter.icon}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{counter.label}</div>
        </div>

        <div className="mt-8">
          <div className={cn(
            "font-serif font-bold tracking-tighter text-foreground leading-none",
            counter.id === 1 ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
          )}>
            {counter.display ?? `${count.toLocaleString()}${counter.suffix ?? ""}`}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground/90">{counter.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 font-light text-balance">{counter.detail}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ImpactCounter() {
  return (
    <section aria-labelledby="impact-heading" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-mesh-saffron opacity-30 dark:opacity-10" />
      
      <div className="container relative z-10 px-6 lg:px-12">
        <div className="mb-16 max-w-3xl space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary uppercase tracking-[0.3em] text-xs font-bold"
          >
            <span className="h-[1px] w-8 bg-primary/50" />
            Impact in numbers
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="impact-heading" 
            className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
          >
            A Snapshot of <span className="italic text-primary">Radical Transformation</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground/80 max-w-2xl font-light"
          >
            Our reach extends far beyond data; it&apos;s about walking alongside youth to restore dignity and ignite hope for a brighter future.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-rows-2">
          {counters.map((counter, index) => (
            <CounterItem key={counter.id} counter={counter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
