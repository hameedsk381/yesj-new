"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Anchor, Heart, Shield, Users, Zap, ArrowRight, Building2, Target } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const philosophyStatements = [
  "YES - I have dreams.",
  "YES - I am capable of fulfilling my dreams.",
  "YES - I can and I will be the dream I want to be, if only I am given the opportunity.",
]

const organizationFacts = [
  { label: "Full Name", value: "Youth Empowering Service - Jesuits (YES-J)" },
  { label: "Type", value: "Ministry of the Andhra Jesuit Province" },
  { label: "Headquarters", value: "Vijayawada, AP - 520008" },
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
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('/api/about')
        if (res.ok) {
          const about = await res.json()
          setData(about)
        }
      } catch (err) {
        console.error('Failed to fetch about content', err)
      }
    }
    fetchAbout()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main className="flex-1">
        {/* Cinematic Hero */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-16">
          <Image
            src="https://storage.googleapis.com/yesj/website/IMG_5899.JPG"
            alt="Cinematic background"
            fill
            priority
            className="object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="container relative z-10 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <Badge className="bg-primary/20 backdrop-blur-md border-primary/20 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8">
                ESTABLISHED 2016
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                BORN FOR <span className="text-primary italic">THE MARGINS</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                A Jesuit ministry. A social movement. A radical "YES" to every young person.
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button size="lg" className="bg-primary text-white h-14 px-10 rounded-full font-bold shadow-xl shadow-primary/20" asChild>
                  <a href="#story">OUR JOURNEY</a>
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white/20 h-14 px-10 rounded-full font-bold backdrop-blur-md hover:bg-white hover:text-black transition-all" asChild>
                  <Link href="/about/team">MEET THE TEAM</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-1 h-12 bg-gradient-to-b from-primary to-transparent rounded-full"
            />
          </div>
        </section>

        {/* The "Why" - Mission Section */}
        <section id="story" className="py-24 lg:py-32 bg-white">
          <div className="container px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Our Core Story</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                    Walking with the <span className="italic underline decoration-primary underline-offset-8">last, lost, and the least.</span>
                  </h3>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
                  <p>
                    YES-J was born from a conviction that every young person, regardless of background, has the capacity to live a meaningful life. Since 2016, we have walked into rural villages, urban slums, and campuses to ignite this potential.
                  </p>
                  <p className="bg-muted p-8 border-l-4 border-primary rounded-r-2xl italic text-foreground">
                    "We don't just provide services; we provide a community where a young person's 'No' from society becomes their 'YES' to the world."
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <h4 className="text-3xl font-black text-primary">50K+</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Lives Touched</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-primary">12+</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Impact Programs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
              >
                <Image
                  src="https://storage.googleapis.com/yesj/website/IMG_5986.JPG"
                  alt="Story visual"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy - The Power of YES */}
        <section className="py-24 lg:py-32 bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[150px] -mr-32" />
          <div className="container px-6 mx-auto relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/20 text-primary mb-6">
                <Target className="h-10 w-10" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">THE POWER OF <span className="text-primary not-italic">YES</span></h2>
              
              <div className="grid gap-6">
                {philosophyStatements.map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-xl md:text-2xl font-bold tracking-tight"
                  >
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ignatian Pillars - Grid */}
        <section className="py-24 lg:py-32 bg-[#fafafa]">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Our Foundation</h2>
              <h3 className="text-4xl font-black text-foreground">Ignatian Pillars</h3>
              <p className="text-muted-foreground font-medium">Principles that shape every intervention and every encounter.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ignatianPillars.map((pillar, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group"
                >
                  <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-sm">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-black mb-4 tracking-tight">{pillar.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Centre for Excellence - Call to visit */}
        <section className="py-24 lg:py-40 bg-white border-t">
          <div className="container px-6 mx-auto">
            <div className="bg-primary rounded-[4rem] px-10 py-20 lg:p-24 overflow-hidden relative text-white">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               
               <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-8 text-center lg:text-left">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">YESJ CENTRE FOR <span className="opacity-60">EXCELLENCE</span></h2>
                    <p className="text-xl text-white/80 font-medium max-w-xl mx-auto lg:mx-0">
                      Located in Vijayawada, our headquarters is a hub of youth mobilization, spiritual formation, and vocational empowerment.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-white font-black hover:gap-4 transition-all">
                      SCHEDULE A VISIT <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>
                  
                  <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl skew-y-3">
                    <Image
                      src="/yesj-building.jpg"
                      alt="The Centre"
                      fill
                      className="object-contain bg-white/10"
                    />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Org Profile - Mini Footer Section */}
        <section className="py-24 bg-[#050505] text-white">
          <div className="container px-6 mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Building2 className="text-primary h-6 w-6" />
                  <h3 className="text-xl font-black uppercase tracking-widest">Org Profile</h3>
                </div>
                <div className="space-y-4 text-sm font-medium text-white/50">
                  {organizationFacts.map((fact, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-white/80">{fact.label}</span>
                       <span>{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6 lg:col-span-2 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight leading-tight">Ready to see how we work?</h3>
                  <p className="text-white/60 max-w-xl">Meet the Jesuits and lay collaborators who carry this mission across India.</p>
                </div>
                <div>
                   <Button asChild variant="link" className="text-primary p-0 h-auto font-black text-2xl hover:no-underline hover:text-white transition-all group">
                     <Link href="/about/team">
                        MEET THE LEADERSHIP <ArrowRight className="inline-block h-6 w-6 transition-transform group-hover:translate-x-2" />
                     </Link>
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
