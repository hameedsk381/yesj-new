"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface StaffOption {
  id: number
  fullName: string
}

interface AttendanceRecord {
  id: number
  staffId: number
  staffName: string
  date: string
  status: string
  checkIn: string
  checkOut: string
  notes: string
}

const EMPTY_FORM = {
  staffId: "", date: "", status: "present", checkIn: "", checkOut: "", notes: "",
}

const STATUS_STYLES: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  "half-day": "bg-amber-100 text-amber-700",
  leave: "bg-blue-100 text-blue-700",
}

export default function ErpAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [staff, setStaff] = useState<StaffOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchStaff = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/erp/staff?limit=100")
      const result = await res.json()
      if (res.ok) {
        setStaff(Array.isArray(result) ? result : (result.data || []))
      }
    } catch (err) {
      console.error("Failed to fetch staff", err)
    }
  }, [])

  const fetchRecords = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (dateFilter) params.set("date", dateFilter)
      const response = await fetch(`/api/admin/erp/attendance?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setRecords(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch attendance", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, dateFilter])

  useEffect(() => {
    fetchRecords(page, debouncedSearch)
  }, [fetchRecords, page, debouncedSearch, dateFilter])

  useEffect(() => {
    if (showForm && staff.length === 0) {
      fetchStaff()
    }
  }, [showForm, staff.length, fetchStaff])

  const openAddForm = () => {
    setEditingId(null)
    const today = new Date().toISOString().slice(0, 10)
    setFormData({ ...EMPTY_FORM, date: today })
    setShowForm(true)
  }

  const openEditForm = (r: AttendanceRecord) => {
    setEditingId(r.id)
    setFormData({
      staffId: String(r.staffId),
      date: r.date ? String(r.date).slice(0, 10) : "",
      status: r.status || "present",
      checkIn: r.checkIn || "",
      checkOut: r.checkOut || "",
      notes: r.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this attendance record?")) return
    try {
      const res = await fetch(`/api/admin/erp/attendance/${id}`, { method: "DELETE" })
      if (res.ok) fetchRecords(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.staffId) {
      alert("Please select a staff member")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/attendance/${editingId}` : "/api/admin/erp/attendance", {
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
      fetchRecords(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save attendance")
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
            <h1 className="text-2xl font-light text-primary mb-1">Attendance</h1>
            <p className="text-sm text-muted-foreground">Track daily staff attendance.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Mark Attendance</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Attendance" : "Mark Attendance"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Staff Member *</label>
                  <select className={inputCls} value={formData.staffId} onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}>
                    <option value="">Select staff...</option>
                    {staff.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date *</label>
                  <input type="date" className={inputCls} required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.ATTENDANCE_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Check In</label>
                  <input type="time" className={inputCls} value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Check Out</label>
                  <input type="time" className={inputCls} value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Attendance" : "Mark Attendance"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative max-w-md flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by staff name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(1) }}
            className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary"
          />
          {dateFilter && (
            <button onClick={() => { setDateFilter(""); setPage(1) }} className="text-xs text-primary hover:underline">Clear date</button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading attendance...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No attendance records found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Staff</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Check In</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Check Out</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">{r.date ? new Date(r.date).toLocaleDateString() : "—"}</td>
                      <td className="px-4 py-3 font-medium">{r.staffName || "Unknown staff"}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground">{r.checkIn || "—"}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground">{r.checkOut || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[r.status] || "bg-gray-200 text-gray-500"}`}>
                          {r.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(r)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="attendance records" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}