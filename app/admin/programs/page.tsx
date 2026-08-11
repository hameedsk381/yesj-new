"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Edit2, Loader2, Image as ImageIcon, Plus, Trash2, Power, PowerOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProgramsAdmin() {
    const [programs, setPrograms] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { fetchPrograms() }, [])

    const fetchPrograms = async () => {
        try {
            const res = await fetch("/api/admin/programs")
            if (res.ok) setPrograms(await res.json())
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleActive = async (program: any) => {
        await fetch(`/api/admin/programs/${program.slug}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: !program.isActive }),
        })
        fetchPrograms()
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this programme?")) return
        try {
            const res = await fetch(`/api/admin/programs/${slug}`, { method: "DELETE" })
            if (res.ok) fetchPrograms()
            else alert("Failed to delete")
        } catch (error) {
            console.error("Delete failed", error)
        }
    }

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <main className="px-4 md:px-6 py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h1 className="text-xl font-light text-primary">Manage Programmes</h1>
                    <Link href="/admin/programs/new">
                        <Button className="bg-primary text-white">
                            <Plus className="mr-2 h-4 w-4" /> New Programme
                        </Button>
                    </Link>
                </div>
                {programs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">No programmes yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program) => (
                            <div key={program.id} className="bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col">
                                <div className="aspect-video relative bg-muted">
                                    {program.imagePath ? (
                                        <Image src={program.imagePath} alt={program.title} fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            <ImageIcon className="h-10 w-10 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button onClick={() => toggleActive(program)}
                                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                                                program.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                        >
                                            {program.isActive ? <Power className="h-3 w-3" /> : <PowerOff className="h-3 w-3" />}
                                            {program.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{program.badge}</p>
                                        <h3 className="font-bold text-lg leading-tight mb-2">{program.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 italic mb-4">"{program.tagline}"</p>
                                    </div>
                                    <div className="pt-4 border-t flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {program.logoPath && (
                                                <div className="h-6 w-6 relative opacity-60">
                                                    <Image src={program.logoPath} alt="logo" fill className="object-contain" />
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-400">/{program.slug}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => handleDelete(program.slug)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <Link href={`/admin/programs/${program.slug}`}>
                                                <Button size="sm" variant="outline" className="h-8 gap-2">
                                                    <Edit2 className="h-3 w-3" /> Edit
                                                </Button>
                                            </Link>
                                        </div>
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
