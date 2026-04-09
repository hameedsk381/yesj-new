"use client"

import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoSection() {
  return (
    <section id="video" aria-labelledby="video-heading" className="border-b border-border bg-background">
      <div className="container px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="overflow-hidden rounded-md border border-border bg-gray-950 text-white shadow-2xl">
            <div className="relative aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                <source src="https://storage.googleapis.com/yesj/website/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm group hover:scale-110 transition-transform">
                  <PlayCircle className="h-8 w-8 text-primary shadow-glow" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-md bg-primary/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-lg">
                Documentary Preview
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Storytelling</p>
            <h2 id="video-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl font-serif">
              Watch how YESJ changes lives.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The upcoming film brings together stories from young people, staff, and communities
              shaped by Summer Shapes, MuST, scholarships, and long-term accompaniment.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground italic">What the film covers</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Personal stories, training pathways, and the wider social reality young people are
                  navigating in the region.
                </p>
              </div>
              <div className="rounded-md border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground italic">Until it launches</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Use the stories and media sections to explore the work through alumni voices,
                  updates, and photo essays.
                </p>
              </div>
            </div>

            <Button asChild variant="outline" className="h-11 px-5">
              <Link href="/stories">Read transformation stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
