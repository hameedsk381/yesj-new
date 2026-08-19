"use client"

import { useState, type FormEvent } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { isRemoteImage } from "@/lib/utils"

const facilities = [
  {
    name: "Seminar Hall 1",
    capacity: "90-105 participants",
    features: "AV equipment, projector, AC, whiteboard",
    use: "Seminars, workshops, PEP sessions",
    image: "https://storage.googleapis.com/yesj/website/IMG_8159.JPG",
  },
  {
    name: "Seminar Hall 2",
    capacity: "90-105 participants",
    features: "AV equipment, projector, AC, whiteboard",
    use: "Seminars, workshops, PEP sessions",
    image: "https://storage.googleapis.com/yesj/website/IMG_8174.JPG",
  },
  {
    name: "Computer Lab",
    capacity: "25 computers",
    features: "High-speed internet, printers, UPS",
    use: "ICT training and EOTT support",
    image: "https://storage.googleapis.com/yesj/website/english.jpg",
  },
  {
    name: "Residential Dormitories",
    capacity: "6 dormitories, 10 residents each",
    features: "Beds, storage, bathrooms",
    use: "Residential youth programs",
    image: "https://storage.googleapis.com/yesj/website/IMG_9052.JPG",
  },
  {
    name: "Dining Hall",
    capacity: "60 persons",
    features: "Dining tables and service support",
    use: "Residential batches and event meals",
    image: "https://storage.googleapis.com/yesj/website/IMG_8897.JPG",
  },
  {
    name: "Counseling Room",
    capacity: "1-on-1 or small groups",
    features: "Private and comfortable",
    use: "Scholar mentoring and individual guidance",
    image: "https://storage.googleapis.com/yesj/website/IMG_5999.JPG",
  },
  {
    name: "Chapel / Prayer Space",
    capacity: "30 persons",
    features: "Quiet reflection space",
    use: "O GOD sessions, prayer, meditation",
    image: "https://storage.googleapis.com/yesj/website/20241114_153846.jpg",
  },
  {
    name: "Outdoor Courtyard & Rooms",
    capacity: "800+ courtyard | 28 AC rooms",
    features: "WiFi-enabled rooms, open event space",
    use: "Youth festivals, gatherings, and campus stays",
    image: "https://storage.googleapis.com/yesj/website/20241114_153848.jpg",
  },
]

const tourTabs = {
  Overview: [
    "https://storage.googleapis.com/yesj/website/IMG_8159.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_8174.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_9052.JPG",
  ],
  "Training Hall": [
    "https://storage.googleapis.com/yesj/website/IMG_8159.JPG",
    "https://storage.googleapis.com/yesj/website/vlcsnap-2024-11-14-15h29m40s042.png",
    "https://storage.googleapis.com/yesj/website/vlcsnap-2024-11-14-15h29m37s327.png",
  ],
  "Computer Lab": [
    "https://storage.googleapis.com/yesj/website/english.jpg",
    "https://storage.googleapis.com/yesj/website/vlcsnap-2024-11-14-15h28m49s716.png",
    "https://storage.googleapis.com/yesj/website/vlcsnap-2024-11-14-15h33m03s528.png",
  ],
  Dormitory: [
    "https://storage.googleapis.com/yesj/website/IMG_9052.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_9144.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_8989.JPG",
  ],
  Dining: [
    "https://storage.googleapis.com/yesj/website/IMG_8897.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_5899.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_5986.JPG",
  ],
  Chapel: [
    "https://storage.googleapis.com/yesj/website/20241114_153846.jpg",
    "https://storage.googleapis.com/yesj/website/20241114_153848.jpg",
    "https://storage.googleapis.com/yesj/website/IMG_5999.JPG",
  ],
  Campus: [
    "https://storage.googleapis.com/yesj/website/IMG_8159.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_8174.JPG",
    "https://storage.googleapis.com/yesj/website/IMG_6800.JPG",
  ],
} as const

export default function CentreForExcellencePage() {
  const [activeTab, setActiveTab] = useState<keyof typeof tourTabs>("Overview")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary">Andhra Loyola College Campus, Vijayawada</p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                YES-J Centre for Excellence
              </h1>
              <p className="mt-4 text-xl text-primary">A Space Where Potential Becomes Purpose.</p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Our hub for YES-J programs: a one-stop facility for training, learning, and
                transformation in the heart of Vijayawada.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full px-5">
                  <a href="#booking">Book the Centre</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-5">
                  <a href="#virtual-tour">Take a Virtual Tour</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container grid gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:px-8 lg:py-20">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">About the Centre</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                The YES-J Centre for Excellence at Andhra Loyola College Campus is the operational
                and programmatic heartbeat of the organisation. It belongs to the ministry of the
                Andhra Jesuit Province and is legally part of The Loyola College Society,
                Guntur-Vijayawada.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Young people come here to learn English, build vocational skills, receive
                scholarships, grow in faith, and find their YES in a structured and welcoming
                environment.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white">
              <div className="relative aspect-[16/11]">
                <Image
                  src="https://storage.googleapis.com/yesj/website/IMG_8159.JPG"
                  alt="YES-J Centre for Excellence"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="font-serif text-3xl font-bold text-foreground">Facilities Available</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {facilities.map((facility) => (
                <article key={facility.name} className="overflow-hidden rounded-3xl border border-border bg-background">
                  <div className="relative aspect-[4/3]">
                    <Image src={facility.image} alt={facility.name} fill unoptimized={isRemoteImage(facility.image)} className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">{facility.name}</h3>
                    <p className="mt-2 text-sm text-primary">{facility.capacity}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{facility.features}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{facility.use}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-foreground">Book the Centre for Excellence</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Submit a booking request for seminars, training sessions, retreats, youth events,
                meetings, or other approved uses of the YES-J Centre.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 rounded-3xl border border-border bg-white p-8 md:grid-cols-2">
              <input className="rounded-2xl border border-input px-4 py-3" placeholder="Name of organization / individual" required />
              <input className="rounded-2xl border border-input px-4 py-3" placeholder="Contact person name" required />
              <input className="rounded-2xl border border-input px-4 py-3" type="email" placeholder="Contact email" required />
              <input className="rounded-2xl border border-input px-4 py-3" type="tel" placeholder="Contact phone" required />
              <select className="rounded-2xl border border-input px-4 py-3 md:col-span-2" defaultValue="">
                <option value="" disabled>
                  Purpose of booking
                </option>
                <option>Workshop / Seminar</option>
                <option>Training</option>
                <option>Retreat</option>
                <option>Youth Event</option>
                <option>Meeting</option>
                <option>Other</option>
              </select>
              <input className="rounded-2xl border border-input px-4 py-3" type="number" placeholder="Expected participants" />
              <select className="rounded-2xl border border-input px-4 py-3" defaultValue="">
                <option value="" disabled>
                  Partner organization?
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <div className="md:col-span-2">
                <p className="mb-3 text-sm font-medium text-foreground">Facilities required</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {["Training Hall", "Computer Lab", "Dormitory", "Dining", "Chapel", "Courtyard"].map((label) => (
                    <label key={label} className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground">
                      <input type="checkbox" name="facilities" value={label} />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              <input className="rounded-2xl border border-input px-4 py-3" type="date" />
              <input className="rounded-2xl border border-input px-4 py-3" type="date" />
              <input className="rounded-2xl border border-input px-4 py-3" type="time" />
              <input className="rounded-2xl border border-input px-4 py-3" type="time" />
              <textarea className="min-h-32 rounded-2xl border border-input px-4 py-3 md:col-span-2" placeholder="Additional requirements" />
              <div className="md:col-span-2">
                <Button type="submit" className="rounded-full px-5">
                  Submit Booking Request
                </Button>
                {submitted ? (
                  <p className="mt-4 text-sm text-tertiary">
                    Booking request captured. The team can follow up within 48 hours.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </section>

        <section id="virtual-tour" className="bg-white">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Virtual Tour</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  Explore the campus through key facility zones and spaces used by YES-J
                  participants, staff, partners, and visiting groups.
                </p>
              </div>
              <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
                Need more details? Contact YES-J
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {Object.keys(tourTabs).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as keyof typeof tourTabs)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {tourTabs[activeTab].map((image) => (
                <div key={image} className="relative overflow-hidden rounded-3xl border border-border bg-background">
                  <div className="relative aspect-[4/3]">
                    <Image src={image} alt={`${activeTab} at YES-J Centre for Excellence`} fill unoptimized={isRemoteImage(image)} className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
