"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Loader2, Search } from "lucide-react"

interface Newsletter {
  id: number
  email: string
  subscribedAt: Date
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchNewsletters = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "25",
      })
      if (searchVal) params.set("search", searchVal)

      const response = await fetch(`/api/admin/newsletters?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch newsletters")
      }

      const data = Array.isArray(result) ? result : (result.data || [])
      const pagination = result.pagination || { total: data.length, totalPages: 1 }

      const mappedData = data.map((item: any) => ({
        id: item.id,
        email: item.email,
        subscribedAt: new Date(item.subscribed_at || item.createdAt || item.subscribedAt),
      }))

      setNewsletters(mappedData)
      setTotalItems(pagination.total)
      setTotalPages(pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchNewsletters(page, debouncedSearch)
  }, [fetchNewsletters, page, debouncedSearch])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return

    try {
      const response = await fetch(`/api/admin/newsletters/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete subscriber")

      fetchNewsletters(page, debouncedSearch)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete subscriber")
    }
  }

  const exportToCSV = () => {
    const headers = ["Email", "Subscribed Date"]
    const rows = newsletters.map((newsletter) => [
      `"${newsletter.email}"`,
      `"${new Date(newsletter.subscribedAt).toLocaleDateString()}"`,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Newsletter Subscribers</h1>
            <p className="text-sm text-muted-foreground">Community members subscribed to YESJ email updates.</p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="rounded-md"
            disabled={newsletters.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Page CSV
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading subscribers...</p>
          </div>
        ) : (
          <div className="bg-white border border-primary/10 rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subscribed Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {newsletters.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground text-sm">
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    newsletters.map((newsletter) => (
                      <tr key={newsletter.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{newsletter.email}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {new Date(newsletter.subscribedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(newsletter.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
              itemName="subscribers"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
