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
    icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
    className: "sm:col-span-2 md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20",
  },
  {
    id: 2,
    value: 243,
    suffix: "+",
    label: "Events Conducted",
    detail: "Workshops, camps, festivals, and youth formation spaces.",
    icon: <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    value: 12,
    label: "Active Programs",
    detail: "Education, employability, and spiritual formation.",
    icon: <Goal className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    value: 10,
    suffix: "+",
    label: "Years of Service",
    detail: "A decade of work with marginalized youth.",
    icon: <Star className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    display: "2 States",
    label: "AP & Telangana",
    detail: "Serving young people across both Telugu states through dedicated centres.",
    icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
    className: "sm:col-span-2 md:col-span-2 md:row-span-1 bg-secondary/5 border-secondary/20",
  },
  {
    id: 6,
    display: "Free",
    label: "All Programs",
    detail: "Ensuring high-quality training is accessible to all.",
    icon: <Handshake className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
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
        "group relative overflow-hidden rounded-md border border-border bg-card p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:border-primary/30",
        counter.className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary sm:h-11 sm:w-11">
            {counter.icon}
          </div>
          <div className="text-xs font-medium text-muted-foreground">{counter.label}</div>
        </div>

        <div className="mt-5 sm:mt-8">
          <div className={cn(
            "font-sans font-semibold tracking-[-0.05em] text-foreground leading-none",
            counter.id === 1 ? "text-4xl sm:text-5xl md:text-7xl" : "text-3xl sm:text-4xl md:text-5xl"
          )}>
            {counter.display ?? `${count.toLocaleString()}${counter.suffix ?? ""}`}
          </div>
          <h3 className="mt-3 sm:mt-4 text-base font-semibold text-foreground">{counter.label}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground text-balance">{counter.detail}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ImpactCounter() {
  const [data, setData] = useState<any>(null)
  const [items, setItems] = useState<Counter[]>(counters)

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const res = await fetch('/api/homepage')
        if (res.ok) {
          const homepage = await res.json()
          setData(homepage)
          if (homepage.impactCounters && homepage.impactCounters.length > 0) {
            setItems(homepage.impactCounters.map((item: any, i: number) => ({
              ...counters[i % counters.length], // Preserve layout/icons
              id: item.id || i,
              value: item.value,
              suffix: item.suffix || "+",
              label: item.label,
              detail: item.description,
              display: item.display
            })))
          }
        }
      } catch (err) {
        console.error('Failed to fetch impact content', err)
      }
    }
    fetchImpact()
  }, [])

  return (
    <section aria-labelledby="impact-heading" className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-32">
      <div className="absolute inset-0 bg-mesh-saffron opacity-70 dark:opacity-10" />
      
      <div className="container relative z-10 px-5 sm:px-6 lg:px-12">
        <div className="mb-10 sm:mb-16 max-w-3xl space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="impact-heading" 
            className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl"
          >
            {data?.impactTitle || "The scale of the work is measurable. The dignity behind it matters more."}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {data?.impactSubtitle || "YESJ works across education, employability, youth formation, and direct community response. These numbers offer a grounded view of that reach."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:grid-rows-2">
          {items.map((counter, index) => (
            <CounterItem key={counter.id} counter={counter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
