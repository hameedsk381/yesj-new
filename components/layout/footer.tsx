import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, Twitter, Youtube, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function Footer() {
  return (
    <footer className="w-full border-t py-8 md:py-12 bg-white" role="contentinfo">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/YESJ_Logo_Black-eaf43d27.png"
                alt="YESJ Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-light text-primary">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground font-extralight">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                aria-label="Follow us on YouTube"
              >
                <Youtube className="h-5 w-5 text-primary" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left font-extralight">
            © {new Date().getFullYear()} Youth Empowering Service Jesuits. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-extralight"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-extralight"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-extralight"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
