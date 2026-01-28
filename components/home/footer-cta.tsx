"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function FooterCTA() {
    return (
        <section className="relative py-24 overflow-hidden" aria-labelledby="footer-cta-heading">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/website/IMG_5899.JPG"
                    alt="Group of empowered youth celebrating their achievements"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/80"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-10"
                >
                    <h2 id="footer-cta-heading" className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                        The harvest is plentiful. <br />
                        <span className="text-secondary italic">Will you answer the call?</span>
                    </h2>

                    <div className="space-y-6 text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                        <p>Every 8 minutes, a youth in our region drops out of school.</p>
                        <p>Every hour, dozens lose hope in their dreams.</p>
                        <p className="text-3xl font-serif font-bold pt-4">But every day, YESJ says: <span className="underline decoration-secondary decoration-4 underline-offset-4">Your story doesn&apos;t end here.</span></p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 pt-8">
                        <Link href="/programs">
                            <Button size="lg" className="btn-premium rounded-full px-10 h-16 text-xl bg-primary hover:bg-primary/90 text-white border-none shadow-xl shadow-primary/20" aria-label="Apply to join a YESJ program">
                                Apply to Program
                            </Button>
                        </Link>
                        <Link href="/get-involved">
                            <Button size="lg" className="btn-premium rounded-full px-10 h-16 text-xl bg-white text-primary hover:bg-white/90 shadow-xl" aria-label="Learn how to volunteer with YESJ">
                                Volunteer
                            </Button>
                        </Link>
                        <Link href="/donate">
                            <Button size="lg" className="btn-premium rounded-full px-10 h-16 text-xl bg-secondary text-white hover:bg-secondary/90 shadow-xl shadow-secondary/20" aria-label="Donate now to support youth empowerment">
                                Donate Now
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
