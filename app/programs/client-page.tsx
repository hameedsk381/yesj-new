"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { programFilters, programsData } from "@/lib/data/programs"
import { siteConfig } from "@/lib/config"
import { ProgramIcon } from "@/components/shared/program-icon"

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`

export default function ProgramsClientPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof programFilters)[number]>("All Programs")

  const filteredPrograms =
    activeFilter === "All Programs"
      ? programsData
      : programsData.filter((program) => program.categories.includes(activeFilter))

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-background pt-32 lg:pt-36">
          <div className="container px-6 py-16 text-center lg:px-8 lg:py-20 text-[#1A1A1A]">
            <p className="text-sm font-medium text-primary uppercase tracking-widest font-serif">Programs Overview</p>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl italic">
              12 Programs. One Mission. <span className="text-primary not-italic uppercase tracking-tighter">Infinite Possibilities.</span>
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
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                      : "border-border bg-card text-foreground hover:border-primary/30 hover:text-primary"
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
                <article key={program.slug} className="overflow-hidden rounded-md border border-border bg-card shadow-sm hover:shadow-md transition-all">
                  <div className={`h-1.5 w-full ${program.cardBarClassName}`} />
                  <div className="relative aspect-[16/10] grayscale hover:grayscale-0 transition-all duration-300">
                    <Image src={program.image} alt={program.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-transparent">
                      {program.logo ? (
                        <div className="relative h-10 w-10">
                          <Image
                            src={program.logo}
                            alt={`${program.shortTitle} Logo`}
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
                    <h2 className="text-2xl font-semibold text-foreground font-serif italic text-primary/80">{program.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {program.overviewDescription}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {program.categories.map((category) => (
                        <span key={category} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                          {category}
                        </span>
                      ))}
                    </div>
                    <Button asChild className="mt-6 rounded-full px-5">
                      <Link href={`/programs/${program.slug}`}>Learn More</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="container px-6 py-16 text-center lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Reach out to us and we will guide you toward the best fit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full px-5">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-5">
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
