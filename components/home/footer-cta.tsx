import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FooterCTA() {
  return (
    <section aria-labelledby="footer-cta-heading" className="bg-gray-950 text-primary-foreground">
      <div className="container px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-medium text-secondary italic">Take the next step</p>
            <h2
              id="footer-cta-heading"
              className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl font-serif"
            >
              Youth potential is not the problem. Access is.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-primary-foreground/75">
              If you want to be part of the YESJ movement, the homepage should make that choice
              obvious. Apply for a programme, volunteer your time, or support a young person with a
              contribution.
            </p>
          </div>

          <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-6 sm:p-8">
            <div className="space-y-4">
              <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                <div className="text-sm font-medium text-white font-serif">Apply</div>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Find the programme that fits your stage, goals, and context.
                </p>
              </div>
              <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                <div className="text-sm font-medium text-white font-serif">Volunteer</div>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Offer time, expertise, and presence in ways that strengthen the work.
                </p>
              </div>
              <div className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-4 border-l-secondary border-l-2">
                <div className="text-sm font-medium text-white font-serif italic text-secondary">Support</div>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Help remove the financial barriers that keep young people from opportunity.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="h-11 px-5 bg-primary hover:bg-primary/90 text-white border-none">
                <Link href="/programs">Apply</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-primary-foreground/20 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground hover:text-gray-950">
                <Link href="/get-involved">Volunteer</Link>
              </Button>
              <Button asChild className="h-11 px-5 bg-accent hover:bg-accent/90 text-white border-none">
                <Link href="/donate">
                  Donate Now
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
