"use client"

import { ReactNode, useState } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Menu } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center gap-3 border-b bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-lg font-light text-primary">YESJ Admin</span>
        </div>
        {children}
      </div>
    </div>
  )
}
