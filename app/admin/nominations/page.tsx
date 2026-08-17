"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Trash2, Check, X, Loader2, Search } from "lucide-react"

interface Nomination {
  id: number
  name: string
  unitName: string
  contestingFor: string
  educationQualification: string
  nocFilePath: string
  status: string
  createdAt: string
}

export default function NominationsPage() {
  const [nominations, setNominations] = useState<Nomination[]>([])
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

  const fetchNominations = useCallback(async (currentPage = page, searchVal = debouncedSearch, status = statusFilter) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "25",
      })
      if (searchVal) params.set("search", searchVal)
      if (status) params.set("status", status)

      const response = await fetch(`/api/admin/nominations?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch nominations")
      }

      const data = Array.isArray(result) ? result : (result.data || [])
      const pagination = result.pagination || { total: data.length, totalPages: 1 }

      setNominations(data)
      setTotalItems(pagination.total)
      setTotalPages(pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchNominations(page, debouncedSearch, statusFilter)
  }, [fetchNominations, page, debouncedSearch, statusFilter])

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/nominations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      setNominations((prev) =>
        prev.map((nom) => (nom.id === id ? { ...nom, status } : nom))
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this nomination?")) return

    try {
      const response = await fetch(`/api/admin/nominations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete nomination")

      fetchNominations(page, debouncedSearch, statusFilter)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete nomination")
    }
  }

  const exportToCSV = () => {
    const headers = ["Name", "Unit", "Position", "Education", "NOC File", "Status", "Date"]
    const rows = nominations.map((nom) => [
      `"${nom.name.replace(/"/g, '""')}"`,
      `"${nom.unitName.replace(/"/g, '""')}"`,
      `"${nom.contestingFor.replace(/"/g, '""')}"`,
      `"${(nom.educationQualification || "").replace(/"/g, '""').replace(/,/g, ";")}"`,
      `"${nom.nocFilePath || ""}"`,
      `"${nom.status}"`,
      `"${new Date(nom.createdAt).toLocaleDateString()}"`,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nominations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Leadership Nominations</h1>
            <p className="text-sm text-muted-foreground">Review candidate submissions and verification documents.</p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="rounded-md"
            disabled={nominations.length === 0}
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
              placeholder="Search by candidate name, unit, position..."
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
            <p className="text-sm text-muted-foreground">Loading nominations...</p>
          </div>
        ) : (
          <div className="bg-white border border-primary/10 rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Education
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      NOC File
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {nominations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground text-sm">
                        No nominations found.
                      </td>
                    </tr>
                  ) : (
                    nominations.map((nom) => (
                      <tr key={nom.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{nom.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{nom.unitName}</td>
                        <td className="px-4 py-3 text-sm font-medium text-primary">{nom.contestingFor}</td>
                        <td className="px-4 py-3 text-xs max-w-xs truncate text-gray-600">
                          {nom.educationQualification || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {nom.nocFilePath ? (
                            <a
                              href={nom.nocFilePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1 text-xs font-medium"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View NOC
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No file</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2.5 py-0.5 text-xs rounded-full font-medium capitalize ${
                              nom.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : nom.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {nom.status || "pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {new Date(nom.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {nom.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleStatusChange(nom.id, "approved")}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            {nom.status !== "rejected" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleStatusChange(nom.id, "rejected")}
                                className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(nom.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
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
              itemName="nominations"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
