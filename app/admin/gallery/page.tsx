"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryItem {
    id: number
    title: string
    category: string
    imagePath: string
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [showAddForm, setShowAddForm] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "leadership"
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            const response = await fetch("/api/gallery")
            const result = await response.json()
            if (response.ok) {
                setItems(Array.isArray(result) ? result : (result.data || []))
            }
        } catch (error) {
            console.error("Failed to fetch gallery", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this image?")) return
        try {
            const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
            if (res.ok) {
                fetchGallery()
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

            const res = await fetch("/api/admin/gallery", {
                method: "POST",
                body: data
            })

            if (!res.ok) throw new Error("Failed to add image")

            setShowAddForm(false)
            setFormData({ title: "", description: "", category: "leadership" })
            setImageFile(null)
            fetchGallery()
        } catch (error) {
            alert("Failed to add image")
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
                        <h1 className="text-xl font-light text-primary">Gallery</h1>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary text-white">
                        {showAddForm ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Image</>}
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {showAddForm && (
                    <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">Add New Image</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                <select className="border p-2 rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="leadership">Leadership</option>
                                    <option value="social_service">Social Service</option>
                                    <option value="cultural">Cultural</option>
                                </select>
                            </div>
                            <textarea className="w-full border p-2 rounded" placeholder="Description" rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white">{isSubmitting ? "Uploading..." : "Add to Gallery"}</Button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="relative group rounded-md overflow-hidden aspect-square border bg-gray-100">
                            {item.imagePath ? (
                                <Image src={item.imagePath} alt={item.title} fill className="object-cover" unoptimized />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                                <p className="font-bold text-sm">{item.title}</p>
                                <p className="text-xs opacity-80 capitalize">{item.category}</p>
                                <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-600"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </AdminLayout>
    )
}
