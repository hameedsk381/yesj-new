"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const STORAGE_KEY = "yesj-register-popup-seen"

const EXCLUDED_PATHS = ["/register", "/member", "/admin"]

export default function RegisterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const isExcluded = EXCLUDED_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
    if (isExcluded) {
      return
    }

    const hasSeen = sessionStorage.getItem(STORAGE_KEY)
    if (hasSeen === "true") {
      return
    }

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [pathname])

  const closeModal = () => {
    setIsOpen(false)
    sessionStorage.setItem(STORAGE_KEY, "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Become a YESJ member"
            className="relative w-full max-w-lg overflow-hidden rounded-md bg-white shadow-2xl"
          >
            {/* Top Banner */}
            <div className="relative h-40 w-full bg-gradient-to-br from-primary to-primary/80">
              <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  <UserPlus className="h-3 w-3" />
                  Join the Movement
                </span>
                <h2 className="text-3xl font-black tracking-tighter text-white leading-tight">
                  Become a YESJ Member
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-1 text-white hover:bg-white/40 transition-colors"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Text Content */}
            <div className="p-8 text-center space-y-6">
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Join the Youth Empowering Service - Jesuits movement and become part of a community
                empowering young people across Andhra Pradesh and Telangana.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <Link href="/register">
                  <Button className="h-14 w-full rounded-md bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-lg shadow-primary/20">
                    Apply for Membership
                  </Button>
                </Link>
                <button
                  onClick={closeModal}
                  className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Accent line */}
            <div className="h-1.5 w-full bg-primary" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}