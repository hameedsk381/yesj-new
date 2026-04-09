"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ReactConfettiBoom from 'react-confetti-boom'

export default function AnniversaryPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("anniversary-popup-seen")
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500) // Show after 1.5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    sessionStorage.setItem("anniversary-popup-seen", "true")
  }

  const handleLaunch = () => {
    setShowConfetti(true)
    // Wait for confetti to show for a bit before closing the modal
    setTimeout(() => {
      setIsOpen(false)
      sessionStorage.setItem("anniversary-popup-seen", "true")
    }, 3000)
  }

  return (
    <>
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
              className="relative w-full max-w-lg overflow-hidden rounded-md bg-white shadow-2xl"
            >
              {/* Top Banner/Image */}
              <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-primary/5">
                <Image
                  src="/anniversary.png"
                  alt="10th Anniversary"
                  fill
                  className="object-contain p-8"
                />
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/50 p-1 text-gray-500 hover:bg-white hover:text-black transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Text Content */}
              <div className="p-8 text-center space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-center mb-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                      <Sparkles className="h-3 w-3" />
                      A Milestone Year
                    </span>
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-gray-900 leading-tight">
                    10 Years of <span className="text-primary italic">YESJ Impact.</span>
                  </h2>
                  <p className="text-gray-600 font-light text-lg leading-relaxed">
                    Celebrating a decade of youth empowerment and community transformation in Andhra Pradesh and Telangana.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button 
                    onClick={handleLaunch}
                    className="h-14 rounded-md bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-lg shadow-primary/20"
                  >
                    Launch Website
                  </Button>
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

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[110]">
          <ReactConfettiBoom 
            mode="boom"
            particleCount={200}
            deg={270}
            shapeSize={15}
            x={50}
            y={50}
            colors={['#C05C00', '#1D6B44']} // Saffron and Forest Green
          />
        </div>
      )}
    </>
  )
}
