"use client"

import { useState, useMemo } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import { Calendar, MapPin, List, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import EventFilters, { EventFilters as EventFiltersType } from "@/components/event-filters"
import CalendarView from "@/components/calendar-view"

interface Event {
  date: string
  title: string
  description: string
  location: string
  fee?: string
  deadline?: string
  type: string
}

export default function EventsPage() {
  const [filters, setFilters] = useState<EventFiltersType>({
    location: "all",
    month: "all",
    type: "all",
  })
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const allEvents: Event[] = [
    {
      date: "2025-06-15",
      title: "National Leadership Camp",
      description: "A week-long residential camp focusing on leadership development and social analysis.",
      location: "Chennai",
      fee: "₹2,000",
      deadline: "May 30, 2025",
      type: "camp",
    },
    {
      date: "2025-07-08",
      title: "Interfaith Dialogue",
      description: "A panel discussion on the role of faith in promoting social harmony and peace.",
      location: "Mumbai",
      fee: "Free",
      deadline: "July 5, 2025",
      type: "dialogue",
    },
    {
      date: "2025-08-12",
      title: "Regional Conference",
      description: "A three-day conference on 'Youth for Climate Justice' with workshops and action planning.",
      location: "Bangalore",
      fee: "₹1,500",
      deadline: "August 1, 2025",
      type: "conference",
    },
    {
      date: "2025-09-25",
      title: "Anti-Drug Awareness Campaign",
      description: "A two-day campaign on drug awareness and prevention featuring workshops and testimonials.",
      location: "Hyderabad",
      fee: "₹500",
      deadline: "September 15, 2025",
      type: "campaign",
    },
    {
      date: "2026-01-29",
      title: "VASUDHAIVA Cultural Festival",
      description: "A celebration of cultural diversity and talent showcasing performances by APTSAICUF members.",
      location: "Hyderabad",
      type: "cultural",
    },
  ]

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const eventDate = new Date(event.date)
      const eventMonth = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`
      
      const locationMatch = filters.location === "all" || 
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const monthMatch = filters.month === "all" || eventMonth === filters.month
      
      const typeMatch = filters.type === "all" || event.type === filters.type

      return locationMatch && monthMatch && typeMatch
    })
  }, [filters])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'APTSAICUF Events',
    description: 'Upcoming events and activities organized by APTSAICUF',
    itemListElement: [
      {
        '@type': 'Event',
        name: 'VASUDHAIVA Cultural Festival',
        description: 'A celebration of cultural diversity and talent showcasing performances by APTSAICUF members.',
        startDate: '2026-01-29',
        endDate: '2026-01-29',
        location: {
          '@type': 'Place',
          name: 'Hyderabad',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'APTSAICUF',
          url: 'https://aptsaicuf.org',
        },
      },
      {
        '@type': 'Event',
        name: 'National Leadership Camp',
        description: 'A week-long residential camp focusing on leadership development and social analysis.',
        startDate: '2025-06-15',
        endDate: '2025-06-20',
        location: {
          '@type': 'Place',
          name: 'Chennai',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chennai',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'APTSAICUF',
          url: 'https://aptsaicuf.org',
        },
        offers: {
          '@type': 'Offer',
          price: '2000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
        },
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Events & Activities"
          description="Join us for these upcoming events and activities to get involved with APTSAICUF."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-maroon hover:bg-maroon/90 text-white' : 'border-primary text-primary'}`}
                >
                  <List className="h-4 w-4 mr-2" />
                  List View
                </Button>
                <Button
                  onClick={() => setViewMode('calendar')}
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'calendar' ? 'bg-maroon hover:bg-maroon/90 text-white' : 'border-primary text-primary'}`}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar View
                </Button>
              </div>
            </div>

            <EventFilters onFilterChange={setFilters} />

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-extralight">No events found matching your filters. Try adjusting your search criteria.</p>
              </div>
            )}

            {viewMode === 'calendar' ? (
              <CalendarView 
                events={filteredEvents.map(e => ({
                  date: e.date,
                  title: e.title,
                  type: e.type,
                  location: e.location
                }))}
              />
            ) : (
              <>
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center mb-16">
              <div>
                <SectionHeader
                  title="Featured Event"
                  description="Join us for our flagship cultural celebration"
                  align="left"
                  subtitle="Upcoming Highlight"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-maroon">VASUDHAIVA Cultural Festival</h3>
                  <p className="text-muted-foreground font-extralight">
                    A celebration of cultural diversity and talent showcasing performances by APTSAICUF members from
                    across the region. Join us for music, dance, drama, and more as we explore the theme of "One Earth,
                    One Family."
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground font-extralight">January 29, 2026</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground font-extralight">Hyderabad, Telangana</span>
                  </div>
                  <Link href="/register">
                    <Button className="mt-4 rounded-none bg-maroon hover:bg-maroon/90 text-white">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%204.58.08%20PM-jEtMoapURWvv8VFzvHmhIQkMrXDzcH.jpeg"
                  alt="VASUDHAIVA Cultural Festival"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>

            <SectionHeader
              title="Upcoming Events"
              description={`${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`}
              subtitle="Join Us"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredEvents.map((event, index) => {
                const eventDate = new Date(event.date)
                const formattedDate = eventDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })

                return (
                  <div key={index} className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground font-extralight">{formattedDate}</span>
                    </div>
                    <h3 className="text-xl font-light mb-2 text-maroon">{event.title}</h3>
                    <p className="text-muted-foreground font-extralight">{event.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-extralight">{event.location}</span>
                    </div>
                    {(event.fee || event.deadline) && (
                      <div className="mt-6 flex flex-col gap-2">
                        {event.fee && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-light">Registration Fee:</span>
                            <span className="text-sm font-light">{event.fee}</span>
                          </div>
                        )}
                        {event.deadline && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-light">Registration Deadline:</span>
                            <span className="text-sm font-light">{event.deadline}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <Link href="/register">
                      <Button className="mt-4 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
                </>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Centennial Celebration Events"
              description="Special events to celebrate 100 years of AICUF"
              subtitle="1924-2024"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">October 10, 2024</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">Centennial Inauguration</h3>
                <p className="text-muted-foreground font-extralight">
                  The official inauguration of the centennial year celebrations with special guests and cultural
                  programs.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Chennai, Tamil Nadu</span>
                </div>
                <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">Learn More</Button>
              </div>
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">November 15-20, 2024</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">National Symposium</h3>
                <p className="text-muted-foreground font-extralight">
                  A national symposium on "100 Years of Student Activism: Challenges and Opportunities" with keynote
                  speakers and panel discussions.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Delhi, India</span>
                </div>
                <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">Learn More</Button>
              </div>
              <div className="group relative overflow-hidden border border-primary/10 p-6 transition-all hover:border-primary/30 hover:shadow-sm rounded-lg bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground font-extralight">December 8, 2024</span>
                </div>
                <h3 className="text-xl font-light mb-2 text-maroon">Centennial Mass</h3>
                <p className="text-muted-foreground font-extralight">
                  A special Mass to commemorate 100 years of AICUF, followed by a cultural program and fellowship
                  dinner.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-extralight">Bangalore, Karnataka</span>
                </div>
                <Button className="mt-6 w-full rounded-none bg-maroon hover:bg-maroon/90 text-white">Learn More</Button>
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