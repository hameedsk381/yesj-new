"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Check, X } from "lucide-react"

interface Registration {
  id: number
  name: string
  emailId: string
  mobileNo: string
  whatsappNo: string
  applicationType: string
  gender: string
  age: string
  course: string
  registrationNo: string
  religion: string
  address: string
  unitName?: string
  registrationId: string
  status: string
  createdAt: Date
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
}

export default function RegistrationsPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // No need to check localStorage - middleware handles authentication
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/registrations")
      const result = await response.json()

      if (!response.ok) {
        throw new Error("Failed to fetch registrations")
      }

      // Backend returns array directly. Map to camelCase interface
      const data = Array.isArray(result) ? result : (result.data || [])
      const mappedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        emailId: item.email_id || item.emailId,
        mobileNo: item.mobile_no || item.mobileNo,
        whatsappNo: item.whatsapp_no || item.whatsappNo,
        applicationType: item.application_type || item.applicationType,
        gender: item.gender,
        age: item.age?.toString(),
        course: item.course,
        registrationNo: item.registration_no || item.registrationNo,
        religion: item.religion,
        address: item.address,
        registrationId: item.registrationId || item.registration_id || `REG-${item.id}`,
        status: item.status || "pending",
        createdAt: new Date(item.created_at || item.createdAt)
      }))

      setRegistrations(mappedData)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this registration?")) return

    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete registration")
      }

      fetchRegistrations()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete registration")
    }
  }

  const handleStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      fetchRegistrations()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update status")
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Registration ID",
      "Name",
      "Email",
      "Mobile",
      "WhatsApp",
      "Type",
      "Gender",
      "Age",
      "Course",
      "Reg No",
      "Religion",
      "Address",
      "Status",
      "Date",
    ]

    const rows = registrations.map((reg) => [
      reg.registrationId,
      reg.name,
      reg.emailId,
      reg.mobileNo,
      reg.whatsappNo,
      reg.applicationType,
      reg.gender,
      reg.age,
      reg.course,
      reg.registrationNo,
      reg.religion,
      reg.address,
      reg.status,
      new Date(reg.createdAt).toLocaleDateString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-light text-primary">Registrations</h1>
          <Button
            onClick={exportToCSV}
            className="rounded-md bg-primary hover:bg-primary/90 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-primary/10 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Registration ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mobile
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{reg.registrationId}</td>
                      <td className="px-4 py-3 text-sm font-medium">{reg.name}</td>
                      <td className="px-4 py-3 text-sm">{reg.emailId}</td>
                      <td className="px-4 py-3 text-sm">{reg.mobileNo}</td>
                      <td className="px-4 py-3 text-sm capitalize">{reg.applicationType}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            statusStyles[reg.status] || statusStyles.pending
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-1">
                          {reg.status !== "approved" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStatus(reg.id, "approved")}
                              className="h-7 px-2 rounded-md text-green-600 hover:bg-green-50"
                              title="Approve"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          {reg.status !== "rejected" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStatus(reg.id, "rejected")}
                              className="h-7 px-2 rounded-md text-red-500 hover:bg-red-50"
                              title="Reject"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(reg.id)}
                            className="h-7 px-2 rounded-md"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Total: {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
        </div>
      </main>
    </AdminLayout>
  )
}
