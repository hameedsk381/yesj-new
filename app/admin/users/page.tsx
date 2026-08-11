"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Shield, ShieldOff } from "lucide-react"

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

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) setUsers(await res.json())
    } catch (err) {
      console.error("Failed to fetch users", err)
    } finally {
      setIsLoading(false)
    }
  }

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
        throw new Error(data.error || "Failed to create")
      }
      setShowForm(false)
      setForm({ fullName: "", email: "", password: "", isSuperuser: false })
      fetchUsers()
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
      if (res.ok) fetchUsers()
      else alert("Failed to delete")
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const toggleActive = async (user: User) => {
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    })
    fetchUsers()
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-light text-primary">Users</h1>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" /> {showForm ? "Cancel" : "Add User"}
          </Button>
        </div>
        {showForm && (
          <div className="mb-8 p-6 bg-white border rounded-md shadow-sm max-w-lg">
            <h2 className="text-lg font-bold mb-4">New User</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input className="w-full border p-2 rounded" placeholder="Full Name" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
              <input type="email" className="w-full border p-2 rounded" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input type="password" className="w-full border p-2 rounded" placeholder="Password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isSuperuser} onChange={e => setForm({...form, isSuperuser: e.target.checked})} className="rounded" />
                <span className="text-sm">Admin (superuser)</span>
              </label>
              <Button type="submit" disabled={submitting} className="w-full bg-primary text-white">
                {submitting ? "Creating..." : "Create User"}
              </Button>
            </form>
          </div>
        )}

        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <div className="bg-white border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Role</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{user.fullName}</td>
                    <td className="p-4 text-sm text-gray-500">{user.email}</td>
                    <td className="p-4">
                      {user.isSuperuser ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Shield className="h-3 w-3" /> Admin</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Staff</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button onClick={() => toggleActive(user)} className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
