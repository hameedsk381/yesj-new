"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { programsData } from "@/lib/data/programs"
import { ProgramIcon } from "@/components/shared/program-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProgramsPreview() {
  const previewPrograms = programsData.slice(0, 8)

  return (
    <section id="programs" aria-labelledby="programs-heading" className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
      <div className="container px-5 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary"
            >
              Programmes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              id="programs-heading"
              className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl"
            >
              Every initiative responds to a barrier that shapes a young person&apos;s future.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="max-w-2xl text-base leading-7 text-muted-foreground"
            >
              YESJ connects English immersion, vocational training, scholarships, volunteering, and
              youth formation so support is practical, local, and sustained.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <Button asChild variant="outline" className="h-11 px-5 text-sm font-semibold">
              <Link href="/programs">View All Programmes</Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewPrograms.map((program, index) => (
            <motion.article
              key={program.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-colors duration-300 hover:border-primary/25",
                index === 0 ? "sm:col-span-2" : ""
              )}
            >
              <div className={cn("h-1 w-full", program.cardBarClassName)} />

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={program.image}
                  alt={`${program.title} programme`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-primary">{program.badge}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
                      {program.title}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                    <ProgramIcon
                      name={program.icon}
                      logo={program.logo}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  {program.overviewDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {program.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
