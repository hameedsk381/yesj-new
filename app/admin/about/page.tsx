"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { ImageField } from "@/components/admin/image-field"

type FactRow = { label: string; value: string }
type Pillar = { title: string; description: string }
type Philosophy = { title: string; desc: string }

type AboutData = {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  storyBadge: string
  storyTitle: string
  storyParagraphs: string[]
  storyQuote: string
  storyImage: string
  philosophyBadge: string
  philosophyTitle: string
  philosophySubtitle: string
  philosophyStatements: Philosophy[]
  pillarsTitle: string
  pillarsSubtitle: string
  pillars: Pillar[]
  facts: FactRow[]
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
}

function defaultAbout(): AboutData {
  return {
    heroTitle: "Born for the Margins",
    heroSubtitle: "A Jesuit ministry. A social movement. A radical commitment to every young person's potential.",
    heroImage: "https://storage.googleapis.com/yesj/website/IMG_5899.JPG",
    storyBadge: "Our Core Story",
    storyTitle: "Walking with the last, lost, and the least.",
    storyParagraphs: [
      "YES-J was born from a conviction that every young person, regardless of background, has the capacity to live a meaningful life.",
      "Since 2016, we have walked into rural villages, urban slums, and campuses to ignite this potential. We don't just provide services; we provide a community where a young person's 'No' from society becomes their 'YES' to the world.",
    ],
    storyQuote: "We provide a community where a young person's 'No' from society becomes their 'YES' to the world.",
    storyImage: "https://storage.googleapis.com/yesj/website/IMG_5986.JPG",
    philosophyBadge: "Our core conviction",
    philosophyTitle: "The Power of YES",
    philosophySubtitle: "Our philosophy is built on three fundamental affirmations that every young person deserves to hear and believe.",
    philosophyStatements: [
      { title: "YES - I have dreams.", desc: "Every young person carries a vision for their life that deserves to be honored and nurtured." },
      { title: "YES - I am capable of fulfilling my dreams.", desc: "Potential is universal; only opportunity is not. We provide the platform for that potential to flourish." },
      { title: "YES - I can and I will be the dream I want to be.", desc: "With the right accompaniment, hurdles become stepping stones toward a life of dignity and service." },
    ],
    pillarsTitle: "Ignatian Pillars",
    pillarsSubtitle: "Principles that shape every intervention and every encounter.",
    pillars: [
      { title: "Imago Dei", description: "Every young person carries inherent dignity and worth, independent of status or background." },
      { title: "Cura Personalis", description: "We care for the whole person: intellectual, emotional, social, spiritual, and practical." },
      { title: "Magis", description: "We seek deeper transformation, not surface-level intervention or short-term visibility." },
      { title: "Men and Women for Others", description: "Leadership at YES-J is rooted in service, solidarity, and responsibility toward the common good." },
    ],
    facts: [
      { label: "Full Name", value: "Youth Empowering Service - Jesuits (YES-J)" },
      { label: "Type", value: "Ministry of the Andhra Jesuit Province" },
      { label: "Headquarters", value: "Vijayawada, AP" },
      { label: "Founded", value: "2016" },
      { label: "Target Group", value: "Youth aged 15-25 years" },
      { label: "States Served", value: "Andhra Pradesh and Telangana" },
    ],
    ctaTitle: "Want to see our team in action?",
    ctaSubtitle: "Meet the Jesuits and lay collaborators who carry this mission across India.",
    ctaButtonText: "Meet the Leadership",
    ctaButtonLink: "/about/team",
  }
}

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData>(defaultAbout())
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => { fetchAbout() }, [])

  const fetchAbout = async () => {
    try {
      const settingsRes = await fetch("/api/settings")
      if (settingsRes.ok) {
        const settings = await settingsRes.json()
        const stored = settings["about_page"]
        if (stored) {
          const parsed = JSON.parse(stored)
          setData({ ...defaultAbout(), ...parsed })
        }
      }
    } catch (error) { console.error(error)
    } finally { setIsLoading(false) }
  }

  const save = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "about_page", value: JSON.stringify(data) })
      })
      if (res.ok) setMessage({ type: 'success', text: "About page saved" })
      else throw new Error("Failed")
    } catch { setMessage({ type: 'error', text: "Failed to save" })
    } finally { setIsSaving(false) }
  }

  const addItem = (field: "philosophyStatements" | "pillars" | "facts", template: any) =>
    setData({ ...data, [field]: [...data[field], template] })
  const removeItem = (field: "philosophyStatements" | "pillars" | "facts", i: number) => {
    const items = [...data[field]]; items.splice(i, 1); setData({ ...data, [field]: items })
  }

  if (isLoading) return (
    <AdminLayout>
      <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <h1 className="text-xl font-light text-primary">About Page Content</h1>
          </div>
          <Button onClick={save} disabled={isSaving} className="bg-primary text-white">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />} Save About Page
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8 max-w-5xl space-y-8 pb-24">
        {message && (
          <div className={`p-4 rounded-md border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Hero */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Hero Section</h2>
          <div className="space-y-1">
            <ImageField label="Hero Image" value={data.heroImage} prefix="about" onChange={(url) => setData({...data, heroImage: url})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
              <input className="w-full border rounded p-2" value={data.heroTitle} onChange={e => setData({...data, heroTitle: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
              <input className="w-full border rounded p-2" value={data.heroSubtitle} onChange={e => setData({...data, heroSubtitle: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Our Story Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Badge</label>
              <input className="w-full border rounded p-2" value={data.storyBadge} onChange={e => setData({...data, storyBadge: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
              <input className="w-full border rounded p-2" value={data.storyTitle} onChange={e => setData({...data, storyTitle: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Paragraphs</label>
            {data.storyParagraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea className="flex-1 border rounded p-2 text-sm h-20" value={p} onChange={e => {
                  const arr = [...data.storyParagraphs]; arr[i] = e.target.value; setData({...data, storyParagraphs: arr})
                }} />
                <button onClick={() => {
                  const arr = [...data.storyParagraphs]; arr.splice(i, 1); setData({...data, storyParagraphs: arr})
                }} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => setData({...data, storyParagraphs: [...data.storyParagraphs, ""]})}>
              <Plus className="h-3 w-3 mr-1" /> Add Paragraph
            </Button>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Quote</label>
            <textarea className="w-full border rounded p-2 h-20" value={data.storyQuote} onChange={e => setData({...data, storyQuote: e.target.value})} />
          </div>
          <div className="space-y-1">
            <ImageField label="Story Image" value={data.storyImage} prefix="about" onChange={(url) => setData({...data, storyImage: url})} />
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Philosophy Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Badge</label>
              <input className="w-full border rounded p-2" value={data.philosophyBadge} onChange={e => setData({...data, philosophyBadge: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
              <input className="w-full border rounded p-2" value={data.philosophyTitle} onChange={e => setData({...data, philosophyTitle: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
            <textarea className="w-full border rounded p-2 h-16" value={data.philosophySubtitle} onChange={e => setData({...data, philosophySubtitle: e.target.value})} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase">Statements (3)</label>
              <Button size="sm" variant="outline" onClick={() => addItem("philosophyStatements", { title: "", desc: "" })}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
            {data.philosophyStatements.map((s, i) => (
              <div key={i} className="flex gap-2 p-3 bg-gray-50 rounded border">
                <div className="flex-1 space-y-2">
                  <input className="w-full border rounded p-2 text-sm font-bold" placeholder="Title" value={s.title} onChange={e => {
                    const arr = [...data.philosophyStatements]; arr[i] = {...arr[i], title: e.target.value}; setData({...data, philosophyStatements: arr})
                  }} />
                  <textarea className="w-full border rounded p-2 text-sm h-16" placeholder="Description" value={s.desc} onChange={e => {
                    const arr = [...data.philosophyStatements]; arr[i] = {...arr[i], desc: e.target.value}; setData({...data, philosophyStatements: arr})
                  }} />
                </div>
                <button onClick={() => removeItem("philosophyStatements", i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold uppercase text-gray-400">Ignatian Pillars</h2>
            <Button size="sm" variant="outline" onClick={() => addItem("pillars", { title: "", description: "" })}>
              <Plus className="h-3 w-3 mr-1" /> Add Pillar
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Section Title</label>
              <input className="w-full border rounded p-2" value={data.pillarsTitle} onChange={e => setData({...data, pillarsTitle: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
              <input className="w-full border rounded p-2" value={data.pillarsSubtitle} onChange={e => setData({...data, pillarsSubtitle: e.target.value})} />
            </div>
          </div>
          {data.pillars.map((p, i) => (
            <div key={i} className="flex gap-2 p-3 bg-gray-50 rounded border">
              <div className="flex-1 space-y-2">
                <input className="w-full border rounded p-2 text-sm font-bold" placeholder="Title" value={p.title} onChange={e => {
                  const arr = [...data.pillars]; arr[i] = {...arr[i], title: e.target.value}; setData({...data, pillars: arr})
                }} />
                <textarea className="w-full border rounded p-2 text-sm h-16" placeholder="Description" value={p.description} onChange={e => {
                  const arr = [...data.pillars]; arr[i] = {...arr[i], description: e.target.value}; setData({...data, pillars: arr})
                }} />
              </div>
              <button onClick={() => removeItem("pillars", i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </section>

        {/* Facts */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold uppercase text-gray-400">Organization Facts</h2>
            <Button size="sm" variant="outline" onClick={() => addItem("facts", { label: "", value: "" })}>
              <Plus className="h-3 w-3 mr-1" /> Add Fact
            </Button>
          </div>
          {data.facts.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 border rounded p-2 text-sm" placeholder="Label" value={f.label} onChange={e => {
                const arr = [...data.facts]; arr[i] = {...arr[i], label: e.target.value}; setData({...data, facts: arr})
              }} />
              <input className="flex-1 border rounded p-2 text-sm" placeholder="Value" value={f.value} onChange={e => {
                const arr = [...data.facts]; arr[i] = {...arr[i], value: e.target.value}; setData({...data, facts: arr})
              }} />
              <button onClick={() => removeItem("facts", i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Bottom CTA</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
              <input className="w-full border rounded p-2" value={data.ctaTitle} onChange={e => setData({...data, ctaTitle: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
              <input className="w-full border rounded p-2" value={data.ctaSubtitle} onChange={e => setData({...data, ctaSubtitle: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Button Text</label>
              <input className="w-full border rounded p-2" value={data.ctaButtonText} onChange={e => setData({...data, ctaButtonText: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Button Link</label>
              <input className="w-full border rounded p-2" value={data.ctaButtonLink} onChange={e => setData({...data, ctaButtonLink: e.target.value})} />
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  )
}
