"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgramIcon } from "@/components/shared/program-icon"
import { programGroups } from "@/lib/data/programs"

export default function MegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-0 top-full hidden w-full border-b border-border bg-background shadow-[0_18px_40px_rgba(25,20,13,0.08)] lg:block"
        >
          <div className="mx-auto max-w-7xl px-8 py-10">
            <div className="grid grid-cols-3 gap-12">
              {programGroups.map((group, index) => (
                <div key={group.title} className="space-y-6">
                  <h4 className="text-sm font-semibold text-foreground">
                    {group.title}
                  </h4>
                  <ul className="space-y-4">
                    {group.items.map((program) => (
                      <li key={program.slug}>
                        <Link
                          href={`/programs/${program.slug}`}
                          className="group block border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/45"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border/60 bg-card p-1">
                              <ProgramIcon name={program.icon} logo={program.logo} className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {program.shortTitle}
                              </div>
                              <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                                {program.megaMenuDescription}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {index === programGroups.length - 1 ? (
                    <div className="pt-4">
                      <Button asChild variant="ghost" className="h-auto p-0 text-sm font-semibold text-primary hover:bg-transparent hover:text-primary/80">
                        <Link href="/programs" className="flex items-center gap-2">
                          View All Programs
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
