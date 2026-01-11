"use client"

import { useState, useMemo } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, List, CalendarDays, ArrowRight, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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
  image: string
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
      date: "2026-01-29",
      title: "YY 2026: YESJ Yuvotsavaalu",
      description: "Our flagship youth festival! A week of collective vision building, cultural celebrating, and leadership development.",
      location: "Secunderabad",
      fee: "Free for members",
      deadline: "Jan 15, 2026",
      type: "cultural",
      image: "/website/IMG_8204.JPG"
    },
    {
      date: "2025-05-15",
      title: "Summer Shapes 2025 Batch-I",
      description: "Residential English immersion program begins for Batch-I. Transform your communication and confidence.",
      location: "Hyderabad",
      fee: "Zero Cost",
      deadline: "April 30, 2025",
      type: "camp",
      image: "/website/IMG_6787.JPG"
    },
    {
      date: "2025-06-10",
      title: "O GOD Orientation",
      description: "A two-day spiritual retreat to strengthen faith and personal connection with God.",
      location: "Vijayawada",
      fee: "Contribution Based",
      deadline: "May 25, 2025",
      type: "dialogue",
      image: "/website/IMG_5899.JPG"
    },
    {
      date: "2025-08-12",
      title: "Regional MAGIC Youth Summit",
      description: "Student leaders from across Telugu states gather to discuss social action and campus transformation.",
      location: "Visakhapatnam",
      fee: "500",
      deadline: "July 20, 2025",
      type: "conference",
      image: "/website/IMG_5986.JPG"
    }
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Events <span className="text-primary italic">& Calendars</span>
            </motion.h1>
            <p className="text-xl text-gray-600 font-light italic">
              Join us for high-energy growth, celebration, and spiritual transformation.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary font-bold' : 'text-gray-500'}`}
                >
                  <List className="h-4 w-4" /> List
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${viewMode === 'calendar' ? 'bg-white shadow text-primary font-bold' : 'text-gray-500'}`}
                >
                  <CalendarDays className="h-4 w-4" /> Calendar
                </button>
              </div>
              <div className="w-full md:w-auto">
                <EventFilters onFilterChange={setFilters} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'calendar' ? (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <CalendarView
                    events={filteredEvents.map(e => ({
                      date: e.date,
                      title: e.title,
                      type: e.type,
                      location: e.location
                    }))}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-8 lg:grid-cols-2"
                >
                  {filteredEvents.map((event, index) => (
                    <div key={index} className="group relative bg-gray-50 rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-[350px] border border-gray-100 hover:shadow-2xl transition-all">
                      <div className="md:w-2/5 relative h-full">
                        <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-2xl shadow-sm">
                          <div className="text-xl font-black text-primary leading-tight">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-3 h-3 text-secondary" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">{event.type}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-4 line-clamp-2">{event.title}</h3>
                          <p className="text-gray-500 font-light text-sm line-clamp-3 mb-6">{event.description}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <MapPin className="w-4 h-4" /> {event.location}
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="link" className="p-0 h-auto text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                              Details <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {filteredEvents.length === 0 && (
              <div className="text-center py-24 bg-gray-50 rounded-[3rem]">
                <p className="text-2xl font-light text-gray-400">No events match your creative vision.</p>
                <Button variant="link" onClick={() => setFilters({ location: "all", month: "all", type: "all" })} className="mt-4 text-primary font-bold underline">Clear all labels</Button>
              </div>
            )}
          </div>
        </section>

        {/* Global Impact CTA */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Ready to make a transformation?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
              Join thousands of youth who have already said YES to leadership. Our events are the gateway to your future.
            </p>
            <Button className="bg-secondary text-white px-10 rounded-full h-16 text-xl shadow-xl hover:scale-105 transition-transform border-none">
              Register for Next Event
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
