"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import MobileMenu from "./mobile-menu"
import dynamic from "next/dynamic"

const UrgentNotifications = dynamic(() => import("@/components/home/urgent-notifications"))

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
      <UrgentNotifications />
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${scrollY > 50 ? "bg-white/90 shadow-sm" : "bg-transparent"
          }`}
        role="banner"
      >
        <div className="container flex h-20 items-center justify-between py-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" aria-label="Go to YESJ homepage">
              <div className="flex items-center">
                <Image
                  src="/YESJ_Logo_Black-eaf43d27.png"
                  alt="YESJ Logo"
                  width={50}
                  height={50}
                  className="rounded-full md:w-12 md:h-12 lg:w-14 lg:h-14"
                />
              </div>
            </Link>
          </motion.div>
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-sm font-light hover:text-primary transition-colors"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>
      </header>

      {isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />}
    </>
  )
}