import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Programs & Initiatives",
  description:
    "Explore APTSAICUF programs including leadership training, social service, faith formation, and community development initiatives.",
  openGraph: {
    title: "Programs & Initiatives | APTSAICUF",
    description: "Explore leadership training, social service, faith formation programs by APTSAICUF.",
    url: "https://aptsaicuf.org/programs",
    type: "website",
  },
}

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Our Programs"
          description="Discover the various programs and initiatives we offer to empower students and create social change."
        />

        <section id="leadership" className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <SectionHeader
                  title="Leadership Training"
                  description="Developing the next generation of socially conscious leaders"
                  align="left"
                  subtitle="Core Program"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    Our leadership training programs equip students with the skills, knowledge, and values needed to
                    become effective agents of social change. Through workshops, seminars, and experiential learning,
                    participants develop critical thinking, social analysis, and organizational skills.
                  </p>
                  <p>Key components of our leadership training include:</p>
                  <ul className="grid gap-2 mt-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Annual Leadership Camps: Intensive residential programs focusing on leadership development and
                        social analysis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Campus Leadership Workshops: Regular sessions on specific leadership skills and social issues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Peer Mentoring: Experienced student leaders mentoring new members
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg"
                  alt="APTSAICUF Leadership Training"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="social-service" className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.1-laM6KEOcXevAzwId6tbkOQDE3y0KMn.jpeg"
                  alt="APTSAICUF Social Service"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <SectionHeader
                  title="Social Service"
                  description="Serving marginalized communities through direct action"
                  align="left"
                  subtitle="Core Program"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    Our social service programs provide opportunities for students to engage directly with marginalized
                    communities, understand their challenges, and work together to address them. These experiences help
                    students develop empathy, solidarity, and a commitment to social justice.
                  </p>
                  <p>Our social service initiatives include:</p>
                  <ul className="grid gap-2 mt-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-maroon mt-1" />
                      <span className="font-extralight">
                        Community Development Projects: Long-term partnerships with specific communities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-maroon mt-1" />
                      <span className="font-extralight">
                        Rural Exposure Programs: Immersion experiences in rural villages
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-maroon mt-1" />
                      <span className="font-extralight">
                        Dalit Solidarity Initiatives: Programs focused on Dalit rights and dignity
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faith-formation" className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <SectionHeader
                  title="Faith Formation"
                  description="Deepening understanding of faith and its social dimensions"
                  align="left"
                  subtitle="Core Program"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    Our faith formation programs help students deepen their understanding of the Catholic faith and its
                    call to social justice. Through prayer, reflection, and theological discussions, participants
                    explore the connection between faith and action.
                  </p>
                  <p>Key elements of our faith formation include:</p>
                  <ul className="grid gap-2 mt-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Spiritual Retreats: Opportunities for prayer, reflection, and spiritual renewal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Bible Study Groups: Regular gatherings to study Scripture and its relevance to social issues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-1" />
                      <span className="font-extralight">
                        Catholic Social Teaching Workshops: Exploring the Church's teachings on social justice
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-19-eN65t7FeFIU0KHZvHfMQcBg0iakwXI.jpeg"
                  alt="APTSAICUF Faith Formation"
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
            <SectionHeader
              title="Upcoming Program Events"
              description="Join us for these upcoming program activities"
              subtitle="Get Involved"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">June 15-20, 2025</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">Leadership Development Workshop</h3>
                <p className="text-muted-foreground font-extralight">
                  A comprehensive workshop on leadership skills, social analysis, and organizational development.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Hyderabad, Telangana</span>
                </div>
                <Link href="/register">
                  <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">
                    Register Now
                  </Button>
                </Link>
              </div>
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">July 8-10, 2025</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">Rural Exposure Program</h3>
                <p className="text-muted-foreground font-extralight">
                  An immersion experience in rural villages to understand the challenges faced by rural communities.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Vijayawada, Andhra Pradesh</span>
                </div>
                <Link href="/register">
                  <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">
                    Register Now
                  </Button>
                </Link>
              </div>
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">August 12-14, 2025</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">Spiritual Retreat</h3>
                <p className="text-muted-foreground font-extralight">
                  A three-day retreat focusing on prayer, reflection, and spiritual renewal.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Secunderabad, Telangana</span>
                </div>
                <Link href="/register">
                  <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">
                    Register Now
                  </Button>
                </Link>
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
