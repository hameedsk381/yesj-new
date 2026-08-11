"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import {
  Users,
  Mail,
  FileText,
  Calendar,
  Image,
  Newspaper,
  UserPlus,
  BarChart3,
  TrendingUp,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    registrations: 0,
    nominations: 0,
    contacts: 0,
    newsletters: 0,
    events: 0,
    gallery: 0,
    team: 0,
    stories: 0
  })
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([])
  const [recentContacts, setRecentContacts] = useState<any[]>([])

  useEffect(() => {
    // No need to check localStorage - middleware handles authentication
    // Just fetch dashboard data
    fetchDashboardData()
    setIsLoading(false)
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch aggregated stats from backend
      const statsRes = await fetch("/api/admin/dashboard")
      const statsData = await statsRes.json()

      const dashboardData = statsData.data || {}

      setStats({
        registrations: dashboardData.registrations || 0,
        nominations: dashboardData.nominations || 0,
        contacts: dashboardData.contacts || 0,
        newsletters: dashboardData.newsletters || 0,
        events: dashboardData.events || 0,
        gallery: dashboardData.gallery || 0,
        team: dashboardData.team || 0,
        stories: dashboardData.stories || 0
      })

      // Fetch recent items (limit via backend query param if supported, else slice)
      // Note: Backend default limit is 100, we slice here.
      const [registrationsListRes, contactsListRes] = await Promise.all([
        fetch("/api/admin/registrations?limit=5"),
        fetch("/api/admin/contacts?limit=5")
      ])

      const registrationsList = await registrationsListRes.json()
      const contactsList = await contactsListRes.json()

      // Handle if response is array (Active Backend) vs object (Legacy)
      const recentRegs = Array.isArray(registrationsList) ? registrationsList : (registrationsList.data || [])
      const recentConts = Array.isArray(contactsList) ? contactsList : (contactsList.data || [])

      setRecentRegistrations(recentRegs.slice(0, 5))
      setRecentContacts(recentConts.slice(0, 5))

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    }
  }

  const handleLogout = async () => {
    // Call logout API to clear cookie
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const statsData = [
    { label: "Total Registrations", value: stats.registrations.toString(), icon: Users, color: "text-blue-600" },
    { label: "Total Nominations", value: stats.nominations.toString(), icon: FileText, color: "text-green-600" },
    { label: "Contact Messages", value: stats.contacts.toString(), icon: Mail, color: "text-purple-600" },
    { label: "Newsletter Subscribers", value: stats.newsletters.toString(), icon: Newspaper, color: "text-orange-600" },
    { label: "Events", value: stats.events.toString(), icon: Calendar, color: "text-red-600" },
    { label: "Gallery Items", value: stats.gallery.toString(), icon: Image, color: "text-yellow-600" },
    { label: "Team Members", value: stats.team.toString(), icon: UserPlus, color: "text-indigo-600" },
    { label: "Journal Stories", value: stats.stories.toString(), icon: FileText, color: "text-pink-600" },
  ]

  const quickActions = [
    { label: "View Registrations", href: "/admin/registrations", icon: Users },
    { label: "View Nominations", href: "/admin/nominations", icon: FileText },
    { label: "View Contacts", href: "/admin/contacts", icon: Mail },
    { label: "Newsletter List", href: "/admin/newsletter", icon: Newspaper },
    { label: "Manage Events", href: "/admin/events", icon: Calendar },
    { label: "Gallery Management", href: "/admin/gallery", icon: Image },
    { label: "Team Members", href: "/admin/team", icon: UserPlus },
    { label: "Manage Stories", href: "/admin/stories", icon: FileText },
  ]

  return (
    <AdminLayout>
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-primary mb-1">Dashboard</h1>
          <p className="text-muted-foreground font-extralight">
            Welcome back! Here's what's happening with YESJ.
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white border border-primary/10 rounded-md p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-light text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-extralight">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-primary/10 rounded-md p-6 lg:col-span-2">
              <h3 className="text-lg font-light text-primary mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 py-2">
                  <div className="mt-1 p-2 bg-blue-100 rounded-md">
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-light">New registration received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <div className="mt-1 p-2 bg-green-100 rounded-md">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-light">New contact message</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <div className="mt-1 p-2 bg-purple-100 rounded-md">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-light">Nomination submitted</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <div className="mt-1 p-2 bg-orange-100 rounded-md">
                    <Newspaper className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-light">Newsletter subscription</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-primary/10 rounded-md p-6">
              <h3 className="text-lg font-light text-primary mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-muted-foreground">Pending Registrations</span>
                  <span className="font-light">12</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-muted-foreground">Unread Messages</span>
                  <span className="font-light">5</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-muted-foreground">Pending Nominations</span>
                  <span className="font-light">3</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">New Subscribers</span>
                  <span className="font-light">8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-primary/10 rounded-md p-6 mb-8">
            <h3 className="text-lg font-light text-primary mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center gap-3 p-4 border border-primary/10 rounded hover:bg-blue-50 hover:border-primary/30 transition-all"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-light">{action.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-primary/10 rounded-md p-6">
              <h3 className="text-lg font-light text-primary mb-4">Recent Registrations</h3>
              <div className="space-y-4">
                {recentRegistrations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No registrations yet</p>
                ) : (
                  recentRegistrations.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-light">{reg.name}</p>
                        <p className="text-sm text-muted-foreground font-extralight capitalize">{reg.application_type || reg.applicationType}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reg.created_at || reg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <Link href="/admin/registrations" className="text-sm text-primary hover:underline mt-4 inline-block">
                View all registrations →
              </Link>
            </div>

            <div className="bg-white border border-primary/10 rounded-md p-6">
              <h3 className="text-lg font-light text-primary mb-4">Recent Contact Messages</h3>
              <div className="space-y-4">
                {recentContacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No messages yet</p>
                ) : (
                  recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-light">{contact.name}</p>
                        <p className="text-sm text-muted-foreground font-extralight truncate max-w-[200px]">{contact.subject}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${contact.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {contact.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <Link href="/admin/contacts" className="text-sm text-primary hover:underline mt-4 inline-block">
                View all messages →
              </Link>
            </div>
          </div>
      </main>
    </AdminLayout>
  )
}