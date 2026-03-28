"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, ShieldCheck, Heart, Globe, Users } from "lucide-react"
import ContactForm from "@/components/shared/contact-form"
import { siteConfig } from "@/lib/config"

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Main Office",
      address: "YES-J Centre for Excellence, Andhra Loyola College Campus, Vijayawada, Andhra Pradesh - 520 008, India",
      icon: <MapPin className="w-6 h-6 text-primary" />,
      delay: 0.1
    },
    {
      title: "Direct Reach",
      phone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      icon: <Phone className="w-6 h-6 text-secondary" />,
      delay: 0.2
    },
    {
      title: "Office Hours",
      hours: "Mon - Sat: 9:00 AM - 6:00 PM IST",
      note: "Sunday & Holidays: Closed",
      icon: <Clock className="w-6 h-6 text-tertiary" />,
      delay: 0.3
    }
  ]

  const channels = [
    { title: "Programs", email: "programs@yesj.org", icon: <Globe className="w-4 h-4" /> },
    { title: "Volunteering", email: "volunteer@yesj.org", icon: <Users className="w-4 h-4" /> },
    { title: "Donations", email: "donate@yesj.org", icon: <Heart className="w-4 h-4" /> }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Contact Hero */}
        <section className="pt-32 py-16 lg:pt-36 lg:py-24 bg-background border-b border-border overflow-hidden relative">
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-black mb-6"
            >
              Start a <span className="text-primary italic">Resonance</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              Whether you&apos;re seeking support, ready to volunteer, or exploring a mission partnership—we are here to say <span className="text-secondary font-medium">YES</span>.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-md blur-[100px] -mr-48 -mt-48"></div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left Side: Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-6">
                  <h2 className="text-4xl font-serif font-black mb-4">Connect With <span className="text-primary italic">The Mission</span></h2>
                  <p className="text-gray-500 font-light text-lg">Our central hub at Andhra Loyola College is the heartbeat of our operations across the Telugu heartland.</p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: info.delay }}
                      className="flex gap-6 p-8 bg-gray-50 rounded-md border border-gray-100 hover:shadow-xl transition-all group"
                    >
                      <div className="w-14 h-14 rounded-md bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-900">{info.title}</h4>
                        {info.address && <p className="text-gray-500 font-light text-sm leading-relaxed">{info.address}</p>}
                        {info.phone && <p className="text-gray-500 font-light text-sm">{info.phone}</p>}
                        {info.email && <p className="text-primary font-bold text-sm">{info.email}</p>}
                        {info.hours && <p className="text-gray-500 font-light text-sm">{info.hours}</p>}
                        {info.note && <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{info.note}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-10 bg-primary rounded-md text-white space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-md blur-2xl -mr-16 -mt-16"></div>
                  <ShieldCheck className="w-10 h-10 text-secondary" />
                  <h3 className="text-2xl font-bold">Specific Inquiries</h3>
                  <div className="space-y-4">
                    {channels.map((chan, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        <span className="flex items-center gap-2 font-medium">
                          {chan.icon} {chan.title}
                        </span>
                        <a href={`mailto:${chan.email}`} className="text-white/60 hover:text-white transition-colors">{chan.email}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div id="contact-form" className="scroll-mt-32 lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Global Hub CTA */}
        <section className="py-16 lg:py-24 bg-background/50 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex p-4 rounded-md bg-white shadow-xl mb-8">
              <Globe className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-serif font-bold mb-6">A Network of Hope</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12">
              Beyond our main office, we operate learning centers and youth chapters in over 20+ locations. Wherever there is a need, YESJ is present.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Hyderabad", "Secunderabad", "Vijayawada", "Visakhapatnam", "Guntur", "Tirupati"].map((city, i) => (
                <span key={i} className="px-6 py-2 bg-white rounded-md border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
