"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Edit2, X, Loader2, Search } from "lucide-react"
import Image from "next/image"
import { ImageField } from "@/components/admin/image-field"

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
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [formData, setFormData] = useState({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "", imagePath: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchTeam = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "24",
      })
      if (searchVal) params.set("search", searchVal)

      const response = await fetch(`/api/admin/team?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setMembers(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch team", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchTeam(page, debouncedSearch)
  }, [fetchTeam, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "", imagePath: "" })
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
      imagePath: member.imagePath || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this member?")) return
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" })
      if (res.ok) fetchTeam(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId && !formData.imagePath) {
      alert("Please select or upload an image")
      return
    }
    setIsSubmitting(true)
    try {
      const payload: any = { ...formData }
      const res = await fetch(editingId ? `/api/admin/team/${editingId}` : "/api/admin/team", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to save")
      setShowForm(false)
      setEditingId(null)
      setFormData({ name: "", role: "", bio: "", twitterUrl: "", linkedinUrl: "", imagePath: "" })
      fetchTeam(page, debouncedSearch)
    } catch (error) {
      alert("Failed to save")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Team Members</h1>
            <p className="text-sm text-muted-foreground">Manage directors, mentors, and program coordinators.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Member</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Member" : "Add New Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Role (e.g. Director, Province Coordinator)"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <textarea
                className="w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                placeholder="Brief biography / background..."
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="Twitter URL (Optional)"
                  value={formData.twitterUrl}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                />
                <input
                  className="border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                  placeholder="LinkedIn URL (Optional)"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                />
              </div>
              <ImageField
                label={editingId ? "Photo (leave empty to keep current)" : "Photo"}
                value={formData.imagePath}
                onChange={(url) => setFormData({ ...formData, imagePath: url })}
                prefix="team"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Member" : "Add Member"}
              </Button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search team members by name, role, bio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading team members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">
            No team members found.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-white border rounded-md p-6 flex flex-col items-center text-center shadow-sm relative">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => openEditForm(member)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded" title="Edit">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 relative mt-2 border-2 border-primary/10">
                    {member.imagePath ? (
                      <Image src={member.imagePath} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                </div>
              ))}
            </div>

            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={24}
              onPageChange={(newPage) => setPage(newPage)}
              itemName="team members"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
