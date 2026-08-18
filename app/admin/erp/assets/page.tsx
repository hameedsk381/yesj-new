"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, MapPin, User, Tag } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface Asset {
  id: number
  name: string
  category: string
  description: string
  serialNumber: string
  condition: string
  status: string
  location: string
  assignedTo: string
  purchaseDate: string
  purchaseCost: number | string
  notes: string
}

const EMPTY_FORM = {
  name: "", category: "Electronics & IT", description: "", serialNumber: "", condition: "good", status: "in-use", location: "", assignedTo: "", purchaseDate: "", purchaseCost: "", notes: "",
}

const STATUS_STYLES: Record<string, string> = {
  "in-use": "bg-blue-100 text-blue-700",
  "in-stock": "bg-green-100 text-green-700",
  maintenance: "bg-amber-100 text-amber-700",
  disposed: "bg-gray-200 text-gray-500",
}

export default function ErpAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
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

  const fetchAssets = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      if (statusFilter) params.set("status", statusFilter)
      const response = await fetch(`/api/admin/erp/assets?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setAssets(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
        setTotalValue(result.totalValue || 0)
      }
    } catch (error) {
      console.error("Failed to fetch assets", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchAssets(page, debouncedSearch)
  }, [fetchAssets, page, debouncedSearch, statusFilter])

  const openAddForm = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setShowForm(true)
  }

  const openEditForm = (a: Asset) => {
    setEditingId(a.id)
    setFormData({
      name: a.name,
      category: a.category || "Electronics & IT",
      description: a.description || "",
      serialNumber: a.serialNumber || "",
      condition: a.condition || "good",
      status: a.status || "in-use",
      location: a.location || "",
      assignedTo: a.assignedTo || "",
      purchaseDate: a.purchaseDate ? String(a.purchaseDate).slice(0, 10) : "",
      purchaseCost: a.purchaseCost ? String(a.purchaseCost) : "",
      notes: a.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this asset?")) return
    try {
      const res = await fetch(`/api/admin/erp/assets/${id}`, { method: "DELETE" })
      if (res.ok) fetchAssets(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Asset name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/assets/${editingId}` : "/api/admin/erp/assets", {
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
      fetchAssets(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save asset")
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
            <h1 className="text-2xl font-light text-primary mb-1">Assets</h1>
            <p className="text-sm text-muted-foreground">Track equipment, vehicles and office assets.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Asset</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Asset" : "Add New Asset"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Asset Name *</label>
                  <input className={inputCls} placeholder="e.g. Laptop, Projector, Van" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {ERP_CONSTANTS.ASSET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Serial Number</label>
                  <input className={inputCls} placeholder="Serial / ID no." value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Condition</label>
                  <select className={inputCls} value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })}>
                    {ERP_CONSTANTS.ASSET_CONDITIONS.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {ERP_CONSTANTS.ASSET_STATUSES.map((s) => <option key={s} value={s}>{s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Location</label>
                  <input className={inputCls} placeholder="Office / site / room" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Assigned To</label>
                  <input className={inputCls} placeholder="Person / department" value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Purchase Date</label>
                  <input type="date" className={inputCls} value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Purchase Cost</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Amount" value={formData.purchaseCost} onChange={(e) => setFormData({ ...formData, purchaseCost: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Description</label>
                  <textarea className={inputCls} rows={2} placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Asset" : "Create Asset"}
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
                placeholder="Search by name, serial, assignment..."
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
              {ERP_CONSTANTS.ASSET_STATUSES.map((s) => (
                <option key={s} value={s}>{s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>
              ))}
            </select>
          </div>
          <div className="bg-white border rounded-md px-4 py-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total value</p>
            <p className="text-lg font-bold text-primary">{formatINR(totalValue)}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading assets...</p>
          </div>
        ) : assets.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No assets found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Location / Assignment</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Condition</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Cost</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assets.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.category} {a.serialNumber ? `· ${a.serialNumber}` : ""}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="flex items-center gap-1.5 text-xs"><MapPin className="h-3 w-3" /> {a.location || "—"}</p>
                        <p className="flex items-center gap-1.5 text-xs mt-1"><User className="h-3 w-3" /> {a.assignedTo || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs bg-gray-100 rounded px-2 py-1 capitalize">{a.condition}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[a.status] || "bg-gray-200 text-gray-500"}`}>
                          {a.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell font-medium">{a.purchaseCost ? formatINR(a.purchaseCost) : "—"}</td>
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
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="assets" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}