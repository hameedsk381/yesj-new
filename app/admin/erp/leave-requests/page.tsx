"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, Check, Ban } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface StaffOption {
  id: number
  fullName: string
}

interface LeaveRequest {
  id: number
  staffId: number
  staffName: string
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  status: string
  approvedBy: string
}

const EMPTY_FORM = {
  staffId: "", leaveType: "casual", startDate: "", endDate: "", reason: "", status: "pending",
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
}

export default function ErpLeaveRequestsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([])
  const [staff, setStaff] = useState<StaffOption[]>([])
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

  const fetchRequests = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (statusFilter) params.set("status", statusFilter)
      const response = await fetch(`/api/admin/erp/leave-requests?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setRequests(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch leave requests", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchRequests(page, debouncedSearch)
  }, [fetchRequests, page, debouncedSearch, statusFilter])

  useEffect(() => {
    if (showForm && staff.length === 0) {
      fetchStaff()
    }
  }, [showForm, staff.length, fetchStaff])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ ...EMPTY_FORM, startDate: new Date().toISOString().slice(0, 10), endDate: new Date().toISOString().slice(0, 10) })
    setShowForm(true)
  }

  const openEditForm = (r: LeaveRequest) => {
    setEditingId(r.id)
    setFormData({
      staffId: String(r.staffId),
      leaveType: r.leaveType || "casual",
      startDate: r.startDate ? String(r.startDate).slice(0, 10) : "",
      endDate: r.endDate ? String(r.endDate).slice(0, 10) : "",
      reason: r.reason || "",
      status: r.status || "pending",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this leave request?")) return
    try {
      const res = await fetch(`/api/admin/erp/leave-requests/${id}`, { method: "DELETE" })
      if (res.ok) fetchRequests(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/erp/leave-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, approvedBy: status === "approved" ? "Admin" : null }),
      })
      if (res.ok) fetchRequests(page, debouncedSearch)
      else alert("Failed to update status")
    } catch (error) {
      console.error("Status update failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.staffId) {
      alert("Please select a staff member")
      return
    }
    if (!formData.startDate || !formData.endDate) {
      alert("Start and end dates are required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/leave-requests/${editingId}` : "/api/admin/erp/leave-requests", {
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
      fetchRequests(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save leave request")
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
            <h1 className="text-2xl font-light text-primary mb-1">Leave Requests</h1>
            <p className="text-sm text-muted-foreground">Track and approve staff leave.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> New Request</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Leave Request" : "New Leave Request"}</h2>
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
                  <label className={labelCls}>Leave Type</label>
                  <select className={inputCls} value={formData.leaveType} onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}>
                    {ERP_CONSTANTS.LEAVE_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.LEAVE_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Start Date *</label>
                  <input type="date" className={inputCls} required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>End Date *</label>
                  <input type="date" className={inputCls} required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Reason</label>
                  <textarea className={inputCls} rows={2} placeholder="Reason" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Request" : "Create Request"}
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
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary"
          >
            <option value="">All statuses</option>
            {ERP_CONSTANTS.LEAVE_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading leave requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No leave requests found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Staff</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Dates</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Type</th>
                    <th className="px-4 py-3 font-medium hidden xl:table-cell">Reason</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{r.staffName || "Unknown staff"}</td>
                      <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">
                        <span className="text-xs text-muted-foreground">
                          {r.startDate ? new Date(r.startDate).toLocaleDateString() : "—"} → {r.endDate ? new Date(r.endDate).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs capitalize text-muted-foreground">{r.leaveType}</td>
                      <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground max-w-[200px] truncate">{r.reason || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[r.status] || "bg-gray-200 text-gray-500"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {r.status === "pending" && (
                          <>
                            <button onClick={() => updateStatus(r.id, "approved")} className="p-1.5 rounded hover:bg-green-50 text-green-600" title="Approve"><Check className="h-4 w-4" /></button>
                            <button onClick={() => updateStatus(r.id, "rejected")} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Reject"><Ban className="h-4 w-4" /></button>
                          </>
                        )}
                        <button onClick={() => openEditForm(r)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="leave requests" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}