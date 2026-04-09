"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminStoriesPage() {
    const [stories, setStories] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchStories()
    }, [])

    const fetchStories = async () => {
        try {
            const res = await fetch("/api/stories")
            if (res.ok) {
                setStories(await res.json())
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this story?")) return
        try {
            const res = await fetch(`/api/admin/stories/${id}`, { method: "DELETE" })
            if (res.ok) fetchStories()
        } catch (error) {
            console.error(error)
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
                        <h1 className="text-xl font-light text-primary">Stories & Journal</h1>
                    </div>
                    <Button asChild className="bg-primary text-white">
                        <Link href="/admin/stories/new"><Plus className="h-4 w-4 mr-2" /> New Story</Link>
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stories.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed rounded-md">
                                No stories yet. Create your first one!
                            </div>
                        ) : (
                            stories.map((story) => (
                                <div key={story.id} className="bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative h-48 bg-gray-100">
                                        {story.imagePath ? (
                                            <Image src={story.imagePath} alt={story.title} fill className="object-cover" unoptimized />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <ImageIcon className="h-10 w-10" />
                                            </div>
                                        )}
                                        {story.featured && (
                                            <div className="absolute top-2 right-2 bg-secondary text-black text-[10px] font-bold px-2 py-1 rounded">
                                                FEATURED
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="text-xs font-bold text-primary uppercase tracking-widest">{story.category}</div>
                                        <h3 className="font-bold line-clamp-2 h-12 leading-tight">{story.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 h-10">{story.excerpt}</p>
                                        <div className="pt-4 flex items-center justify-between border-t">
                                            <div className="text-[10px] text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</div>
                                            <div className="flex gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                                                    <Link href={`/admin/stories/${story.id}`}><Pencil className="h-4 w-4" /></Link>
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(story.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </AdminLayout>
    )
}
