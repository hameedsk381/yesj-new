"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Camera, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProgramAction, ProgramData } from "@/lib/data/programs"
import { ProgramIcon } from "@/components/shared/program-icon"
import { cn, isRemoteImage } from "@/lib/utils"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { siteConfig } from "@/lib/config"

interface GalleryItem {
  id: number
  title: string
  imagePath: string
}

function actionProps(action: ProgramAction) {
  if (action.tone === "secondary") {
    return {
      variant: "outline" as const,
      className: "rounded-md px-5 shadow-sm active:scale-[0.98] transition-all",
    }
  }

  if (action.tone === "accent") {
    return {
      variant: "default" as const,
      className: "rounded-md bg-accent px-5 text-accent-foreground hover:bg-accent/90 shadow-sm active:scale-[0.98] transition-all",
    }
  }

  return {
    variant: "default" as const,
    className: "rounded-md px-5 shadow-sm active:scale-[0.98] transition-all",
  }
}

const Breadcrumb = ({ program }: { program: ProgramData }) => (
  <BreadcrumbJsonLd items={[
    { name: "Home", url: siteConfig.url },
    { name: "Programs", url: `${siteConfig.url}/programs` },
    { name: program.title, url: `${siteConfig.url}/programs/${program.slug}` },
  ]} />
)

export default function ProgramClientPage({ program }: { program: ProgramData }) {
  const [gallery, setGallery] = useState<GalleryItem[]>([])

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery")
        if (res.ok) {
          const data = await res.json()
          // Filter gallery items by program slug
          const items = Array.isArray(data) ? data : (data.data || [])
          setGallery(items.filter((item: any) => item.category === program.slug))
        }
      } catch (err) {
        console.error("Failed to fetch program gallery", err)
      }
    }
    fetchGallery()
  }, [program.slug])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumb program={program} />
      <main className="flex-1" id="main-content" role="main">
        <section className="border-b border-border bg-background pt-12 lg:pt-32">
          <div className="container px-6 py-12 lg:px-8 lg:py-16">
            <Link
              href="/programs"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to All Programs
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  {program.logo ? (
                    <div className="relative h-5 w-5">
                      <Image
                        src={program.logo}
                        alt=""
                        fill
                        priority
                        unoptimized={isRemoteImage(program.logo)}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <ProgramIcon name={program.icon} className="h-4 w-4" aria-hidden="true" />
                  )}
                  {program.badge}
                </div>
                <h1 className="mt-5 font-sans text-4xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl text-balance uppercase">
                  {program.title}
                </h1>
                <p className="mt-4 text-xl text-primary font-medium tracking-tight leading-7">{program.tagline}</p>
                {program.subheading ? (
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                    {program.subheading}
                  </p>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {program.heroActions.map((action) => (
                    <Button key={action.label} asChild {...actionProps(action)}>
                      <Link href={action.href}>{action.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                <div className={`h-1.5 w-full ${program.cardBarClassName}`} />
                <div className="relative aspect-[16/11]">
                  <Image src={program.image} alt={program.title} fill priority unoptimized={isRemoteImage(program.image)} className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-6">
              {program.sections.map((section) => (
                <article key={section.title} className="rounded-xl border border-border bg-card p-8 shadow-sm">
                  <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>
                  {section.image ? (
                    <div className="mt-6 relative h-16 w-48">
                      <Image src={section.image} alt="" fill unoptimized={isRemoteImage(section.image)} className="object-contain object-left" />
                    </div>
                  ) : null}
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.cards?.length ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {section.cards.map((card) => (
                        <div key={card.title} className="rounded-lg border border-border bg-card/60 p-5 shadow-sm">
                          <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{card.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {section.actions?.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {section.actions.map((action) => (
                        <Button key={action.label} asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          <a href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noopener noreferrer" : undefined}>
                            {action.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : null}

                  {section.gallery?.length ? (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {section.gallery.map((img, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted">
                          <Image src={img} alt="" fill unoptimized={isRemoteImage(img)} className="object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            {/* Program Gallery Section */}
            {gallery.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic">Program in <span className="text-primary not-italic">Action</span></h2>
                    <p className="text-muted-foreground mt-2">Glimpses of transformation and community from this initiative.</p>
                  </div>
                  <Camera className="h-10 w-10 text-primary/20" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((item, idx) => (
                    <div key={item.id} className={cn(
                      "group relative rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
                      idx % 5 === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                    )}>
                      <Image 
                        src={item.imagePath} 
                        alt={item.title} 
                        fill 
                        unoptimized={isRemoteImage(item.imagePath)}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-white text-xs font-bold uppercase tracking-wider">{item.title}</p>
                          <Maximize2 className="h-4 w-4 text-white/50" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {program.bottomActions?.length ? (
              <div className="mt-16 rounded-xl border border-border bg-card p-8 shadow-sm">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground">Take the Next Step</h2>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {program.bottomActions.map((action) => (
                    <Button key={action.label} asChild {...actionProps(action)}>
                      <Link href={action.href}>{action.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
