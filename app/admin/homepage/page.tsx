"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { ImageField } from "@/components/admin/image-field"

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
                const fetchedData = await res.json()
                // Ensure array existences
                setData({
                    ...fetchedData,
                    hero: fetchedData.hero || [],
                    welcomeBlocks: fetchedData.welcomeBlocks || [],
                    transformationStories: fetchedData.transformationStories || []
                })
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
                // Refresh local data
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                throw new Error("Failed to save")
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to save homepage" })
        } finally {
            setIsSaving(false)
        }
    }

    const addHeroSlide = () => {
        const newHero = [...(data.hero || [])]
        newHero.push({
            id: Date.now(),
            image: "",
            title: "New Hero Title",
            description: "New hero description goes here."
        })
        setData({ ...data, hero: newHero })
    }

    const removeHeroSlide = (index: number) => {
        const newHero = [...data.hero]
        newHero.splice(index, 1)
        setData({ ...data, hero: newHero })
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
            <main className="px-4 md:px-6 py-8 max-w-5xl space-y-12 pb-24">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-xl font-light text-primary">Homepage Content</h1>
                    <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="bg-primary text-white"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
                {message && (
                    <div className={`p-4 rounded-md border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                {/* ── Hero Slides ── */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 className="text-2xl font-light text-primary">Hero Slider</h2>
                            <p className="text-sm text-muted-foreground mt-1">Manage the large images and text on the main landing page.</p>
                        </div>
                        <Button onClick={addHeroSlide} variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" /> Add Slide
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {data.hero.map((slide: any, index: number) => (
                            <div key={slide.id || index} className="bg-white border rounded-lg p-6 shadow-sm relative group">
                                <button 
                                    onClick={() => removeHeroSlide(index)}
                                    className="absolute -top-3 -right-3 h-8 w-8 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                
                                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
                                    <ImageField
                                        label="Slide Image"
                                        value={slide.image}
                                        prefix="homepage"
                                        onChange={(url) => {
                                            const newHero = [...data.hero]
                                            newHero[index].image = url
                                            setData({ ...data, hero: newHero })
                                        }}
                                    />

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Slide Title</label>
                                            <input 
                                                className="w-full border rounded p-2 text-lg font-light" 
                                                value={slide.title} 
                                                onChange={(e) => {
                                                    const newHero = [...data.hero]
                                                    newHero[index].title = e.target.value
                                                    setData({ ...data, hero: newHero })
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Slide Description</label>
                                            <textarea 
                                                className="w-full border rounded p-2 h-20 text-sm font-light leading-relaxed" 
                                                value={slide.description} 
                                                onChange={(e) => {
                                                    const newHero = [...data.hero]
                                                    newHero[index].description = e.target.value
                                                    setData({ ...data, hero: newHero })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Welcome Section ── */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-light text-primary border-b pb-4">Welcome & Purpose</h2>
                    <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Badge Text</label>
                                <input 
                                    className="w-full border rounded p-2" 
                                    value={data.welcomeBadge || ""} 
                                    onChange={e => setData({...data, welcomeBadge: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Section Title</label>
                                <input 
                                    className="w-full border rounded p-2" 
                                    value={data.welcomeTitle || ""} 
                                    onChange={e => setData({...data, welcomeTitle: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Intro Sentence</label>
                            <input 
                                className="w-full border rounded p-2" 
                                value={data.welcomeSubtitle || ""} 
                                onChange={e => setData({...data, welcomeSubtitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Detailed Description</label>
                            <textarea 
                                className="w-full border rounded p-2 h-32 leading-relaxed" 
                                value={data.welcomeDescription || ""} 
                                onChange={e => setData({...data, welcomeDescription: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Impact Stats ── */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-light text-primary border-b pb-4">Impact Numbers</h2>
                    <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Section Title</label>
                            <input 
                                className="w-full border rounded p-2 font-bold" 
                                value={data.impactTitle || ""} 
                                onChange={e => setData({...data, impactTitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Impact Subtitle / Context</label>
                            <textarea 
                                className="w-full border rounded p-2 h-20" 
                                value={data.impactSubtitle || ""} 
                                onChange={e => setData({...data, impactSubtitle: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Philosophy ── */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-light text-primary border-b pb-4">Our Philosophy</h2>
                    <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Badge</label>
                                <input 
                                    className="w-full border rounded p-2" 
                                    value={data.philosophyBadge || ""} 
                                    onChange={e => setData({...data, philosophyBadge: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Title</label>
                                <input 
                                    className="w-full border rounded p-2 font-bold" 
                                    value={data.philosophyTitle || ""} 
                                    onChange={e => setData({...data, philosophyTitle: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </AdminLayout>
    )
}
