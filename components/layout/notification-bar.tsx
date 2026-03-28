"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, X } from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    text: "Applications Open: English Proficiency Course (EPC) - Summer 2026",
    ctaLabel: "Apply Now",
    href: "/programs/summer-shapes",
  },
  {
    id: 2,
    text: "Summer Shapes 2026 registrations are open for the free residential programme",
    ctaLabel: "Register",
    href: "/programs/summer-shapes",
  },
  {
    id: 3,
    text: "MAGIS Youth Festival is coming soon in Vijayawada",
    ctaLabel: "Know More",
    href: "/programs/magis",
  },
  {
    id: 4,
    text: "YES-J is looking for volunteers to join the VIP programme",
    ctaLabel: "Apply",
    href: "/volunteer",
  },
]

const STORAGE_KEY = "yesj-notification-dismissed"

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY)
    setIsVisible(dismissed !== "true")
  }, [])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % notifications.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  const currentNotification = notifications[current]

  return (
    <div className="border-b border-accent/50 bg-accent text-foreground">
      <div className="container flex min-h-11 items-center gap-3 px-5 py-2 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2 text-sm font-medium">
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span>Announcement</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNotification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center"
            >
              <p className="truncate text-sm text-foreground/80">{currentNotification.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <Link href={currentNotification.href} className="shrink-0 text-sm font-semibold text-primary hover:underline">
          {currentNotification.ctaLabel} &rarr;
        </Link>

        <button
          type="button"
          onClick={() => {
            window.sessionStorage.setItem(STORAGE_KEY, "true")
            setIsVisible(false)
          }}
          className="rounded-md p-1 transition-colors hover:bg-black/5"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
