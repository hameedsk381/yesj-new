"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Calendar as CalendarIcon, MapPin, Edit2, X, Loader2, Search } from "lucide-react"
import Image from "next/image"
import { ImageField } from "@/components/admin/image-field"
import { isRemoteImage } from "@/lib/utils"

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  type: string
  fee: string
  deadline: string
  imagePath: string
  isActive: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [formData, setFormData] = useState({
    title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "", imagePath: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchEvents = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "24",
      })
      if (searchVal) params.set("search", searchVal)

      const response = await fetch(`/api/admin/events?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setEvents(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch events", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchEvents(page, debouncedSearch)
  }, [fetchEvents, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "", imagePath: "" })
    setShowForm(true)
  }

  const openEditForm = (event: Event) => {
    setEditingId(event.id)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 16) : "",
      location: event.location,
      type: event.type || "cultural",
      fee: event.fee || "",
      deadline: event.deadline ? event.deadline.slice(0, 16) : "",
      imagePath: event.imagePath || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this event?")) return
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
      if (res.ok) fetchEvents(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const toggleActive = async (event: Event) => {
    const nextActive = event.isActive === false
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, isActive: nextActive } : e))
    )

    try {
      await fetch(`/api/admin/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      })
    } catch {
      fetchEvents(page, debouncedSearch)
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
      const res = await fetch(editingId ? `/api/admin/events/${editingId}` : "/api/admin/events", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save")
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "", imagePath: "" })
      fetchEvents(page, debouncedSearch)
    } catch (error) {
      alert("Failed to save event")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Events Management</h1>
            <p className="text-sm text-muted-foreground">Manage upcoming youth programs, festivals, and gatherings.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Event</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Event" : "Add New Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <select
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary bg-white"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="cultural">Cultural</option>
                  <option value="camp">Camp</option>
                  <option value="dialogue">Dialogue</option>
                  <option value="conference">Conference</option>
                </select>
              </div>
              <textarea
                className="w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                placeholder="Description"
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Fee (Optional)"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
              <ImageField
                label={editingId ? "Image (leave empty to keep current)" : "Image"}
                value={formData.imagePath}
                onChange={(url) => setFormData({ ...formData, imagePath: url })}
                prefix="events"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Event" : "Create Event"}
              </Button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events by title, description, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">
            No events found.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white border rounded-md overflow-hidden shadow-sm">
                  <div className="relative h-48 bg-gray-100">
                    {event.imagePath ? (
                      <Image src={event.imagePath} alt={event.title} fill className="object-cover" unoptimized={isRemoteImage(event.imagePath)} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button
                        onClick={() => toggleActive(event)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          event.isActive !== false ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {event.isActive !== false ? "Active" : "Inactive"}
                      </button>
                      <button
                        onClick={() => openEditForm(event)}
                        className="bg-white/90 hover:bg-white p-1.5 rounded shadow text-gray-700"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-white/90 hover:bg-red-500 p-1.5 rounded shadow text-red-500 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold uppercase text-primary tracking-wider">{event.type}</span>
                    <h3 className="font-bold text-lg mb-1 text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" /> {new Date(event.date).toLocaleDateString()}
                      <MapPin className="h-3 w-3 ml-2" /> {event.location}
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
              itemName="events"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
