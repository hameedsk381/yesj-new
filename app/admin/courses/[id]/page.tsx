"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { ImageField } from "@/components/admin/image-field"

interface CourseForm {
  slug: string
  title: string
  description: string
  shortDescription: string
  imagePath: string
  price: string
  startDate: string
  endDate: string
  maxStudents: string
  isActive: boolean
  registrationOpen: boolean
}

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === "new"
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState<CourseForm>({
    slug: "",
    title: "",
    description: "",
    shortDescription: "",
    imagePath: "",
    price: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    isActive: true,
    registrationOpen: true,
  })

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/courses/${params.id}`)
        .then(r => r.json())
        .then(data => {
          setForm({
            slug: data.slug || "",
            title: data.title || "",
            description: data.description || "",
            shortDescription: data.shortDescription || "",
            imagePath: data.imagePath || "",
            price: data.price ? String(data.price) : "",
            startDate: data.startDate ? data.startDate.slice(0, 16) : "",
            endDate: data.endDate ? data.endDate.slice(0, 16) : "",
            maxStudents: data.maxStudents ? String(data.maxStudents) : "",
            isActive: data.isActive !== false,
            registrationOpen: data.registrationOpen !== false,
          })
          setLoading(false)
        })
        .catch(() => { setError("Failed to load course"); setLoading(false) })
    }
  }, [params.id, isNew])

  const handleSave = async () => {
    if (!form.slug || !form.title) {
      alert("Slug and title are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      const body = {
        ...form,
        price: form.price ? Number(form.price) : null,
        maxStudents: form.maxStudents ? Number(form.maxStudents) : null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      }

      const res = isNew
        ? await fetch("/api/admin/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        : await fetch(`/api/admin/courses/${params.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save")
      }
      router.push("/admin/courses")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>

  return (
    <AdminLayout>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/courses"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <h1 className="text-xl font-light text-primary">{isNew ? "New Course" : "Edit Course"}</h1>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-primary text-white">
            <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8 max-w-3xl">
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">{error}</div>}
        <div className="bg-white border rounded-md p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input className="w-full border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input className="w-full border p-2 rounded" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} disabled={!isNew} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <input className="w-full border p-2 rounded" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border p-2 rounded" rows={5} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div>
            <ImageField
              label="Course Image"
              value={form.imagePath}
              prefix="courses"
              onChange={(url) => setForm({...form, imagePath: url})}
              hint="Choose an existing image or upload a new one"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input type="number" className="w-full border p-2 rounded" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Free if empty" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Students</label>
              <input type="number" className="w-full border p-2 rounded" value={form.maxStudents} onChange={e => setForm({...form, maxStudents: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="datetime-local" className="w-full border p-2 rounded" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="datetime-local" className="w-full border p-2 rounded" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="rounded" />
              <span className="text-sm">Active</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.registrationOpen} onChange={e => setForm({...form, registrationOpen: e.target.checked})} className="rounded" />
              <span className="text-sm">Registration Open</span>
            </label>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}
