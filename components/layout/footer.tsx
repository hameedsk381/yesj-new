import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, Twitter, Youtube, Linkedin, Send } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-white pt-24 pb-12 overflow-hidden relative" role="contentinfo">
      {/* Decorative Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mb-48" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -ml-32 -mt-32" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Image
                  src="/YESJ_Logo_Black-eaf43d27.png"
                  alt="YESJ Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter italic">YESJ</span>
            </Link>
            <p className="text-white/40 font-light text-lg leading-relaxed max-w-sm">
              Empowering the youth of Andhra & Telangana since 2015. Building a legacy of service, leadership, and radical collaboration.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: siteConfig.social.instagram },
                { icon: <Facebook className="w-5 h-5" />, href: siteConfig.social.facebook },
                { icon: <Twitter className="w-5 h-5" />, href: siteConfig.social.twitter },
                { icon: <Youtube className="w-5 h-5" />, href: siteConfig.social.youtube },
                { icon: <Linkedin className="w-5 h-5" />, href: siteConfig.social.linkedin }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white/50 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-secondary">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "About", "Mission", "Programs", "Events", "Echoes", "Gallery"].map((link) => (
                <li key={link}>
                  <Link href={`/${link === "Home" ? "" : link.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors font-bold text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-secondary">Stay in Resonance</h4>
            <p className="text-white/40 text-sm font-light">Join 10,000+ subscribers and get the latest from the YESJ movement.</p>
            <div className="relative flex">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 h-16 outline-none focus:border-primary transition-all pr-20"
              />
              <button className="absolute right-2 top-2 bottom-2 w-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/80 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-4 space-y-4">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{siteConfig.contact.email}</span>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Youth Empowering Service Jesuits.
            </p>
            <span className="hidden md:block text-white/20">|</span>
            <Link
              href="https://hamathopc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
            >
              Built by Hamath OPC Pvt Ltd
            </Link>
          </div>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Cookies"].map((legal) => (
              <Link
                key={legal}
                href={`/${legal.toLowerCase()}`}
                className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                {legal}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
