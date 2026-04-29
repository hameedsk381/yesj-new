"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sun, BookOpen, Bot, Monitor, Palette, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function SummerPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("summer-popup-seen")
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000) // Show after 2 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    sessionStorage.setItem("summer-popup-seen", "true")
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
            className="relative w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/10 p-1 text-gray-700 hover:bg-black/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden bg-white max-h-[95vh] flex flex-col">
              {/* Premium Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32" />
              
              <div className="relative p-6 md:p-10 lg:p-12 space-y-6 md:space-y-10 overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="text-center space-y-3 md:space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 md:px-4 py-1 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/20">
                      <Sun className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      Limited Summer Edition
                    </span>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gray-900 leading-[0.95] md:leading-[0.9]">
                    Elevate Your <br />
                    <span className="text-primary italic relative">
                      Summer Skillset.
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary/20 -z-10" />
                    </span>
                  </h2>
                  <p className="text-gray-500 font-light text-sm md:text-lg lg:text-xl max-w-lg mx-auto">
                    Master high-demand skills from <span className="font-bold text-gray-900">05 MAY - 05 JUNE</span> at the <span className="font-bold text-gray-900">YESJ Centre for Excellence.</span>
                  </p>
                </div>

                {/* Courses Premium Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { name: "English Proficiency", price: "₹1500", icon: <BookOpen className="w-4 h-4" /> },
                    { name: "AI for Kids", price: "₹1800", icon: <Bot className="w-4 h-4" /> },
                    { name: "Basic Computers", price: "₹1500", icon: <Monitor className="w-4 h-4" /> },
                    { name: "Graphic Designing", price: "₹2000", icon: <Palette className="w-4 h-4" /> },
                    { name: "Chess Coaching", price: "₹1500", icon: <Trophy className="w-4 h-4" /> },
                  ].map((course, idx) => (
                    <motion.div 
                      key={course.name}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex justify-between items-center p-3 md:p-5 rounded-md border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          {course.icon}
                        </div>
                        <span className="font-bold text-xs md:text-sm text-gray-800">{course.name}</span>
                      </div>
                      <span className="text-primary font-black text-base md:text-lg">{course.price}</span>
                    </motion.div>
                  ))}
                  <div className="flex flex-col justify-center items-center p-3 md:p-5 rounded-md border-2 border-dashed border-gray-100 bg-gray-50/30 text-center">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 md:mb-1">Batch Capacity</p>
                    <p className="text-xs md:text-sm font-bold text-gray-600">40 Exclusive Seats</p>
                  </div>
                </div>

                {/* Modern Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 pt-6 md:pt-8 border-t border-gray-100">
                  <div className="flex gap-8 md:gap-10">
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Batches</p>
                      <p className="text-xs md:text-sm font-bold text-gray-900">Varies by Course</p>
                    </div>
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Duration</p>
                      <p className="text-xs md:text-sm font-bold text-gray-900">Certificate</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 md:gap-4 w-full md:w-auto">
                    <Button asChild className="h-12 md:h-14 w-full md:px-12 rounded-md bg-primary hover:bg-primary/90 text-white font-black text-base md:text-lg shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                      <Link href="/summer-courses" onClick={closeModal}>
                        Secure Your Spot
                      </Link>
                    </Button>
                    <button 
                      onClick={closeModal}
                      className="text-[9px] md:text-[10px] text-gray-400 hover:text-primary font-black uppercase tracking-[0.2em] transition-colors py-1"
                    >
                      Maybe another time
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="flex h-1 md:h-1.5 w-full shrink-0">
                <div className="flex-1 bg-primary" />
                <div className="flex-1 bg-secondary" />
                <div className="flex-1 bg-tertiary" />
              </div>
            </div>

            {/* Accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-primary to-orange-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
