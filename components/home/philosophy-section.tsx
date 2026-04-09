"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const defaultStatements = [
  {
    title: "YES to Your Potential.",
    desc: "You are not a deficit to be managed, but a person with agency and imagination.",
  },
  {
    title: "YES to Your Community.",
    desc: "You are called to serve others and lead change where you live.",
  },
  {
    title: "YES to Your Future.",
    desc: "You deserve a practical path to a career, a calling, and a dignified life.",
  },
]

export default function PhilosophySection() {
  const [data, setData] = useState<any>(null)
  const [statements, setStatements] = useState<any[]>(defaultStatements)

  useEffect(() => {
    const fetchPhilosophy = async () => {
      try {
        const res = await fetch('/api/homepage')
        if (res.ok) {
          const homepage = await res.json()
          setData(homepage)
          if (homepage.philosophyBlocks && homepage.philosophyBlocks.length > 0) {
            setStatements(homepage.philosophyBlocks.map((b: any) => ({
              title: b.title,
              desc: b.description
            })))
          }
        }
      } catch (err) {
        console.error('Failed to fetch philosophy content', err)
      }
    }
    fetchPhilosophy()
  }, [])

  return (
    <section aria-labelledby="philosophy-heading" className="border-b border-border bg-[#1A1A1A] text-white">
      <div className="container px-5 py-12 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="space-y-4 sm:space-y-5">
            <p className="text-xs sm:text-sm font-medium text-secondary italic">{data?.philosophyBadge || "Our core conviction"}</p>
            <h2
              id="philosophy-heading"
              className="max-w-xl text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight font-serif leading-snug"
            >
              {data?.philosophyTitle || "The Power of Three YESes"}
            </h2>
            <p className="max-w-lg text-sm sm:text-base leading-7 text-white/75">
              {data?.philosophySubtitle || "Our philosophy is built on three fundamental affirmations that every young person deserves to hear and believe."}
            </p>
            <Button
              asChild
              variant="outline"
              className="h-10 sm:h-11 border-white/20 bg-transparent px-5 text-white hover:bg-white hover:text-[#1d1a17]"
            >
              <Link href="/about#philosophy">Read the philosophy</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {statements.map((statement, index) => (
              <div key={statement.title} className="rounded-md border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-7">
                <div className="text-[10px] sm:text-xs font-medium tracking-[0.18em] text-secondary/90">
                  YES 0{index + 1}
                </div>
                <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-bold text-white uppercase italic tracking-tight">
                  {statement.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base leading-7 text-white/70">{statement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
