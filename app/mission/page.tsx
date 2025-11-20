import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Mission & Vision - APTSAICUF",
  description: "Learn about the mission and vision of Andhra-Telangana All India Catholic University Federation.",
}

export default function MissionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Our Mission & Vision"
          description="Empowering students to be agents of social change through faith, justice, and leadership."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <SectionHeader
                  title="Our Mission"
                  description="To form students into agents of social change"
                  align="left"
                  subtitle="Why We Exist"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    APTSAICUF seeks to form students who are sensitive to social realities and committed to building a
                    more just, humane, and equitable society based on Gospel values.
                  </p>
                  <ul className="grid gap-2 mt-4">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Promote leadership among youth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Engage in skill development and education</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Foster community service and volunteerism</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Advocate for the rights of marginalized communities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Develop critical thinking and social consciousness</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.1-laM6KEOcXevAzwId6tbkOQDE3y0KMn.jpeg"
                  alt="YESJ Youth Leadership Program"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.08%20PM-jEtMoapURWvv8VFzvHmhIQkMrXDzcH.jpeg"
                  alt="YESJ Community Service"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <SectionHeader
                  title="Our Vision"
                  description="A just and humane society"
                  align="left"
                  subtitle="What We Aspire To"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    We envision a society where human dignity is respected, rights are protected, and all people have
                    the opportunity to develop their full potential.
                  </p>
                  <ul className="grid gap-2 mt-4">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Uphold the dignity and rights of all people</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Work for peace and reconciliation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Care for our common home, the Earth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Eliminate discrimination and promote equality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span className="font-extralight">Build communities of solidarity and mutual support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Our Approach"
              description="How we work to achieve our mission and vision"
              subtitle="Our Methodology"
            />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-primary">See</h3>
                <p className="text-muted-foreground font-extralight">
                  We encourage youth to observe and analyze social realities, especially the situations of injustice
                  and marginalization.
                </p>
              </div>
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-primary">Judge</h3>
                <p className="text-muted-foreground font-extralight">
                  We reflect on these realities in light of values and ethical principles to form critical
                  judgments.
                </p>
              </div>
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-primary">Act</h3>
                <p className="text-muted-foreground font-extralight">
                  We take concrete actions to transform unjust structures and promote human dignity and social justice.
                </p>
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
