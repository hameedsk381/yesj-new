"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import MegaMenu from "./mega-menu"
import MobileMenu, { type MobileNavItem } from "./mobile-menu"
import { cn } from "@/lib/utils"

const NotificationBar = dynamic(() => import("@/components/layout/notification-bar"))

type DropdownItem = {
  href: string
  label: string
}

const defaultAboutLinks: DropdownItem[] = [
  { href: "/about#story", label: "Our Story" },
  { href: "/about#philosophy", label: "Our Philosophy" },
  { href: "/about/team", label: "Leadership & Team" },
  { href: "/centre-for-excellence", label: "Centre for Excellence" },
  { href: "/impact#annual-reports", label: "Annual Reports" },
]

const defaultGetInvolvedLinks: DropdownItem[] = [
  { href: "/register", label: "Membership / Registration" },
  { href: "/volunteer", label: "Volunteer with Us" },
  { href: "/donate", label: "Donate / Support" },
  { href: "/contact", label: "Partner with YES-J" },
  { href: "/get-involved#internship-details", label: "Intern with Us" },
]

const defaultProgramLinks: DropdownItem[] = [
  { href: "/programs/pep", label: "PEP" },
  { href: "/programs/magic", label: "MAGIC" },
  { href: "/programs/must", label: "MuST" },
  { href: "/programs/summer-shapes", label: "Summer Shapes" },
  { href: "/programs/ssp", label: "SSP" },
  { href: "/programs/joy-desk", label: "JoY Desk" },
  { href: "/programs/vip", label: "VIP" },
  { href: "/programs/compassion-connect", label: "Compassion Connect" },
  { href: "/programs/sthri", label: "STHRI" },
  { href: "/programs/ogod", label: "O GOD" },
  { href: "/programs/magis", label: "MAGIS / Yuvotsavaalu" },
  { href: "/programs/eott", label: "Each One Teach Ten" },
  { href: "/programs/y-hub", label: "Y HUB" },
]


function SmallDropdown({
  href,
  label,
  items,
  open,
  onOpen,
  onClose,
  isScrolled,
}: {
  href: string
  label: string
  items: DropdownItem[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  isScrolled: boolean
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1 py-7 text-sm font-medium transition-colors",
          isScrolled ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
        )}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4", !isScrolled && "opacity-70")} aria-hidden="true" />
      </Link>

      {open ? (
        <div className="absolute left-0 top-full min-w-[220px] border border-border bg-card p-2 shadow-[0_12px_32px_rgba(25,20,13,0.08)]">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<"about" | "programs" | "get-involved" | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [aboutLinks, setAboutLinks] = useState<DropdownItem[]>(defaultAboutLinks)
  const [getInvolvedLinks, setGetInvolvedLinks] = useState<DropdownItem[]>(defaultGetInvolvedLinks)
  const [programLinks, setProgramLinks] = useState<DropdownItem[]>(defaultProgramLinks)
  const [config, setConfig] = useState<any>(null)

  const mobileNavItems: MobileNavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About", children: aboutLinks },
    { href: "/programs", label: "Programs", children: programLinks },
    { href: "/impact", label: "Impact" },
    { href: "/get-involved", label: "Get Involved", children: getInvolvedLinks },
    { href: "/echoes", label: "Echoes" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, programsRes, navRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/programs'),
          fetch('/api/nav'),
        ])
        
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setConfig(data)
        }
        
        if (programsRes.ok) {
          const programs = await programsRes.json()
          if (programs && programs.length > 0) {
            setProgramLinks(programs.map((p: any) => ({
              href: `/programs/${p.slug}`,
              label: p.shortTitle || p.title
            })))
          }
        }

        if (navRes.ok) {
          const nav = await navRes.json()
          if (nav) {
            if (nav.headerAboutLinks?.length) setAboutLinks(nav.headerAboutLinks)
            if (nav.headerGetInvolvedLinks?.length) setGetInvolvedLinks(nav.headerGetInvolvedLinks)
            if (nav.headerProgramLinks?.length) setProgramLinks(nav.headerProgramLinks)
          }
        }
      } catch (err) {
        console.error('Failed to fetch header data', err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    // Set initial scroll state
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header should be transparent initially on home page, solid elsewhere or when scrolled
  const isTransparent = isHomePage && !isScrolled

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full flex flex-col transition-all duration-300",
      isTransparent ? "bg-transparent border-transparent" : "bg-background border-b border-border shadow-sm"
    )}>
      {/* Notification bar hidden per request */}
      <div 
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out w-full bg-primary text-white",
          isScrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        )}
      >
        <div className="overflow-hidden">
          <NotificationBar />
        </div>
      </div>
      <header
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isTransparent ? "bg-transparent" : "bg-background/95 backdrop-blur-md"
        )}
        role="banner"
      >
        <div className={cn(
          "container flex items-center justify-between gap-6 px-5 transition-all duration-500",
          isScrolled ? "h-16" : "h-24"
        )}>
          <Link
            href="/"
            aria-label="YESJ Home Page"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="relative h-16 w-16 overflow-hidden transition-all bg-white rounded-full p-3 shadow-sm border border-black/5">
              <Image
                src="/YESJ_Logo_Black-eaf43d27.png"
                alt="YESJ logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className={cn("text-2xl font-black tracking-tighter transition-colors", isTransparent ? "text-white" : "text-primary")}>
                YES-J
              </div>
              <div className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", isTransparent ? "text-white/60" : "text-muted-foreground")}>
                Youth Empowering Service
              </div>
            </div>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href="/"
              className={cn(
                "py-7 text-sm font-bold tracking-tight transition-colors",
                isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Home
            </Link>

            <SmallDropdown
              href="/about"
              label="About"
              items={aboutLinks}
              open={openDropdown === "about"}
              onOpen={() => setOpenDropdown("about")}
              onClose={() => setOpenDropdown(null)}
              isScrolled={!isTransparent}
            />

            <div
              onMouseEnter={() => setOpenDropdown("programs")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/programs"
                className={cn(
                  "inline-flex items-center gap-1 py-7 text-sm font-bold tracking-tight transition-colors",
                  isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
                )}
              >
                Programs
                <ChevronDown className={cn("h-4 w-4", isTransparent ? "text-white/70" : "text-muted-foreground")} aria-hidden="true" />
              </Link>

              <MegaMenu
                isOpen={openDropdown === "programs"}
                onMouseEnter={() => setOpenDropdown("programs")}
                onMouseLeave={() => setOpenDropdown(null)}
              />
            </div>

            <Link
              href="/impact"
              className={cn(
                "py-7 text-sm font-bold tracking-tight transition-colors",
                isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Impact
            </Link>

            <SmallDropdown
              href="/get-involved"
              label="Get Involved"
              items={getInvolvedLinks}
              open={openDropdown === "get-involved"}
              onOpen={() => setOpenDropdown("get-involved")}
              onClose={() => setOpenDropdown(null)}
              isScrolled={!isTransparent}
            />

            <Link
              href="/echoes"
              className={cn(
                "py-7 text-sm font-bold tracking-tight transition-colors",
                isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Echoes
            </Link>

            <Link
              href="/media"
              className={cn(
                "py-7 text-sm font-bold tracking-tight transition-colors",
                isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Media
            </Link>

            <Link
              href="/contact"
              className={cn(
                "py-7 text-sm font-bold tracking-tight transition-colors",
                isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild className={cn(
              "hidden h-11 px-6 text-sm font-bold sm:inline-flex shadow-xl transition-all active:scale-[0.98]",
              isTransparent ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"
            )}>
              <Link href="/donate" aria-label="Make a secure online donation">
                <Heart className={cn("mr-2 h-4 w-4 fill-current", isTransparent ? "text-primary" : "text-white")} aria-hidden="true" />
                Donate Now
              </Link>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
              className={cn("lg:hidden transition-colors", isTransparent ? "text-white" : "text-foreground")}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={mobileNavItems} />
    </div>
  )
}
