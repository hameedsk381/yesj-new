"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, LayoutGrid, Tag, Edit2, Loader2, Search } from "lucide-react"
import { ImageField } from "@/components/admin/image-field"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GalleryItem {
  id: number
  title: string
  description: string
  category: string
  imagePath: string
}

interface Program {
  slug: string
  title: string
  shortTitle: string | null
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [formData, setFormData] = useState({ title: "", description: "", category: "general", imagePath: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchGallery = useCallback(async (currentPage = page, cat = selectedCategory, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "24",
      })
      if (cat && cat !== "all") params.set("category", cat)
      if (searchVal) params.set("search", searchVal)

      const response = await fetch(`/api/admin/gallery?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setItems(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch gallery", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, selectedCategory, debouncedSearch])

  useEffect(() => {
    fetchGallery(page, selectedCategory, debouncedSearch)
  }, [fetchGallery, page, selectedCategory, debouncedSearch])

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const res = await fetch("/api/programs")
        if (res.ok) setPrograms(await res.json())
      } catch (err) {
        console.error("Failed to fetch programs", err)
      }
    }
    loadPrograms()
  }, [])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ title: "", description: "", category: "general", imagePath: "" })
    setShowForm(true)
  }

  const openEditForm = (item: GalleryItem) => {
    setEditingId(item.id)
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      imagePath: item.imagePath || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
      if (res.ok) fetchGallery(page, selectedCategory, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId && !formData.imagePath) {
      alert("Please select or upload an image")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to save")
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: "", description: "", category: "general", imagePath: "" })
      fetchGallery(page, selectedCategory, debouncedSearch)
    } catch (error) {
      alert("Failed to save")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { label: "All Items", value: "all" },
    { label: "General", value: "general" },
    ...programs.map((p) => ({ label: p.shortTitle || p.title, value: p.slug })),
  ]

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Gallery Management</h1>
            <p className="text-sm text-muted-foreground">Upload, organize, and categorize media assets.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><Plus className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Image</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-10 p-6 bg-white rounded-xl border border-primary/10 shadow-lg max-w-2xl">
            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" /> {editingId ? "Edit Gallery Asset" : "New Gallery Asset"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
                  <input
                    className="w-full border p-3 rounded-lg text-sm outline-none focus:border-primary"
                    placeholder="e.g. Graduation Ceremony 2024"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category / Program</label>
                  <select
                    className="w-full border p-3 rounded-lg text-sm outline-none focus:border-primary bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="general">General Website</option>
                    <optgroup label="Programs">
                      {programs.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.title}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Caption / Description</label>
                <textarea
                  className="w-full border p-3 rounded-lg text-sm outline-none focus:border-primary"
                  placeholder="Brief description of the image content..."
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <ImageField
                label={editingId ? "Image (leave empty to keep current)" : "Image"}
                value={formData.imagePath}
                onChange={(url) => setFormData({ ...formData, imagePath: url })}
                prefix="gallery"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md transition-all"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update Asset" : "Save to Gallery"}
              </Button>
            </form>
          </div>
        )}

        {/* Search & Categories */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images by title or caption..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-md text-muted-foreground text-xs font-medium uppercase tracking-wider">
              <LayoutGrid className="h-3.5 w-3.5" /> Filter
            </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value)
                  setPage(1)
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  selectedCategory === cat.value
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading gallery items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center bg-white border rounded-md">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <LayoutGrid className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-medium">No images found in this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden aspect-[4/5] border hover:border-primary transition-all shadow-sm bg-muted"
                >
                  {item.imagePath ? (
                    <Image src={item.imagePath} alt={item.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tag className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                    <p className="font-bold text-white text-xs truncate leading-tight">{item.title}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-primary/90 text-white px-2 py-0.5 rounded">
                        {item.category.toUpperCase()}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditForm(item)}
                          className="bg-white/20 hover:bg-white text-white hover:text-gray-800 p-1.5 rounded-md backdrop-blur-md transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-white/10 hover:bg-red-500 text-white p-1.5 rounded-md backdrop-blur-md transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
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
              itemName="images"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
