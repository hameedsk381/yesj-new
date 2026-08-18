"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, AlertTriangle } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number | string
  unit: string
  minQuantity: number | string
  unitCost: number | string
  supplier: string
  location: string
  notes: string
}

const EMPTY_FORM = {
  name: "", category: "Stationery", quantity: "", unit: "pieces", minQuantity: "", unitCost: "", supplier: "", location: "", notes: "",
}

export default function ErpInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [lowStockCount, setLowStockCount] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [lowStockFilter, setLowStockFilter] = useState(false)
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
      if (lowStockFilter) params.set("lowStock", "true")
      const response = await fetch(`/api/admin/erp/inventory?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setItems(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
        setTotalValue(result.totalValue || 0)
        setLowStockCount(result.lowStockCount || 0)
      }
    } catch (error) {
      console.error("Failed to fetch inventory", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch, lowStockFilter])

  useEffect(() => {
    fetchItems(page, debouncedSearch)
  }, [fetchItems, page, debouncedSearch, lowStockFilter])

  const openAddForm = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setShowForm(true)
  }

  const openEditForm = (item: InventoryItem) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      category: item.category || "Stationery",
      quantity: item.quantity !== null && item.quantity !== undefined ? String(item.quantity) : "",
      unit: item.unit || "pieces",
      minQuantity: item.minQuantity !== null && item.minQuantity !== undefined ? String(item.minQuantity) : "",
      unitCost: item.unitCost !== null && item.unitCost !== undefined ? String(item.unitCost) : "",
      supplier: item.supplier || "",
      location: item.location || "",
      notes: item.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this inventory item?")) return
    try {
      const res = await fetch(`/api/admin/erp/inventory/${id}`, { method: "DELETE" })
      if (res.ok) fetchItems(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Item name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/inventory/${editingId}` : "/api/admin/erp/inventory", {
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
      alert(error.message || "Failed to save item")
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
            <h1 className="text-2xl font-light text-primary mb-1">Inventory</h1>
            <p className="text-sm text-muted-foreground">Manage stock levels and suppliers.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Item</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Item" : "Add Inventory Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Item Name *</label>
                  <input className={inputCls} placeholder="e.g. A4 Paper, T-shirts, Banners" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {ERP_CONSTANTS.INVENTORY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Unit</label>
                  <select className={inputCls} value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })}>
                    {ERP_CONSTANTS.INVENTORY_UNITS.map((u) => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Quantity</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Current stock" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Min. Quantity (reorder alert)</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Alert below" value={formData.minQuantity} onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Unit Cost</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Cost per unit" value={formData.unitCost} onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Supplier</label>
                  <input className={inputCls} placeholder="Supplier name" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Location</label>
                  <input className={inputCls} placeholder="Store room / rack" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Item" : "Add Item"}
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
                placeholder="Search by name, supplier, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={() => { setLowStockFilter(!lowStockFilter); setPage(1) }}
              className={`inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-md border transition-colors ${lowStockFilter ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-gray-200 text-muted-foreground"}`}
            >
              <AlertTriangle className="h-4 w-4" />
              Low stock {lowStockCount > 0 ? `(${lowStockCount})` : ""}
            </button>
          </div>
          <div className="bg-white border rounded-md px-4 py-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Stock value</p>
            <p className="text-lg font-bold text-primary">{formatINR(totalValue)}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading inventory...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No inventory items found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Item</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium text-right">Quantity</th>
                    <th className="px-4 py-3 font-medium text-right hidden lg:table-cell">Unit Cost</th>
                    <th className="px-4 py-3 font-medium text-right hidden xl:table-cell">Value</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Supplier</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const qty = Number(item.quantity)
                    const min = Number(item.minQuantity)
                    const isLow = qty < min
                    return (
                      <tr key={item.id} className={`hover:bg-gray-50 ${isLow ? "bg-amber-50/50" : ""}`}>
                        <td className="px-4 py-3">
                          <p className="font-medium">{item.name}</p>
                          {isLow && (
                            <p className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase mt-0.5">
                              <AlertTriangle className="h-3 w-3" /> Low stock
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs bg-gray-100 rounded px-2 py-1">{item.category}</span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold">
                          {qty} <span className="text-xs font-normal text-muted-foreground">{item.unit}</span>
                        </td>
                        <td className="px-4 py-3 text-right hidden lg:table-cell text-muted-foreground">{item.unitCost ? formatINR(item.unitCost) : "—"}</td>
                        <td className="px-4 py-3 text-right hidden xl:table-cell font-medium">{item.unitCost ? formatINR(qty * Number(item.unitCost)) : "—"}</td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{item.supplier || "—"}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button onClick={() => openEditForm(item)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="inventory items" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}