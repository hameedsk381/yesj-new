"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

export default function HomepageManager() {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        fetchHomepage()
    }, [])

    const fetchHomepage = async () => {
        try {
            const res = await fetch("/api/homepage")
            if (res.ok) {
                setData(await res.json())
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
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: "homepageData", value: JSON.stringify(data) })
            })
            if (res.ok) {
                setMessage({ type: 'success', text: "Homepage updated successfully" })
            } else {
                throw new Error("Failed to save")
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to save homepage" })
        } finally {
            setIsSaving(false)
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
                        <h1 className="text-xl font-light text-primary">Homepage Content</h1>
                    </div>
                    <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="bg-primary text-white"
                    >
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

                {/* Hero Section */}
                <section className="bg-white border rounded-md p-6 space-y-4 shadow-sm">
                    <h2 className="text-lg font-bold border-b pb-2">Welcome Section</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Badge</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.welcomeBadge || ""} 
                                onChange={e => setData({...data, welcomeBadge: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Title</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.welcomeTitle || ""} 
                                onChange={e => setData({...data, welcomeTitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Subtitle</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.welcomeSubtitle || ""} 
                                onChange={e => setData({...data, welcomeSubtitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Description</label>
                            <textarea 
                                className="w-full border rounded p-2 h-24" 
                                value={data.welcomeDescription || ""} 
                                onChange={e => setData({...data, welcomeDescription: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="bg-white border rounded-md p-6 space-y-4 shadow-sm">
                    <h2 className="text-lg font-bold border-b pb-2">Impact Section</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Title</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.impactTitle || ""} 
                                onChange={e => setData({...data, impactTitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Subtitle</label>
                            <textarea 
                                className="w-full border rounded p-2 h-20" 
                                value={data.impactSubtitle || ""} 
                                onChange={e => setData({...data, impactSubtitle: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="bg-white border rounded-md p-6 space-y-4 shadow-sm">
                    <h2 className="text-lg font-bold border-b pb-2">Philosophy Section</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Badge</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.philosophyBadge || ""} 
                                onChange={e => setData({...data, philosophyBadge: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-400">Title</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.philosophyTitle || ""} 
                                onChange={e => setData({...data, philosophyTitle: e.target.value})}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </AdminLayout>
    )
}
