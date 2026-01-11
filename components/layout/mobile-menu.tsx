"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: { href: string; label: string }[]
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col p-8"
            ref={menuRef}
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image
                    src="/YESJ_Logo_Black-eaf43d27.png"
                    alt="YESJ Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-black italic tracking-tighter">YESJ</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between group py-4 px-6 rounded-2xl hover:bg-primary/5 transition-all"
                    onClick={onClose}
                  >
                    <span className="text-lg font-bold text-gray-700 group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link href="/donate" onClick={onClose}>
                <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-primary shadow-xl shadow-primary/20">
                  Donate Now
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                © {new Date().getFullYear()} YESJ Movement. <br /> Empowering Telugu Youth.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}