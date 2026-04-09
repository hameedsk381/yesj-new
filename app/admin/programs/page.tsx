"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit2, Loader2, Image as ImageIcon, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProgramsAdmin() {
    const [programs, setPrograms] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPrograms()
    }, [])

    const fetchPrograms = async () => {
        try {
            const res = await fetch("/api/admin/programs")
            if (res.ok) {
                setPrograms(await res.json())
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
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
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
                        </Link>
                        <h1 className="text-xl font-light text-primary">Manage Programmes</h1>
                    </div>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
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
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${program.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {program.isActive ? 'Active' : 'Inactive'}
                                    </span>
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
                                    <Link href={`/admin/programs/${program.slug}`}>
                                        <Button size="sm" variant="outline" className="h-8 gap-2">
                                            <Edit2 className="h-3 w-3" /> Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </AdminLayout>
    )
}
