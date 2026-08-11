"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Save, Loader2 } from "lucide-react"
import { ImageField } from "@/components/admin/image-field"

export default function EditStoryPage() {
    const router = useRouter()
    const { id } = useParams()
    const isNew = id === "new"
    
    const [isLoading, setIsLoading] = useState(!isNew)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        category: "General",
        imagePath: "",
        featured: false,
    })

    useEffect(() => {
        if (!isNew) {
            fetchStory()
        }
    }, [id])

    const fetchStory = async () => {
        try {
            const res = await fetch(`/api/admin/stories/${id}`)
            if (res.ok) {
                const data = await res.json()
                setFormData({
                    title: data.title || "",
                    slug: data.slug || "",
                    excerpt: data.excerpt || "",
                    content: data.content || "",
                    author: data.author || "",
                    category: data.category || "General",
                    imagePath: data.imagePath || "",
                    featured: !!data.featured,
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? (e.target as any).checked : value 
        }))
        
        // Auto-generate slug from title
        if (name === "title" && isNew) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const url = isNew ? "/api/admin/stories" : `/api/admin/stories/${id}`
            const method = isNew ? "POST" : "PATCH"
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if (res.ok) router.push("/admin/stories")
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

    return (
        <AdminLayout>
            <main className="px-4 md:px-6 py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h1 className="text-xl font-light text-primary">{isNew ? "New Story" : "Edit Story"}</h1>
                    <Button onClick={handleSubmit} disabled={isSaving} className="bg-primary text-white">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Story
                    </Button>
                </div>
                <form className="max-w-4xl mx-auto space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} required className="w-full h-12 px-4 rounded-md border" placeholder="Enter story title" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug (URL)</label>
                                <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full h-10 px-4 rounded-md border bg-gray-50 font-mono text-sm" placeholder="story-url-slug" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Excerpt</label>
                                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full p-4 rounded-md border" placeholder="Short summary for preview" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content (Markdown/HTML supported)</label>
                                <textarea name="content" value={formData.content} onChange={handleChange} rows={15} className="w-full p-4 rounded-md border font-mono text-sm" placeholder="Full story content..." />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cover Image</label>
                                <ImageField
                                    label="Cover Image"
                                    value={formData.imagePath}
                                    prefix="stories"
                                    onChange={(url) => setFormData(prev => ({ ...prev, imagePath: url }))}
                                />
                                <input name="imagePath" value={formData.imagePath} onChange={handleChange} className="w-full h-8 px-2 text-xs rounded border bg-gray-50" placeholder="Or paste URL" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full h-10 px-4 rounded-md border">
                                    <option>General</option>
                                    <option>Success Story</option>
                                    <option>Field Work</option>
                                    <option>Event Report</option>
                                    <option>Leadership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Author</label>
                                <input name="author" value={formData.author} onChange={handleChange} className="w-full h-10 px-4 rounded-md border" placeholder="Author name" />
                            </div>

                            <div className="flex items-center gap-2 p-4 border rounded-md bg-gray-50">
                                <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4" />
                                <label htmlFor="featured" className="text-sm">Mark as Featured</label>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </AdminLayout>
    )
}
