"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Star, Gift, Backpack, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VolunteerPage() {
  const fourTs = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "TIME",
      subtitle: "Commitment Levels",
      description: "Whether it's an hour of counseling or a year of leadership, your time is our most valuable asset.",
      commitments: [
        { level: "Micro (1-5 hours)", description: "Guest speaker, Counseling" },
        { level: "Short-term (1-4 weeks)", description: "Summer Shapes assistant" },
        { level: "Long-term (3-12 months)", description: "VIP, Program coordination" }
      ],
      color: "blue"
    },
    {
      icon: <Star className="w-8 h-8 text-secondary" />,
      title: "TALENT",
      subtitle: "Skills We Need",
      description: "Your professional expertise can jumpstart a youth's career. We need your specialized skills.",
      commitments: [
        "Digital Marketing",
        "Coding & IT Support",
        "Psychological Counseling",
        "Legal & Financial Advice",
        "Creative Design"
      ],
      color: "pink"
    },
    {
      icon: <Gift className="w-8 h-8 text-teal-500" />,
      title: "TREASURE",
      subtitle: "Financial Support",
      description: "Your financial gifts power our infrastructure and provide scholarships to those in need.",
      commitments: [
        "Monthly Partner Program",
        "Scholarship Sponsorship",
        "Infrastructure Grants",
        "Emergency Relief Fund"
      ],
      color: "teal"
    },
    {
      icon: <Backpack className="w-8 h-8 text-orange-500" />,
      title: "TESTIMONY",
      subtitle: "Be an Ambassador",
      description: "Use your voice to spread the mission. Become a digital ambassador for youth empowerment.",
      commitments: [
        "Social Media Advocacy",
        "Hosting Awareness Events",
        "Community Outreach",
        "Networking Support"
      ],
      color: "orange"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-gray-50 overflow-hidden relative border-b border-gray-100">
          <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                Your <span className="text-primary italic">YES</span> Changes <br />Everything.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Join a legacy of service that has been empowering Telugu youth since 2015. There are four powerful ways to fuel the movement.
              </p>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-16 text-xl font-bold shadow-xl border-none">
                Register as Volunteer
              </Button>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </section>

        {/* 4 T's Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {fourTs.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 glass-card rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {t.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-black text-gray-900 group-hover:text-primary transition-colors">{t.title}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">{t.subtitle}</p>
                    </div>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                      {t.description}
                    </p>
                    <ul className="space-y-3 pt-4 border-t border-gray-50">
                      {t.commitments.map((c, j) => (
                        <li key={j} className="flex gap-2 text-sm text-gray-600 font-medium items-start">
                          <span className="text-primary mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                          {typeof c === 'string' ? c : <span><strong>{c.level}:</strong> {c.description}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="ghost" className="mt-8 p-0 h-auto hover:bg-transparent text-primary font-bold hover:gap-4 transition-all flex items-center gap-2 group-hover:text-secondary">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Volunteer */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Beyond Service: <br />The <span className="text-primary">Worker Journey</span></h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  Volunteering at YESJ is not just about what you give. It&apos;s about who you become. Our &apos;Ignitors&apos; find purpose, leadership, and a lifelong family.
                </p>
                <div className="grid gap-6">
                  {[
                    { title: "Personal Mastery", desc: "Gain critical social analysis skills and Ignatian leadership training." },
                    { title: "Community Hub", desc: "Access a wide network of Jesuits and professionals globally." },
                    { title: "Verified Service", desc: "Receive certificates and recommendations for career growth." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl">
                <Image src="/website/IMG_6045.JPG" alt="Volunteer" width={1920} height={1080} className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <p className="text-2xl font-medium italic">&quot;YESJ didn't just ask for my help; it asked for my heart. I found my voice here.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/5 opacity-10">
            <Image src="/website/IMG_8233.JPG" alt="CTA backdrop" fill className="object-cover" />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">Say YES to the Movement.</h2>
            <Button className="bg-secondary text-white px-12 h-16 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform border-none">
              Start Your Journey Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
