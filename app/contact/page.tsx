import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import ContactForm from "@/components/shared/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact Us - YESJ | Let's Start a Conversation",
  description: "Get in touch with us for more information about YESJ and how you can get involved.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Let's Start a Conversation"
          description="Whether you're seeking support, want to volunteer, or explore partnership—we're here."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <SectionHeader
                  title="Send Us a Message"
                  description="We respond within 24 hours on business days."
                  align="left"
                  subtitle="Contact Information"
                />
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                    <h3 className="text-xl font-light mb-4 text-primary">YESJ Centre for Excellence</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Address:</p>
                          <p className="text-sm text-muted-foreground font-extralight">
                            Andhra Loyola College Campus<br />
                            Vijayawada, Andhra Pradesh<br />
                            India - 522 008
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                    <h3 className="text-xl font-light mb-4 text-primary">Direct Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Phone:</p>
                          <p className="text-sm text-muted-foreground font-extralight">+91-886-672-7202</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">General Inquiries:</p>
                          <p className="text-sm text-muted-foreground font-extralight">info@yesj.org</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Office Hours:</p>
                          <p className="text-sm text-muted-foreground font-extralight">
                            Monday - Saturday: 9:00 AM - 6:00 PM IST<br />
                            Sunday & Holidays: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                    <h3 className="text-xl font-light mb-4 text-primary">Program-Specific Inquiries</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Programs & Applications:</p>
                          <p className="text-sm text-muted-foreground font-extralight">programs@yesj.org</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Volunteer Opportunities:</p>
                          <p className="text-sm text-muted-foreground font-extralight">volunteer@yesj.org</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-light">Donations & Partnerships:</p>
                          <p className="text-sm text-muted-foreground font-extralight">donate@yesj.org</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-xl font-light mb-4 text-primary">Connect on Social Media</h3>
                  <p className="text-muted-foreground font-extralight mb-4">Follow the Movement</p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent w-20 h-20"
                    >
                      <div className="flex flex-col items-center">
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
                          className="h-6 w-6"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <span className="text-xs mt-1">Facebook</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent w-20 h-20"
                    >
                      <div className="flex flex-col items-center">
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
                          className="h-6 w-6"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span className="text-xs mt-1">Instagram</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent w-20 h-20"
                    >
                      <div className="flex flex-col items-center">
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
                          className="h-6 w-6"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                        <span className="text-xs mt-1">Twitter</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent w-20 h-20"
                    >
                      <div className="flex flex-col items-center">
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
                          className="h-6 w-6"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                        <span className="text-xs mt-1">YouTube</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-transparent w-20 h-20"
                    >
                      <div className="flex flex-col items-center">
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
                          className="h-6 w-6"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <span className="text-xs mt-1">LinkedIn</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl mb-6">
                YESJ Centre for Excellence
              </h2>
              <div className="flex justify-center my-8">
                <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="text-lg mb-2"><strong>YESJ Centre for Excellence</strong></p>
                  <p className="mb-4">Andhra Loyola College Campus, Vijayawada</p>
                  <div className="text-left space-y-2">
                    <p><Clock className="h-4 w-4 inline mr-2" /> From Railway Station: 15 minutes</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> From Airport: 45 minutes</p>
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
