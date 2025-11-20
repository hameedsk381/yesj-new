import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

export const metadata = {
  title: "YESJ Echoes",
  description: "Latest newsletters, updates, and announcements from YESJ. Stay informed about our activities and initiatives.",
  openGraph: {
    title: "YESJ Echoes",
    description: "Latest newsletters, updates, and announcements from YESJ.",
    url: "https://yesj.com/echoes",
    type: "website",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "YESJ Echoes",
    url: "https://yesj.com/echoes",
  },
}

export default function EchoesPage() {
  const echoes = [
    {
      id: 1,
      title: "YESJ Celebrates 100 Years of Student Activism",
      excerpt: "As we mark our centennial year, we reflect on a century of empowering students to be agents of social change through faith, justice, and leadership.",
      date: "2024-10-10",
      author: "YESJ Team",
      category: "Celebration",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf1-owoq2CuFOpRHrTCHMmVcaJl9tmK08g.jpeg",
      slug: "centennial-celebration",
    },
    {
      id: 2,
      title: "Successful Drug Awareness Campaign Reaches 500+ Students",
      excerpt: "Our #DRUGFREE365 campaign made a significant impact, educating students across multiple campuses about substance abuse prevention.",
      date: "2024-09-25",
      author: "Campaign Team",
      category: "Social Initiative",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.1-laM6KEOcXevAzwId6tbkOQDE3y0KMn.jpeg",
      slug: "drug-awareness-campaign",
    },
    {
      id: 3,
      title: "VASUDHAIVA 2025: Cultural Festival Showcases Student Talent",
      excerpt: "The annual cultural festival brought together students from across the region to celebrate diversity through music, dance, and drama.",
      date: "2025-01-29",
      author: "Cultural Committee",
      category: "Events",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.08%20PM-jEtMoapURWvv8VFzvHmhIQkMrXDzcH.jpeg",
      slug: "vasudhaiva-2025",
    },
    {
      id: 4,
      title: "Leadership Training Program Graduates 150 Student Leaders",
      excerpt: "Our annual leadership development program equipped students with critical skills in social analysis, community organizing, and advocacy.",
      date: "2024-06-20",
      author: "Leadership Team",
      category: "Training",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58-o2eNrP3v7W6Se9JYGuWfNdpch3HQbg.jpeg",
      slug: "leadership-training-2024",
    },
    {
      id: 5,
      title: "Flood Relief Efforts: YESJ Members Serve Affected Communities",
      excerpt: "Our members mobilized quickly to provide relief supplies and support to communities affected by recent flooding in the region.",
      date: "2024-08-15",
      author: "Service Team",
      category: "Social Service",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aicuf5-bkf0Kxo0FK4XG4BNigyOZ3l0EinUE2.jpeg",
      slug: "flood-relief-2024",
    },
    {
      id: 6,
      title: "New Chapter Established at St. Joseph's College",
      excerpt: "We're excited to welcome our newest chapter, expanding YESJ's reach and impact to more students across the region.",
      date: "2024-07-12",
      author: "Expansion Team",
      category: "Announcements",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-05-18%20at%204.58.08%20PM-igdHve2uOiZdR0qGHkZVQ5QU2irlwr.jpeg",
      slug: "new-chapter-josephs",
    },
  ]

  const categories = ["All", "Celebration", "Social Initiative", "Events", "Training", "Social Service", "Announcements"]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <PageHeader
          title="YESJ Echoes"
          description="Stay informed about our latest activities, initiatives, and impact in the community."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Latest Echoes"
              description="Recent updates from YESJ"
              subtitle="Stay Connected"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {echoes.map((echo) => {
                const echoDate = new Date(echo.date)
                const formattedDate = echoDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })

                return (
                  <article
                    key={echo.id}
                    className="group relative overflow-hidden rounded-lg border border-primary/10 transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={echo.image}
                        alt={echo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full">
                          {echo.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={echo.date}>{formattedDate}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{echo.author}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-light text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                        {echo.title}
                      </h3>

                      <p className="text-muted-foreground font-extralight line-clamp-3 mb-4">
                        {echo.excerpt}
                      </p>

                      <Link
                        href={`/echoes/${echo.slug}`}
                        className="text-sm text-primary hover:text-primary/80 font-light transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}