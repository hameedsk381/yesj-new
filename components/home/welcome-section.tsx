"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WelcomeSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            Where Every Youth Shouts <span className="gradient-text">YES</span> to Their Dreams
                        </h2>
                        <h3 className="text-xl md:text-2xl font-medium text-primary mb-8">
                            A Movement of Hope, A Ministry of Transformation
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed font-light"
                    >
                        <p>
                            In the heart of India&apos;s Telugu states, where 85 million people call home, countless young dreamers face walls too high to climb alone. Poverty. Discrimination. Limited English. Broken education systems. These aren&apos;t just statistics. They&apos;re stolen futures.
                        </p>
                        <p>
                            But here&apos;s what we believe: Every young person, regardless of caste, religion, economic background, or past circumstances, carries infinite potential. They don&apos;t need charity. They need a launchpad.
                        </p>
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 py-4">
                            That&apos;s <span className="text-primary italic">YESJ</span>.
                        </div>
                        <p>
                            Since 2015, we&apos;ve been more than a program. We&apos;ve been a revolution. A Jesuit-rooted movement that walks alongside youth from rural villages to urban slums, transforming &quot;I can&apos;t&quot; into &quot;I CAN&quot; and &quot;I WILL.&quot;
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pt-8"
                    >
                        <Link href="/about">
                            <Button size="lg" className="btn-premium rounded-full px-8 h-14 text-lg">
                                Discover Our Story
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
