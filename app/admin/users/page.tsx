"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Shield, Loader2, Search } from "lucide-react"

interface User {
  id: number
  fullName: string
  email: string
  isActive: boolean
  isSuperuser: boolean
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ fullName: "", email: "", password: "", isSuperuser: false })
  const [submitting, setSubmitting] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchUsers = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "25",
      })
      if (searchVal) params.set("search", searchVal)

      const res = await fetch(`/api/admin/users?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setUsers(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (err) {
      console.error("Failed to fetch users", err)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchUsers(page, debouncedSearch)
  }, [fetchUsers, page, debouncedSearch])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.password) {
      alert("All fields required")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create user")
      }
      setShowForm(false)
      setForm({ fullName: "", email: "", password: "", isSuperuser: false })
      fetchUsers(page, debouncedSearch)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      if (res.ok) fetchUsers(page, debouncedSearch)
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const toggleActive = async (user: User) => {
    const nextActive = !user.isActive
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, isActive: nextActive } : u))
    )

    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      })
    } catch {
      fetchUsers(page, debouncedSearch)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Users &amp; Roles</h1>
            <p className="text-sm text-muted-foreground">Manage administrative and staff accounts with system access.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" /> {showForm ? "Cancel" : "Add User"}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white border rounded-md shadow-sm max-w-lg">
            <h2 className="text-lg font-bold mb-4">Create Admin User</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                className="w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                placeholder="Full Name"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <input
                type="email"
                className="w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="password"
                className="w-full border p-2.5 rounded-md text-sm outline-none focus:border-primary"
                placeholder="Password (min 8 characters)"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isSuperuser}
                  onChange={(e) => setForm({ ...form, isSuperuser: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 font-medium">Admin (superuser privileges)</span>
              </label>
              <Button type="submit" disabled={submitting} className="w-full h-11 bg-primary text-white text-sm font-semibold">
                {submitting ? "Creating..." : "Create User"}
              </Button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center bg-white border rounded-md text-muted-foreground text-sm">
            No users found.
          </div>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-right p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-sm text-foreground">{user.fullName}</td>
                      <td className="p-4 text-sm text-gray-600">{user.email}</td>
                      <td className="p-4">
                        {user.isSuperuser ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            <Shield className="h-3 w-3" /> Admin
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Staff
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleActive(user)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={25}
              onPageChange={(newPage) => setPage(newPage)}
              itemName="users"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
