"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import MobileMenu from "./mobile-menu"
import dynamic from "next/dynamic"

const NotificationBar = dynamic(() => import("@/components/layout/notification-bar"))

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/mission", label: "Mission" },
    { href: "/programs", label: "Programs" },
    { href: "/events", label: "Events" },
    { href: "/echoes", label: "Echoes" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <NotificationBar />
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500 ${scrollY > 50 ? "bg-white/80 shadow-md border-b border-gray-100" : "bg-transparent"
          }`}
        role="banner"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center shrink-0"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Image
                  src="/YESJ_Logo_Black-eaf43d27.png"
                  alt="YESJ Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:block text-2xl font-black tracking-tighter italic text-gray-900">YESJ</span>
            </Link>
          </motion.div>

          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-10"
            role="navigation"
          >
            {navItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-sm font-bold tracking-tight text-gray-600 hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="flex items-center gap-4">
            <Link href="/donate" className="hidden sm:block">
              <Button className="btn-premium rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">
                Donate Online
              </Button>
            </Link>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/5 text-primary"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />
    </>
  )
}