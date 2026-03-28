"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const partners = [
  {
    name: "Coromandel International",
    logo: "/assets/COLLABORATORS/Coramandel International.png",
  },
  {
    name: "Deichman Foundation",
    logo: "/assets/COLLABORATORS/Deichman Foundation.png",
  },
  {
    name: "Friendly Hands London",
    logo: "/assets/COLLABORATORS/Friendly Hands, London.png",
  },
  {
    name: "KIMS Hospitals Hyderabad",
    logo: "/assets/COLLABORATORS/KIMS Hospitals, Hyderabad.png",
  },
  {
    name: "LINSI Foundation",
    logo: "/assets/COLLABORATORS/LINSI Foundation.jpg",
  },
  {
    name: "MOM Foundation USA",
    logo: "/assets/COLLABORATORS/MOM foundatiom, USA.png",
  },
  {
    name: "NorthSouth Foundation",
    logo: "/assets/COLLABORATORS/NorthSouth LOGO.png",
  },
  {
    name: "Samaritan Purse Germany",
    logo: "/assets/COLLABORATORS/Samaritan Purse, Germany.png",
  },
]

export default function Collaborators() {
  return (
    <section aria-labelledby="partners-heading" className="border-b border-border bg-background">
      <div className="container px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Collaborators</p>
            <h2 id="partners-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl font-serif">
              Partnerships that extend the work.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The work grows through collaboration across philanthropy, education, healthcare, and
              community organisations that share a commitment to youth dignity.
            </p>
          </div>

          <Button asChild variant="outline" className="h-11 px-5 border-primary/20 hover:bg-primary/5">
            <Link href="/contact">Become a partner</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex min-h-[132px] flex-col items-center justify-center rounded-md border border-border bg-card p-6 text-center shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={180}
                height={72}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="mt-4 text-sm font-medium text-muted-foreground font-serif italic">{partner.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
