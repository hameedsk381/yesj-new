"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
    { name: "Maruti Toyota", logo: "/placeholder-logo.svg" },
    { name: "Skill India", logo: "/placeholder-logo.svg" },
    { name: "Andhra Province Jesuits", logo: "/placeholder-logo.svg" },
    { name: "MAGIC Youth", logo: "/placeholder-logo.svg" },
    { name: "JoY Desk", logo: "/placeholder-logo.svg" },
    { name: "Summer Shapes", logo: "/placeholder-logo.svg" },
    { name: "CSR India", logo: "/placeholder-logo.svg" },
    { name: "Local Parishes", logo: "/placeholder-logo.svg" },
]

export default function Collaborators() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden" aria-labelledby="partners-heading">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 id="partners-heading" className="text-3xl font-bold text-gray-900 mb-4">Partnering for Greater Impact</h2>
                <p className="text-lg text-gray-600 italic">
                    &quot;Alone we can do so little; together we can do so much&quot; – Helen Keller
                </p>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="animate-scroll flex whitespace-nowrap">
                    {[...partners, ...partners].map((partner, index) => (
                        <div key={index} className="flex items-center justify-center mx-12 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative h-16 w-32">
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">{partner.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 border border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Find out how to become a partner"
                >
                    Become a Partner →
                </motion.button>
            </div>
        </section>
    )
}
