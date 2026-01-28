"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const stories = [
  {
    id: 1,
    name: "Lakshmi",
    age: 22,
    story: "I couldn't speak a single English sentence. My village laughed when I said I'd study in a English Medium College. Summer Shapes didn't just teach me English. It taught me to believe I deserve success. Today, I'm a proud graduate, supporting my entire family.",
    image: "/website/IMG_6787.JPG",
    alt: "Lakshmi, a Summer Shapes graduate, now successfully supporting her family",
    program: "Summer Shapes"
  },
  {
    id: 2,
    name: "Ravi Kumar",
    age: 35,
    story: "I dropped out after Class 10. Everyone said I'd be a daily wage labourer forever. YESJ's Driving program changed everything. Now I earn ₹25,000/month at the Maruti Toyota company. I'm building my family's first pucca house.",
    image: "/website/IMG_5986.JPG",
    alt: "Ravi Kumar, a professional driver trained by YESJ, building his first home",
    program: "Driving & Mechanic"
  },
  {
    id: 3,
    name: "Sweatha",
    age: 22,
    story: "I'm from a broken family. Graduation was an impossible dream until SSP said YES. I'm now working in a media Company. YESJ didn't just fund my education, they believed in me when no one else did.",
    image: "/website/IMG_7254.JPG",
    alt: "Sweatha, a Scholar Support Programme (SSP) beneficiary, now in a media career",
    program: "Scholar Support"
  },
]

export default function TransformationStories() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % stories.length)
  const prev = () => setCurrent((prev) => (prev - 1 + stories.length) % stories.length)

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-6 text-gray-900">
            Voices of <span className="text-primary italic">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Real stories from the youth who dared to say YES to their dreams.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 text-primary/5">
            <Quote className="w-64 h-64" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-0 items-stretch bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100"
            >
              <div className="relative h-[400px] md:h-auto min-h-[500px]">
                <Image
                  src={stories[current].image}
                  alt={stories[current].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                  <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-4">
                    {stories[current].program}
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-2">{stories[current].name}, {stories[current].age}</h3>
                </div>
              </div>

              <div className="p-10 md:p-16 flex flex-col justify-center bg-white relative">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800 italic mb-8">
                  &quot;{stories[current].story}&quot;
                </p>
                <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center md:justify-end gap-4 mt-8">
            <button
              onClick={prev}
              className="p-4 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
