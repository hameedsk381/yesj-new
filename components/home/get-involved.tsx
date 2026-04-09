import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const options = [
  {
    id: 1,
    title: "I am a youth seeking support",
    description:
      "Explore education, employability, scholarship, and accompaniment programmes built for young people facing barriers.",
    buttonText: "Explore programmes",
    buttonLink: "/programs",
    image: "/website/IMG_5986.JPG",
    icon: <Users className="w-6 h-6" />,
    color: "from-primary/20 to-transparent",
  },
  {
    id: 2,
    title: "I want to volunteer",
    description:
      "Support young people with your time, skills, and presence through camps, events, and community programmes.",
    buttonText: "Join as Volunteer",
    buttonLink: "/get-involved",
    image: "/website/IMG_8159.JPG",
    icon: <Heart className="w-6 h-6" />,
    color: "from-secondary/20 to-transparent",
  },
  {
    id: 3,
    title: "I want to donate",
    description:
      "Help remove financial barriers so that a young person can access training, mentorship, and opportunity.",
    buttonText: "Donate now",
    buttonLink: "/donate",
    image: "/website/IMG_5899.JPG",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-accent/20 to-transparent",
  },
]

export default function GetInvolved() {
  return (
    <section aria-labelledby="get-involved-heading" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container relative z-10 px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-[0.3em] text-[10px] font-bold border border-primary/20"
          >
            Take the Next Step
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="get-involved-heading"
            className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
          >
            How will you <span className="italic text-primary">Shape the Future?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground/80 max-w-2xl font-light"
          >
             Whether through seeking support, offering your unique skills, or funding transformation, your involvement is the spark of change.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {options.map((option, index) => (
            <motion.article 
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative h-[550px] flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 dark:border-white/5 bg-card shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-primary/10"
            >
              {/* Image Background */}
              <Image 
                src={option.image} 
                alt={option.title} 
                fill 
                className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              
              {/* Overlays */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent transition-opacity duration-700",
                option.color
              )} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {option.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                  {option.title}
                </h3>
                
                <p className="mt-4 text-sm leading-relaxed text-white/70 line-clamp-3 font-light">
                  {option.description}
                </p>
                
                <div className="mt-8 overflow-hidden">
                  <Button asChild className="h-12 w-full rounded-md bg-white text-gray-950 hover:bg-white/90 transition-all group/btn shadow-sm">
                    <Link href={option.buttonLink} className="flex items-center justify-center gap-2 font-bold">
                      {option.buttonText}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
