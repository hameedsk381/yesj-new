"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Users, Mail, ArrowDown } from "lucide-react"

export default function TeamPage() {
    const [members, setMembers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch("/api/team")
                if (response.ok) {
                    const data = await response.json()
                    setMembers(data)
                }
            } catch (error) {
                console.error("Failed to fetch team:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTeam()
    }, [])

    const founder = members.find(m => m.role.toLowerCase().includes("founder"))
    const level2 = members.filter(m => !m.role.toLowerCase().includes("founder"))

    return (
        <div className="flex flex-col min-h-screen bg-[#fafafa]">
            <Header />
            <main className="flex-1">
                <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
                    
                    <div className="container mx-auto px-6 relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-3xl mx-auto mb-20"
                        >
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Organization</span>
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
                                LEADER<span className="text-primary italic">SHIP</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                Anchored in Jesuit values, driven by youth empowerment.
                            </p>
                        </motion.div>

                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="max-w-6xl mx-auto relative">
                                
                                {/* Level 1: Founder */}
                                {founder && (
                                    <div className="flex flex-col items-center mb-16 relative">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="w-full max-w-sm"
                                        >
                                            <div className="bg-white rounded-[2rem] p-8 border-2 border-primary shadow-2xl relative z-20 overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                                
                                                <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 p-2">
                                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                                        <Image 
                                                            src={founder.imagePath} 
                                                            alt={founder.name} 
                                                            fill 
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="text-center relative z-10">
                                                    <h2 className="text-3xl font-black tracking-tight text-foreground mb-1">{founder.name}</h2>
                                                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">{founder.role}</p>
                                                    <div className="flex justify-center gap-4">
                                                        <button className="p-2 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all">
                                                            <Linkedin className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all">
                                                            <Mail className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        
                                        {/* Connector Down */}
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: 80 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                            className="w-0.5 bg-gradient-to-b from-primary to-primary/20 relative"
                                        >
                                            <ArrowDown className="absolute -bottom-2 -left-[7px] w-4 h-4 text-primary/40" />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Level 2: Managerial Team */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                    {/* Horizontal connection line for desktop */}
                                    <div className="hidden md:block absolute top-0 left-[16.6%] right-[16.6%] h-0.5 bg-primary/20 -translate-y-8" />
                                    
                                    {level2.map((member, idx) => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + (idx * 0.1) }}
                                            className="relative pt-8 md:pt-0"
                                        >
                                            {/* Vertical connector for desktop */}
                                            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-8 bg-primary/20 -translate-x-1/2 -translate-y-8" />
                                            
                                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden h-full flex flex-col items-center text-center">
                                                <div className="relative w-32 h-32 mb-6 rounded-2xl overflow-hidden bg-gray-50 ring-4 ring-gray-50 group-hover:ring-primary/10 transition-all">
                                                    <Image 
                                                        src={member.imagePath} 
                                                        alt={member.name} 
                                                        fill 
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        unoptimized
                                                    />
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">{member.name}</h3>
                                                <p className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4 bg-primary/5 px-3 py-1 rounded-full">
                                                    {member.role}
                                                </p>
                                                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed italic">
                                                    "{member.bio}"
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Values / Mission Section */}
                <section className="py-20 bg-black text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Collaborative</h3>
                                <p className="text-gray-400 text-sm">Working together across all levels of the organization.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Transparent</h3>
                                <p className="text-gray-400 text-sm">Clear lines of communication and accountability.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 transform rotate-6">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Impact-Led</h3>
                                <p className="text-gray-400 text-sm">Every role is dedicated to empowering the last, lost, and least.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
