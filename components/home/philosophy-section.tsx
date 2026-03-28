"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const statements = [
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
  return (
    <section aria-labelledby="philosophy-heading" className="border-b border-border bg-[#1A1A1A] text-white">
      <div className="container px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-medium text-secondary italic">Our core conviction</p>
            <h2
              id="philosophy-heading"
              className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl font-serif"
            >
              The Power of Three YESes
            </h2>
            <p className="max-w-lg text-base leading-7 text-white/75">
              Our philosophy is built on three fundamental affirmations that every young person
              deserves to hear and believe.
            </p>
            <Button
              asChild
              variant="outline"
              className="h-11 border-white/20 bg-transparent px-5 text-white hover:bg-white hover:text-[#1d1a17]"
            >
              <Link href="/about#philosophy">Read the philosophy</Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {statements.map((statement, index) => (
              <div key={statement.title} className="rounded-md border border-white/10 bg-white/5 p-6 sm:p-7">
                <div className="text-xs font-medium tracking-[0.18em] text-secondary/90">
                  YES 0{index + 1}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white uppercase italic tracking-tight">
                  {statement.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-white/70">{statement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
