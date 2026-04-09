"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, Upload, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

export default function EditProgram() {
    const params = useParams()
    const router = useRouter()
    const [program, setProgram] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        fetchProgram()
    }, [params.slug])

    const fetchProgram = async () => {
        try {
            const res = await fetch(`/api/admin/programs/${params.slug}`)
            if (res.ok) {
                setProgram(await res.json())
            } else {
                router.push("/admin/programs")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        setMessage(null)
        try {
            const res = await fetch(`/api/admin/programs/${params.slug}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(program)
            })
            if (res.ok) {
                setMessage({ type: 'success', text: "Program updated successfully" })
            } else {
                throw new Error("Failed to save")
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to save program" })
        } finally {
            setIsSaving(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(field)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "programs")

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData
            })
            const result = await res.json()
            if (res.ok && result.url) {
                setProgram({ ...program, [field]: result.url })
            }
        } catch (error) {
            console.error(error)
            alert("Upload failed")
        } finally {
            setIsUploading(null)
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
                        <Link href="/admin/programs">
                            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
                        </Link>
                        <h1 className="text-xl font-light text-primary">Edit Program: {program?.shortTitle || program?.title}</h1>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8 max-w-4xl space-y-8">
                {message && (
                    <div className={`p-4 rounded-md border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
                        <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Program Identity</h2>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Slug (URL)</label>
                                <input className="w-full border rounded p-2 bg-gray-50" value={program.slug} readOnly />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Full Title</label>
                                <input className="w-full border rounded p-2" value={program.title} onChange={e => setProgram({...program, title: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Quick Badge</label>
                                <input className="w-full border rounded p-2" value={program.badge} onChange={e => setProgram({...program, badge: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Tagline</label>
                                <input className="w-full border rounded p-2" value={program.tagline || ""} onChange={e => setProgram({...program, tagline: e.target.value})} />
                            </div>
                        </div>
                    </section>

                    {/* Media */}
                    <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
                        <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Program Media</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Hero Image</label>
                                <div className="aspect-video relative bg-muted rounded overflow-hidden border">
                                    {program.imagePath ? (
                                        <Image src={program.imagePath} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground"><ImageIcon className="h-8 w-8 opacity-20" /></div>
                                    )}
                                    {isUploading === 'imagePath' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-white" /></div>
                                    )}
                                </div>
                                <input type="file" id="hero-up" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'imagePath')} />
                                <label htmlFor="hero-up" className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed rounded text-xs font-bold text-primary hover:bg-primary/5 cursor-pointer">
                                    <Upload className="h-3 w-3" /> Upload Hero Image
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Logo / Watermark</label>
                                <div className="h-20 w-full relative bg-muted rounded overflow-hidden border p-4 flex items-center justify-center">
                                    {program.logoPath ? (
                                        <Image src={program.logoPath} alt="Logo" width={60} height={60} className="object-contain" />
                                    ) : (
                                        <span className="text-[10px] text-gray-400">No logo uploaded</span>
                                    )}
                                    {isUploading === 'logoPath' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-white" /></div>
                                    )}
                                </div>
                                <input type="file" id="logo-up" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'logoPath')} />
                                <label htmlFor="logo-up" className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed rounded text-xs font-bold text-primary hover:bg-primary/5 cursor-pointer">
                                    <Upload className="h-3 w-3" /> Upload Logo
                                </label>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Description & Content</h2>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Overview Description</label>
                        <textarea 
                            className="w-full border rounded p-3 h-32 leading-relaxed text-sm" 
                            value={program.overviewDescription || ""} 
                            onChange={e => setProgram({...program, overviewDescription: e.target.value})}
                        />
                    </div>
                </section>
            </main>
        </AdminLayout>
    )
}
