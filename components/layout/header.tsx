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

const aboutLinks: DropdownItem[] = [
  { href: "/about#story", label: "Our Story" },
  { href: "/about#philosophy", label: "Our Philosophy" },
  { href: "/about/team", label: "Leadership & Team" },
  { href: "/centre-for-excellence", label: "Centre for Excellence" },
  { href: "/impact#annual-reports", label: "Annual Reports" },
]

const getInvolvedLinks: DropdownItem[] = [
  { href: "/volunteer", label: "Volunteer with Us" },
  { href: "/donate", label: "Donate / Support" },
  { href: "/contact", label: "Partner with YES-J" },
  { href: "/get-involved#internship-details", label: "Intern with Us" },
]

const programLinks: DropdownItem[] = [
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
]

const mobileNavItems: MobileNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About", children: aboutLinks },
  { href: "/programs", label: "Programs", children: programLinks },
  { href: "/impact", label: "Impact" },
  { href: "/get-involved", label: "Get Involved", children: getInvolvedLinks },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
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
        <div className="absolute left-0 top-full min-w-[220px] rounded-2xl border border-border bg-card p-3 shadow-lg">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    // Set initial scroll state
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header should be solid if we've scrolled OR if we're not on the home page
  const isSolid = isScrolled || !isHomePage

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] transition-transform">
      <NotificationBar />
      <header
        className={cn(
          "relative transition-all duration-500 ease-in-out",
          isSolid 
            ? "mx-auto mt-4 max-w-7xl rounded-full border border-white/10 bg-background/60 shadow-2xl backdrop-blur-xl py-0 px-2 glass-premium" 
            : "bg-transparent border-transparent py-4"
        )}
        role="banner"
      >
        <div className={cn(
          "container flex items-center justify-between gap-6 px-5 transition-all duration-500",
          isSolid ? "h-16" : "h-20"
        )}>
          <Link
            href="/"
            aria-label="YESJ Home Page"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="relative h-12 w-12 overflow-hidden transition-all">
              <Image
                src="/YESJ_Logo_Black-eaf43d27.png"
                alt="YESJ logo"
                fill
                className={cn("object-contain transition-all", !isSolid && "brightness-0 invert")}
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className={cn("text-xl font-bold tracking-tight transition-colors", isSolid ? "text-primary" : "text-primary-foreground")}>
                YES-J
              </div>
              <div className={cn("text-[10px] uppercase tracking-wider transition-colors", isSolid ? "text-muted-foreground" : "text-primary-foreground/60")}>
                Youth Empowering Service - Jesuits
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
                "py-7 text-sm font-semibold transition-all hover:scale-105 active:scale-95",
                isSolid ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
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
              isScrolled={isSolid}
            />

            <div
              onMouseEnter={() => setOpenDropdown("programs")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/programs"
                className={cn(
                  "inline-flex items-center gap-1 py-7 text-sm font-medium transition-colors",
                  isSolid ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
                )}
              >
                Programs
                <ChevronDown className={cn("h-4 w-4", !isSolid && "opacity-70")} aria-hidden="true" />
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
                "py-7 text-sm font-medium transition-colors",
                isSolid ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
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
              isScrolled={isSolid}
            />

            <Link
              href="/media"
              className={cn(
                "py-7 text-sm font-medium transition-colors",
                isSolid ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
              )}
            >
              Media
            </Link>

            <Link
              href="/contact"
              className={cn(
                "py-7 text-sm font-medium transition-colors",
                isSolid ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild className={cn(
              "hidden h-10 rounded-full px-6 transition-all duration-500 sm:inline-flex btn-premium shadow-xl",
              isSolid ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20" : "bg-white text-primary border-none hover:bg-white/90 shadow-white/10"
            )}>
              <Link href="/donate" aria-label="Make a secure online donation">
                <Heart className="mr-2 h-4 w-4 fill-current" aria-hidden="true" />
                Donate Now
              </Link>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
              className={cn("lg:hidden transition-colors", isSolid ? "text-foreground" : "text-primary-foreground")}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={mobileNavItems} />
    </div>
  )
}

