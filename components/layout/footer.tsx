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
} from "lucide-react"
import { useState, useEffect } from "react"
import { siteConfig } from "@/lib/config"
import NewsletterForm from "@/components/shared/newsletter-form"

const defaultFooterProgramLinks = [
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

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [config, setConfig] = useState<any>(siteConfig)
  const [programLinks, setProgramLinks] = useState<any[]>(defaultFooterProgramLinks)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, programsRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/programs')
        ])
        
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setConfig(data)
        }
        
        if (programsRes.ok) {
          const programs = await programsRes.json()
          if (programs && programs.length > 0) {
            setProgramLinks(programs.map((p: any) => ({
              label: p.shortTitle || p.title,
              href: `/programs/${p.slug}`
            })))
          }
        }
      } catch (err) {
        console.error('Failed to fetch footer data', err)
      }
    }
    fetchData()
  }, [])

  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/\D/g, "")}`

  return (
    <footer className="w-full border-t border-border bg-[#16110c] pt-16 text-white" role="contentinfo">
      <div className="container px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-white/76">Stay connected</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Receive program updates, stories, and major announcements from YESJ.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/64 sm:text-base">
              The newsletter is the simplest way to follow how youth initiatives, community
              partnerships, and support opportunities are evolving.
            </p>
          </div>
          <div className="w-full">
            <NewsletterForm />
          </div>
        </motion.div>

        <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/YESJ_Logo_Black-eaf43d27.png"
                alt="YES-J logo"
                width={64}
                height={64}
                className="object-contain invert brightness-200"
              />
              <div>
                <span className="block text-2xl font-semibold tracking-[-0.04em] text-white">YESJ</span>
                <span className="text-xs text-white/56">Youth Empowering Service - Jesuits</span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-white/64">
              A Jesuit ministry accompanying underprivileged youth across Andhra Pradesh and Telangana
              through education, skill-building, leadership formation, and direct community care.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: <Instagram className="h-4 w-4" />, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: <Youtube className="h-4 w-4" />, href: siteConfig.social.youtube, label: "YouTube" },
                { icon: <Linkedin className="h-4 w-4" />, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: <MessageCircle className="h-4 w-4" />, href: whatsappUrl, label: "WhatsApp" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-white/76 transition-colors hover:border-white/24 hover:bg-white/[0.08] hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/64 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white">Programmes</h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/64 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <div className="space-y-4 text-sm text-white/64">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <p className="leading-7">
                  YESJ Centre for Excellence
                  <br />
                  Andhra Loyola College Campus
                  <br />
                  Vijayawada, AP - 520 008, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${config.contact.phone}`} className="transition-colors hover:text-white">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${config.contact.email}`} className="transition-colors hover:text-white">
                  {config.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/48 lg:flex-row lg:items-center lg:justify-between">
          <p>{currentYear} YESJ India. Andhra Jesuit Province.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
