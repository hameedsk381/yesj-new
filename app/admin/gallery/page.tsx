"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, LayoutGrid, Tag, Edit2 } from "lucide-react"
import Link from "next/link"
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

    const [formData, setFormData] = useState({ title: "", description: "", category: "general" })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => { fetchGallery(); fetchPrograms() }, [])

    const fetchGallery = async () => {
        try {
            const response = await fetch("/api/gallery")
            const result = await response.json()
            if (response.ok) setItems(Array.isArray(result) ? result : (result.data || []))
        } catch (error) { console.error("Failed to fetch gallery", error) }
    }

    const fetchPrograms = async () => {
        try {
            const res = await fetch("/api/programs")
            if (res.ok) setPrograms(await res.json())
        } catch (err) { console.error("Failed to fetch programs", err) }
    }

    const openAddForm = () => {
        setEditingId(null)
        setFormData({ title: "", description: "", category: "general" })
        setImageFile(null)
        setShowForm(true)
    }

    const openEditForm = (item: GalleryItem) => {
        setEditingId(item.id)
        setFormData({ title: item.title, description: item.description || "", category: item.category })
        setImageFile(null)
        setShowForm(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this image?")) return
        try {
            const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
            if (res.ok) fetchGallery()
            else alert("Failed to delete")
        } catch (error) { console.error("Delete failed", error) }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingId && !imageFile) { alert("Please select an image"); return }
        setIsSubmitting(true)
        try {
            if (editingId) {
                const payload: any = { ...formData }
                if (imageFile) {
                    const fd = new FormData()
                    fd.append("file", imageFile)
                    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd })
                    if (uploadRes.ok) { const u = await uploadRes.json(); payload.imagePath = u.url }
                }
                const res = await fetch(`/api/admin/gallery/${editingId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                if (!res.ok) throw new Error("Failed to update")
            } else {
                const data = new FormData()
                Object.entries(formData).forEach(([key, value]) => data.append(key, value))
                data.append("image", imageFile!)
                const res = await fetch("/api/admin/gallery", { method: "POST", body: data })
                if (!res.ok) throw new Error("Failed to add")
            }
            setShowForm(false)
            setEditingId(null)
            setFormData({ title: "", description: "", category: "general" })
            setImageFile(null)
            fetchGallery()
        } catch (error) { alert("Failed to save") }
        finally { setIsSubmitting(false) }
    }

    const filteredItems = selectedCategory === "all" ? items : items.filter(item => item.category === selectedCategory)

    const categories = [
        { label: "All Items", value: "all" },
        { label: "General", value: "general" },
        ...programs.map(p => ({ label: p.shortTitle || p.title, value: p.slug }))
    ]

    return (
        <AdminLayout>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                        <h1 className="text-xl font-bold tracking-tight text-primary">Gallery Management</h1>
                    </div>
                    <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
                        {showForm ? <><Plus className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Image</>}
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {showForm && (
                    <div className="mb-10 p-6 bg-white rounded-xl border-2 border-primary/10 shadow-lg max-w-2xl bg-gradient-to-br from-white to-primary/5">
                        <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                            <Plus className="h-5 w-5" /> {editingId ? "EDIT GALLERY ASSET" : "NEW GALLERY ASSET"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Title</label>
                                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Graduation Ceremony 2024" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Category / Program</label>
                                    <select className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="general">General Website</option>
                                        <optgroup label="Programs">
                                            {programs.map(p => (<option key={p.slug} value={p.slug}>{p.title}</option>))}
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Caption / Description</label>
                                <textarea className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Brief description of the image content..." rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Image {editingId ? "(leave empty to keep current)" : ""}</label>
                                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-black file:bg-primary file:text-white hover:file:bg-primary/90" />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary text-white text-md font-bold shadow-xl active:scale-[0.98] transition-all">
                                {isSubmitting ? "Saving..." : editingId ? "UPDATE ASSET" : "DEPLOY TO GALLERY"}
                            </Button>
                        </form>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-8">
                    <div className="flex items-center gap-2 px-3 py-2 mr-2 bg-muted rounded-lg text-muted-foreground text-sm font-bold uppercase tracking-widest">
                        <LayoutGrid className="h-4 w-4" /> Filter by
                    </div>
                    {categories.map(cat => (
                        <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                            className={cn("px-4 py-2 rounded-full text-xs font-bold transition-all border",
                                selectedCategory === cat.value ? "bg-primary text-white border-primary shadow-md scale-105" : "bg-white text-muted-foreground border-border hover:border-primary/50")}
                        >{cat.label}</button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredItems.map(item => (
                        <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-[4/5] border-2 border-transparent hover:border-primary transition-all shadow-md bg-muted">
                            {item.imagePath ? (
                                <Image src={item.imagePath} alt={item.title} fill className="object-cover" unoptimized />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><Tag className="h-8 w-8 text-muted-foreground/20" /></div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-black text-white text-xs truncate leading-tight tracking-tight uppercase">{item.title}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[10px] font-black bg-primary/90 text-white px-2 py-0.5 rounded shadow-sm">{item.category.toUpperCase()}</span>
                                    <div className="flex gap-1">
                                        <button onClick={() => openEditForm(item)} className="bg-white/20 hover:bg-white text-white hover:text-gray-800 p-1.5 rounded-lg backdrop-blur-md transition-all"><Edit2 className="h-3.5 w-3.5" /></button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-white/10 hover:bg-red-500 text-white p-1.5 rounded-lg backdrop-blur-md transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4"><LayoutGrid className="h-10 w-10 text-muted-foreground/30" /></div>
                        <p className="text-muted-foreground font-bold">No images found in this category.</p>
                    </div>
                )}
            </main>
        </AdminLayout>
    )
}
