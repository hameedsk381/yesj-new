"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import {
  Users,
  Mail,
  FileText,
  Calendar,
  Image,
  Newspaper,
  UserPlus,
  Loader2
} from "lucide-react"
import Link from "next/link"

const QUICK_ACTIONS = [
  { label: "View Registrations", href: "/admin/registrations", icon: Users },
  { label: "View Nominations", href: "/admin/nominations", icon: FileText },
  { label: "View Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Newsletter List", href: "/admin/newsletter", icon: Newspaper },
  { label: "Manage Events", href: "/admin/events", icon: Calendar },
  { label: "Gallery Management", href: "/admin/gallery", icon: Image },
  { label: "Team Members", href: "/admin/team", icon: UserPlus },
  { label: "Manage Stories", href: "/admin/stories", icon: FileText },
]

export default function AdminDashboard() {
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
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, registrationsListRes, contactsListRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/registrations?limit=5"),
        fetch("/api/admin/contacts?limit=5")
      ])

      if (statsRes.ok) {
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
      }

      if (registrationsListRes.ok) {
        const registrationsList = await registrationsListRes.json()
        const recentRegs = Array.isArray(registrationsList) 
          ? registrationsList 
          : (registrationsList.data || [])
        setRecentRegistrations(recentRegs.slice(0, 5))
      }

      if (contactsListRes.ok) {
        const contactsList = await contactsListRes.json()
        const recentConts = Array.isArray(contactsList) 
          ? contactsList 
          : (contactsList.data || [])
        setRecentContacts(recentConts.slice(0, 5))
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const statsCards = [
    { label: "Total Registrations", value: stats.registrations.toString(), icon: Users, color: "text-blue-600" },
    { label: "Total Nominations", value: stats.nominations.toString(), icon: FileText, color: "text-green-600" },
    { label: "Contact Messages", value: stats.contacts.toString(), icon: Mail, color: "text-purple-600" },
    { label: "Newsletter Subscribers", value: stats.newsletters.toString(), icon: Newspaper, color: "text-orange-600" },
    { label: "Events", value: stats.events.toString(), icon: Calendar, color: "text-red-600" },
    { label: "Gallery Items", value: stats.gallery.toString(), icon: Image, color: "text-yellow-600" },
    { label: "Team Members", value: stats.team.toString(), icon: UserPlus, color: "text-indigo-600" },
    { label: "Journal Stories", value: stats.stories.toString(), icon: FileText, color: "text-pink-600" },
  ]

  return (
    <AdminLayout>
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-primary mb-1">Dashboard</h1>
          <p className="text-muted-foreground font-extralight">
            Welcome back! Here&apos;s an overview of YESJ activity.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading dashboard analytics...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statsCards.map((stat, index) => {
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

            <div className="bg-white border border-primary/10 rounded-md p-6 mb-8">
              <h3 className="text-lg font-light text-primary mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {QUICK_ACTIONS.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="flex items-center gap-3 p-4 border border-primary/10 rounded hover:bg-blue-50 hover:border-primary/30 transition-all"
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-light text-sm">{action.label}</span>
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
                    <p className="text-sm text-muted-foreground text-center py-6">No registrations yet</p>
                  ) : (
                    recentRegistrations.map((reg) => (
                      <div key={reg.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm text-foreground">{reg.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{reg.application_type || reg.applicationType || "General"}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {reg.created_at || reg.createdAt ? new Date(reg.created_at || reg.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <Link href="/admin/registrations" className="text-sm text-primary hover:underline mt-4 inline-block font-medium">
                  View all registrations →
                </Link>
              </div>

              <div className="bg-white border border-primary/10 rounded-md p-6">
                <h3 className="text-lg font-light text-primary mb-4">Recent Contact Messages</h3>
                <div className="space-y-4">
                  {recentContacts.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">No messages yet</p>
                  ) : (
                    recentContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm text-foreground">{contact.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{contact.subject || "No subject"}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${contact.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {contact.status || "unread"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <Link href="/admin/contacts" className="text-sm text-primary hover:underline mt-4 inline-block font-medium">
                  View all messages →
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}