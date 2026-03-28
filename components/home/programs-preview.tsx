"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { programsData } from "@/lib/data/programs"
import { ProgramIcon } from "@/components/shared/program-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProgramsPreview() {
  // Take first 8 programs for the bento preview to keep it tight
  const previewPrograms = programsData.slice(0, 8)

  return (
    <section id="programs" aria-labelledby="programs-heading" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container px-6 lg:px-12">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary uppercase tracking-[0.3em] text-xs font-bold"
            >
              <span className="h-[1px] w-8 bg-primary/50" />
              Our Initiatives
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              id="programs-heading"
              className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
            >
              Programmes that <span className="italic text-primary font-bold">Empower & Transform.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed text-muted-foreground/80 max-w-2xl font-light"
            >
              Each initiative tackles a specific barrier, from English immersion and employability to scholarships, community leadership, and spiritual formation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild variant="outline" className="h-12 px-8 rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-bold transition-all shadow-lg shadow-primary/5">
              <Link href="/programs">View All Programmes</Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:grid-rows-2">
          {previewPrograms.map((program, index) => (
            <motion.article
              key={program.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={cn(
                "group relative h-full flex flex-col overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10",
                index === 0 ? "lg:col-span-2 lg:row-span-2" : "",
                index === 1 ? "lg:col-span-1 lg:row-span-1" : "",
                index === 5 ? "lg:col-span-2 lg:row-span-1" : ""
              )}
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={program.image}
                  alt={`${program.title} programme`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl">
                   <ProgramIcon name={program.icon} logo={program.logo} className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className={cn(
                  "font-serif font-bold text-white transition-colors group-hover:text-primary",
                  index === 0 ? "text-3xl" : "text-xl"
                )}>
                  {program.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                  {program.overviewDescription}
                </p>
                <Link 
                  href={`/programs/${program.slug}`} 
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                >
                  Learn more <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
