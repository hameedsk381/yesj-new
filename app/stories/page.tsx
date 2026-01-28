"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, BookOpen, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StoriesPage() {
  const articles = [
    {
      id: 1,
      title: "Radical Love: The Heart of the YESJ Mission",
      excerpt: "Exploring the Ignatian roots of our service and how it transforms youth lives today.",
      date: "Oct 10, 2024",
      author: "Fr. Balaswamy SJ",
      category: "Philosophy",
      image: "/website/IMG_5899.JPG",
      slug: "radical-love",
      featured: true
    },
    {
      id: 2,
      title: "How Summer Shapes Changed My Life",
      excerpt: "A personal story of a student from a remote village who found her voice through English immersion.",
      date: "Sep 25, 2024",
      author: "Anitha K.",
      category: "Testimonials",
      image: "/website/IMG_6787.JPG",
      slug: "summer-shapes-life-change"
    },
    {
      id: 3,
      title: "From Dropout to Welder: The MUST Success",
      excerpt: "Deep dive into our vocational training programs and the impact on local employment rates.",
      date: "Aug 15, 2024",
      author: "MUST Faculty",
      category: "Impact",
      image: "/website/IMG_5986.JPG",
      slug: "must-success-story"
    },
    {
      id: 4,
      title: "YY 2025: A Symphony of Youth Dreams",
      excerpt: "Highlights from the biggest youth festival in Secunderabad. Celebrating talent and vision.",
      date: "Jan 30, 2025",
      author: "YESJ Echoes",
      category: "Events",
      image: "/website/IMG_8204.JPG",
      slug: "yy-2025-highlights"
    }
  ]

  const categories = ["All", "Philosophy", "Impact", "Events", "Testimonials", "Announcements"]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Magazine Hero */}
        <section className="py-24 bg-gray-50 overflow-hidden relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                    The YESJ Journal
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    STORIES <br /><span className="text-primary italic font-light">Magazine</span>
                  </h1>
                  <p className="text-xl text-gray-600 font-light max-w-lg leading-relaxed">
                    Captured stories, profound reflections, and the vibrant pulse of youth transformation across Andhra & Telangana.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white shadow-xl flex items-center gap-2">
                      Latest Issue <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="rounded-full px-8 h-14 border-gray-200 hover:bg-gray-50 flex items-center gap-2">
                      Browse Archive <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white"
                >
                  <Image src="/website/IMG_8233.JPG" alt="Echoes Cover" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                    <h2 className="text-3xl font-bold mb-4">The Centennial Edition</h2>
                    <p className="text-white/70 font-light mb-6">Celebrating a century of radical love and student leadership.</p>
                    <Link href="#" className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
                      Read Cover Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary rounded-[3rem] -z-10 blur-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto no-scrollbar py-4 gap-8 justify-start lg:justify-center">
              {categories.map((cat, i) => (
                <button key={i} className={`text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${i === 0 ? "text-primary border-b-2 border-primary pb-1" : "text-gray-400 hover:text-gray-600"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {articles.map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <div className="relative h-[400px] mb-8 overflow-hidden rounded-[3rem] shadow-lg">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 px-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <Link href={`/stories/${article.slug}`} className="text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all">
                        Dive Deeper <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button className="text-gray-300 hover:text-primary"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-24 text-center">
              <Button variant="outline" className="rounded-full px-12 h-16 text-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                Load More Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Magazine Subscription */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-[4rem] bg-gray-900 p-12 lg:p-24 text-white text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold">Never miss <span className="text-primary italic">the Resonance.</span></h2>
                <p className="text-xl text-white/60 font-light">Get the digital edition of Echoes delivered straight to your inbox every month.</p>
                <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 h-16 outline-none focus:border-primary transition-all backdrop-blur-md"
                  />
                  <Button className="bg-primary text-white px-8 rounded-full h-16 font-bold shadow-xl border-none">
                    Subscribe Now
                  </Button>
                </form>
                <p className="text-xs text-white/40">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
