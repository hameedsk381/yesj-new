"use client"

import { motion } from "framer-motion"
import { BookOpen, Heart, Users, Wrench, Wand2, School, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProgramsPreview() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const programs = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary mb-4" />,
      title: "Summer Shapes",
      description: "Break the English barrier. Unlock unlimited opportunities through our 30-day residential training program.",
      link: "/programs#summer-shapes",
      image: "/assets/slider-01.jpg",
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary mb-4" />,
      title: "Multi-Skill Training",
      description: "From dropout to dignified employment with our residential skill training programs in tailoring, ICT, driving, and welding.",
      link: "/programs#must",
      image: "/assets/slider-2.jpg",
    },
    {
      icon: <Users className="h-8 w-8 text-primary mb-4" />,
      title: "Scholar Support Program",
      description: "Supporting academically gifted students to achieve their tertiary education dreams with comprehensive scholarships.",
      link: "/programs#ssp",
      image: "/assets/slider-3.jpg",
    },
    {
      icon: <Wand2 className="h-8 w-8 text-primary mb-4" />,
      title: "MAGIC Youth",
      description: "Student-led leadership development and campus community transformation.",
      link: "/programs#magic",
      image: "/assets/team-1.jpg",
    },
    {
      icon: <School className="h-8 w-8 text-primary mb-4" />,
      title: "EOTT",
      description: "Improving literacy and numeracy skills through community-based learning centers.",
      link: "/programs#eott",
      image: "/assets/eachone.png",
    },
    {
      icon: <Star className="h-8 w-8 text-primary mb-4" />,
      title: "Yuvotsavaalu",
      description: "Annual youth festival celebration with cultural performances and leadership activities.",
      link: "/programs#yuvotsavaalu",
      image: "/assets/Yuvotsavaalu.png",
    },
  ]

  return (
    <section id="programs" className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm font-light text-primary">What We Do</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h2 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl text-primary">Our Programs</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl font-extralight">
              10+ Pathways to Transformation. Comprehensive programs addressing every barrier youth face.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-lg border border-primary/10 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-5 md:p-6">
                {program.icon}
                <h3 className="text-xl font-light mb-2 text-primary">{program.title}</h3>
                <p className="text-muted-foreground font-extralight text-sm md:text-base">{program.description}</p>
                <Link
                  href={program.link}
                  className="mt-4 inline-flex items-center text-sm font-light text-accent group-hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10 md:mt-12"
        >
          <Link href="/programs">
            <Button variant="outline" className="rounded-none border-accent hover:bg-accent/10 text-accent px-6 py-3 md:px-8 md:py-4 hover:text-accent">
              Explore Programs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
