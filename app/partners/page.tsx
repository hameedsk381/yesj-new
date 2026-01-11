"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Handshake, Users, TrendingUp, Globe, Heart, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: "Educational Institutions",
      icon: <Users className="w-8 h-8 text-primary" />,
      items: ["MAGIC Youth Chapters", "PEP Program Hosting", "Student Volunteer Slots", "Research Partnerships"],
      delay: 0.1
    },
    {
      title: "Corporations",
      icon: <Globe className="w-8 h-8 text-secondary" />,
      items: ["CSR Program Funding", "Skill Training Collabs", "Employee Volunteering", "Placement Partnerships"],
      delay: 0.2
    },
    {
      title: "NGOs & Community",
      icon: <Handshake className="w-8 h-8 text-teal-500" />,
      items: ["Joint Implementation", "Resource Sharing", "Network Expansion", "Best Practice Exchange"],
      delay: 0.3
    }
  ]

  const processSteps = [
    { title: "Conversation", desc: "Understanding goals and alignment." },
    { title: "Prototyping", desc: "Customized program design." },
    { title: "MOU & Planning", desc: "Formalizing the commitment." },
    { title: "Execution", desc: "Impactful implementation." }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Partner Hero */}
        <section className="py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                Strategic <span className="text-primary italic">Synergy.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                We believe in the power of collective resonance. Partner with YESJ to scale youth empowerment across Andhra & Telangana.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-16 text-xl font-bold shadow-xl border-none">
                  Initiate Partnership
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        </section>

        {/* Partner Types Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">A Network of <span className="text-primary italic">Trust</span></h2>
              <p className="text-xl text-gray-500 font-light">Diverse pathways to shared impact.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {partnerTypes.map((type, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: type.delay }}
                  className="p-12 glass-card rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all group"
                >
                  <div className="space-y-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {type.icon}
                    </div>
                    <h3 className="text-3xl font-black text-gray-900">{type.title}</h3>
                    <ul className="space-y-4">
                      {type.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="p-0 h-auto font-bold text-primary group-hover:text-secondary flex items-center gap-2 hover:bg-transparent transition-all">
                      Explore Opportunities <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">The Road to <span className="text-secondary italic">Resonance</span></h2>
              <p className="text-white/60 font-light mt-4">A clear, transparent journey to partnership.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2 -z-0"></div>

              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 bg-gray-800/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black mx-auto mb-6 text-xl shadow-lg border-4 border-gray-900">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-white/40 font-light text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl">
                <Image src="/website/IMG_6038.JPG" alt="Partnership work" fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <ShieldCheck className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-3xl font-bold">Transparent & Accountable</h3>
                  <p className="text-white/70 font-light mt-4">We provide detailed impact reports and regular audits to all our strategic partners.</p>
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">Multiply Your <span className="text-primary italic">Impact.</span></h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                  By partnering with YESJ, you aren&apos;t just donating; you are investing in the systems that create sustainable change.
                </p>
                <div className="grid gap-4">
                  {[
                    { title: "Local Insights", desc: "Expertise in the socio-cultural landscape of Telugu Heartlands." },
                    { title: "Scalable Programs", desc: "Ready-to-deploy modules for various community needs." },
                    { title: "Holistic Approach", desc: "Ignatian principles of &apos;cura personalis&apos; for total development." }
                  ].map((v, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold">{v.title}</h4>
                        <p className="text-sm text-gray-500 font-light">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">Say YES to Radical Collaboration.</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
              Let&apos;s co-create a future where every youth in Andhra & Telangana has the chance to thrive.
            </p>
            <Button className="bg-secondary text-white px-12 h-16 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform border-none">
              Contact Our Partnership Lead
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
