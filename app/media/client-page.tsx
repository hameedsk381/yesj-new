"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { PlayCircle, Flame, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MediaClientPage() {
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
                <div id="echoes" className="space-y-8 bg-[#1A1A1A] text-white p-8 md:p-12 lg:p-16 rounded-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-primary/20 p-3 rounded-md">
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold">YES-J Echoes</h2>
                        </div>
                        <p className="text-white/70 text-lg max-w-2xl leading-relaxed font-light mb-8">
                            The official YES-J impact newsletter. Distributed quarterly to our partners, volunteers, and benefactors focusing on real stories and comprehensive metrics.
                        </p>
                        <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold text-lg animate-pulse-slow">
                            Subscribe to Echoes <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
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
