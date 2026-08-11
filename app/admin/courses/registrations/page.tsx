"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Trash2, Download } from "lucide-react"

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

  useEffect(() => { fetchRegistrations() }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/admin/course-registrations")
      if (res.ok) setRegistrations(await res.json())
    } catch (err) {
      console.error("Failed to fetch registrations", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this registration?")) return
    try {
      const res = await fetch(`/api/admin/course-registrations/${id}`, { method: "DELETE" })
      if (res.ok) fetchRegistrations()
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Course", "Amount", "Payment Status", "Status", "Date"]
    const rows = registrations.map(r => [
      r.id, r.name, r.email, r.phone, r.courseTitle || "", r.amount ? `₹${r.amount}` : "", r.paymentStatus || "", r.status, new Date(r.createdAt).toLocaleDateString()
    ])
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "course-registrations.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-light text-primary">Course Registrations</h1>
          <Button variant="outline" onClick={exportCSV}><Download className="mr-2 h-4 w-4" /> CSV</Button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><p className="text-lg">No registrations yet.</p></div>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Phone</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Course</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Payment</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right p-3 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{reg.name}</td>
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
                    <td className="p-3 text-sm text-gray-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(reg.id)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
