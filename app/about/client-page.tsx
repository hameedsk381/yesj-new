"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Anchor, Heart, Shield, Users, Zap } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const storyParagraphs = [
  "The Telugu-speaking states of Andhra Pradesh and Telangana are home to nearly 85 million people, most of them young. In rural, semi-urban, and slum communities, many face poverty, school dropout, unemployment, caste barriers, gender discrimination, and deep social inequality.",
  "In these spaces, young people are often pushed to the margins by structures they did not create. Girls are married early. Boys are pushed into cheap labour. Families live with unstable incomes, weak support systems, and little access to long-term opportunity.",
  "YES-J was born from a conviction that every young person, regardless of educational, social, religious, or economic background, has the capacity to live a meaningful and fulfilling life. Since 2016, we have tried to be that beacon of light, walking with the last, the lost, and the least.",
]

const philosophyStatements = [
  "YES - I have dreams.",
  "YES - I am capable of fulfilling my dreams.",
  "YES - I can and I will be the dream I want to be, if only I am given the opportunity.",
]

const organizationFacts = [
  { label: "Full Name", value: "Youth Empowering Service - Jesuits (YES-J)" },
  { label: "Type", value: "Ministry of the Andhra Jesuit Province, Society of Jesus" },
  { label: "Legal Entity", value: "Part of The Loyola College Society, Guntur-Vijayawada" },
  { label: "Headquarters", value: "YES-J Centre for Excellence, Andhra Loyola College Campus, Vijayawada, AP - 520008" },
  { label: "Founded", value: "2016" },
  { label: "Target Group", value: "Youth aged 15-25 years across Andhra Pradesh and Telangana" },
  { label: "States Served", value: "Andhra Pradesh and Telangana" },
  { label: "Programs", value: "12 active programs" },
  { label: "Lives Touched", value: "50,000+ since 2016" },
]

const ignatianPillars = [
  {
    title: "Imago Dei",
    description: "Every young person carries inherent dignity and worth, independent of status or background.",
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Cura Personalis",
    description: "We care for the whole person: intellectual, emotional, social, spiritual, and practical.",
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Magis",
    description: "We seek deeper transformation, not surface-level intervention or short-term visibility.",
    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Men and Women for Others",
    description: "Leadership at YES-J is rooted in service, solidarity, and responsibility toward the common good.",
    icon: <Heart className="h-5 w-5" aria-hidden="true" />,
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-slate-950 text-white pt-32">
          <Image
            src="/website/IMG_5899.JPG"
            alt="Young people at a YES-J gathering"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="container relative px-6 py-20 lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl space-y-6"
            >
              <Badge className="rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                A Jesuit Ministry
              </Badge>
              <div className="space-y-4">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  About YES-J
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  A Jesuit ministry. A movement. A YES to every young person.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="story" className="scroll-mt-32 border-b border-border bg-white">
          <div className="container grid gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:px-8 lg:py-20">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Our Story</p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Walking with young people who have been pushed aside
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-border bg-slate-100">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/website/IMG_5986.JPG"
                  alt="YES-J participants during a field programme"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="philosophy" className="scroll-mt-32 border-b border-border bg-primary text-primary-foreground">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                The Power of YES
              </h2>
              <p className="text-base leading-8 text-white/80">
                This is not a slogan. It is the lens through which YES-J designs programs,
                accompanies young people, and builds confidence where society has built doubt.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {philosophyStatements.map((statement) => (
                <article
                  key={statement}
                  className="border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <p className="text-lg font-semibold leading-8 text-white">{statement}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Who We Are</p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Organisational profile
              </h2>
            </div>

            <div className="mt-10 overflow-hidden border border-border bg-white">
              <dl className="divide-y divide-border">
                {organizationFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-2 px-5 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
                  >
                    <dt className="text-sm font-semibold text-foreground">{fact.label}</dt>
                    <dd className="text-sm leading-7 text-muted-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Ignatian Foundation
                </p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Principles that shape how YES-J works
                </h2>
              </div>
              <Anchor className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ignatianPillars.map((pillar) => (
                <article key={pillar.title} className="border border-border bg-background p-6">
                  <div className="flex items-center gap-3 text-primary">
                    {pillar.icon}
                    <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
              <div className="relative mx-auto w-full max-w-[260px] overflow-hidden border border-border bg-white">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/website/IMG_8204.JPG"
                    alt="Fr. Bala Bollineni SJ"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                    Leadership
                  </p>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    The people behind YES-J
                  </h2>
                </div>
                <p className="text-base leading-8 text-muted-foreground">
                  YES-J is carried forward by Jesuits, staff, coordinators, and volunteers who
                  believe in the possibility of every young person. The leadership team holds
                  programme quality, formation, and long-term accompaniment together.
                </p>
                <p className="text-sm font-medium text-foreground">
                  Fr. Bala Bollineni, SJ
                  <span className="text-muted-foreground"> - Founder and Director</span>
                </p>
                <Button asChild className="rounded-md bg-primary text-white hover:bg-primary/90">
                  <Link href="/about/team">View Leadership and Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
