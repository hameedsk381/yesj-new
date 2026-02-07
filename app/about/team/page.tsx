"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function TeamPage() {
    const [members, setMembers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/team/")
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

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="container mx-auto px-6 text-center max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            Our <span className="text-primary italic">Team</span>
                        </motion.h1>
                        <p className="text-xl text-gray-600 font-light italic">
                            Meet the dedicated individuals driving our mission forward.
                        </p>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        {isLoading ? (
                            <div className="text-center py-12">Loading team members...</div>
                        ) : (
                            <>
                                {members.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">No team members found yet.</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                        {members.map((member, index) => (
                                            <motion.div
                                                key={member.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                                            >
                                                <div className="relative h-80 overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={member.image_path ? `http://localhost:8000/${member.image_path}` : "/placeholder.svg"}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-8">
                                                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                                    <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">{member.role}</p>
                                                    <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3">{member.bio}</p>

                                                    <div className="flex gap-4">
                                                        {member.twitter_url && (
                                                            <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                                                                <Twitter className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {member.linkedin_url && (
                                                            <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                                                                <Linkedin className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
