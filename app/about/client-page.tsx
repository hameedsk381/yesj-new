"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Target, Users, Zap, Heart, Lightbulb, Compass, Anchor, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const ignatianPillars = [
    { title: "Contemplatio Ad Amorem", sub: "(Contemplation in Action)", desc: "Finding God in the broken dreams of marginalized youth and responding with radical solidarity.", icon: <Heart className="w-6 h-6" /> },
    { title: "Imago Dei", sub: "(Image of God)", desc: "Every young person is created in God's image, carrying infinite dignity and worth.", icon: <Users className="w-6 h-6" /> },
    { title: "Cura Personalis", sub: "(Care for the Whole Person)", desc: "Holistic formation: intellectual, emotional, social, spiritual, physical.", icon: <Shield className="w-6 h-6" /> },
    { title: "Magis", sub: "(The More)", desc: "Always seeking greater justice, deeper transformation, not just incremental change.", icon: <Zap className="w-6 h-6" /> },
    { title: "Men & Women for Others", sub: "", desc: "Forming leaders who serve, not just succeed.", icon: <Anchor className="w-6 h-6" /> },
  ]

  const fivePs = [
    { title: "PURPOSE", headline: "Building a Just World", desc: "Transforming youth lives, stimulating conscience for social commitment.", icon: <Target className="w-8 h-8" /> },
    { title: "PROCESS", headline: "Integration", desc: "Long-term systematic approach with spiritual and social integration.", icon: <Compass className="w-8 h-8" /> },
    { title: "PROGRAMMES", headline: "Empowerment", desc: "10+ programs from English training to vocational skills.", icon: <Zap className="w-8 h-8" /> },
    { title: "PARTNERSHIPS", headline: "Collaboration", desc: "Fostering collaboration with like-minded individuals.", icon: <Users className="w-8 h-8" /> },
    { title: "PERSEVERANCE", headline: "Commitment", desc: "Never-Ending commitment to faith and hope.", icon: <Anchor className="w-8 h-8" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* About Hero - Responsive & Theme Aware */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-950">
          <Image
            src="/website/IMG_5899.JPG"
            alt="About YESJ"
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
          <div className="container relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge className="bg-primary text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">The YESJ Legacy</Badge>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
                Born From <br /><span className="text-secondary italic">Radical Love.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
                Reimagining youth empowerment in the Telugu heartland since 2015.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section - Modern Layout */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter shrink-0">Our <span className="text-primary italic">Story.</span></h2>
                <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
                  <p>
                    In the Telugu-speaking states, home to 85 million people, young lives encounter harsh realities daily—poverty, lack of education, and systemic exclusion.
                  </p>
                  <p className="font-bold text-gray-900 border-l-4 border-primary pl-8 italic">
                    &quot;YESJ is convinced to spread a YES in the lives of youth by giving a helping hand to dream and realize their dreams.&quot;
                  </p>
                  <p>
                    Since 2015, we&apos;ve been a beacon of light for those who are last, lost, and least. We walk alongside young people, unlashing their potential to lead meaningful lives.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <Image src="/website/IMG_5986.JPG" alt="Impact" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy - Minimal & Clean */}
        <section className="py-24 bg-gray-50 overflow-hidden relative">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tighter">The <span className="text-secondary italic">Philosophy.</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["I have Dreams", "I am capable of fulfilling them", "I Can & I Will be the Dream"].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group border border-gray-100"
                >
                  <div className="text-7xl font-black text-primary/5 group-hover:text-primary/10 transition-colors mb-4 italic leading-none">YES</div>
                  <p className="text-2xl font-bold text-gray-800 leading-tight">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ignatian Foundation - Responsive Matrix */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mt-48" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Sacred <span className="text-primary italic">Foundation.</span></h2>
                <p className="text-xl text-white/50 font-light">Ignatian spirituality meeting radical social transformation.</p>
              </div>
              <Lightbulb className="w-12 h-12 text-secondary animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ignatianPillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all group"
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                  <div className="space-y-4">
                    <h4 className="font-black text-xl italic text-secondary">{pillar.title}</h4>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{pillar.sub}</div>
                    <p className="text-white/60 font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Ps - Horizontal Scroll on Mobile / Grid on Desktop */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">The <span className="text-primary italic">YESJ Way.</span></h2>
              <p className="text-xl text-gray-400 font-light">Our framework for systemic transformation.</p>
            </div>
            <div className="flex overflow-x-auto no-scrollbar pb-12 gap-6 lg:grid lg:grid-cols-5">
              {fivePs.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="min-w-[300px] lg:min-w-0 p-10 bg-gray-50 rounded-[3rem] text-center space-y-6 flex flex-col border border-gray-100"
                >
                  <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    {p.icon}
                  </div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.title}</div>
                  <h4 className="font-black text-lg leading-tight">{p.headline}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed flex-1">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership - Focus on Mission */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[4rem] p-12 md:p-20 shadow-xl flex flex-col md:flex-row items-center gap-12 border border-gray-100">
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-8 border-gray-50 shadow-inner">
                <Image src="/website/IMG_8204.JPG" alt="Fr. Bala Bollineni SJ" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Founder & Director</Badge>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Fr. Bala Bollineni, SJ</h3>
                </div>
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                  The visionary behind the movement, Fr. Bala brings years of Jesuit ministry experience to the Telugu states. His conviction that &quot;every youth deserves a YES&quot; sparked this revolution.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-black text-primary hover:bg-transparent group">
                  Reach Out <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
