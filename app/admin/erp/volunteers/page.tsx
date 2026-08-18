"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, Clock, Mail, Phone } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface Volunteer {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  gender: string
  age: number | null
  occupation: string
  skills: string[] | null
  availability: string
  status: string
  joinedAt: string
  notes: string
  totalHours: number
  activityCount: number
}

const EMPTY_FORM = {
  fullName: "", email: "", phone: "", address: "", gender: "", age: "", occupation: "", skills: "", availability: "flexible", status: "active", joinedAt: "", notes: "",
}

export default function ErpVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchVolunteers = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (statusFilter) params.set("status", statusFilter)
      const response = await fetch(`/api/admin/erp/volunteers?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setVolunteers(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch volunteers", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchVolunteers(page, debouncedSearch)
  }, [fetchVolunteers, page, debouncedSearch, statusFilter])

  const openAddForm = () => {
    setEditingId(null)
    const today = new Date().toISOString().slice(0, 10)
    setFormData({ ...EMPTY_FORM, joinedAt: today })
    setShowForm(true)
  }

  const openEditForm = (v: Volunteer) => {
    setEditingId(v.id)
    setFormData({
      fullName: v.fullName,
      email: v.email || "",
      phone: v.phone || "",
      address: v.address || "",
      gender: v.gender || "",
      age: v.age ? String(v.age) : "",
      occupation: v.occupation || "",
      skills: (v.skills || []).join(", "),
      availability: v.availability || "flexible",
      status: v.status || "active",
      joinedAt: v.joinedAt ? String(v.joinedAt).slice(0, 10) : "",
      notes: v.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this volunteer? Their activity history will be kept.")) return
    try {
      const res = await fetch(`/api/admin/erp/volunteers/${id}`, { method: "DELETE" })
      if (res.ok) fetchVolunteers(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim()) {
      alert("Volunteer name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const payload = {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      }
      const res = await fetch(editingId ? `/api/admin/erp/volunteers/${editingId}` : "/api/admin/erp/volunteers", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || "Failed to save")
      }
      setShowForm(false)
      setEditingId(null)
      setFormData(EMPTY_FORM)
      fetchVolunteers(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save volunteer")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls = "w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary bg-white"
  const labelCls = "block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1"

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Volunteers</h1>
            <p className="text-sm text-muted-foreground">Manage the volunteer database and track contributions.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Volunteer</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Volunteer" : "Add New Volunteer"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Full Name *</label>
                  <input className={inputCls} placeholder="Full name" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input className={inputCls} placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <select className={inputCls} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                    <option value="">Select...</option>
                    {ERP_CONSTANTS.VOLUNTEER_GENDERS.map((g) => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Age</label>
                  <input type="number" min="1" max="120" className={inputCls} placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Occupation</label>
                  <input className={inputCls} placeholder="Student / profession" value={formData.occupation} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Skills (comma separated)</label>
                  <input className={inputCls} placeholder="Teaching, design, event management..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Availability</label>
                  <select className={inputCls} value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })}>
                    {ERP_CONSTANTS.VOLUNTEER_AVAILABILITY.map((a) => <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.VOLUNTEER_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Joined Date</label>
                  <input type="date" className={inputCls} value={formData.joinedAt} onChange={(e) => setFormData({ ...formData, joinedAt: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <input className={inputCls} placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Volunteer" : "Create Volunteer"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative max-w-md flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading volunteers...</p>
          </div>
        ) : volunteers.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No volunteers found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Contact</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Skills</th>
                    <th className="px-4 py-3 font-medium hidden xl:table-cell">Hours</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {volunteers.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium">{v.fullName}</p>
                        <p className="text-xs text-muted-foreground">{v.occupation || v.gender ? [v.occupation, v.gender && v.gender.charAt(0).toUpperCase() + v.gender.slice(1)].filter(Boolean).join(" · ") : "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="flex items-center gap-1.5 text-xs"><Mail className="h-3 w-3" /> {v.email || "—"}</p>
                        <p className="flex items-center gap-1.5 text-xs mt-1"><Phone className="h-3 w-3" /> {v.phone || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {v.skills?.length ? (
                          <div className="flex flex-wrap gap-1">
                            {v.skills.slice(0, 3).map((s) => (
                              <span key={s} className="text-[10px] bg-gray-100 rounded px-1.5 py-0.5 text-muted-foreground">{s}</span>
                            ))}
                            {v.skills.length > 3 && <span className="text-[10px] text-muted-foreground">+{v.skills.length - 3}</span>}
                          </div>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <p className="flex items-center gap-1 text-sm font-medium"><Clock className="h-3.5 w-3.5" /> {Number(v.totalHours).toFixed(1)}h</p>
                        <p className="text-xs text-muted-foreground">{v.activityCount} activities</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${v.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(v)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(v.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="volunteers" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}