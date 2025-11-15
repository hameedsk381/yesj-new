import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import { HistorySection } from "@/app/components/history-section"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import Image from "next/image"

export const metadata = {
  title: "About - APTSAICUF",
  description: "Learn about the history and mission of Andhra-Telangana All India Catholic University Federation.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="About APTSAICUF"
          description="Learn about our history, mission, and the impact we've made over the years."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <SectionHeader
                  title="Our Story"
                  description="The Andhra-Telangana All India Catholic University Federation (APTSAICUF) is a movement of university students committed to creating a more just society."
                  align="left"
                  subtitle="Who We Are"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    Founded in 1924, APTSAICUF has grown into a regional movement with thousands of members across
                    Andhra Pradesh and Telangana. Our members are committed to the principles of truth, justice, and
                    love as taught by Jesus Christ.
                  </p>
                  <p>
                    We believe in the power of young people to transform society. Through our programs, we provide
                    opportunities for students to develop leadership skills, engage in social analysis, and take action
                    on issues affecting their communities.
                  </p>
                  <p>
                    APTSAICUF is affiliated with the International Movement of Catholic Students (IMCS) - Pax Romana,
                    which has consultative status with UNESCO and the United Nations.
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/aicuf-centennial-logo.png"
                  alt="AICUF Centennial Logo"
                  width={300}
                  height={300}
                  className="rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Our History"
              description="The journey of APTSAICUF in Andhra Pradesh and Telangana reflects the changing tides of Indian society."
            />
            <HistorySection />
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader title="Our Values" subtitle="What We Stand For" />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-maroon">Faith</h3>
                <p className="text-muted-foreground font-extralight">
                  We are rooted in the Catholic faith and inspired by the Gospel values of love, justice, and
                  solidarity.
                </p>
              </div>
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-maroon">Justice</h3>
                <p className="text-muted-foreground font-extralight">
                  We are committed to working for social justice, human dignity, and the rights of marginalized
                  communities, especially Dalits.
                </p>
              </div>
              <div className="p-6 border-t border-primary/20">
                <h3 className="text-xl font-light mb-3 text-maroon">Leadership</h3>
                <p className="text-muted-foreground font-extralight">
                  We develop young leaders who are critical thinkers, socially conscious, and committed to positive
                  change.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader title="Our Campus Presence" subtitle="AICUF Across Campuses" />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-1%20at%204.58.35%20PM-Jr1kSptdYDYsgj17H7qYHTI1yVDvUB.jpeg"
                  alt="AICUF Campus Installation"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-light mb-2">AICUF Campus Installations</h3>
                    <p className="text-sm font-extralight">
                      Our permanent installations on campuses serve as gathering spaces for AICUF members
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-05-18%20at%204.58.08%20PM-igdHve2uOiZdR0qGHkZVQ5QU2irlwr.jpeg"
                  alt="Joseph's College AICUF Chapter"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-light mb-2">College Chapters</h3>
                    <p className="text-sm font-extralight">
                      AICUF chapters in colleges across Andhra Pradesh and Telangana
                    </p>
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
