"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, IndianRupee, GraduationCap } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { isRemoteImage } from "@/lib/utils"

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

export default function CoursesClientPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">Our Courses</h1>
            <p className="text-lg text-muted-foreground font-extralight max-w-2xl mx-auto">
              Skill-building programs designed to empower youth with practical knowledge and career-ready abilities.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg text-muted-foreground">No courses available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {courses.map(course => (
                <div key={course.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="relative h-48 bg-gray-100">
                    {course.imagePath ? (
                      <Image src={course.imagePath} alt={course.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized={isRemoteImage(course.imagePath)} className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center"><GraduationCap className="h-12 w-12 text-muted-foreground/20" /></div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${course.registrationOpen ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {course.registrationOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    {course.shortDescription && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{course.shortDescription}</p>
                    )}
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {course.price ? (
                          <span className="flex items-center gap-1"><IndianRupee className="h-4 w-4" /> {course.price}</span>
                        ) : (
                          <span className="text-green-600 font-medium">Free</span>
                        )}
                        {course.maxStudents && (
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.maxStudents} seats</span>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button className="w-full bg-primary text-white" disabled={!course.registrationOpen}>
                          {course.registrationOpen ? "Enroll Now" : "Closed"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
