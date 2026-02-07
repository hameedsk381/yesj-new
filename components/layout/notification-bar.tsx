"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Flame, Megaphone, Trophy, Briefcase } from "lucide-react"
import Link from "next/link"

const notifications = [
    {
        id: 1,
        icon: <Flame className="w-4 h-4" />,
        text: "Apply Now: Summer Shapes Residential Program 2025 →",
        href: "/programs"
    },
    {
        id: 2,
        icon: <Megaphone className="w-4 h-4" />,
        text: "Scholar Support Program: Applications Open for 2025-26 →",
        href: "/programs"
    },
    {
        id: 3,
        icon: <Trophy className="w-4 h-4" />,
        text: "Celebrating 10 Years: 55,000+ Lives Transformed →",
        href: "/about"
    },
    {
        id: 4,
        icon: <Briefcase className="w-4 h-4" />,
        text: "Job Openings: Check Latest Opportunities for Trained Youth →",
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
        <div className="relative z-[60] w-full bg-primary text-white py-2 px-4 shadow-sm border-b border-primary/20">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1 flex justify-center items-center overflow-hidden h-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={notifications[current].id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute"
                        >
                            <Link
                                href={notifications[current].href}
                                className="flex items-center gap-2 text-xs md:text-sm font-bold hover:underline decoration-white/50 underline-offset-4 tracking-wide"
                            >
                                {notifications[current].icon}
                                <span>{notifications[current].text}</span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors ml-4 z-10"
                    aria-label="Dismiss notification"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}
