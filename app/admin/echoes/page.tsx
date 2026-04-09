"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, FileText, Loader2, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EchoesManager() {
    const [echoesList, setEchoesList] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState<number | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchEchoes()
    }, [])

    const fetchEchoes = async () => {
        try {
            const res = await fetch("/api/admin/echoes")
            if (res.ok) {
                setEchoesList(await res.json())
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this issue of Echoes?")) return
        setIsDeleting(id)
        try {
            const res = await fetch(`/api/admin/echoes/${id}`, { method: "DELETE" })
            if (res.ok) {
                setEchoesList(prev => prev.filter(e => e.id !== id))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(null)
        }
    }

    const handleAddEchoes = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch("/api/admin/echoes", {
                method: "POST",
                body: formData
            })

            if (res.ok) {
                setShowAddForm(false)
                fetchEchoes()
            } else {
                const err = await res.json()
                alert(err.error || "Failed to add issue")
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
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
                        <h1 className="text-xl font-light text-primary">Echoes (Periodicals)</h1>
                    </div>
                    <Button onClick={() => setShowAddForm(true)} className="bg-primary text-white">
                        <Plus className="h-4 w-4 mr-2" /> Add New Issue
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
                        {echoesList.map((echo) => (
                            <div key={echo.id} className="bg-white border rounded-md overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                <div className="aspect-[3/4] relative bg-gray-100 border-b">
                                    {echo.thumbnailPath ? (
                                        <Image 
                                            src={echo.thumbnailPath} 
                                            alt={echo.title} 
                                            fill 
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <FileText className="h-12 w-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Button 
                                            variant="destructive" 
                                            size="icon" 
                                            className="h-8 w-8 shadow-md"
                                            onClick={() => handleDelete(echo.id)}
                                            disabled={isDeleting === echo.id}
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
                                        <span className="text-xs text-gray-400">
                                            {new Date(echo.releaseDate).toLocaleDateString()}
                                        </span>
                                        <a 
                                            href={echo.filePath} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                                        >
                                            VIEW PDF <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No data state */}
                {!isLoading && echoesList.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 border border-dashed rounded-md">
                        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">Start by adding the first edition of your periodical newsletter "Echoes".</p>
                    </div>
                )}
            </main>

            {/* Add Form Overlay */}
            {showAddForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                            <h2 className="font-bold">Add New Echoes Issue</h2>
                            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-black">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddEchoes} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Title</label>
                                <input name="title" required className="w-full border rounded p-2" placeholder="e.g. Echoes 10th Anniversary Special" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Edition / Volume</label>
                                <input name="edition" required className="w-full border rounded p-2" placeholder="e.g. Vol 2, Issue 1" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Release Date</label>
                                <input name="releaseDate" type="date" required className="w-full border rounded p-2" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Description (Optional)</label>
                                <textarea name="description" className="w-full border rounded p-2 h-20" placeholder="Brief summary of this edition..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-gray-500">PDF File</label>
                                    <input name="file" type="file" required accept="application/pdf" className="w-full text-xs" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-gray-500">Thumbnail Image</label>
                                    <input name="thumbnail" type="file" accept="image/*" className="w-full text-xs" />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-white h-12">
                                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Publish Issue"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="h-12">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

function X({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
}
