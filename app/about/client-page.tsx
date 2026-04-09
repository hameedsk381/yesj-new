"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Anchor, Heart, Shield, Users, Zap, ArrowRight, Building2, Target } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const philosophyStatements = [
  {
    title: "YES - I have dreams.",
    desc: "Every young person carries a vision for their life that deserves to be honored and nurtured."
  },
  {
    title: "YES - I am capable of fulfilling my dreams.",
    desc: "Potential is universal; only opportunity is not. We provide the platform for that potential to flourish."
  },
  {
    title: "YES - I can and I will be the dream I want to be.",
    desc: "With the right accompaniment, hurdles become stepping stones toward a life of dignity and service."
  },
]

const organizationFacts = [
  { label: "Full Name", value: "Youth Empowering Service - Jesuits (YES-J)" },
  { label: "Type", value: "Ministry of the Andhra Jesuit Province" },
  { label: "Headquarters", value: "Vijayawada, AP" },
  { label: "Founded", value: "2016" },
  { label: "Target Group", value: "Youth aged 15-25 years" },
  { label: "States Served", value: "Andhra Pradesh and Telangana" },
]

const ignatianPillars = [
  {
    title: "Imago Dei",
    description: "Every young person carries inherent dignity and worth, independent of status or background.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Cura Personalis",
    description: "We care for the whole person: intellectual, emotional, social, spiritual, and practical.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Magis",
    description: "We seek deeper transformation, not surface-level intervention or short-term visibility.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Men and Women for Others",
    description: "Leadership at YES-J is rooted in service, solidarity, and responsibility toward the common good.",
    icon: <Heart className="h-6 w-6" />,
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Simple Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
          <Image
            src="https://storage.googleapis.com/yesj/website/IMG_5899.JPG"
            alt="YESJ Mission"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="container relative z-10 px-5 text-center sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4">Established 2016</p>
              <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
                Born for the Margins
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                A Jesuit ministry. A social movement. A radical commitment to every young person's potential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="h-12 px-8 bg-primary text-white border-none hover:bg-primary/90 shadow-lg font-bold" asChild>
                  <a href="#story">Our Story</a>
                </Button>
                <Button size="lg" className="h-12 px-8 bg-white text-primary border-none hover:bg-gray-100 shadow-lg font-bold" asChild>
                  <Link href="/about/team">Meet the Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - Welcome Section Style */}
        <section id="story" className="border-b border-border/70 bg-background">
          <div className="container px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
              <div className="space-y-5">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Our Core Story</p>
                <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                  Walking with the last, lost, and the least.
                </h2>
                <div className="max-w-lg space-y-4 text-base leading-7 text-muted-foreground">
                  <p className="text-foreground/72">
                    YES-J was born from a conviction that every young person, regardless of background, has the capacity to live a meaningful life.
                  </p>
                  <p>
                    Since 2016, we have walked into rural villages, urban slums, and campuses to ignite this potential. We don't just provide services; we provide a community where a young person's 'No' from society becomes their 'YES' to the world.
                  </p>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <h4 className="text-3xl font-semibold text-primary">50K+</h4>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Lives Touched</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-semibold text-primary">12+</h4>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Impact Programs</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="border-l-2 border-primary pl-5">
                  <p className="text-base italic leading-8 text-foreground font-medium">
                    "We provide a community where a young person's 'No' from society becomes their 'YES' to the world."
                  </p>
                </div>
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border">
                  <Image
                    src="https://storage.googleapis.com/yesj/website/IMG_5986.JPG"
                    alt="Story visual"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Dark Style from Home */}
        <section className="border-b border-border bg-[#1A1A1A] text-white">
          <div className="container px-5 py-14 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <div className="space-y-5">
                <p className="text-sm font-medium text-secondary italic uppercase tracking-wider">Our core conviction</p>
                <h2 className="max-w-xl text-3xl sm:text-4xl font-semibold tracking-tight leading-snug">
                  The Power of <span className="text-primary italic">YES</span>
                </h2>
                <p className="max-w-lg text-base leading-7 text-white/75">
                  Our philosophy is built on three fundamental affirmations that every young person deserves to hear and believe.
                </p>
              </div>

              <div className="grid gap-4">
                {philosophyStatements.map((statement, index) => (
                  <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <div className="text-xs font-medium tracking-[0.18em] text-secondary/90 uppercase">
                      Philosophy 0{index + 1}
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

        {/* Ignatian Pillars - Grid Style */}
        <section className="py-14 sm:py-24 bg-background">
          <div className="container px-5 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <p className="text-sm font-medium text-primary uppercase tracking-widest">Our Foundation</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">Ignatian Pillars</h2>
              <p className="text-muted-foreground">Principles that shape every intervention and every encounter.</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ignatianPillars.map((pillar, i) => (
                <div key={i} className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 tracking-tight text-foreground">{pillar.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Centre for Excellence */}
        <section className="py-14 sm:py-24 bg-muted/30 border-t border-border">
          <div className="container px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-sm font-medium text-primary uppercase tracking-widest">Our Headquarters</p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight">
                  YESJ Centre for Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Located in Vijayawada, our headquarters is a hub of youth mobilization, spiritual formation, and vocational empowerment.
                </p>
                <div className="space-y-4 text-sm font-medium">
                  {organizationFacts.map((fact, i) => (
                    <div key={i} className="flex justify-between border-b border-border pb-2">
                       <span className="text-foreground/80">{fact.label}</span>
                       <span className="text-foreground font-semibold">{fact.value}</span>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="p-0 h-auto font-semibold gap-2" asChild>
                  <Link href="/contact">Schedule a visit <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-border">
                <Image
                  src="/yesj-building.jpg"
                  alt="The Centre"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 bg-primary text-white">
          <div className="container px-5 text-center">
            <h2 className="text-3xl font-semibold mb-6">Want to see our team in action?</h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">Meet the Jesuits and lay collaborators who carry this mission across India.</p>
            <Button size="lg" className="h-12 px-10 bg-white text-primary border-none hover:bg-gray-100 font-bold shadow-xl" asChild>
              <Link href="/about/team">Meet the Leadership</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
