"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus } from "lucide-react"
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
    const [showAddForm, setShowAddForm] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        twitterUrl: "",
        linkedinUrl: ""
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchTeam()
    }, [])

    const fetchTeam = async () => {
        try {
            const response = await fetch("/api/team")
            const result = await response.json()
            if (response.ok) {
                setMembers(Array.isArray(result) ? result : (result.data || []))
            }
        } catch (error) {
            console.error("Failed to fetch team", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this member?")) return
        try {
            const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
            if (res.ok) {
                fetchTeam()
            } else {
                alert("Failed to delete")
            }
        } catch (error) {
            console.error("Delete failed", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!imageFile) {
            alert("Please select an image")
            return
        }
        setIsSubmitting(true)

        try {
            const data = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            })
            data.append("image", imageFile)

            const res = await fetch("/api/admin/team", {
                method: "POST",
                body: data
            })

            if (!res.ok) throw new Error("Failed to add member")

            setShowAddForm(false)
            setFormData({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "" })
            setImageFile(null)
            fetchTeam()
        } catch (error) {
            alert("Failed to add member")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
                        </Link>
                        <h1 className="text-xl font-light text-primary">Team Members</h1>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary text-white">
                        {showAddForm ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Member</>}
                    </Button>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-8">
                {showAddForm && (
                    <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold mb-4">Add New Member</h2>
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
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white">{isSubmitting ? "Saving..." : "Add Member"}</Button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {members.map(member => (
                        <div key={member.id} className="bg-white border rounded-md p-6 flex flex-col items-center text-center shadow-sm">
                            <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 mb-4 relative">
                                {member.imagePath ? (
                                    <Image src={member.imagePath} alt={member.name} fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{member.bio}</p>

                            <button onClick={() => handleDelete(member.id)} className="mt-auto text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
                                <Trash2 className="h-3 w-3" /> Remove
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </AdminLayout>
    )
}
