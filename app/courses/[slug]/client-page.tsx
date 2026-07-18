"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Users, IndianRupee, GraduationCap, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"

interface Course {
  id: number
  slug: string
  title: string
  description: string
  shortDescription: string
  imagePath: string | null
  price: number | null
  startDate: string | null
  endDate: string | null
  maxStudents: number | null
  registrationOpen: boolean
}

export default function CourseDetailClient({ slug }: { slug: string }) {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({ name: "", email: "", phone: "" })

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then(r => r.json())
      .then(data => { setCourse(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/course-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, ...form }),
      })
      if (res.ok) setRegistered(true)
      else { const d = await res.json(); alert(d.error || "Registration failed") }
    } catch {
      alert("Something went wrong")
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      <Footer />
    </div>
  )

  if (!course) return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-20 text-center">
        <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-light text-primary mb-4">Course Not Found</h1>
        <Link href="/courses"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Browse Courses</Button></Link>
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteConfig.url },
        { name: "Courses", url: `${siteConfig.url}/courses` },
        { name: course.title, url: `${siteConfig.url}/courses/${course.slug}` },
      ]} />
      <main className="flex-1 pt-24">
        <section className="container px-4 md:px-6 py-12">
          <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100 mb-6">
                {course.imagePath ? (
                  <Image src={course.imagePath} alt={course.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><GraduationCap className="h-20 w-20 text-muted-foreground/20" /></div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-primary mb-4">{course.title}</h1>
              {course.description ? (
                <div className="prose max-w-none text-gray-600">
                  {course.description.split("\n").map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                </div>
              ) : course.shortDescription && (
                <p className="text-gray-600 text-lg">{course.shortDescription}</p>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border rounded-lg p-6 sticky top-28 shadow-sm">
                <h2 className="text-lg font-bold mb-4">Course Details</h2>
                <div className="space-y-3 text-sm mb-6">
                  {course.price ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <IndianRupee className="h-4 w-4" /> <span className="font-bold text-lg text-primary">₹{course.price}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 font-bold"><CheckCircle className="h-4 w-4" /> Free</div>
                  )}
                  {course.maxStudents && (
                    <div className="flex items-center gap-2 text-gray-600"><Users className="h-4 w-4" /> {course.maxStudents} seats</div>
                  )}
                  {course.startDate && (
                    <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4" /> Starts: {new Date(course.startDate).toLocaleDateString()}</div>
                  )}
                </div>

                {registered ? (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-1">Registered!</h3>
                    <p className="text-sm text-gray-500 mb-4">We'll reach out to you shortly.</p>
                    <Button variant="outline" onClick={() => router.push("/courses")}>Browse More Courses</Button>
                  </div>
                ) : course.registrationOpen ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Register Now</h3>
                    <input className="w-full border p-2 rounded text-sm" placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input type="email" className="w-full border p-2 rounded text-sm" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <input type="tel" className="w-full border p-2 rounded text-sm" placeholder="Phone" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    <Button type="submit" disabled={submitting} className="w-full bg-primary text-white">
                      {submitting ? "Submitting..." : "Enroll Now"}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-4 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-700 font-medium">Registrations are currently closed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
