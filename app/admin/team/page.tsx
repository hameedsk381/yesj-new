"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Edit2, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TeamMember {
    id: number
    name: string
    role: string
    bio: string
    imagePath: string
    twitterUrl?: string
    linkedinUrl?: string
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const [formData, setFormData] = useState({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "" })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => { fetchTeam() }, [])

    const fetchTeam = async () => {
        try {
            const response = await fetch("/api/team")
            const result = await response.json()
            if (response.ok) setMembers(Array.isArray(result) ? result : (result.data || []))
        } catch (error) { console.error("Failed to fetch team", error) }
    }

    const openAddForm = () => {
        setEditingId(null)
        setFormData({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "" })
        setImageFile(null)
        setShowForm(true)
    }

    const openEditForm = (member: TeamMember) => {
        setEditingId(member.id)
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio || "",
            twitterUrl: member.twitterUrl || "",
            linkedinUrl: member.linkedinUrl || "",
        })
        setImageFile(null)
        setShowForm(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this member?")) return
        try {
            const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
            if (res.ok) fetchTeam()
            else alert("Failed to delete")
        } catch (error) { console.error("Delete failed", error) }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingId && !imageFile) { alert("Please select an image"); return }
        setIsSubmitting(true)
        try {
            if (editingId) {
                const payload: any = { ...formData }
                if (imageFile) {
                    const fd = new FormData()
                    fd.append("file", imageFile)
                    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd })
                    if (uploadRes.ok) { const u = await uploadRes.json(); payload.imagePath = u.url }
                }
                const res = await fetch(`/api/admin/team/${editingId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                if (!res.ok) throw new Error("Failed to update")
            } else {
                const data = new FormData()
                Object.entries(formData).forEach(([key, value]) => data.append(key, value))
                data.append("image", imageFile!)
                const res = await fetch("/api/admin/team", { method: "POST", body: data })
                if (!res.ok) throw new Error("Failed to add")
            }
            setShowForm(false)
            setEditingId(null)
            setFormData({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "" })
            setImageFile(null)
            fetchTeam()
        } catch (error) { alert("Failed to save") }
        finally { setIsSubmitting(false) }
    }

    return (
        <AdminLayout>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                        <h1 className="text-xl font-light text-primary">Team Members</h1>
                    </div>
                    <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
                        {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                        {showForm ? "Cancel" : "Add Member"}
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {showForm && (
                    <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Member" : "Add New Member"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input className="border p-2 rounded" placeholder="Role" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <textarea className="w-full border p-2 rounded" placeholder="Bio" rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Twitter URL" value={formData.twitterUrl} onChange={e => setFormData({ ...formData, twitterUrl: e.target.value })} />
                                <input className="border p-2 rounded" placeholder="LinkedIn URL" value={formData.linkedinUrl} onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })} />
                            </div>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white">{isSubmitting ? "Saving..." : editingId ? "Update Member" : "Add Member"}</Button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {members.map(member => (
                        <div key={member.id} className="bg-white border rounded-md p-6 flex flex-col items-center text-center shadow-sm relative">
                            <div className="absolute top-2 right-2 flex gap-1">
                                <button onClick={() => openEditForm(member)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded"><Edit2 className="h-4 w-4" /></button>
                                <button onClick={() => handleDelete(member.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
                            </div>
                            <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 mb-4 relative mt-4">
                                {member.imagePath ? (
                                    <Image src={member.imagePath} alt={member.name} fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </main>
        </AdminLayout>
    )
}
