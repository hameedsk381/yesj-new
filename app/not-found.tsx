import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Home, Compass, BookOpen, Mail, ArrowRight } from "lucide-react"

export default function NotFound() {
  const quickLinks = [
    { label: "Our Programs", href: "/programs", icon: Compass, description: "Explore youth empowerment initiatives" },
    { label: "Courses & Training", href: "/courses", icon: BookOpen, description: "Skills and leadership batches" },
    { label: "Contact Us", href: "/contact", icon: Mail, description: "Reach out to our leadership team" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-6 sm:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
              Error 404
            </span>
            <h1 className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-foreground">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              The page you are looking for might have been removed, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-md gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-md gap-2">
              <Link href="/programs">
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Quick Destinations
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-4 rounded-md border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <Icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
