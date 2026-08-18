"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface BeneficiaryOption {
  id: number
  fullName: string
}

interface ServiceRecord {
  id: number
  beneficiaryId: number
  beneficiaryName: string
  serviceType: string
  description: string
  amount: number
  serviceDate: string
  notes: string
}

const EMPTY_FORM = {
  beneficiaryId: "", serviceType: "Education Support", description: "", amount: "", serviceDate: "", notes: "",
}

export default function ErpBeneficiaryServicesPage() {
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
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

  const fetchBeneficiaries = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/erp/beneficiaries?limit=100")
      const result = await res.json()
      if (res.ok) {
        setBeneficiaries(Array.isArray(result) ? result : (result.data || []))
      }
    } catch (err) {
      console.error("Failed to fetch beneficiaries", err)
    }
  }, [])

  const fetchRecords = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (typeFilter) params.set("serviceType", typeFilter)
      if (dateFilter) params.set("date", dateFilter)
      const response = await fetch(`/api/admin/erp/beneficiary-services?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setRecords(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch services", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, typeFilter, dateFilter])

  useEffect(() => {
    fetchRecords(page, debouncedSearch)
  }, [fetchRecords, page, debouncedSearch, typeFilter, dateFilter])

  useEffect(() => {
    if (showForm && beneficiaries.length === 0) {
      fetchBeneficiaries()
    }
  }, [showForm, beneficiaries.length, fetchBeneficiaries])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ ...EMPTY_FORM, serviceDate: new Date().toISOString().slice(0, 10) })
    setShowForm(true)
  }

  const openEditForm = (r: ServiceRecord) => {
    setEditingId(r.id)
    setFormData({
      beneficiaryId: String(r.beneficiaryId),
      serviceType: r.serviceType || "Other",
      description: r.description || "",
      amount: r.amount ? String(r.amount) : "",
      serviceDate: r.serviceDate ? String(r.serviceDate).slice(0, 10) : "",
      notes: r.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service record?")) return
    try {
      const res = await fetch(`/api/admin/erp/beneficiary-services/${id}`, { method: "DELETE" })
      if (res.ok) fetchRecords(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.beneficiaryId) {
      alert("Please select a beneficiary")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/beneficiary-services/${editingId}` : "/api/admin/erp/beneficiary-services", {
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
      alert(error.message || "Failed to save service record")
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
            <h1 className="text-2xl font-light text-primary mb-1">Beneficiary Services</h1>
            <p className="text-sm text-muted-foreground">Services, aid and support provided to beneficiaries.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Log Service</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Service Record" : "Log Service"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Beneficiary *</label>
                  <select className={inputCls} value={formData.beneficiaryId} onChange={(e) => setFormData({ ...formData, beneficiaryId: e.target.value })}>
                    <option value="">Select beneficiary...</option>
                    {beneficiaries.map((b) => <option key={b.id} value={b.id}>{b.fullName}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Service Type</label>
                  <select className={inputCls} value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}>
                    {ERP_CONSTANTS.SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Service Date *</label>
                  <input type="date" className={inputCls} required value={formData.serviceDate} onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Amount (₹)</label>
                  <input type="number" step="0.01" min="0" className={inputCls} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Description</label>
                  <input type="text" className={inputCls} placeholder="e.g. School fee for Q3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Record" : "Log Service"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative max-w-md flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by beneficiary or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1) }} className="border p-2 rounded-md text-sm bg-white outline-none focus:border-primary">
            <option value="">All types</option>
            {ERP_CONSTANTS.SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
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
            <p className="text-sm text-muted-foreground">Loading service records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No service records found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Beneficiary</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Type</th>
                    <th className="px-4 py-3 font-medium hidden xl:table-cell">Description</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{r.beneficiaryName || "Unknown beneficiary"}</td>
                      <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap text-xs">{r.serviceDate ? new Date(r.serviceDate).toLocaleDateString() : "—"}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{r.serviceType || "—"}</td>
                      <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground max-w-[220px] truncate">{r.description || "—"}</td>
                      <td className="px-4 py-3 text-right font-medium">{r.amount ? formatINR(r.amount) : "—"}</td>
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
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="service records" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}