"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { ERP_CONSTANTS, currentFiscalYear } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface Budget {
  id: number
  fiscalYear: string
  fund: string
  category: string
  allocated: number | string
  spent: number | string
  remaining: number | string
  notes: string
}

const EMPTY_FORM: { fiscalYear: string; fund: string; category: string; allocated: string; notes: string } = {
  fiscalYear: "", fund: "General", category: ERP_CONSTANTS.BUDGET_CATEGORIES[0], allocated: "", notes: "",
}

export default function ErpBudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
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

  const fetchBudgets = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      const response = await fetch(`/api/admin/erp/budgets?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setBudgets(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch budgets", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchBudgets(page, debouncedSearch)
  }, [fetchBudgets, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({ ...EMPTY_FORM, fiscalYear: currentFiscalYear() })
    setShowForm(true)
  }

  const openEditForm = (budget: Budget) => {
    setEditingId(budget.id)
    setFormData({
      fiscalYear: budget.fiscalYear,
      fund: budget.fund,
      category: budget.category,
      allocated: String(budget.allocated),
      notes: budget.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this budget line?")) return
    try {
      const res = await fetch(`/api/admin/erp/budgets/${id}`, { method: "DELETE" })
      if (res.ok) fetchBudgets(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fiscalYear || !formData.fund || !formData.category) {
      alert("Fiscal year, fund and category are required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/budgets/${editingId}` : "/api/admin/erp/budgets", {
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
      fetchBudgets(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save budget")
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
            <h1 className="text-2xl font-light text-primary mb-1">Budgets</h1>
            <p className="text-sm text-muted-foreground">Plan fund-wise allocations and track utilization.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Budget</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Budget" : "Add Budget Line"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Fiscal Year *</label>
                  <input className={inputCls} placeholder="e.g. 2026-2027" required value={formData.fiscalYear} onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Fund *</label>
                  <select className={inputCls} value={formData.fund} onChange={(e) => setFormData({ ...formData, fund: e.target.value })}>
                    {ERP_CONSTANTS.FUNDS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Category *</label>
                  <select className={inputCls} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {ERP_CONSTANTS.BUDGET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Allocated Amount *</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Amount" required value={formData.allocated} onChange={(e) => setFormData({ ...formData, allocated: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Budget" : "Create Budget"}
              </Button>
            </form>
          </div>
        )}

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by fund or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading budgets...</p>
          </div>
        ) : budgets.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No budgets found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Fiscal Year</th>
                    <th className="px-4 py-3 font-medium">Fund</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium text-right">Allocated</th>
                    <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Spent</th>
                    <th className="px-4 py-3 font-medium text-right hidden lg:table-cell">Remaining</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgets.map((b) => {
                    const spentNum = Number(b.spent)
                    const allocatedNum = Number(b.allocated)
                    const pct = allocatedNum > 0 ? Math.min(100, (spentNum / allocatedNum) * 100) : 0
                    return (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">{b.fiscalYear}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{b.fund}</p>
                          <div className="mt-1 h-1.5 w-28 rounded-full bg-gray-100 overflow-hidden">
                            <div className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs bg-gray-100 rounded px-2 py-1">{b.category}</span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{formatINR(b.allocated)}</td>
                        <td className="px-4 py-3 text-right hidden sm:table-cell text-red-600">{formatINR(b.spent)}</td>
                        <td className={`px-4 py-3 text-right hidden lg:table-cell font-medium ${Number(b.remaining) < 0 ? "text-red-600" : "text-gray-600"}`}>{formatINR(b.remaining)}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button onClick={() => openEditForm(b)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="budgets" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}