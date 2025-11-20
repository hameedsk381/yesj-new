"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function UrgentNotifications() {
  const [currentNotification, setCurrentNotification] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const notifications = [
    "🔥 URGENT: Summer Shapes 2025 Applications Open! Limited seats. Apply by Dec 31st",
    "📢 NEW: Scholar Support Program now accepting applications for academic year 2025-26",
    "🎉 CELEBRATING: 10 years of empowering youth | 50,000+ lives transformed",
    "💼 JOY DESK: Latest job openings for trained youth. Check opportunities",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length)
    }, 5000) // Change notification every 5 seconds

    return () => clearInterval(interval)
  }, [notifications.length])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 overflow-hidden">
          <div className="animate-pulse">
            <Link href="#" className="hover:underline">
              {notifications[currentNotification]}
            </Link>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}