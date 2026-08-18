"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, Mail, Phone } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface Staff {
  id: number
  fullName: string
  email: string
  phone: string
  role: string
  department: string
  designation: string
  joinDate: string
  employmentType: string
  salary: number | string
  bankAccount: string
  bankName: string
  ifscCode: string
  address: string
  status: string
  notes: string
}

const EMPTY_FORM = {
  fullName: "", email: "", phone: "", role: "", department: "Programs", designation: "", joinDate: "", employmentType: "full-time", salary: "", bankAccount: "", bankName: "", ifscCode: "", address: "", status: "active", notes: "",
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  "on-leave": "bg-amber-100 text-amber-700",
  resigned: "bg-gray-200 text-gray-500",
}

export default function ErpStaffPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0)
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

  const fetchStaff = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (statusFilter) params.set("status", statusFilter)
      const response = await fetch(`/api/admin/erp/staff?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setStaff(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
        setTotalSalary(result.totalSalary || 0)
      }
    } catch (error) {
      console.error("Failed to fetch staff", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchStaff(page, debouncedSearch)
  }, [fetchStaff, page, debouncedSearch, statusFilter])

  const openAddForm = () => {
    setEditingId(null)
    const today = new Date().toISOString().slice(0, 10)
    setFormData({ ...EMPTY_FORM, joinDate: today })
    setShowForm(true)
  }

  const openEditForm = (s: Staff) => {
    setEditingId(s.id)
    setFormData({
      fullName: s.fullName,
      email: s.email || "",
      phone: s.phone || "",
      role: s.role || "",
      department: s.department || "Programs",
      designation: s.designation || "",
      joinDate: s.joinDate ? String(s.joinDate).slice(0, 10) : "",
      employmentType: s.employmentType || "full-time",
      salary: s.salary !== null && s.salary !== undefined ? String(s.salary) : "",
      bankAccount: s.bankAccount || "",
      bankName: s.bankName || "",
      ifscCode: s.ifscCode || "",
      address: s.address || "",
      status: s.status || "active",
      notes: s.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this staff member? Attendance and leave history will be kept.")) return
    try {
      const res = await fetch(`/api/admin/erp/staff/${id}`, { method: "DELETE" })
      if (res.ok) fetchStaff(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim()) {
      alert("Staff name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/staff/${editingId}` : "/api/admin/erp/staff", {
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
      fetchStaff(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save staff member")
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
            <h1 className="text-2xl font-light text-primary mb-1">Staff & HR</h1>
            <p className="text-sm text-muted-foreground">Manage staff records, roles and payroll details.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Staff</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Staff" : "Add New Staff"}</h2>
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
                  <label className={labelCls}>Role</label>
                  <input className={inputCls} placeholder="e.g. Coordinator, Field Officer" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Department</label>
                  <select className={inputCls} value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}>
                    {ERP_CONSTANTS.STAFF_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Employment Type</label>
                  <select className={inputCls} value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}>
                    {ERP_CONSTANTS.STAFF_EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.STAFF_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Join Date</label>
                  <input type="date" className={inputCls} value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Monthly Salary</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Amount" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Bank Account</label>
                  <input className={inputCls} placeholder="Account number" value={formData.bankAccount} onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Bank Name</label>
                  <input className={inputCls} placeholder="Bank name" value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>IFSC Code</label>
                  <input className={inputCls} placeholder="IFSC" value={formData.ifscCode} onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Address</label>
                  <textarea className={inputCls} rows={2} placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Staff" : "Create Staff"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative max-w-md flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email, role..."
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
              {ERP_CONSTANTS.STAFF_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div className="bg-white border rounded-md px-4 py-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly payroll</p>
            <p className="text-lg font-bold text-primary">{formatINR(totalSalary)}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading staff...</p>
          </div>
        ) : staff.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No staff found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Department</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Contact</th>
                    <th className="px-4 py-3 font-medium hidden xl:table-cell">Salary</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium">{s.fullName}</p>
                        <p className="text-xs text-muted-foreground">{s.role || s.designation || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs bg-gray-100 rounded px-2 py-1">{s.department}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="flex items-center gap-1.5 text-xs"><Mail className="h-3 w-3" /> {s.email || "—"}</p>
                        <p className="flex items-center gap-1.5 text-xs mt-1"><Phone className="h-3 w-3" /> {s.phone || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell font-medium">{s.salary ? formatINR(s.salary) : "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[s.status] || "bg-gray-200 text-gray-500"}`}>
                          {s.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(s)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="staff" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}