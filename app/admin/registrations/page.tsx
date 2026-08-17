"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Check, X, Loader2, Search } from "lucide-react"

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
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchRegistrations = useCallback(async (currentPage = page, searchVal = debouncedSearch, status = statusFilter) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "25",
      })
      if (searchVal) params.set("search", searchVal)
      if (status) params.set("status", status)

      const response = await fetch(`/api/admin/registrations?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch registrations")
      }

      const data = Array.isArray(result) ? result : (result.data || [])
      const pagination = result.pagination || { total: data.length, totalPages: 1 }

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
        createdAt: new Date(item.created_at || item.createdAt),
      }))

      setRegistrations(mappedData)
      setTotalItems(pagination.total)
      setTotalPages(pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchRegistrations(page, debouncedSearch, statusFilter)
  }, [fetchRegistrations, page, debouncedSearch, statusFilter])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this registration?")) return

    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete registration")

      fetchRegistrations(page, debouncedSearch, statusFilter)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete registration")
    }
  }

  const handleStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status")
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
      `"${reg.registrationId}"`,
      `"${reg.name.replace(/"/g, '""')}"`,
      `"${reg.emailId}"`,
      `"${reg.mobileNo || ""}"`,
      `"${reg.whatsappNo || ""}"`,
      `"${reg.applicationType}"`,
      `"${reg.gender || ""}"`,
      `"${reg.age || ""}"`,
      `"${reg.course || ""}"`,
      `"${reg.registrationNo || ""}"`,
      `"${reg.religion || ""}"`,
      `"${(reg.address || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${reg.status}"`,
      `"${new Date(reg.createdAt).toLocaleDateString()}"`,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Registrations</h1>
            <p className="text-sm text-muted-foreground">Manage and review youth programme registrations.</p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="rounded-md"
            disabled={registrations.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Page CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, mobile, reg ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="px-3 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary text-gray-700"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading registrations...</p>
          </div>
        ) : (
          <div className="bg-white border border-primary/10 rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Reg ID
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
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground text-sm">
                        No registrations found.
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs font-mono">{reg.registrationId}</td>
                        <td className="px-4 py-3 text-sm font-medium">{reg.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{reg.emailId}</td>
                        <td className="px-4 py-3 text-sm">{reg.mobileNo}</td>
                        <td className="px-4 py-3 text-xs capitalize">{reg.applicationType}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {reg.createdAt.toLocaleDateString()}
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
