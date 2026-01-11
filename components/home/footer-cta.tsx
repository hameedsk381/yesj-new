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
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <h2 id="footer-cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        The harvest is plentiful. <br />
                        <span className="text-secondary">Will you answer the call?</span>
                    </h2>

                    <div className="space-y-4 text-xl md:text-2xl text-white/90 font-light">
                        <p>Every 8 minutes, a youth in our region drops out of school.</p>
                        <p>Every hour, dozens lose hope in their dreams.</p>
                        <p className="text-3xl font-bold pt-4">But every day, YESJ says: <span className="underline decoration-secondary">Your story doesn&apos;t end here.</span></p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <Link href="/programs">
                            <Button size="lg" className="btn-premium rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 text-white border-none" aria-label="Apply to join a YESJ program">
                                Apply to Program
                            </Button>
                        </Link>
                        <Link href="/get-involved">
                            <Button size="lg" className="btn-premium rounded-full px-8 h-14 text-lg bg-white text-primary hover:bg-white/90" aria-label="Learn how to volunteer with YESJ">
                                Volunteer
                            </Button>
                        </Link>
                        <Link href="/donate">
                            <Button size="lg" className="btn-premium rounded-full px-8 h-14 text-lg bg-secondary text-white hover:bg-secondary/90" aria-label="Donate now to support youth empowerment">
                                Donate Now
                            </Button>
                        </Link>
                        <Link href="/partners">
                            <Button size="lg" className="btn-premium rounded-full px-8 h-14 text-lg variant-outline bg-transparent text-white border-white/30 hover:bg-white/10" aria-label="Find out how to partner with YESJ">
                                Partner With Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
