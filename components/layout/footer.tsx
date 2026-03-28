"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Youtube, 
  ArrowUpRight,
  Heart
} from "lucide-react"
import { siteConfig } from "@/lib/config"
import NewsletterForm from "@/components/shared/newsletter-form"
import { cn } from "@/lib/utils"

const footerProgramLinks = [
  { label: "Summer Shapes", href: "/programs/summer-shapes" },
  { label: "Scholar Support (SSP)", href: "/programs/ssp" },
  { label: "MAGIC Youth", href: "/programs/magic" },
  { label: "Personality Enhancement (PEP)", href: "/programs/pep" },
  { label: "Multi Skilled (MuST)", href: "/programs/must" },
  { label: "JoY Desk", href: "/programs/joy-desk" },
]

const quickLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Programmes", href: "/programs" },
  { label: "Impact & Data", href: "/impact" },
  { label: "Media Hub", href: "/media" },
  { label: "Contact", href: "/contact" },
]

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-gray-950 overflow-hidden font-sans pt-24" role="contentinfo">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-20" />

      <div className="container relative z-10 px-6 lg:px-12">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 overflow-hidden rounded-[3rem] p-1 glass-card border border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-10 lg:p-16 bg-gray-900/40 backdrop-blur-2xl rounded-[2.9rem]">
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
                Fuel the <span className="italic text-primary">Movement.</span>
              </h3>
              <p className="text-lg text-white/60 font-light max-w-xl">
                Get program updates, youth stories, and impact reports delivered straight to your inbox. Stay connected with the YESJ community.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-flex items-center gap-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src="/YESJ_Logo_Black-eaf43d27.png"
                  alt="YES-J logo"
                  width={80}
                  height={80}
                  className="relative object-contain invert brightness-200"
                />
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold tracking-tight text-white group-hover:text-primary transition-colors">YESJ</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-white/60 transition-colors">
                  Youth Empowering Service
                </span>
              </div>
            </Link>

            <p className="max-w-md text-base leading-relaxed text-white/50 font-light">
              We say <span className="italic text-white">YES</span> when the world says no. A Jesuit ministry empowering underprivileged youth ages 15-25 across Andhra Pradesh and Telangana through radical accompaniment and skill-building since 2016.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: <Instagram className="h-5 w-5" />, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: <Youtube className="h-5 w-5" />, href: siteConfig.social.youtube, label: "YouTube" },
                { icon: <Linkedin className="h-5 w-5" />, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: <MessageCircle className="h-5 w-5" />, href: whatsappUrl, label: "WhatsApp" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-white hover:text-gray-950 hover:border-white shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Connect</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary font-medium"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Programmes</h4>
            <ul className="space-y-4">
              {footerProgramLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Contact</h4>
            <div className="space-y-6 text-sm text-white/60">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />
                <p className="leading-relaxed font-light">
                  YESJ Centre for Excellence<br />
                  Andhra Loyola College Campus<br />
                  Vijayawada, AP - 520 008, India
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-white font-medium">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-white font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-[11px] uppercase tracking-widest text-white/30 font-bold">
            <div className="flex items-center gap-4">
              <span>© {currentYear} YESJ India</span>
              <span className="h-1 w-1 bg-white/10 rounded-full" />
              <span>Andhra Jesuit Province</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              Handcrafted with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for Youth
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
