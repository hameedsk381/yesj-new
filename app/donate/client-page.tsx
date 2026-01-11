"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Heart, ShieldCheck, TrendingUp, Users, DollarSign, ArrowRight, CheckCircle2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DonatePage() {
  const sponsorshipTiers = [
    {
      amount: "₹25,000",
      title: "Summer Shapes Participant",
      desc: "Full 30-day residential program with progress reports and a personal meet-up option.",
      icon: <Users className="w-6 h-6 text-primary" />,
      delay: 0.1
    },
    {
      amount: "₹50,000",
      title: "MuST Training Student",
      desc: "Complete vocational training including job placement support and documented transformation.",
      icon: <Award className="w-6 h-6 text-secondary" />,
      delay: 0.2
    },
    {
      amount: "₹1,00,000",
      title: "EOTT Learning Center",
      desc: "Support 50+ children's literacy, employ one ignitor, and gain named center recognition.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      delay: 0.3
    },
    {
      amount: "₹2,00,000",
      title: "Scholar (SSP) - Per Year",
      desc: "Full academic year support with mentorship and annual holistic updates.",
      icon: <DollarSign className="w-6 h-6 text-secondary" />,
      delay: 0.4
    }
  ]

  const recognitionLevels = [
    {
      level: "All Donors",
      benefits: ["Tax exemption certificate (80G)", "Email impact updates", "Annual report delivery", "YESJ event invitations"]
    },
    {
      level: "Major Donors (₹1L+)",
      benefits: ["Personalized impact reports", "Site visit opportunities", "Website recognition", "Naming opportunities"]
    },
    {
      level: "Founding Circle (₹10L+)",
      benefits: ["Board member interaction", "Strategic program input", "Permanent recognition", "Legacy partnership status"]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Donate Hero */}
        <section className="py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                Invest in <br /><span className="text-primary italic">Futures.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Your generosity fuels the programs that empower 50,000+ youth across Telugu states to break barriers and build futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-16 text-xl font-bold shadow-xl border-none">
                  Donate Online
                </Button>
                <Button variant="outline" className="rounded-full border-gray-200 text-gray-900 bg-white hover:bg-gray-50 px-10 h-16 text-xl font-bold transition-all">
                  Bank Transfer Info
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mt-48"></div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Pathway 2: <span className="text-primary italic">Sponsorship</span></h2>
              <p className="text-xl text-gray-500 font-light italic">Direct impact, radical transformation.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {sponsorshipTiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: tier.delay }}
                  className="p-10 glass-card rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-primary">{tier.amount}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{tier.title}</p>
                    </div>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{tier.desc}</p>
                  </div>
                  <Button variant="ghost" className="mt-8 p-0 h-auto font-bold text-primary group-hover:text-secondary flex items-center gap-2 hover:bg-transparent transition-all">
                    Sponsor Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Levels */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">Your Legacy of <span className="text-primary italic">Kindness.</span></h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                  Every contribution is a brick in the foundation of a youth&apos;s dream. We value and honor every partner in this journey.
                </p>
                <div className="space-y-4">
                  {recognitionLevels.map((lvl, i) => (
                    <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                      <h4 className="text-xl font-bold text-primary mb-4">{lvl.level}</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {lvl.benefits.map((b, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-secondary" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[700px] w-full rounded-[4.5rem] overflow-hidden shadow-2xl">
                <Image src="/website/IMG_6034.JPG" alt="Donor impact" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <ShieldCheck className="w-12 h-12 text-secondary mb-6" />
                  <h3 className="text-4xl font-bold italic leading-tight">&quot;The best way to find yourself is to lose yourself in the service of others.&quot;</h3>
                  <p className="mt-4 text-white/70 font-light tracking-widest uppercase text-xs">Mahatma Gandhi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Transparency */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Trust & <span className="text-primary">Transparency</span></h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
              YESJ is committed to the highest standards of financial accountability. All donations are tax-exempt under Section 80G. We provide detailed impact audits and financial statements to our community annually.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="font-bold">FCRA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="font-bold">80G Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="font-bold">Annual Audits</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/5 opacity-10">
            <Image src="/website/IMG_8204.JPG" alt="CTA focus" fill className="object-cover" />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic text-secondary">Make Your YES Count.</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light">
              Your support is the resonance that echoes through generations. Every gift, large or small, creates a ripple of hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-gray-900 border-none px-12 h-16 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform">
                Donate Online Immediately
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-12 h-16 rounded-full text-xl font-bold">
                Contact Development Office
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
