"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Trash2, Download, Loader2 } from "lucide-react"

interface Registration {
  id: number
  courseId: number
  name: string
  email: string
  phone: string
  fields: Record<string, any> | null
  paymentMode: string | null
  amount: number | null
  paymentStatus: string | null
  status: string
  createdAt: string
  courseTitle: string | null
}

export default function CourseRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchRegistrations = useCallback(async (currentPage = page) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/course-registrations?page=${currentPage}&limit=25`)
      if (res.ok) {
        const result = await res.json()
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setRegistrations(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (err) {
      console.error("Failed to fetch registrations", err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchRegistrations(page)
  }, [fetchRegistrations, page])

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this registration?")) return
    try {
      const res = await fetch(`/api/admin/course-registrations/${id}`, { method: "DELETE" })
      if (res.ok) fetchRegistrations(page)
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Course", "Amount", "Payment Status", "Status", "Date"]
    const rows = registrations.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone || ""}"`,
      `"${(r.courseTitle || "").replace(/"/g, '""')}"`,
      r.amount ? `₹${r.amount}` : "",
      r.paymentStatus || "",
      r.status,
      new Date(r.createdAt).toLocaleDateString()
    ])
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "course-registrations.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Course Registrations</h1>
            <p className="text-sm text-muted-foreground">Manage registrations for training courses and workshops.</p>
          </div>
          <Button variant="outline" onClick={exportCSV} disabled={registrations.length === 0}>
            <Download className="mr-2 h-4 w-4" /> Export Page CSV
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading course registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-white border rounded-md p-12 text-center text-gray-500">
            <p className="text-base font-medium">No registrations yet.</p>
          </div>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-right p-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="p-3 text-sm font-medium text-foreground">{reg.name}</td>
                      <td className="p-3 text-sm text-gray-600">{reg.email}</td>
                      <td className="p-3 text-sm">{reg.phone}</td>
                      <td className="p-3 text-sm">{reg.courseTitle || `Course #${reg.courseId}`}</td>
                      <td className="p-3 text-sm">{reg.amount ? `₹${reg.amount}` : "-"}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          reg.paymentStatus === "paid" ? "bg-green-100 text-green-700" :
                          reg.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>{reg.paymentStatus || "N/A"}</span>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{new Date(reg.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(reg.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
              itemName="registrations"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
