"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface Beneficiary {
  id: number
  fullName: string
  gender: string
  dateOfBirth: string
  age: number
  phone: string
  email: string
  address: string
  city: string
  state: string
  category: string
  program: string
  status: string
  enrolledDate: string
  guardianName: string
  guardianPhone: string
  notes: string
}

const EMPTY_FORM = {
  fullName: "", gender: "", dateOfBirth: "", age: "", phone: "", email: "", address: "",
  city: "", state: "", category: "", program: "", status: "active", enrolledDate: "",
  guardianName: "", guardianPhone: "", notes: "",
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-200 text-gray-600",
  graduated: "bg-blue-100 text-blue-700",
  closed: "bg-red-100 text-red-700",
}

export default function ErpBeneficiariesPage() {
  const [items, setItems] = useState<Beneficiary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [programFilter, setProgramFilter] = useState("")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchItems = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (statusFilter) params.set("status", statusFilter)
      if (programFilter) params.set("program", programFilter)
      const response = await fetch(`/api/admin/erp/beneficiaries?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setItems(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch beneficiaries", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter, programFilter])

  useEffect(() => {
    fetchItems(page, debouncedSearch)
  }, [fetchItems, page, debouncedSearch, statusFilter, programFilter])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ ...EMPTY_FORM, enrolledDate: new Date().toISOString().slice(0, 10) })
    setShowForm(true)
  }

  const openEditForm = (b: Beneficiary) => {
    setEditingId(b.id)
    setFormData({
      fullName: b.fullName || "",
      gender: b.gender || "",
      dateOfBirth: b.dateOfBirth ? String(b.dateOfBirth).slice(0, 10) : "",
      age: b.age ? String(b.age) : "",
      phone: b.phone || "",
      email: b.email || "",
      address: b.address || "",
      city: b.city || "",
      state: b.state || "",
      category: b.category || "",
      program: b.program || "",
      status: b.status || "active",
      enrolledDate: b.enrolledDate ? String(b.enrolledDate).slice(0, 10) : "",
      guardianName: b.guardianName || "",
      guardianPhone: b.guardianPhone || "",
      notes: b.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this beneficiary? This may remove related service records.")) return
    try {
      const res = await fetch(`/api/admin/erp/beneficiaries/${id}`, { method: "DELETE" })
      if (res.ok) fetchItems(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim()) {
      alert("Name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/beneficiaries/${editingId}` : "/api/admin/erp/beneficiaries", {
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
      fetchItems(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save beneficiary")
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
            <h1 className="text-2xl font-light text-primary mb-1">Beneficiaries</h1>
            <p className="text-sm text-muted-foreground">Track individuals and families served by YESJ.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Beneficiary</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Beneficiary" : "Add Beneficiary"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Full Name *</label>
                  <input type="text" className={inputCls} required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <select className={inputCls} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                    <option value="">Select...</option>
                    {ERP_CONSTANTS.BENEFICIARY_GENDERS.map((g) => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Age</label>
                  <input type="number" className={inputCls} min="0" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" className={inputCls} value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option value="">Select...</option>
                    {ERP_CONSTANTS.BENEFICIARY_CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Program</label>
                  <select className={inputCls} value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })}>
                    <option value="">Select...</option>
                    {ERP_CONSTANTS.BENEFICIARY_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.BENEFICIARY_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="text" className={inputCls} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input type="text" className={inputCls} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <input type="text" className={inputCls} value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Enrolled Date</label>
                  <input type="date" className={inputCls} value={formData.enrolledDate} onChange={(e) => setFormData({ ...formData, enrolledDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Guardian Name</label>
                  <input type="text" className={inputCls} value={formData.guardianName} onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Guardian Phone</label>
                  <input type="text" className={inputCls} value={formData.guardianPhone} onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Address</label>
                  <textarea className={inputCls} rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Beneficiary" : "Add Beneficiary"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative max-w-md flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary">
            <option value="">All statuses</option>
            {ERP_CONSTANTS.BENEFICIARY_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <select value={programFilter} onChange={(e) => { setProgramFilter(e.target.value); setPage(1) }} className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary">
            <option value="">All programs</option>
            {ERP_CONSTANTS.BENEFICIARY_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading beneficiaries...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No beneficiaries found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Program</th>
                    <th className="px-4 py-3 font-medium hidden xl:table-cell">City</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Phone</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {b.fullName}
                        {b.age ? <span className="text-xs text-muted-foreground ml-1">({b.age})</span> : null}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs capitalize text-muted-foreground">{b.category || "—"}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{b.program || "—"}</td>
                      <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground">{b.city || "—"}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs">{b.phone || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[b.status] || "bg-gray-200 text-gray-500"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(b)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="beneficiaries" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}