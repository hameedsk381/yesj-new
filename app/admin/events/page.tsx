"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Calendar as CalendarIcon, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Event {
    id: number
    title: string
    description: string
    date: string
    location: string
    type: string
    imagePath: string
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        type: "cultural",
        fee: "",
        deadline: ""
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/events")
            const result = await response.json()
            if (response.ok) {
                setEvents(Array.isArray(result) ? result : (result.data || []))
            }
        } catch (error) {
            console.error("Failed to fetch events", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this event?")) return
        try {
            const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
            if (res.ok) {
                fetchEvents()
            } else {
                alert("Failed to delete")
            }
        } catch (error) {
            console.error("Delete failed", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!imageFile) {
            alert("Please select an image")
            return
        }
        setIsSubmitting(true)

        try {
            const data = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            })
            data.append("image", imageFile)

            const res = await fetch("/api/admin/events", {
                method: "POST",
                body: data
            })

            if (!res.ok) throw new Error("Failed to create event")

            setShowAddForm(false)
            setFormData({ title: "", description: "", date: "", location: "", type: "cultural", fee: "", deadline: "" })
            setImageFile(null)
            fetchEvents()
        } catch (error) {
            alert("Failed to create event")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
                        </Link>
                        <h1 className="text-xl font-light text-primary">Events</h1>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary text-white">
                        {showAddForm ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Event</>}
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {showAddForm && (
                    <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">Add New Event</h2>
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
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white">{isSubmitting ? "Saving..." : "Create Event"}</Button>
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
                                        <Image 
                                            src={event.imagePath} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover"
                                            unoptimized // Since it's from GCS and might not have width/height known easily if we don't want to define all
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold uppercase text-primary tracking-wider">{event.type}</span>
                                        <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
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
