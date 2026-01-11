"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Flame, Megaphone, PartyPopper, Briefcase } from "lucide-react"

const notifications = [
    {
        icon: <Flame className="w-4 h-4 text-white" />,
        text: "URGENT: Summer Shapes 2025 Applications Open! Apply by Dec 31st →",
        href: "/programs"
    },
    {
        icon: <Megaphone className="w-4 h-4 text-white" />,
        text: "NEW: Scholar Support Program accepting applications for 2025-26 →",
        href: "/programs"
    },
    {
        icon: <PartyPopper className="w-4 h-4 text-white" />,
        text: "CELEBRATING: 10 years of empowering youth | 55,000+ lives transformed →",
        href: "/about"
    },
    {
        icon: <Briefcase className="w-4 h-4 text-white" />,
        text: "JOY DESK: Latest job openings for trained youth. Check opportunities →",
        href: "/programs"
    }
]

export default function NotificationBar() {
    const [isVisible, setIsVisible] = useState(true)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % notifications.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    if (!isVisible) return null

    return (
        <div className="relative z-[60] w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1 flex justify-center items-center overflow-hidden" aria-live="polite">
                    <AnimatePresence mode="wait">
                        <motion.a
                            key={current}
                            href={notifications[current].href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2 text-sm md:text-base font-medium hover:underline transition-all"
                        >
                            {notifications[current].icon}
                            <span className="truncate">{notifications[current].text}</span>
                        </motion.a>
                    </AnimatePresence>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors ml-4"
                    aria-label="Dismiss"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
