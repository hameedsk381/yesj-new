"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { PlayCircle, Flame, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MediaClientPage() {
  const [echoesList, setEchoesList] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/echoes?limit=3").then(res => res.json()).then(data => setEchoesList(data))
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1" id="main-content" role="main">
        {/* Media Hero */}
        <section className="relative pt-32 py-24 lg:pt-36 lg:py-32 bg-background overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] mix-blend-multiply pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-card border border-border shadow-sm mb-6"
                >
                    <Flame className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">YES-J Goes Digital</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-foreground tracking-tight mb-8 text-balance"
                >
                    Media <span className="text-secondary italic">&</span> Echoes
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
                >
                    Social consciousness, youth conversations, and life skills delivered directly where young people already are.
                </motion.p>
            </div>
        </section>

        {/* Media Grids */}
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-6 grid gap-16 lg:gap-24">
                
                {/* Youth Blaze Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <Flame className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-serif font-bold text-foreground">Youth Blaze</h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed font-light">
                        Our flagship youth media channel. Bold, relevant, and unapologetic conversations holding a mirror to society.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group relative rounded-md overflow-hidden bg-gray-900 aspect-video shadow-md border border-gray-200 cursor-pointer">
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="bg-white/90 text-primary rounded-full p-4 transform scale-90 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                        <PlayCircle className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 z-10">
                                    <h3 className="text-white font-bold max-w-[80%]">Youth Blaze Episode 0{item} - Coming Soon</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PEP Pause Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <PlaySquare className="w-8 h-8 text-secondary" />
                        <h2 className="text-3xl font-serif font-bold text-foreground">PEP Pause</h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed font-light">
                        Bite-sized life skills and personality content. Watch one. Grow a little. Formatted for Instagram Reels and YouTube Shorts.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group relative rounded-md overflow-hidden bg-gray-900 aspect-[9/16] shadow-md border border-gray-200 cursor-pointer">
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="bg-white/90 text-secondary rounded-full p-3 transform scale-90 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                                    <h3 className="text-white text-sm font-bold">PEP Pause Insight #{item}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Echoes Newsletter Section */}
                <div id="echoes" className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <FileText className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-serif font-bold text-foreground">YES-J Echoes</h2>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-light">
                                Our quarterly impact newsletter. Focusing on real stories of transformation and comprehensive metrics from the field.
                            </p>
                        </div>
                        <Button asChild variant="outline" className="h-12 px-6">
                            <Link href="/echoes">View Full Archive <ArrowRight className="w-5 h-5 ml-2" /></Link>
                        </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {echoesList.length === 0 ? (
                            <div className="col-span-full py-20 text-center border rounded-md border-dashed text-muted-foreground font-light">
                                Official releases are uploaded periodically. Check back soon.
                            </div>
                        ) : (
                            echoesList.map((echo) => (
                                <div key={echo.id} className="group cursor-pointer">
                                    <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-gray-100 shadow-md border border-border/50 mb-4 font-light">
                                        {echo.thumbnailPath ? (
                                            <Image src={echo.thumbnailPath} alt={echo.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-primary/10 bg-primary/5">
                                                <FileText size={80} strokeWidth={1} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <a href={echo.filePath} target="_blank" rel="noopener noreferrer" className="bg-white text-primary p-4 rounded-full shadow-xl">
                                                <FileText />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{echo.edition}</div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{echo.title}</h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

function PlaySquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 8 6 4-6 4Z" />
    </svg>
  )
}
