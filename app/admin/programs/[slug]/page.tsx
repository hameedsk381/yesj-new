"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react"
import Link from "next/link"
import { ImageField } from "@/components/admin/image-field"
import { useParams, useRouter } from "next/navigation"
import { programFilters } from "@/lib/data/programs"

const megaMenuGroups = [
  { value: "skill-education", label: "Skill & Education" },
  { value: "youth-community", label: "Youth & Community" },
  { value: "spiritual-celebration", label: "Spiritual & Celebration" },
]

const toneOptions = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "accent", label: "Accent" },
]

type Action = { label: string; href: string; tone: string }
type Card = { title: string; description: string }
type Section = { title: string; paragraphs: string[]; bullets: string[]; cards: Card[] }

function emptySection(): Section {
  return { title: "", paragraphs: [""], bullets: [""], cards: [{ title: "", description: "" }] }
}

export default function EditProgram() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const isNew = slug === "new"

  const [program, setProgram] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchProgram()
  }, [slug])

  const fetchProgram = async () => {
    if (isNew) {
      setProgram({
        title: "",
        shortTitle: "",
        badge: "",
        tagline: "",
        subheading: "",
        icon: "",
        imagePath: "",
        logoPath: "",
        overviewDescription: "",
        megaMenuDescription: "",
        megaMenuGroup: "skill-education",
        categories: [],
        heroActions: [],
        sections: [],
        bottomActions: [],
      })
      setIsLoading(false)
      return
    }

    try {
      const [dbRes, settingsRes] = await Promise.all([
        fetch(`/api/admin/programs/${slug}`),
        fetch(`/api/settings`),
      ])

      if (!dbRes.ok) {
        router.push("/admin/programs")
        return
      }

      const dbProgram = await dbRes.json()
      const settings = await settingsRes.json()

      let content: any = {}
      try {
        const stored = settings[`program_content:${slug}`]
        if (stored) content = JSON.parse(stored)
      } catch {}

      setProgram({
        ...dbProgram,
        ...content,
        heroActions: content.heroActions || [],
        sections: content.sections || [],
        bottomActions: content.bottomActions || [],
        categories: content.categories || [],
        megaMenuGroup: content.megaMenuGroup || "skill-education",
        shortTitle: content.shortTitle || dbProgram.shortTitle || "",
        subheading: content.subheading || "",
        icon: content.icon || dbProgram.icon || "",
        megaMenuDescription: content.megaMenuDescription || "",
      })
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
      const dbFields: any = {
        title: program.title,
        shortTitle: program.shortTitle,
        badge: program.badge,
        tagline: program.tagline,
        icon: program.icon,
        imagePath: program.imagePath || program.image || null,
        logoPath: program.logoPath || program.logo || null,
        overviewDescription: program.overviewDescription,
      }

      let finalSlug = slug

      if (isNew) {
        if (!program.title) {
          throw new Error("Title is required")
        }
        finalSlug = program.slug ||
          program.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
          `program-${Date.now()}`
        const createRes = await fetch("/api/admin/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...dbFields, slug: finalSlug, isActive: true }),
        })
        if (!createRes.ok) {
          const err = await createRes.json().catch(() => null)
          throw new Error(err?.error || "Failed to create program")
        }
      } else {
        const dbRes = await fetch(`/api/admin/programs/${slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dbFields),
        })
        if (!dbRes.ok) {
          throw new Error("Failed to save program details")
        }
      }

      const content = {
        title: program.title,
        shortTitle: program.shortTitle,
        badge: program.badge,
        tagline: program.tagline,
        subheading: program.subheading,
        icon: program.icon,
        overviewDescription: program.overviewDescription,
        megaMenuDescription: program.megaMenuDescription,
        megaMenuGroup: program.megaMenuGroup,
        categories: program.categories,
        heroActions: program.heroActions,
        sections: program.sections,
        bottomActions: program.bottomActions,
      }

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `program_content:${finalSlug}`,
          value: JSON.stringify(content),
        }),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Program updated successfully" })
        window.scrollTo({ top: 0, behavior: "smooth" })
        if (isNew) {
          router.push(`/admin/programs/${finalSlug}`)
        }
      } else {
        throw new Error("Failed to save")
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Failed to save program" })
    } finally {
      setIsSaving(false)
    }
  }

  const update = (field: string, value: any) => setProgram({ ...program, [field]: value })

  const addSection = () => update("sections", [...(program.sections || []), emptySection()])
  const removeSection = (i: number) => {
    const s = [...program.sections]
    s.splice(i, 1)
    update("sections", s)
  }

  const updateSection = (i: number, field: string, value: any) => {
    const s = [...program.sections]
    s[i] = { ...s[i], [field]: value }
    update("sections", s)
  }

  const addArrayItem = (sectionIdx: number | null, field: string) => {
    if (sectionIdx === null) return
    if (field === "cards") {
      updateSection(sectionIdx, field, [...(program.sections[sectionIdx]?.cards || []), { title: "", description: "" }])
    } else {
      updateSection(sectionIdx, field, [...(program.sections[sectionIdx]?.[field as "paragraphs" | "bullets"] || []), ""])
    }
  }

  const removeArrayItem = (sectionIdx: number | null, field: string, itemIdx: number) => {
    if (sectionIdx === null) return
    const arr = [...(program.sections[sectionIdx]?.[field as "paragraphs" | "bullets" | "cards"] || [])]
    arr.splice(itemIdx, 1)
    updateSection(sectionIdx, field, arr.length ? arr : [""])
  }

  const addAction = (field: string) => update(field, [...(program[field] || []), { label: "", href: "", tone: "primary" }])
  const removeAction = (field: string, i: number) => {
    const a = [...(program[field] || [])]
    a.splice(i, 1)
    update(field, a)
  }

  const toggleCategory = (cat: string) => {
    const current = program.categories || []
    const next = current.includes(cat) ? current.filter((c: string) => c !== cat) : [...current, cat]
    update("categories", next)
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
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/programs">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <h1 className="text-xl font-light text-primary">{isNew ? "New Programme" : `Edit: ${program?.title || slug}`}</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8 max-w-6xl space-y-8 pb-24">
        {message && (
          <div className={`p-4 rounded-md border ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Identity & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white border rounded-lg p-6 space-y-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Identity</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Slug</label>
                <input
                  className="w-full border rounded p-2 bg-gray-50 text-gray-400"
                  value={program.slug || (isNew ? "auto-generated from title" : slug)}
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Icon (Lucide name)</label>
                <input className="w-full border rounded p-2" value={program.icon || ""} onChange={e => update("icon", e.target.value)} placeholder="sparkles, star, book-open..." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Title</label>
                <input className="w-full border rounded p-2" value={program.title || ""} onChange={e => update("title", e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Short Title</label>
                <input className="w-full border rounded p-2" value={program.shortTitle || ""} onChange={e => update("shortTitle", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Badge</label>
                <input className="w-full border rounded p-2" value={program.badge || ""} onChange={e => update("badge", e.target.value)} placeholder="Education & Youth Leadership" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Mega Menu Group</label>
                <select className="w-full border rounded p-2 bg-white" value={program.megaMenuGroup || "skill-education"} onChange={e => update("megaMenuGroup", e.target.value)}>
                  {megaMenuGroups.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Tagline</label>
              <input className="w-full border rounded p-2" value={program.tagline || ""} onChange={e => update("tagline", e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Subheading</label>
              <textarea className="w-full border rounded p-2 h-20 leading-relaxed" value={program.subheading || ""} onChange={e => update("subheading", e.target.value)} />
            </div>
          </section>

          <section className="bg-white border rounded-lg p-6 space-y-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Media</h2>
            <div className="space-y-4">
              <ImageField
                label="Hero Image"
                value={program.imagePath || program.image || ""}
                prefix="programs"
                onChange={(url) => update("imagePath", url)}
              />
              <ImageField
                label="Logo"
                value={program.logoPath || program.logo || ""}
                prefix="programs"
                onChange={(url) => update("logoPath", url)}
              />
            </div>
          </section>
        </div>

        {/* Categories & Descriptions */}
        <section className="bg-white border rounded-lg p-6 space-y-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Categories & Descriptions</h2>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Categories (used for filtering)</label>
            <div className="flex flex-wrap gap-2">
              {programFilters.map(cat => {
                if (cat === "All Programs") return null
                const active = (program.categories || []).includes(cat)
                return (
                  <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${
                      active ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                    }`}
                  >
                    {active ? "✓ " : ""}{cat}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Overview Description (card excerpt)</label>
            <textarea className="w-full border rounded p-2 h-24 leading-relaxed" value={program.overviewDescription || ""} onChange={e => update("overviewDescription", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Mega Menu Description</label>
            <input className="w-full border rounded p-2" value={program.megaMenuDescription || ""} onChange={e => update("megaMenuDescription", e.target.value)} placeholder="Short blurb for the mega menu dropdown" />
          </div>
        </section>

        {/* Hero Actions */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold uppercase text-gray-400">Hero Actions (CTA Buttons)</h2>
            <Button size="sm" variant="outline" onClick={() => addAction("heroActions")}>
              <Plus className="h-3 w-3 mr-1" /> Add Action
            </Button>
          </div>
          {(program.heroActions || []).map((action: Action, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
              <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />
              <input className="flex-1 border rounded p-2 text-sm" placeholder="Label" value={action.label} onChange={e => {
                const a = [...program.heroActions]; a[i] = { ...a[i], label: e.target.value }; update("heroActions", a)
              }} />
              <input className="flex-1 border rounded p-2 text-sm" placeholder="/contact?program=..." value={action.href} onChange={e => {
                const a = [...program.heroActions]; a[i] = { ...a[i], href: e.target.value }; update("heroActions", a)
              }} />
              <select className="border rounded p-2 text-sm bg-white" value={action.tone} onChange={e => {
                const a = [...program.heroActions]; a[i] = { ...a[i], tone: e.target.value }; update("heroActions", a)
              }}>
                {toneOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={() => removeAction("heroActions", i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {(!program.heroActions || program.heroActions.length === 0) && (
            <p className="text-sm text-gray-400 italic">No hero actions yet. Add one above.</p>
          )}
        </section>

        {/* Sections */}
        <section className="space-y-6">
          <div className="flex items-center justify-between bg-white border rounded-lg p-6 shadow-sm">
            <div>
              <h2 className="text-sm font-bold uppercase text-gray-400">Content Sections</h2>
              <p className="text-xs text-gray-400 mt-1">Each section can have paragraphs, bullet points, and cards.</p>
            </div>
            <Button onClick={addSection}>
              <Plus className="h-4 w-4 mr-2" /> Add Section
            </Button>
          </div>

          {(program.sections || []).map((section: Section, si: number) => (
            <div key={si} className="bg-white border rounded-lg p-6 shadow-sm space-y-5 relative group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs font-bold text-gray-300 bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center">{si + 1}</span>
                  <input className="flex-1 border-0 border-b border-dashed border-gray-200 p-1 text-lg font-bold focus:border-primary focus:ring-0" placeholder="Section Title" value={section.title} onChange={e => updateSection(si, "title", e.target.value)} />
                </div>
                <button onClick={() => removeSection(si)} className="text-red-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Paragraphs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Paragraphs</label>
                  <button type="button" onClick={() => addArrayItem(si, "paragraphs")} className="text-xs text-primary hover:underline">+ Add paragraph</button>
                </div>
                {(section.paragraphs || []).map((p: string, pi: number) => (
                  <div key={pi} className="flex items-start gap-2">
                    <textarea className="flex-1 border rounded p-2 text-sm h-20 leading-relaxed" value={p} onChange={e => {
                      const arr = [...(program.sections[si]?.paragraphs || [])]; arr[pi] = e.target.value; updateSection(si, "paragraphs", arr)
                    }} />
                    <button onClick={() => removeArrayItem(si, "paragraphs", pi)} className="text-red-300 hover:text-red-500 p-1 mt-1"><Trash2 className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Bullet Points</label>
                  <button type="button" onClick={() => addArrayItem(si, "bullets")} className="text-xs text-primary hover:underline">+ Add bullet</button>
                </div>
                {(section.bullets || []).map((b: string, bi: number) => (
                  <div key={bi} className="flex items-start gap-2">
                    <span className="mt-3 h-2 w-2 rounded-full bg-secondary shrink-0" />
                    <input className="flex-1 border rounded p-2 text-sm" value={b} onChange={e => {
                      const arr = [...(program.sections[si]?.bullets || [])]; arr[bi] = e.target.value; updateSection(si, "bullets", arr)
                    }} />
                    <button onClick={() => removeArrayItem(si, "bullets", bi)} className="text-red-300 hover:text-red-500 p-1"><Trash2 className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Cards (title + description pairs)</label>
                  <button type="button" onClick={() => addArrayItem(si, "cards")} className="text-xs text-primary hover:underline">+ Add card</button>
                </div>
                {(section.cards || []).map((card: Card, ci: number) => (
                  <div key={ci} className="flex items-start gap-2 p-3 bg-gray-50 rounded border">
                    <div className="flex-1 space-y-2">
                      <input className="w-full border rounded p-2 text-sm font-bold" placeholder="Card title" value={card.title} onChange={e => {
                        const arr = [...(program.sections[si]?.cards || [])]; arr[ci] = { ...arr[ci], title: e.target.value }; updateSection(si, "cards", arr)
                      }} />
                      <textarea className="w-full border rounded p-2 text-sm h-16" placeholder="Card description" value={card.description} onChange={e => {
                        const arr = [...(program.sections[si]?.cards || [])]; arr[ci] = { ...arr[ci], description: e.target.value }; updateSection(si, "cards", arr)
                      }} />
                    </div>
                    <button onClick={() => removeArrayItem(si, "cards", ci)} className="text-red-300 hover:text-red-500 p-1"><Trash2 className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {(!program.sections || program.sections.length === 0) && (
            <div className="bg-white border border-dashed rounded-lg p-12 text-center">
              <p className="text-gray-400 text-sm">No content sections yet.</p>
              <Button onClick={addSection} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" /> Add Your First Section
              </Button>
            </div>
          )}
        </section>

        {/* Bottom Actions */}
        <section className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold uppercase text-gray-400">Bottom Actions (Footer CTAs)</h2>
            <Button size="sm" variant="outline" onClick={() => addAction("bottomActions")}>
              <Plus className="h-3 w-3 mr-1" /> Add Action
            </Button>
          </div>
          {(program.bottomActions || []).map((action: Action, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
              <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />
              <input className="flex-1 border rounded p-2 text-sm" placeholder="Label" value={action.label} onChange={e => {
                const a = [...program.bottomActions]; a[i] = { ...a[i], label: e.target.value }; update("bottomActions", a)
              }} />
              <input className="flex-1 border rounded p-2 text-sm" placeholder="/contact?program=..." value={action.href} onChange={e => {
                const a = [...program.bottomActions]; a[i] = { ...a[i], href: e.target.value }; update("bottomActions", a)
              }} />
              <select className="border rounded p-2 text-sm bg-white" value={action.tone} onChange={e => {
                const a = [...program.bottomActions]; a[i] = { ...a[i], tone: e.target.value }; update("bottomActions", a)
              }}>
                {toneOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={() => removeAction("bottomActions", i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {(!program.bottomActions || program.bottomActions.length === 0) && (
            <p className="text-sm text-gray-400 italic">No bottom actions yet.</p>
          )}
        </section>
      </main>
    </AdminLayout>
  )
}
