"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings")
            if (res.ok) {
                const data = await res.json()
                // Flatten contact and social for easier editing
                const flat: Record<string, string> = {
                    siteName: data.name || "",
                    title: data.title || "",
                    description: data.description || "",
                    email: data.contact?.email || "",
                    phone: data.contact?.phone || "",
                    whatsapp: data.contact?.whatsapp || "",
                    facebook: data.social?.facebook || "",
                    instagram: data.social?.instagram || "",
                    linkedin: data.social?.linkedin || "",
                    youtube: data.social?.youtube || "",
                }
                setSettings(flat)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async (key: string, value: string) => {
        setIsSaving(true)
        setMessage(null)
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value })
            })
            if (res.ok) {
                setMessage({ type: 'success', text: "Settings saved successfully" })
                setSettings(prev => ({ ...prev, [key]: value }))
            } else {
                throw new Error("Failed to save")
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to save settings" })
        } finally {
            setIsSaving(false)
        }
    }

    const fields = [
        { key: "siteName", label: "Site Name", type: "text" },
        { key: "title", label: "Site Title", type: "text" },
        { key: "description", label: "SEO Description", type: "textarea" },
        { key: "email", label: "Contact Email", type: "email" },
        { key: "phone", label: "Contact Phone", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number", type: "text" },
        { key: "facebook", label: "Facebook Link", type: "text" },
        { key: "instagram", label: "Instagram Link", type: "text" },
        { key: "linkedin", label: "LinkedIn Link", type: "text" },
        { key: "youtube", label: "YouTube Link", type: "text" },
    ]

    return (
        <AdminLayout>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
                        </Link>
                        <h1 className="text-xl font-light text-primary">Site Settings</h1>
                    </div>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8 max-w-4xl">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {message && (
                            <div className={`p-4 rounded-md border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="bg-white border rounded-md divide-y shadow-sm">
                            {fields.map((field) => (
                                <div key={field.key} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                    <label className="text-sm font-medium text-gray-700 pt-2">{field.label}</label>
                                    <div className="md:col-span-2 space-y-3">
                                        {field.type === "textarea" ? (
                                            <textarea 
                                                className="w-full border rounded p-2 min-h-[100px]"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                                            />
                                        ) : (
                                            <input 
                                                type={field.type}
                                                className="w-full border rounded p-2"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                                            />
                                        )}
                                        <Button 
                                            size="sm" 
                                            onClick={() => handleSave(field.key, settings[field.key])}
                                            disabled={isSaving}
                                            className="bg-primary text-white"
                                        >
                                            <Save className="h-4 w-4 mr-2" /> Save {field.label}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </AdminLayout>
    )
}
