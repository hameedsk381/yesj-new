"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, Loader2 } from "lucide-react"
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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchCourses = useCallback(async (currentPage = page) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/courses?page=${currentPage}&limit=25`)
      if (res.ok) {
        const result = await res.json()
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setCourses(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (err) {
      console.error("Failed to fetch courses", err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchCourses(page)
  }, [fetchCourses, page])

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course and all its registrations?")) return
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" })
      if (res.ok) fetchCourses(page)
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const toggleActive = async (course: Course) => {
    const nextActive = !course.isActive
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, isActive: nextActive } : c))
    )

    try {
      await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      })
    } catch {
      fetchCourses(page)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Courses</h1>
            <p className="text-sm text-muted-foreground">Manage vocational training courses and skill batches.</p>
          </div>
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
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-md p-8 text-gray-500">
            <p className="text-base font-medium mb-4">No courses created yet.</p>
            <Button onClick={() => router.push("/admin/courses/new")} className="bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> Create Your First Course
            </Button>
          </div>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Active</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Registration</th>
                    <th className="text-right p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-sm text-foreground">{course.title}</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">{course.slug}</td>
                      <td className="p-4 text-sm">{course.price ? `₹${course.price}` : "Free"}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleActive(course)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            course.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {course.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.registrationOpen ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {course.registrationOpen ? "Open" : "Closed"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/admin/courses/${course.id}`)}
                            className="h-8 w-8 p-0"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(course.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={25}
              onPageChange={(newPage) => setPage(newPage)}
              itemName="courses"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
