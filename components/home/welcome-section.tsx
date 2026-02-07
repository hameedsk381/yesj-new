"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WelcomeSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Decorative background elements */}
            {/* Decorative background elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -30, 0],
                    y: [0, 50, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gray-900 mb-6 leading-tight">
                            Where Every Youth Shouts <span className="text-primary italic">YES</span> to Their Dreams
                        </h2>
                        <h3 className="text-xl md:text-2xl font-light text-gray-500 mb-12 max-w-2xl mx-auto">
                            A Movement of Hope, A Ministry of Transformation
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8 text-lg md:text-xl text-gray-600 leading-loose font-light max-w-3xl mx-auto"
                    >
                        <p>
                            In the heart of India&apos;s Telugu states, where 85 million people call home, countless young dreamers face walls too high to climb alone. Poverty. Discrimination. Limited English. Broken education systems. These aren&apos;t just statistics. They&apos;re stolen futures.
                        </p>
                        <div className="flex items-center gap-4 py-6">
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <div className="text-3xl md:text-4xl font-serif font-black text-gray-900">
                                That&apos;s <span className="text-primary italic">YESJ</span>.
                            </div>
                            <div className="h-px bg-gray-200 flex-1"></div>
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
                        className="pt-12"
                    >
                        <Link href="/about">
                            <Button size="lg" className="btn-premium rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20">
                                Discover Our Story
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
