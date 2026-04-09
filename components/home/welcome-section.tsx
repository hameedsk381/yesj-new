"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomeSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const res = await fetch('/api/homepage')
        if (res.ok) {
          const homepage = await res.json()
          setData(homepage)
        }
      } catch (err) {
        console.error('Failed to fetch welcome content', err)
      }
    }
    fetchWelcome()
  }, [])

  if (!data) {
    // Fallback to original content if CMS is empty
    return (
      <section aria-labelledby="welcome-heading" className="border-b border-border/70 bg-background">
        <div className="container px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="space-y-5">
              <p className="text-sm font-medium text-primary">Why YESJ exists</p>
              <h2 id="welcome-heading" className="max-w-xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                Young people need more than access. They need accompaniment.
              </h2>
              <p className="max-w-lg text-base leading-7 text-foreground/72">
                YES-J was born in 2016 at Andhra Loyola College, Vijayawada, as a response to the growing gap between youth potential and social exclusion.
              </p>
              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                We are not just about delivering programs. We are about walking with young people as they move from exclusion toward dignity. Our work is rooted in the Jesuit tradition of &quot;cura personalis&quot; - care for the whole person.
              </p>
              <Button asChild variant="outline" className="h-11 px-5 text-sm font-semibold">
                <Link href="/about">Discover our story</Link>
              </Button>
            </div>
            <div className="space-y-5">
              <div className="border-l-2 border-primary pl-5">
                <p className="text-base leading-8 text-foreground">
                  In the heart of the Telugu states, many young people are still blocked by poverty, discrimination, weak schooling, and low confidence in spoken English. Those barriers are not small setbacks. They shape who gets to dream safely and who is told to settle.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-card p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-foreground">What blocks youth</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Economic insecurity, social exclusion, fragile education systems, and a lack of mentors who can walk with them over time.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-card p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-foreground">What YESJ does</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    The organisation connects skill development, scholarships, youth formation, and community life so that support does not stop at one workshop or one season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="welcome-heading" className="border-b border-border/70 bg-background">
      <div className="container px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="space-y-5">
            <p className="text-sm font-medium text-primary">{data.welcomeBadge || "Why YESJ exists"}</p>
            <h2 id="welcome-heading" className="max-w-xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {data.welcomeTitle}
            </h2>
            <div className="max-w-lg space-y-4 text-base leading-7 text-muted-foreground">
              <p className="text-foreground/72">{data.welcomeSubtitle}</p>
              <p>{data.welcomeDescription}</p>
            </div>
            <Button asChild variant="outline" className="h-11 px-5 text-sm font-semibold">
              <Link href={data.welcomeCtaLink || "/about"}>{data.welcomeCtaLabel || "Discover our story"}</Link>
            </Button>
          </div>

          <div className="space-y-5">
            <div className="border-l-2 border-primary pl-5">
              <p className="text-base leading-8 text-foreground">
                {data.welcomeFocusText}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.welcomeBlocks?.map((block: any, i: number) => (
                <div key={i} className="rounded-md border border-border bg-card p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-foreground">{block.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
