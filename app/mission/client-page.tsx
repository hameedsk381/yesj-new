"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Eye, Scale, Zap, Target, Shield, Users, Compass, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { siteConfig } from "@/lib/config"

export default function MissionPage() {
  const objectives = [
    { title: "Dream-Focused Leadership", desc: "Instilling the conviction that 'I have dreams' and providing the tools to achieve them.", icon: <Target className="w-6 h-6" /> },
    { title: "Social Consciousness", desc: "Analyzing socio-economic realities to foster commitment to justice.", icon: <Eye className="w-6 h-6" /> },
    { title: "Radical Inclusion", desc: "Walking with the last, lost, and least from rural and marginalized communities.", icon: <Users className="w-6 h-6" /> },
    { title: "Dignity & Worth", desc: "Upholding the infinite dignity of every young person as created 'Imago Dei'.", icon: <Shield className="w-6 h-6" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteConfig.url },
        { name: "Mission & Vision", url: `${siteConfig.url}/mission` },
      ]} />
      <main className="flex-1">
        {/* Page Hero - Responsive and Theme Integrated */}
        <section className="pt-32 py-16 lg:pt-36 lg:py-24 bg-gray-50 overflow-hidden relative border-b border-gray-100">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl space-y-6">
            <Badge variant="secondary" className="px-5 py-2 rounded-md font-black uppercase tracking-widest text-[10px]">The YES Identity</Badge>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none">
                Purpose <span className="text-primary italic font-medium">& Vision.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Empowering the youth of Andhra and Telangana to become agents of social change through the radical power of <span className="text-secondary font-bold">YES</span>.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-md blur-[100px] -mr-48 -mt-48" />
        </section>

        {/* Vision Section - Soft & Premium */}
        <section className="py-16 lg:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-md flex items-center justify-center text-secondary">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Our <span className="text-secondary italic">Vision.</span></h2>
                  </div>
                  <div className="p-12 bg-gray-50 rounded-md border-l-[12px] border-secondary relative">
                    <span className="absolute -top-6 -left-2 text-9xl text-secondary/10 font-serif leading-none">&quot;</span>
                    <p className="text-3xl font-light text-gray-800 leading-tight italic">
                      A just and humane world where every young person has the resources, support, and conviction to lead a life of joy, meaning, and purpose.
                    </p>
                  </div>
                </div>
              </motion.div>
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-md overflow-hidden shadow-2xl group">
                  <Image src="https://storage.googleapis.com/yesj/website/IMG_6787.JPG" alt="Vision" fill priority className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section - Deep & Impactful */}
        <section className="py-16 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
          {/* Primary Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-md blur-[120px] -mr-64 -mt-64" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Our <span className="text-primary italic">Mission.</span></h2>
                </div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/80 italic font-medium leading-tight">
                  To spread a <span className="text-secondary font-black">YES</span> in the lives of youth by giving a helping hand to dream and realize their dreams. We assist in building a just world through spiritual, social, psychological, and intellectual integration.
                </p>
              </motion.div>
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-md overflow-hidden border-8 border-white/5 shadow-2xl">
                  <Image src="https://storage.googleapis.com/yesj/website/IMG_5899.JPG" alt="Mission" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section - Clean Triad */}
        <section className="py-16 lg:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">The <span className="text-primary italic">Methodology.</span></h2>
              <p className="text-xl text-gray-400 font-light">The Ignatian way of transforming reality through See, Judge, and Act.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "SEE", desc: "Observing and analyzing social realities, especially situations of structural injustice and marginalization.", color: "text-primary", icon: <Eye className="w-10 h-10" /> },
                { title: "JUDGE", desc: "Reflecting on these realities in the light of values to form critical judgments for social commitment.", color: "text-secondary", icon: <Scale className="w-10 h-10" /> },
                { title: "ACT", desc: "Taking concrete actions to transform structures and promote human dignity and social justice.", color: "text-primary", icon: <Zap className="w-10 h-10" /> },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-gray-50 rounded-md border border-gray-100 flex flex-col items-center text-center space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <div className={`w-24 h-24 bg-white rounded-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${m.color}`}>
                    {m.icon}
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors">{m.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Objectives Section - Functional & Clean */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Core <span className="text-primary italic">Objectives.</span></h2>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">
                    Our strategic focus areas that guide every program we launch and every life we touch.
                  </p>
                </div>
                <div className="grid gap-6">
                  {objectives.map((obj, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex gap-6 p-8 bg-white rounded-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
                    >
                      <div className="w-12 h-12 shrink-0 bg-primary/5 rounded-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        {obj.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{obj.title}</h4>
                        <p className="text-gray-400 font-light text-sm">{obj.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <div className="bg-primary rounded-md p-12 md:p-20 text-white flex flex-col justify-center space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-md blur-[100px] -mr-40 -mt-40" />
                  <Users className="w-16 h-16 text-secondary" />
                  <h3 className="text-4xl font-black leading-tight">Join the Movement of Hope.</h3>
                  <p className="text-xl font-light text-white/70 leading-relaxed">
                    We are not just an organization; we are a community. Every youth we train becomes a leader for tomorrow, spreading the message that change is possible.
                  </p>
                  <div className="flex pt-4">
                    <a href="/contact" className="inline-flex items-center gap-2 px-10 h-16 bg-white text-primary rounded-md font-black shadow-xl hover:scale-105 transition-transform group">
                      Partner With Us
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
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
