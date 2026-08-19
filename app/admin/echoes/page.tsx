"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, FileText, Loader2, ExternalLink, Edit2, X, Search } from "lucide-react"
import Image from "next/image"
import { ImageField } from "@/components/admin/image-field"
import { isRemoteImage } from "@/lib/utils"

interface Echo {
  id: number
  title: string
  edition: string
  description: string
  releaseDate: string
  filePath: string
  thumbnailPath: string | null
}

export default function EchoesManager() {
  const [echoesList, setEchoesList] = useState<Echo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [formState, setFormState] = useState({
    title: "",
    edition: "",
    releaseDate: "",
    description: "",
    thumbnailPath: "",
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchEchoes = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "24",
      })
      if (searchVal) params.set("search", searchVal)

      const res = await fetch(`/api/admin/echoes?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setEchoesList(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchEchoes(page, debouncedSearch)
  }, [fetchEchoes, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    setFormState({
      title: "",
      edition: "",
      releaseDate: new Date().toISOString().slice(0, 10),
      description: "",
      thumbnailPath: "",
    })
    setShowForm(true)
  }

  const openEditForm = (echo: Echo) => {
    setEditingId(echo.id)
    setFormState({
      title: echo.title,
      edition: echo.edition || "",
      releaseDate: echo.releaseDate ? echo.releaseDate.slice(0, 10) : "",
      description: echo.description || "",
      thumbnailPath: echo.thumbnailPath || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this issue of Echoes?")) return
    setIsDeleting(id)
    try {
      const res = await fetch(`/api/admin/echoes/${id}`, { method: "DELETE" })
      if (res.ok) fetchEchoes(page, debouncedSearch)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)

    try {
      if (editingId) {
        const file = formData.get("file") as File
        const payload: Record<string, any> = {
          title: formState.title,
          edition: formState.edition,
          releaseDate: formState.releaseDate,
          description: formState.description,
          thumbnailPath: formState.thumbnailPath,
        }

        if (file && file.size > 0) {
          const fd = new FormData()
          fd.append("file", file)
          fd.append("folder", "echoes")
          const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd })
          if (uploadRes.ok) {
            const u = await uploadRes.json()
            payload.filePath = u.url
          }
        }

        const res = await fetch(`/api/admin/echoes/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to update")
      } else {
        if (formState.thumbnailPath) formData.append("thumbnailPath", formState.thumbnailPath)
        const res = await fetch("/api/admin/echoes", { method: "POST", body: formData })
        if (!res.ok) {
          const err = await res.json()
          alert(err.error || "Failed to add issue")
          setIsSubmitting(false)
          return
        }
      }

      setShowForm(false)
      setEditingId(null)
      fetchEchoes(page, debouncedSearch)
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Echoes (Periodicals)</h1>
            <p className="text-sm text-muted-foreground">Manage issues and newsletters for the YESJ Echoes publication.</p>
          </div>
          <Button onClick={openAddForm} className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" /> Add New Issue
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, edition, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : echoesList.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-dashed rounded-md">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2 text-sm">Start by adding the first edition of your periodical newsletter &quot;Echoes&quot;.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {echoesList.map((echo) => (
                <div key={echo.id} className="bg-white border rounded-md overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-gray-100 border-b">
                    {echo.thumbnailPath ? (
                      <Image src={echo.thumbnailPath} alt={echo.title} fill className="object-cover" unoptimized={isRemoteImage(echo.thumbnailPath)} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <FileText className="h-12 w-12 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => openEditForm(echo)}
                        className="bg-white/90 hover:bg-white p-1.5 rounded shadow text-gray-700"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 shadow-md"
                        onClick={() => handleDelete(echo.id)}
                        disabled={isDeleting === echo.id}
                        title="Delete"
                      >
                        {isDeleting === echo.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{echo.title}</h3>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{echo.edition}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{echo.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <span className="text-xs text-gray-400">{new Date(echo.releaseDate).toLocaleDateString()}</span>
                      <a href={echo.filePath} target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                        VIEW PDF <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={24}
              onPageChange={(newPage) => setPage(newPage)}
              itemName="issues"
            />
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="font-bold">{editingId ? "Edit Echoes Issue" : "Add New Echoes Issue"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Title</label>
                <input
                  name="title"
                  required
                  className="w-full border rounded p-2 text-sm outline-none focus:border-primary"
                  placeholder="e.g. Echoes 10th Anniversary Special"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Edition / Volume</label>
                <input
                  name="edition"
                  required
                  className="w-full border rounded p-2 text-sm outline-none focus:border-primary"
                  placeholder="e.g. Vol 2, Issue 1"
                  value={formState.edition}
                  onChange={(e) => setFormState({ ...formState, edition: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Release Date</label>
                <input
                  name="releaseDate"
                  type="date"
                  required
                  className="w-full border rounded p-2 text-sm outline-none focus:border-primary"
                  value={formState.releaseDate}
                  onChange={(e) => setFormState({ ...formState, releaseDate: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Description (Optional)</label>
                <textarea
                  name="description"
                  className="w-full border rounded p-2 text-sm h-20 outline-none focus:border-primary"
                  placeholder="Brief summary of this edition..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">PDF File {editingId ? "(leave empty to keep)" : ""}</label>
                  <input name="file" type="file" accept="application/pdf" className="w-full text-xs" />
                </div>
                <div className="space-y-1">
                  <ImageField
                    label={`Thumbnail ${editingId ? "(optional)" : ""}`}
                    value={formState.thumbnailPath}
                    prefix="echoes"
                    onChange={(url) => setFormState({ ...formState, thumbnailPath: url })}
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-white h-11">
                  {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : editingId ? "Update Issue" : "Publish Issue"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="h-11">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
