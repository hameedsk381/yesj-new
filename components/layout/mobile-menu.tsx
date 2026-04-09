"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ChildLink = {
  href: string
  label: string
}

export type MobileNavItem = {
  href: string
  label: string
  children?: ChildLink[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: MobileNavItem[]
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/45"
            onClick={onClose}
            aria-label="Close mobile menu overlay"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-background p-6 shadow-[0_18px_40px_rgba(25,20,13,0.12)]"
          >
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden">
                  <Image
                    src="/YESJ_Logo_Black-eaf43d27.png"
                    alt="YESJ logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-base font-semibold text-primary">YES-J</div>
                  <div className="text-xs text-muted-foreground">Youth Empowering Service - Jesuits</div>
                </div>
              </Link>

              <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close mobile menu">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <nav className="space-y-2 overflow-y-auto pb-6">
              {navItems.map((item) =>
                item.children?.length ? (
                  <details key={item.label} className="border border-border bg-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-base font-medium text-foreground">
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </summary>
                    <div className="border-t border-border px-4 py-2">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-sm font-medium text-primary"
                      >
                        Overview
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="block border border-transparent px-4 py-3 text-base font-medium text-foreground transition-colors hover:border-border hover:bg-muted/40"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="mt-auto space-y-4 border-t border-border pt-6">
              <Button asChild className="h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/donate" onClick={onClose}>
                  Donate Now
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Copyright {new Date().getFullYear()} YES-J. Andhra Loyola College Campus, Vijayawada.
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
