"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

const partners = [
    { name: "Maruti Toyota", logo: "/placeholder.svg" },
    { name: "Skill India", logo: "/placeholder.svg" },
    { name: "Andhra Province Jesuits", logo: "/placeholder.svg" },
    { name: "MAGIC Youth", logo: "/placeholder.svg" },
    { name: "JoY Desk", logo: "/placeholder.svg" },
    { name: "Summer Shapes", logo: "/placeholder.svg" },
    { name: "CSR India", logo: "/placeholder.svg" },
    { name: "Local Parishes", logo: "/placeholder.svg" },
]

export default function Collaborators() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden" aria-labelledby="partners-heading">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 id="partners-heading" className="text-4xl font-serif font-bold text-gray-900 mb-4">Partnering for Greater Impact</h2>
                <p className="text-lg text-gray-600 italic font-light">
                    &quot;Alone we can do so little; together we can do so much&quot;
                </p>
            </div>

            <div className="relative flex overflow-x-hidden mb-12">
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

            <div className="text-center">
                <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all h-12 text-lg">
                    Become a Partner →
                </Button>
            </div>
        </section>
    )
}
