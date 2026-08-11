"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Course {
  id: number
  slug: string
  title: string
  shortDescription: string
  price: number | null
  isActive: boolean
  registrationOpen: boolean
  createdAt: string
}

export default function AdminCoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { fetchCourses() }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses")
      if (res.ok) setCourses(await res.json())
    } catch (err) {
      console.error("Failed to fetch courses", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course and all its registrations?")) return
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" })
      if (res.ok) fetchCourses()
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const toggleActive = async (course: Course) => {
    await fetch(`/api/admin/courses/${course.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !course.isActive }),
    })
    fetchCourses()
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-light text-primary">Courses</h1>
          <div className="flex gap-2">
            <Link href="/admin/courses/registrations">
              <Button variant="outline">View Registrations</Button>
            </Link>
            <Button onClick={() => router.push("/admin/courses/new")} className="bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> New Course
            </Button>
          </div>
        </div>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">No courses yet.</p>
            <Button onClick={() => router.push("/admin/courses/new")} className="bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> Create Your First Course
            </Button>
          </div>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Slug</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Active</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Registration</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{course.title}</td>
                    <td className="p-4 text-sm text-gray-500">{course.slug}</td>
                    <td className="p-4 text-sm">{course.price ? `₹${course.price}` : "Free"}</td>
                    <td className="p-4">
                      <button onClick={() => toggleActive(course)} className={`px-3 py-1 rounded-full text-xs font-medium ${course.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {course.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.registrationOpen ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {course.registrationOpen ? "Open" : "Closed"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/courses/${course.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
