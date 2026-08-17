"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Download, Check, Trash2, Loader2, Search } from "lucide-react"

interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: Date
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
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

  const fetchContacts = useCallback(async (currentPage: number = page, searchVal: string = debouncedSearch) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
      })
      if (searchVal) params.set("search", searchVal)

      const response = await fetch(`/api/admin/contacts?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch contacts")
      }

      const data = Array.isArray(result) ? result : (result.data || [])
      const pagination = result.pagination || { total: data.length, totalPages: 1 }

      const mappedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        status: item.status || "unread",
        createdAt: new Date(item.created_at || item.createdAt),
      }))

      setContacts(mappedData)
      setTotalItems(pagination.total)
      setTotalPages(pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchContacts(page, debouncedSearch)
  }, [fetchContacts, page, debouncedSearch])

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      )
      if (selectedContact?.id === id) {
        setSelectedContact((prev) => prev ? { ...prev, status } : null)
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact?")) return

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete contact")

      setSelectedContact(null)
      fetchContacts(page, debouncedSearch)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete contact")
    }
  }

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Subject", "Message", "Status", "Date"]
    const rows = contacts.map((contact) => [
      `"${contact.name.replace(/"/g, '""')}"`,
      `"${contact.email.replace(/"/g, '""')}"`,
      `"${(contact.subject || "").replace(/"/g, '""')}"`,
      `"${contact.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${contact.status}"`,
      `"${new Date(contact.createdAt).toLocaleDateString()}"`,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Contact Messages</h1>
            <p className="text-sm text-muted-foreground">Manage and respond to community inquiries.</p>
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="rounded-md"
            disabled={contacts.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Page CSV
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading messages...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-primary/10 rounded-md overflow-hidden flex flex-col">
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="font-medium text-primary text-sm">Messages List</h2>
                <span className="text-xs text-muted-foreground">Total: {totalItems}</span>
              </div>
              <div className="divide-y max-h-[calc(100vh-18rem)] overflow-y-auto flex-1">
                {contacts.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground text-sm">
                    No contact messages found.
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?.id === contact.id ? "bg-blue-50/70" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <p className="font-medium text-sm text-foreground">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-medium rounded-full ${
                            contact.status === "replied"
                              ? "bg-green-100 text-green-700"
                              : contact.status === "read"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1 truncate text-gray-800">{contact.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{contact.message}</p>
                      <p className="text-[11px] text-muted-foreground/70 mt-2">
                        {contact.createdAt.toLocaleDateString()} at {contact.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <AdminPagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={20}
                onPageChange={(newPage) => setPage(newPage)}
                itemName="messages"
              />
            </div>

            <div className="bg-white border border-primary/10 rounded-md overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-medium text-primary text-sm">Message Details</h2>
              </div>
              <div className="p-6">
                {selectedContact ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Name</label>
                      <p className="text-sm mt-0.5 font-medium">{selectedContact.name}</p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</label>
                      <p className="text-sm mt-0.5">
                        <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline font-medium">
                          {selectedContact.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                      <p className="text-sm mt-0.5 font-medium">{selectedContact.subject}</p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Message</label>
                      <p className="text-sm mt-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-md border text-gray-700 leading-relaxed">
                        {selectedContact.message}
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Received At</label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedContact.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      {selectedContact.status !== "read" && (
                        <Button
                          onClick={() => handleStatusChange(selectedContact.id, "read")}
                          size="sm"
                          className="flex-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      {selectedContact.status === "read" && (
                        <Button
                          onClick={() => handleStatusChange(selectedContact.id, "unread")}
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-md"
                        >
                          Mark as Unread
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(selectedContact.id)}
                        variant="destructive"
                        size="sm"
                        className="rounded-md"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-20 text-sm">
                    Select a message from the list to view full details and take action.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
