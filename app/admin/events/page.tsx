"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Calendar as CalendarIcon, MapPin, Edit2, X } from "lucide-react"
import Image from "next/image"
import { ImageField } from "@/components/admin/image-field"

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

    const [formData, setFormData] = useState({
        title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "", imagePath: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => { fetchEvents() }, [])

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/admin/events")
            const result = await response.json()
            if (response.ok) setEvents(Array.isArray(result) ? result : (result.data || []))
        } catch (error) {
            console.error("Failed to fetch events", error)
        } finally { setIsLoading(false) }
    }

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
            if (res.ok) fetchEvents()
            else alert("Failed to delete")
        } catch (error) { console.error("Delete failed", error) }
    }

    const toggleActive = async (event: Event) => {
        try {
            const res = await fetch(`/api/admin/events/${event.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !event.isActive }),
            })
            if (res.ok) fetchEvents()
            else alert("Failed to update status")
        } catch (error) { console.error("Toggle failed", error) }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingId && !formData.imagePath) { alert("Please select or upload an image"); setIsSubmitting(false); return }
        setIsSubmitting(true)
        try {
            const payload: any = { ...formData }
            const res = await fetch(editingId ? `/api/admin/events/${editingId}` : "/api/admin/events", {
                method: editingId ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to save")
            setShowForm(false)
            setEditingId(null)
            setFormData({ title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "", imagePath: "" })
            fetchEvents()
        } catch (error) {
            alert("Failed to save event")
        } finally { setIsSubmitting(false) }
    }

    return (
        <AdminLayout>
            <main className="px-4 md:px-6 py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h1 className="text-xl font-light text-primary">Events</h1>
                    <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
                        {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                        {showForm ? "Cancel" : "Add Event"}
                    </Button>
                </div>
                {showForm && (
                    <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Event" : "Add New Event"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                <select className="border p-2 rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="cultural">Cultural</option>
                                    <option value="camp">Camp</option>
                                    <option value="dialogue">Dialogue</option>
                                    <option value="conference">Conference</option>
                                </select>
                            </div>
                            <textarea className="w-full border p-2 rounded" placeholder="Description" rows={3} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="datetime-local" className="border p-2 rounded" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                <input className="border p-2 rounded" placeholder="Location" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Fee (Optional)" value={formData.fee} onChange={e => setFormData({ ...formData, fee: e.target.value })} />
                                <input type="datetime-local" className="border p-2 rounded" placeholder="Deadline" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                            </div>
                            <ImageField
                                label={editingId ? "Image (leave empty to keep current)" : "Image"}
                                value={formData.imagePath}
                                onChange={(url) => setFormData({ ...formData, imagePath: url })}
                                prefix="events"
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white">{isSubmitting ? "Saving..." : editingId ? "Update Event" : "Create Event"}</Button>
                        </form>
                    </div>
                )}

                {isLoading ? (
                    <p>Loading events...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event.id} className="bg-white border rounded-md overflow-hidden shadow-sm">
                                <div className="relative h-48 bg-gray-100">
                                    {event.imagePath && (
                                        <Image src={event.imagePath} alt={event.title} fill className="object-cover" unoptimized />
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button onClick={() => toggleActive(event)}
                                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                                event.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                                            }`}
                                            title={event.isActive !== false ? "Active - click to hide" : "Inactive - click to show"}
                                        >
                                            {event.isActive !== false ? 'Active' : 'Inactive'}
                                        </button>
                                        <button onClick={() => openEditForm(event)} className="bg-white/90 hover:bg-white p-1.5 rounded shadow"><Edit2 className="h-4 w-4 text-gray-700" /></button>
                                        <button onClick={() => handleDelete(event.id)} className="bg-white/90 hover:bg-red-500 p-1.5 rounded shadow"><Trash2 className="h-4 w-4 text-red-500 hover:text-white" /></button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold uppercase text-primary tracking-wider">{event.type}</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{event.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <CalendarIcon className="h-3 w-3" /> {new Date(event.date).toLocaleDateString()}
                                        <MapPin className="h-3 w-3 ml-2" /> {event.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </AdminLayout>
    )
}
