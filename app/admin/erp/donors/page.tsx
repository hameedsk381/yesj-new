"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2, Trash2, Loader2, Search, Mail, Phone } from "lucide-react"
import { ERP_CONSTANTS } from "@/lib/erp-constants"

interface Donor {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  donorType: string
  panNumber: string
  source: string
  notes: string
  isActive: boolean
}

const EMPTY_FORM = {
  fullName: "", email: "", phone: "", address: "", donorType: "individual", panNumber: "", source: "", notes: "",
}

export default function ErpDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
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

  const fetchDonors = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), limit: "25" })
      if (searchVal) params.set("search", searchVal)
      const response = await fetch(`/api/admin/erp/donors?${params.toString()}`)
      const result = await response.json()
      if (response.ok) {
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setDonors(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch donors", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchDonors(page, debouncedSearch)
  }, [fetchDonors, page, debouncedSearch])

  const openAddForm = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setShowForm(true)
  }

  const openEditForm = (donor: Donor) => {
    setEditingId(donor.id)
    setFormData({
      fullName: donor.fullName,
      email: donor.email || "",
      phone: donor.phone || "",
      address: donor.address || "",
      donorType: donor.donorType || "individual",
      panNumber: donor.panNumber || "",
      source: donor.source || "",
      notes: donor.notes || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this donor? Their donation history will be kept.")) return
    try {
      const res = await fetch(`/api/admin/erp/donors/${id}`, { method: "DELETE" })
      if (res.ok) fetchDonors(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const toggleActive = async (donor: Donor) => {
    const nextActive = donor.isActive === false
    setDonors((prev) => prev.map((d) => (d.id === donor.id ? { ...d, isActive: nextActive } : d)))
    try {
      await fetch(`/api/admin/erp/donors/${donor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      })
    } catch {
      fetchDonors(page, debouncedSearch)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim()) {
      alert("Donor name is required")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(editingId ? `/api/admin/erp/donors/${editingId}` : "/api/admin/erp/donors", {
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
      fetchDonors(page, debouncedSearch)
    } catch (error: any) {
      alert(error.message || "Failed to save donor")
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
            <h1 className="text-2xl font-light text-primary mb-1">Donors</h1>
            <p className="text-sm text-muted-foreground">Manage individual and institutional donors.</p>
          </div>
          <Button onClick={showForm ? () => setShowForm(false) : openAddForm} className="bg-primary text-white">
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Donor</>}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-md border shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId ? "Edit Donor" : "Add New Donor"}</h2>
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
                  <label className={labelCls}>Donor Type</label>
                  <select className={inputCls} value={formData.donorType} onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}>
                    {ERP_CONSTANTS.DONOR_TYPES.map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>PAN Number</label>
                  <input className={inputCls} placeholder="PAN (optional)" value={formData.panNumber} onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Address</label>
                  <textarea className={inputCls} rows={2} placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Source</label>
                  <input className={inputCls} placeholder="How did you connect? (e.g. event, referral, website)" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea className={inputCls} rows={2} placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-primary text-white text-sm font-semibold shadow-md">
                {isSubmitting ? "Saving..." : editingId ? "Update Donor" : "Create Donor"}
              </Button>
            </form>
          </div>
        )}

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, phone, PAN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading donors...</p>
          </div>
        ) : donors.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">No donors found.</div>
        ) : (
          <>
            <div className="bg-white border rounded-md shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Contact</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Type</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Source</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium">{donor.fullName}</p>
                        {donor.panNumber && <p className="text-xs text-muted-foreground">PAN: {donor.panNumber}</p>}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="flex items-center gap-1.5 text-xs"><Mail className="h-3 w-3" /> {donor.email || "—"}</p>
                        <p className="flex items-center gap-1.5 text-xs mt-1"><Phone className="h-3 w-3" /> {donor.phone || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs capitalize bg-gray-100 rounded px-2 py-1">{donor.donorType}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{donor.source || "—"}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(donor)}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${donor.isActive !== false ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}
                        >
                          {donor.isActive !== false ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => openEditForm(donor)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(donor.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <AdminPagination currentPage={page} totalPages={totalPages} totalItems={totalItems} pageSize={25} onPageChange={setPage} itemName="donors" />
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}