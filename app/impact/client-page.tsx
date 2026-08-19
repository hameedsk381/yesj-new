"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, GraduationCap, MapPin, Quote, Target, TrendingUp, Users } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { isRemoteImage } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { siteConfig } from "@/lib/config"

const stats = [
  { icon: <Users className="h-5 w-5" aria-hidden="true" />, number: "70K+", label: "Youth impacted", color: "bg-primary" },
  { icon: <MapPin className="h-5 w-5" aria-hidden="true" />, number: "15+", label: "Districts active", color: "bg-primary/85" },
  { icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />, number: "3K+", label: "Leaders trained", color: "bg-secondary" },
  { icon: <Target className="h-5 w-5" aria-hidden="true" />, number: "85%", label: "Placement rate", color: "bg-secondary/85" },
]

const stories = [
  {
    name: "Lakshmi",
    age: 22,
    role: "Summer Shapes graduate",
    quote: "In my village, English was a wall. YES-J helped me climb it.",
    description:
      "Lakshmi moved from a remote village in Guntur into a technical career after language immersion, mentoring, and steady support from the YES-J ecosystem.",
    metrics: [
      { label: "Salary growth", value: "260%" },
      { label: "Confidence", value: "Peak" },
    ],
    image: "https://storage.googleapis.com/yesj/website/IMG_6787.JPG",
  },
  {
    name: "Ravi Kumar",
    age: 35,
    role: "MuST graduate",
    quote: "I was not just learning to drive. I was learning to lead my family.",
    description:
      "Ravi moved from unstable construction work into professional driving, creating a reliable income for his family and a different future for his children.",
    metrics: [
      { label: "Income boost", value: "533%" },
      { label: "Stability", value: "Solid" },
    ],
    image: "https://storage.googleapis.com/yesj/website/IMG_5986.JPG",
  },
]

const reports = [
  {
    year: "2024-25",
    description: "Programme highlights, youth reach, partnerships, and financial accountability for the latest reporting cycle.",
    href: "/contact?subject=Annual%20Report%202024-25%20Request#contact-form",
    cta: "Request Annual Report 2024-25",
  },
  {
    year: "2023-24",
    description: "A year-wise snapshot of programme delivery, field presence, and outcomes across Andhra Pradesh and Telangana.",
    href: "/contact?subject=Annual%20Report%202023-24%20Request#contact-form",
    cta: "Request Annual Report 2023-24",
  },
]

export default function ImpactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteConfig.url },
        { name: "Impact", url: `${siteConfig.url}/impact` },
      ]} />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-32 lg:pt-36">
          <Image
            src="/website/IMG_8204.JPG"
            alt="YES-J participants gathered at an event"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-slate-950/80" />

          <div className="container relative px-6 py-20 text-center lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl space-y-5"
            >
              <Badge className="rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                Measured Transformation
              </Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Impact in lives, numbers, and stories
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Beyond numbers, YES-J measures change through young people who find confidence,
                employment, education, community, and purpose.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="border-border p-6 shadow-sm">
                    <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center text-white ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold tracking-tight text-foreground">
                      {stat.number}
                    </div>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Human Stories
                </p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Meet the YES - real people, real change
                </h2>
              </div>
              <Button asChild variant="outline" className="rounded-md">
                <Link href="/media">View More Stories</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-10">
              {stories.map((story, index) => (
                <motion.article
                  key={story.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                    index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden border border-border bg-white">
                    <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                      <Image src={story.image} alt={story.name} fill unoptimized={isRemoteImage(story.image)} className="object-cover" />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <Badge className="rounded-md bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
                      {story.role}
                    </Badge>
                    <Quote className="h-10 w-10 text-secondary/50" aria-hidden="true" />
                    <h3 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                      {story.quote}
                    </h3>
                    <p className="text-sm font-medium text-foreground">
                      {story.name}
                      <span className="text-muted-foreground"> - {story.age} years</span>
                    </p>
                    <p className="text-base leading-8 text-muted-foreground">{story.description}</p>

                    <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                      {story.metrics.map((metric) => (
                        <div key={metric.label} className="border border-border bg-white p-4">
                          <div className="flex items-center gap-2 text-primary">
                            <TrendingUp className="h-4 w-4" aria-hidden="true" />
                            <span className="text-2xl font-semibold text-foreground">{metric.value}</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="annual-reports" className="scroll-mt-32 border-b border-border bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Transparency and Accountability
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Annual reports
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                YES-J publishes year-wise reporting on programme reach, organisational stewardship,
                and impact. Until the downloadable PDFs are uploaded, requests can be sent directly
                through the contact form.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {reports.map((report) => (
                <article key={report.year} className="border border-border bg-background p-6">
                  <div className="flex items-center gap-3 text-primary">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                      Annual Report {report.year}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {report.description}
                  </p>
                  <Button asChild variant="outline" className="mt-6 rounded-md">
                    <Link href={report.href}>{report.cta}</Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
