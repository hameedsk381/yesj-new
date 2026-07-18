"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { programFilters } from "@/lib/data/programs"
import { siteConfig } from "@/lib/config"
import { ProgramIcon } from "@/components/shared/program-icon"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { programsData } from "@/lib/data/programs"

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`

export default function ProgramsClientPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof programFilters)[number]>("All Programs")
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/programs")
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setPrograms(data)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.error("Failed to fetch programs", err)
      }
      setPrograms(programsData)
      setLoading(false)
    }
    fetchPrograms()
  }, [])

  const filteredPrograms = Array.isArray(programs) 
    ? (activeFilter === "All Programs"
        ? programs
        : programs.filter((program) => program?.categories?.includes(activeFilter)))
    : []

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteConfig.url },
        { name: "Programs", url: `${siteConfig.url}/programs` },
      ]} />
      <main className="flex-1">
        <section className="border-b border-border bg-background pt-12 lg:pt-16">
          <div className="container px-6 py-16 text-center lg:px-8 lg:py-20 text-foreground">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest font-sans">Programs Overview</p>
            <h1 className="mt-4 font-sans text-4xl font-extrabold sm:text-5xl tracking-[-0.03em] text-balance">
              {programs.length} Programs. One Mission. <span className="text-primary tracking-[-0.03em]">Infinite Possibilities.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              YES-J reaches young people wherever they are: in classrooms, slums, villages,
              parishes, and homes. Every program is free. Every program is transformative.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background/50">
          <div className="container px-6 py-8 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {programFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-border bg-card text-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPrograms.map((program) => (
                <article key={program.slug} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
                  <div className={`h-1 w-full ${program.cardBarClassName || "bg-primary"}`} />
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image src={program.image || "/placeholder.jpg"} alt={program.title || "Program Image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-transparent">
                      {program.logo ? (
                        <div className="relative h-10 w-10">
                          <Image
                            src={program.logo}
                            alt={`${program.shortTitle || "Program"} Logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-primary">
                          <ProgramIcon name={program.icon} className="h-5 w-5" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground font-sans tracking-tight group-hover:text-primary transition-colors">{program.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {program.overviewDescription}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {program.categories?.map((category: string) => (
                        <span key={category} className="rounded-sm bg-muted/50 border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          {category}
                        </span>
                      ))}
                    </div>
                    <Button asChild className="mt-6 rounded-md px-5 shadow-sm active:scale-[0.98] transition-all group/btn">
                      <Link href={`/programs/${program.slug}`}>Learn More <span className="ml-1 transition-transform group-hover/btn:translate-x-1">→</span></Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="container px-6 py-16 text-center lg:px-8 lg:py-20">
            <h2 className="font-sans text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Reach out to us and we will guide you toward the best fit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-md px-5 shadow-sm active:scale-[0.98] transition-all">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-md px-5 shadow-sm active:scale-[0.98] transition-all border-border text-foreground hover:bg-muted">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
