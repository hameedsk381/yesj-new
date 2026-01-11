"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import {
  GraduationCap, Wrench, User, Wand2, School,
  Briefcase, Heart, Star, Globe, ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const programs = [
  {
    id: "summer-shapes",
    title: "SUMMER SHAPES",
    tagline: "Break the English Barrier.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-primary",
    image: "/website/IMG_6787.JPG",
    description: "Residential immersion helping marginalized youth master communication and soft skills. In this cyber age, English is a vital tool for empowerment.",
    highlights: ["Residential immersion", "Public speaking", "Zero cost"],
    category: "Communication"
  },
  {
    id: "must",
    title: "MU.S.T TRAINING",
    tagline: "Skills for Dignity.",
    icon: <Wrench className="w-8 h-8" />,
    color: "bg-secondary",
    image: "/website/IMG_5986.JPG",
    description: "Vocational training in Tailoring, ICT, Driving, and Welding. We equip dropouts with certified industry skills.",
    highlights: ["Placement support", "Industry certificates", "Small batches"],
    category: "Livelihood"
  },
  {
    id: "ssp",
    title: "SCHOLAR SUPPORT",
    tagline: "Opportunity for Brilliance.",
    icon: <Star className="w-8 h-8" />,
    color: "bg-primary/80",
    image: "/website/IMG_7254.JPG",
    description: "Financial support and mentorship for high-achieving student from poverty-stricken backgrounds pursuing professional degrees.",
    highlights: ["Full tuition cover", "Academic mentoring", "Leadership dev"],
    category: "Education"
  },
  {
    id: "pep",
    title: "PERSONALITY PLUS",
    tagline: "Unleashing Potential.",
    icon: <User className="w-8 h-8" />,
    color: "bg-secondary/80",
    image: "/website/IMG_8159.JPG",
    description: "Workshops in soft skills and life skills conducted globally to build confidence and character.",
    highlights: ["Life skills", "No cost to schools", "Youth-led"],
    category: "Soft Skills"
  },
]

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Responsive Hero */}
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto space-y-8"
            >
              <Badge variant="secondary" className="px-5 py-1.5 text-sm font-bold tracking-widest uppercase">Our Pathways</Badge>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                Empowerment <br /><span className="text-primary italic">At Scale.</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                Comprehensive programs designed to dismantle every barrier between marginalized youth and their dreams.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </section>

        {/* Responsive Program Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {programs.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="rounded-[3rem] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all h-full flex flex-col group">
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-white/90 backdrop-blur-md text-primary hover:bg-white text-xs py-2 px-4 shadow-sm border-none">
                          {p.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-10 pb-0 shrink-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${p.color} text-white flex items-center justify-center`}>
                          {p.icon}
                        </div>
                        <CardTitle className="text-3xl font-black">{p.title}</CardTitle>
                      </div>
                      <CardDescription className="text-lg font-bold text-primary italic italic-primary">
                        {p.tagline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        <p className="text-gray-500 font-light leading-relaxed">
                          {p.description}
                        </p>
                        <ul className="space-y-3">
                          {p.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4 text-secondary" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-10 flex gap-3">
                        <Button className="flex-1 h-14 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/10">
                          Apply Now
                        </Button>
                        <Button variant="ghost" className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-primary/5">
                          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Support Callout */}
        <section className="py-24 bg-gray-900 overflow-hidden relative">
          {/* Soft Pink Glow */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Bridging the <span className="text-secondary italic">Gap.</span>
            </h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mb-12">
              Our programs are interconnected support systems designed to carry a young person from marginalization to leadership.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Placement Desk", sub: "Employment" },
                { label: "Faith Formation", sub: "Spirituality" },
                { label: "YY Festival", sub: "Culture" }
              ].map((box, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 px-12 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm"
                >
                  <div className="text-white font-black text-xl">{box.label}</div>
                  <div className="text-secondary font-bold text-xs uppercase tracking-widest pt-2">{box.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
