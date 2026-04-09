"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Anchor, Heart, Shield, Users, Zap } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const defaultStoryParagraphs = [
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function AboutPage() {
  const [data, setData] = useState<any>(null)
  const [storyParagraphs, setStoryParagraphs] = useState<string[]>(defaultStoryParagraphs)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('/api/about')
        if (res.ok) {
          const about = await res.json()
          setData(about)
          if (about.storyContent) {
            setStoryParagraphs(about.storyContent.split('\n\n'))
          }
        }
      } catch (err) {
        console.error('Failed to fetch about content', err)
      }
    }
    fetchAbout()
  }, [])
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-border bg-black text-white pt-12 lg:pt-16">
          <Image
            src="https://storage.googleapis.com/yesj/website/IMG_5899.JPG"
            alt="Young people at a YES-J gathering"
            fill
            priority
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
          <div className="container relative px-6 py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl space-y-6"
            >
              <Badge className="rounded-md bg-white/10 border border-white/10 px-3 py-1 text-white/90 hover:bg-white/10 text-xs font-semibold uppercase tracking-widest">
                A Jesuit Ministry
              </Badge>
              <div className="space-y-4">
                <h1 className="font-sans text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl text-balance">
                  {data?.heroTitle || "About YES-J"}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg font-light">
                  {data?.heroSubtitle || "A Jesuit ministry. A movement. A YES to every young person."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="scroll-mt-32 border-b border-border bg-background">
          <div className="container grid gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</p>
                <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl text-balance">
                  {data?.storyTitle || "Walking with young people who have been pushed aside"}
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                {storyParagraphs.map((paragraph: string) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15 }}
              className="relative overflow-hidden rounded-xl border border-border shadow-sm"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://storage.googleapis.com/yesj/website/IMG_5986.JPG"
                  alt="YES-J participants during a field programme"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section id="philosophy" className="scroll-mt-32 border-b border-border bg-black text-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Philosophy
              </p>
              <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
                The Power of YES
              </h2>
              <p className="text-base leading-8 text-white/60 max-w-2xl">
                This is not a slogan. It is the lens through which YES-J designs programs,
                accompanies young people, and builds confidence where society has built doubt.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {philosophyStatements.map((statement, i) => (
                <motion.article
                  key={statement}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <p className="text-lg font-semibold leading-8 text-white tracking-tight">{statement}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Organisation Profile ── */}
        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Who We Are</p>
              <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
                Organisational Profile
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <dl className="divide-y divide-border">
                {organizationFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 px-6 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 transition-colors hover:bg-muted/50"
                  >
                    <dt className="text-sm font-bold text-foreground">{fact.label}</dt>
                    <dd className="text-sm leading-7 text-muted-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ── Centre for Excellence ── */}
        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-24">
            <motion.div {...fadeUp} className="space-y-4 mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Home</p>
              <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
                YESJ Centre for Excellence
              </h2>
              <p className="text-base leading-8 text-muted-foreground max-w-2xl">
                Located on the Andhra Loyola College Campus in Vijayawada, the Centre serves as the operational hub for all YES-J programmes across Andhra Pradesh and Telangana.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15 }}
              className="relative overflow-hidden rounded-xl border border-border shadow-sm"
            >
              <div className="relative aspect-[21/9]">
                <Image
                  src="/yesj-building.jpg"
                  alt="YESJ Centre for Excellence building"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Ignatian Pillars ── */}
        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <motion.div {...fadeUp} className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Ignatian Foundation
                </p>
                <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
                  Principles that shape how YES-J works
                </h2>
              </motion.div>
              <Anchor className="h-8 w-8 text-primary hidden lg:block" aria-hidden="true" />
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {ignatianPillars.map((pillar, i) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {pillar.icon}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{pillar.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
              <motion.div
                {...fadeUp}
                className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-border shadow-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/bala-bollineni.jpg"
                    alt="Fr. Bala Bollineni SJ"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Leadership
                  </p>
                  <h2 className="font-sans text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
                    The people behind YES-J
                  </h2>
                </div>
                <p className="text-base leading-8 text-muted-foreground max-w-2xl">
                  YES-J is carried forward by Jesuits, staff, coordinators, and volunteers who
                  believe in the possibility of every young person. The leadership team holds
                  programme quality, formation, and long-term accompaniment together.
                </p>
                <p className="text-sm font-bold text-foreground">
                  Fr. Bala Bollineni, SJ
                  <span className="font-normal text-muted-foreground"> — Founder & Director</span>
                </p>
                <Button asChild className="rounded-md shadow-sm active:scale-[0.98] transition-all">
                  <Link href="/about/team">View Leadership & Team →</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
