import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import ContactForm from "@/components/shared/contact-form"
import { MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact - APTSAICUF",
  description: "Contact information and form for Andhra-Telangana All India Catholic University Federation.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Contact Us"
          description="Get in touch with us for more information about APTSAICUF and how you can get involved."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <SectionHeader
                  title="Get in Touch"
                  description="We'd love to hear from you. Reach out to us with any questions or inquiries."
                  align="left"
                  subtitle="Contact Information"
                />
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-light">National Office</p>
                      <p className="text-sm text-muted-foreground font-extralight">
                        YESJ-Centre for Excellence, Andhra Loyola College, Vijayawada, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-light">Phone</p>
                      <p className="text-sm text-muted-foreground font-extralight">+91 8309160482</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-light">Email</p>
                      <p className="text-sm text-muted-foreground font-extralight">contact@aptsaicuf.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-light mb-4 text-maroon">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Regional Offices"
              description="Contact our regional offices for local information and support"
              subtitle="Local Contacts"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all">
                <h3 className="text-xl font-light mb-3 text-maroon">Hyderabad Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">
                      123 Main Street, Secunderabad, Telangana - 500003
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">+91 40 2345 6789</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">hyderabad@aptsaicuf.in</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all">
                <h3 className="text-xl font-light mb-3 text-maroon">Vijayawada Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">
                      YESJ-Centre for Excellence, Andhra Loyola College, Vijayawada, Andhra Pradesh - 520008
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">+91 866 234 5678</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">contact@aptsaicuf.com</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all">
                <h3 className="text-xl font-light mb-3 text-maroon">Warangal Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">
                      789 College Road, Warangal, Telangana - 506002
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">+91 870 345 6789</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground font-extralight">warangal@aptsaicuf.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
