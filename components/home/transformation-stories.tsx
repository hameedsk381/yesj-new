"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const stories = [
  {
    id: 1,
    name: "Lakshmi",
    age: 22,
    story:
      "I could not speak a single English sentence. Summer Shapes did not only teach me English. It taught me to believe that I deserve success. Today I am a graduate supporting my family.",
    image: "/website/IMG_6787.JPG",
    alt: "Lakshmi, a Summer Shapes graduate",
    program: "Summer Shapes",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    age: 35,
    story:
      "After dropping out after class 10, I thought daily wage labour would be my future. YESJ's driving programme changed that. I now earn a steady income and I am building my family's first pucca house.",
    image: "/website/IMG_5986.JPG",
    alt: "Ravi Kumar, a professional driver trained through YESJ",
    program: "Driving and mechanic training",
  },
  {
    id: 3,
    name: "Sweatha",
    age: 22,
    story:
      "Graduation felt impossible until SSP said yes. I now work in media, and the biggest change was not only financial support. YESJ believed in me when no one else did.",
    image: "/website/IMG_7254.JPG",
    alt: "Sweatha, a Scholar Support Programme beneficiary",
    program: "Scholar Support Programme",
  },
]

export default function TransformationStories() {
  return (
    <section aria-labelledby="stories-heading" className="relative overflow-hidden bg-background py-24 lg:py-40">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="mb-24 flex flex-col items-center text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary uppercase tracking-[0.4em] text-xs font-bold"
          >
            Human Impact
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="stories-heading" 
            className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight max-w-4xl"
          >
            Voices of Resilience: <span className="italic text-primary">Finding a Way Forward</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground/80 max-w-2xl font-light"
          >
            Transformation is not just a statistical goal; it&apos;s a personal journey of rediscovering dignity and purpose.
          </motion.p>
        </div>

        <div className="space-y-32">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex flex-col lg:items-center gap-12 lg:gap-24",
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              <div className="relative flex-1 group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl border border-white/10">
                  <Image 
                    src={story.image} 
                    alt={story.alt} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-primary px-3 py-1 rounded-full mb-2 inline-block">
                      {story.program}
                    </span>
                  </div>
                </div>
                {/* Decorative element for asymmetrical look */}
                <div className={cn(
                  "absolute -z-10 w-full h-full border border-primary/20 rounded-[2rem] translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2",
                  index % 2 === 1 ? "-translate-x-8" : "translate-x-8"
                )} />
              </div>

              <div className="flex-1 space-y-8 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute -top-12 -left-8 text-primary"
                >
                  <Quote size={120} />
                </motion.div>
                
                <div className="relative space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold italic text-foreground/90 leading-tight">
                    &ldquo;{story.story}&rdquo;
                  </h3>
                  
                  <div className="pt-6 border-t border-white/10 flex items-center gap-6">
                    <div className="space-y-1">
                      <div className="text-2xl font-serif font-bold text-primary">{story.name}</div>
                      <div className="text-sm text-muted-foreground/60 uppercase tracking-widest font-bold">
                        {story.age} years old • {story.program}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
