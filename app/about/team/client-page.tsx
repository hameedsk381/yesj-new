"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Mail, Users, Shield, Target } from "lucide-react"

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
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 pt-24">
                {/* Clean Header Section */}
                <section className="py-14 sm:py-24 border-b border-border/70">
                    <div className="container mx-auto px-5 text-center max-w-3xl">
                        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Organization</p>
                        <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight mb-6">
                            Leadership Team
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Anchored in Jesuit values and driven by a commitment to youth empowerment across the Telugu states.
                        </p>
                    </div>
                </section>

                <section className="py-14 sm:py-24 bg-muted/20">
                    <div className="container mx-auto px-5">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="max-w-6xl mx-auto space-y-16">
                                
                                {/* Founder Section */}
                                {founder && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-full max-w-sm">
                                            <div className="bg-card rounded-xl p-8 border border-border shadow-sm text-center">
                                                <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 p-1">
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
                                                
                                                <h2 className="text-2xl font-bold text-foreground mb-1">{founder.name}</h2>
                                                <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wider">{founder.role}</p>
                                                
                                                <div className="flex justify-center gap-3">
                                                    <a href={founder.linkedinUrl || "#"} className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                                                        <Linkedin className="w-4 h-4" />
                                                    </a>
                                                    <a href={`mailto:${founder.email || "info@yesj.in"}`} className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Managerial Team Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {level2.map((member) => (
                                        <div
                                            key={member.id}
                                            className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
                                        >
                                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-muted">
                                                <Image 
                                                    src={member.imagePath} 
                                                    alt={member.name} 
                                                    fill 
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">{member.name}</h3>
                                            <p className="text-primary font-semibold text-xs mb-4 uppercase tracking-wider bg-primary/5 px-3 py-1 rounded-full">
                                                {member.role}
                                            </p>
                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 italic">
                                                "{member.bio}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Values Section - Standard Grid */}
                <section className="py-14 sm:py-24 border-t border-border bg-background">
                    <div className="container mx-auto px-5">
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-primary">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold">Collaborative</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Working together across all levels of the organization to achieve collective impact.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-primary">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold">Transparent</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Maintaining clear lines of communication and uphold high standards of accountability.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-primary">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold">Impact-Led</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Dedicated to empowering the last, lost, and least through meaningful action.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
