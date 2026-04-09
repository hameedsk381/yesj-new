"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProgramAction, ProgramData } from "@/lib/data/programs"
import { ProgramIcon } from "@/components/shared/program-icon"

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

export default function ProgramClientPage({ program }: { program: ProgramData }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <section className="border-b border-border bg-background pt-12 lg:pt-16">
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
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <ProgramIcon name={program.icon} className="h-4 w-4" aria-hidden="true" />
                  )}
                  {program.badge}
                </div>
                <h1 className="mt-5 font-sans text-4xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl text-balance">
                  {program.title}
                </h1>
                <p className="mt-4 text-xl text-primary">{program.tagline}</p>
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
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
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
                </article>
              ))}
            </div>

            {program.bottomActions?.length ? (
              <div className="mt-10 rounded-xl border border-border bg-card p-8 shadow-sm">
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
