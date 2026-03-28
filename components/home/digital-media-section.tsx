import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, Flame, PlaySquare, type LucideIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DigitalPillar = {
  icon: LucideIcon
  title: string
  description: string
  link: string
  color: string
}

const digitalPillars: DigitalPillar[] = [
  {
    icon: Flame,
    title: "Youth Blaze",
    description: "A channel for youth conversations, social reflection, and current issues.",
    link: "/media#youth-blaze",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: PlaySquare,
    title: "PEP Pause",
    description: "Short life-skills content designed for practical use by students and young adults.",
    link: "/media#pep-pause",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Eye,
    title: "Social Consciousness",
    description: "Media that questions systems, surfaces realities, and invites public responsibility.",
    link: "/media#social-consciousness",
    color: "from-emerald-500/20 to-teal-500/20",
  },
]

export default function DigitalMediaSection() {
  return (
    <section aria-labelledby="digital-media-heading" className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-30" />
      
      <div className="container relative z-10 px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary uppercase tracking-[0.3em] text-xs font-bold"
            >
              <span className="h-[1px] w-8 bg-primary/50" />
              Media and Reflection
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              id="digital-media-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight"
            >
              Building a <br />
              <span className="italic text-primary">Public Voice</span> for Youth
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed text-muted-foreground/80 max-w-xl font-light"
            >
              Through youth conversations, short learning formats, and public reflection, our media reaches young people where they are, surfacing realities and inviting responsibility.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Button asChild className="h-14 px-10 bg-primary/10 hover:bg-primary/20 text-primary border-none rounded-full text-lg font-bold transition-all group">
                <Link href="/media#echoes" className="flex items-center gap-2">
                  Explore Media Hub
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-6">
            {digitalPillars.map((pillar, index) => {
              const Icon = pillar.icon

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={pillar.link}
                    className="group block relative overflow-hidden rounded-[2rem] border border-white/10 dark:border-white/5 bg-card p-1 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                      pillar.color
                    )} />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 p-8 bg-card/40 backdrop-blur-xl rounded-[1.9rem]">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.2rem] bg-background border border-white/10 text-primary shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70 group-hover:text-muted-foreground transition-colors font-light">
                          {pillar.description}
                        </p>
                      </div>
                      <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden sm:block">
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
