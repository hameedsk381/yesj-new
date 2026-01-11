"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Users, MapPin, GraduationCap, Target, Quote, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function ImpactPage() {
  const stats = [
    { icon: <Users />, number: "50K+", label: "Youth Impacted", color: "bg-primary" },
    { icon: <MapPin />, number: "15+", label: "Districts Active", color: "bg-primary/80" },
    { icon: <GraduationCap />, number: "3K+", label: "Leaders Trained", color: "bg-secondary" },
    { icon: <Target />, number: "85%", label: "Placement Rate", color: "bg-secondary/80" }
  ]

  const stories = [
    {
      name: "Lakshmi",
      age: 22,
      role: "Summer Shapes Graduate",
      quote: "In my village, English was a wall. YESJ helped me climb it.",
      description: "From a remote village in Guntur to a top tech firm in Hyderabad. Lakshmi's journey is one of sheer resilience and the power of language immersion.",
      metrics: [
        { label: "Salary Growth", value: "260%" },
        { label: "Confidence", value: "Peak" }
      ],
      image: "/website/IMG_6787.JPG"
    },
    {
      name: "Ravi Kumar",
      age: 35,
      role: "MuST Driving Graduate",
      quote: "I wasn't just learning to drive; I was learning to lead my family.",
      description: "Ravi was a Class 10 dropout working construction sites. Today, he's a professional driver supporting his entire family and building their first home.",
      metrics: [
        { label: "Income Boost", value: "533%" },
        { label: "Stability", value: "Solid" }
      ],
      image: "/website/IMG_5986.JPG"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Impact Hero - Responsive & Theme-Aware */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950">
          <Image src="/website/IMG_8204.JPG" alt="Impact" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/60 to-gray-950" />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Measured Transformation
              </Badge>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                Impact <br /><span className="text-secondary italic font-medium">In Resonance.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                Beyond numbers, we measure success in lives transformed, voices found, and families uplifted across the Telugu heartland.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid - Responsive Cards */}
        <section className="py-24 bg-white relative -mt-32 z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="rounded-[2.5rem] border-none shadow-2xl p-8 hover:scale-105 transition-transform">
                    <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/5`}>
                      {stat.icon}
                    </div>
                    <div className="text-5xl font-black tracking-tighter text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Stories - Fully Responsive */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Human <span className="text-primary italic">Stories.</span></h2>
                <p className="text-xl text-gray-400 font-light">Real lives reaching their radical potential through the YES movement.</p>
              </div>
              <Button variant="outline" className="rounded-full h-14 px-8 border-gray-200 text-gray-500 font-bold hover:bg-white hover:text-primary transition-all">
                View Case Studies
              </Button>
            </div>

            <div className="grid gap-12 sm:gap-16">
              {stories.map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-square rounded-[4rem] overflow-hidden shadow-2xl group">
                      <Image src={story.image} alt={story.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                      <div className="absolute top-8 left-8">
                        <Badge className="bg-white/90 backdrop-blur-md text-primary px-6 py-2 rounded-full border-none font-black uppercase text-[10px] tracking-widest">
                          {story.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-8">
                    <Quote className="w-12 h-12 text-secondary opacity-30" />
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic">
                      &quot;{story.quote}&quot;
                    </h3>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold flex items-center gap-3">
                        {story.name} <span className="text-base text-gray-400 font-light">— {story.age} Yrs</span>
                      </div>
                      <p className="text-xl text-gray-500 font-light leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                      {story.metrics.map((m, j) => (
                        <div key={j}>
                          <div className="text-3xl font-black text-primary flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                            {m.value}
                          </div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Section - Neutral Theme */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="glass-card bg-gray-900 rounded-[4rem] p-12 md:p-24 overflow-hidden relative text-center">
              {/* Decorative Pink Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -mr-64 -mt-64" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">
                  Be part of the next <span className="text-primary">50,000</span> stories.
                </h2>
                <p className="text-xl text-white/50 font-light leading-relaxed">
                  Your support fuels the programs that turn obstacles into opportunities. Every contribution writes a new chapter of empowerment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-2xl shadow-primary/20">
                    Support Mission
                  </Button>
                  <Button variant="ghost" className="h-16 px-10 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-lg font-bold">
                    Get Involved
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
