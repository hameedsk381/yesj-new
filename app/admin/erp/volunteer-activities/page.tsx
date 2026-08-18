"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, Clock } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface VolunteerOption {
  id: number
  fullName: string
}

interface Activity {
  id: number
  volunteerId: number
  volunteerName: string
  program: string
  activityType: string
  description: string
  hours: number | string
  activityDate: string
  notes: string
}

const EMPTY_FORM = {
  volunteerId: "", program: "", activityType: "Program Support", description: "", hours: "", activityDate: "", notes: "",
}

export default function ErpVolunteerActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [volunteers, setVolunteers] = useState<VolunteerOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchVolunteers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/erp/volunteers?limit=100")
      const result = await res.json()
      if (res.ok) {
        setVolunteers(Array.isArray(result) ? result : (result.data || []))
      }
    } catch (err) {
      console.error("Failed to fetch volunteers", err)
    }
  }, [])

  const fetchActivities = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      const response = await fetch(`/api/admin/erp/volunteer-activities?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setActivities(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
        setTotalHours(result.totalHours || 0)
      }
    } catch (error) {
      console.error("Failed to fetch activities", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchActivities(page, debouncedSearch)
  }, [fetchActivities, page, debouncedSearch])

  useEffect(() => {
    if (showForm && volunteers.length === 0) {
      fetchVolunteers()
    }
  }, [showForm, volunteers.length, fetchVolunteers])

  const openAddForm = () => {
    setEditingId(null)
    const today = new Date().toISOString().slice(0, 10)
    setFormData({ ...EMPTY_FORM, activityDate: today })
    setShowForm(true)
  }

  const openEditForm = (a: Activity) => {
    setEditingId(a.id)
    setFormData({
      volunteerId: String(a.volunteerId),
      program: a.program || "",
      activityType: a.activityType || "Program Support",
      description: a.description || "",
      hours: String(a.hours),
      activityDate: a.activityDate ? String(a.activityDate).slice(0, 10) : "",
      notes: a.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this activity record?")) return
    try {
      const res = await fetch(`/api/admin/erp/volunteer-activities/${id}`, { method: "DELETE" })
      if (res.ok) fetchActivities(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.volunteerId) {
      alert("Please select a volunteer")
      return
    }
    if (!formData.hours || parseFloat(formData.hours) <= 0) {
      alert("Hours must be greater than zero")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/volunteer-activities/${editingId}` : "/api/admin/erp/volunteer-activities", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || "Failed to save")
      }
      setShowForm(false)
      setEditingId(null)
      setFormData(EMPTY_FORM)
      fetchActivities(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save activity")
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
            <h1 className="text-2xl font-light text-primary mb-1">Volunteer Activities</h1>
            <p className="text-sm text-muted-foreground">Record volunteer hours and track program involvement.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Log Activity</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Activity" : "Log Volunteer Activity"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Volunteer *</label>
                  <select className={inputCls} value={formData.volunteerId} onChange={(e) => setFormData({ ...formData, volunteerId: e.target.value })}>
                    <option value="">Select volunteer...</option>
                    {volunteers.map((v) => <option key={v.id} value={v.id}>{v.fullName}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Program</label>
                  <select className={inputCls} value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })}>
                    <option value="">Select program...</option>
                    {ERP_CONSTANTS.FUNDS.filter((f) => f !== "General").map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Activity Type</label>
                  <select className={inputCls} value={formData.activityType} onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}>
                    {ERP_CONSTANTS.VOLUNTEER_ACTIVITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Hours *</label>
                  <input type="number" step="0.5" min="0" className={inputCls} placeholder="Hours" required value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Date *</label>
                  <input type="date" className={inputCls} required value={formData.activityDate} onChange={(e) => setFormData({ ...formData, activityDate: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Description</label>
                  <input className={inputCls} placeholder="What did they do?" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Activity" : "Log Activity"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by volunteer, program, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="bg-white border rounded-md px-4 py-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Clock className="h-3 w-3" /> Total hours</p>
            <p className="text-lg font-bold text-primary">{Number(totalHours).toFixed(1)}h</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No activities logged yet.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Volunteer</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Program</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Type</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Description</th>
                    <th className="px-4 py-3 font-medium text-right">Hours</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activities.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">{a.activityDate ? new Date(a.activityDate).toLocaleDateString() : "—"}</td>
                      <td className="px-4 py-3 font-medium">{a.volunteerName || "Unknown volunteer"}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {a.program ? <span className="text-xs bg-gray-100 rounded px-2 py-1">{a.program}</span> : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{a.activityType || "—"}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground max-w-[180px] truncate">{a.description || "—"}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary">{Number(a.hours).toFixed(1)}h</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(a)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="activities" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}