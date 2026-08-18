"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"
import { formatINR } from "@/lib/format"

interface Expense {
  id: number
  budgetId: number | null
  fund: string
  category: string
  description: string
  amount: number | string
  expenseDate: string
  paidTo: string
  paymentMode: string
  billNumber: string
  notes: string
}

const EMPTY_FORM: { budgetId: string; fund: string; category: string; description: string; amount: string; expenseDate: string; paidTo: string; paymentMode: string; billNumber: string; notes: string } = {
  budgetId: "", fund: "General", category: ERP_CONSTANTS.BUDGET_CATEGORIES[0], description: "", amount: "", expenseDate: "", paidTo: "", paymentMode: "cash", billNumber: "", notes: "",
}

export default function ErpExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
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

  const fetchExpenses = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      const response = await fetch(`/api/admin/erp/expenses?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setExpenses(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
        setTotalAmount(result.totalAmount || 0)
      }
    } catch (error) {
      console.error("Failed to fetch expenses", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchExpenses(page, debouncedSearch)
  }, [fetchExpenses, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    const today = new Date().toISOString().slice(0, 10)
    setFormData({ ...EMPTY_FORM, expenseDate: today })
    setShowForm(true)
  }

  const openEditForm = (expense: Expense) => {
    setEditingId(expense.id)
    setFormData({
      budgetId: expense.budgetId ? String(expense.budgetId) : "",
      fund: expense.fund,
      category: expense.category,
      description: expense.description,
      amount: String(expense.amount),
      expenseDate: expense.expenseDate ? String(expense.expenseDate).slice(0, 10) : "",
      paidTo: expense.paidTo || "",
      paymentMode: expense.paymentMode || "cash",
      billNumber: expense.billNumber || "",
      notes: expense.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this expense?")) return
    try {
      const res = await fetch(`/api/admin/erp/expenses/${id}`, { method: "DELETE" })
      if (res.ok) fetchExpenses(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.description.trim() || !formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Description and a positive amount are required")
      return
    }
    if (!formData.expenseDate) {
      alert("Expense date is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/expenses/${editingId}` : "/api/admin/erp/expenses", {
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
      fetchExpenses(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save expense")
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
            <h1 className="text-2xl font-light text-primary mb-1">Expenses</h1>
            <p className="text-sm text-muted-foreground">Record program and administrative expenditures.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Expense</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Expense" : "Add New Expense"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Description *</label>
                  <input className={inputCls} placeholder="What was this for?" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Amount *</label>
                  <input type="number" step="0.01" min="0" className={inputCls} placeholder="Amount" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Date *</label>
                  <input type="date" className={inputCls} required value={formData.expenseDate} onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Fund</label>
                  <select className={inputCls} value={formData.fund} onChange={(e) => setFormData({ ...formData, fund: e.target.value })}>
                    {ERP_CONSTANTS.FUNDS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select className={inputCls} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {ERP_CONSTANTS.BUDGET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Paid To</label>
                  <input className={inputCls} placeholder="Vendor / payee" value={formData.paidTo} onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Payment Mode</label>
                  <select className={inputCls} value={formData.paymentMode} onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}>
                    {ERP_CONSTANTS.EXPENSE_PAYMENT_MODES.map((m) => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Bill Number</label>
                  <input className={inputCls} placeholder="Bill / invoice no." value={formData.billNumber} onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Expense" : "Add Expense"}
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by description, payee, bill no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="bg-white border rounded-md px-4 py-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total spent</p>
            <p className="text-lg font-bold text-red-600">{formatINR(totalAmount)}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading expenses...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No expenses recorded yet.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Fund</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Payee</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">{e.expenseDate ? new Date(e.expenseDate).toLocaleDateString() : "—"}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{e.description}</p>
                        {e.billNumber && <p className="text-xs text-muted-foreground">Bill: {e.billNumber}</p>}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs bg-gray-100 rounded px-2 py-1">{e.fund}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{e.category}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{e.paidTo || "—"}</td>
                      <td className="px-4 py-3 text-right font-bold text-red-600">-{formatINR(e.amount)}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(e)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="expenses" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}