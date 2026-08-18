"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AdminLayout from "@/components/admin/admin-layout"
import { Loader2, Heart, Users, Wallet, TrendingUp, TrendingDown, ArrowRight, Clock, HandHeart, Boxes, Package, AlertTriangle, Building2, CalendarCheck, Accessibility, HandCoins } from "lucide-react"
import { formatINR } from "@/lib/format"

interface Stats {
  donorCount: number
  donationCount: number
  totalDonations: number
  totalBudget: number
  totalExpenses: number
  netBalance: number
  utilizationRate: number
  byFund: { fund: string; total: number }[]
  recentDonations: { id: number; donorName: string; amount: number; donationDate: string; fund: string; mode: string }[]
  recentExpenses: { id: number; description: string; amount: number; expenseDate: string; fund: string; category: string }[]
  activeVolunteers: number
  totalVolunteerHours: number
  recentActivities: { id: number; volunteerName: string; program: string; activityType: string; hours: number; activityDate: string }[]
  assetCount: number
  totalAssetValue: number
  totalInventoryValue: number
  lowStockCount: number
  activeStaff: number
  totalStaffSalary: number
  pendingLeaveRequests: number
  recentLeave: { id: number; staffName: string; leaveType: string; startDate: string; endDate: string; status: string }[]
  beneficiaryCount: number
  activeBeneficiaries: number
  totalServiceValue: number
  serviceCount: number
  recentBeneficiaries: { id: number; fullName: string; category: string; program: string; status: string; city: string }[]
  recentServices: { id: number; beneficiaryName: string; serviceType: string; description: string; amount: number; serviceDate: string }[]
}

export default function ErpDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/erp/stats")
        if (res.ok) {
          setStats(await res.json())
        }
      } catch (err) {
        console.error("Failed to fetch ERP stats", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <AdminLayout>
        <main className="px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading ERP dashboard...</p>
          </div>
        </main>
      </AdminLayout>
    )
  }

  const cards = [
    { label: "Donors", value: stats?.donorCount ?? 0, icon: Users, color: "bg-blue-50 text-blue-600", href: "/admin/erp/donors" },
    { label: "Total Donations", value: formatINR(stats?.totalDonations ?? 0), icon: Heart, color: "bg-green-50 text-green-600", href: "/admin/erp/donations" },
    { label: "Total Expenses", value: formatINR(stats?.totalExpenses ?? 0), icon: Wallet, color: "bg-red-50 text-red-600", href: "/admin/erp/expenses" },
    { label: "Net Balance", value: formatINR(stats?.netBalance ?? 0), icon: TrendingUp, color: "bg-purple-50 text-purple-600", href: "/admin/erp/budgets" },
    { label: "Active Volunteers", value: stats?.activeVolunteers ?? 0, icon: HandHeart, color: "bg-amber-50 text-amber-600", href: "/admin/erp/volunteers" },
    { label: "Volunteer Hours", value: `${(stats?.totalVolunteerHours ?? 0).toFixed(1)}h`, icon: Clock, color: "bg-teal-50 text-teal-600", href: "/admin/erp/volunteer-activities" },
    { label: "Assets", value: stats?.assetCount ?? 0, icon: Boxes, color: "bg-indigo-50 text-indigo-600", href: "/admin/erp/assets" },
    { label: "Low Stock", value: stats?.lowStockCount ?? 0, icon: AlertTriangle, color: "bg-orange-50 text-orange-600", href: "/admin/erp/inventory" },
    { label: "Active Staff", value: stats?.activeStaff ?? 0, icon: Building2, color: "bg-cyan-50 text-cyan-600", href: "/admin/erp/staff" },
    { label: "Pending Leave", value: stats?.pendingLeaveRequests ?? 0, icon: CalendarCheck, color: "bg-rose-50 text-rose-600", href: "/admin/erp/leave-requests" },
    { label: "Beneficiaries", value: stats?.activeBeneficiaries ?? 0, icon: Accessibility, color: "bg-emerald-50 text-emerald-600", href: "/admin/erp/beneficiaries" },
    { label: "Service Value", value: formatINR(stats?.totalServiceValue ?? 0), icon: HandCoins, color: "bg-sky-50 text-sky-600", href: "/admin/erp/beneficiary-services" },
  ]

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">ERP Dashboard</h1>
            <p className="text-sm text-muted-foreground">Donor management, donations and fund accounting for YESJ.</p>
          </div>
          <Link href="/admin/erp/budgets" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Budget vs Utilization <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link key={card.label} href={card.href} className="bg-white border rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-md ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{card.label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">{card.value}</p>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border rounded-md shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Donations by Fund</h2>
            {stats?.byFund?.length ? (
              <div className="space-y-3">
                {stats.byFund.slice(0, 8).map((f) => (
                  <div key={f.fund} className="flex items-center gap-3">
                    <span className="w-36 truncate text-sm text-muted-foreground">{f.fund}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${stats.totalDonations > 0 ? Math.max(3, (f.total / stats.totalDonations) * 100) : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-28 text-right">{formatINR(f.total)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
            )}
          </div>

          <div className="bg-white border rounded-md shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Budget Utilization</h2>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-3xl font-black ${(stats?.utilizationRate ?? 0) > 90 ? "text-red-500" : "text-primary"}`}>
                {stats?.utilizationRate ?? 0}%
              </span>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Budget: {formatINR(stats?.totalBudget ?? 0)}</span>
                  <span>Spent: {formatINR(stats?.totalExpenses ?? 0)}</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${(stats?.utilizationRate ?? 0) > 90 ? "bg-red-500" : "bg-primary"}`}
                    style={{ width: `${Math.min(100, stats?.utilizationRate ?? 0)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm ${(stats?.netBalance ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {(stats?.netBalance ?? 0) >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {formatINR(stats?.netBalance ?? 0)} available across all funds
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Donations</h2>
              <Link href="/admin/erp/donations" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentDonations?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentDonations.map((d) => (
                  <li key={d.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{d.donorName || "Unknown donor"}</p>
                      <p className="text-xs text-muted-foreground">{d.fund} · {new Date(d.donationDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">+{formatINR(d.amount)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
            )}
          </div>

          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Expenses</h2>
              <Link href="/admin/erp/expenses" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentExpenses?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentExpenses.map((e) => (
                  <li key={e.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{e.description}</p>
                      <p className="text-xs text-muted-foreground">{e.fund} · {new Date(e.expenseDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-bold text-red-600">-{formatINR(e.amount)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No expenses recorded yet.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Volunteer Activity</h2>
              <Link href="/admin/erp/volunteer-activities" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentActivities?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentActivities.map((a) => (
                  <li key={a.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{a.volunteerName || "Unknown volunteer"}</p>
                      <p className="text-xs text-muted-foreground">{[a.program, a.activityType].filter(Boolean).join(" · ") || "General"} · {new Date(a.activityDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{Number(a.hours).toFixed(1)}h</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No volunteer activity logged yet.</p>
            )}
          </div>

          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Volunteers</h2>
              <Link href="/admin/erp/volunteers" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-50 border rounded-lg p-5 text-center">
                <p className="text-3xl font-black text-primary">{stats?.activeVolunteers ?? 0}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Active</p>
              </div>
              <div className="flex-1 bg-gray-50 border rounded-lg p-5 text-center">
                <p className="text-3xl font-black text-teal-600">{Number(stats?.totalVolunteerHours ?? 0).toFixed(1)}h</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total Hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Leave Requests</h2>
              <Link href="/admin/erp/leave-requests" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentLeave?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentLeave.map((l) => (
                  <li key={l.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{l.staffName || "Unknown staff"}</p>
                      <p className="text-xs text-muted-foreground capitalize">{l.leaveType} · {l.startDate ? new Date(l.startDate).toLocaleDateString() : "—"} → {l.endDate ? new Date(l.endDate).toLocaleDateString() : "—"}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      l.status === "approved" ? "bg-green-100 text-green-700" : l.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {l.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No leave requests yet.</p>
            )}
          </div>

          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Staff</h2>
              <Link href="/admin/erp/staff" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-50 border rounded-lg p-5 text-center">
                <p className="text-3xl font-black text-primary">{stats?.activeStaff ?? 0}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Active Staff</p>
              </div>
              <div className="flex-1 bg-gray-50 border rounded-lg p-5 text-center">
                <p className="text-3xl font-black text-cyan-600">{formatINR(stats?.totalStaffSalary ?? 0)}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Monthly Payroll</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Beneficiaries</h2>
              <Link href="/admin/erp/beneficiaries" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentBeneficiaries?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentBeneficiaries.map((b) => (
                  <li key={b.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{b.fullName}</p>
                      <p className="text-xs text-muted-foreground">{[b.category, b.program].filter(Boolean).join(" · ") || "General"}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      b.status === "active" ? "bg-green-100 text-green-700" : b.status === "inactive" ? "bg-gray-200 text-gray-600" : b.status === "graduated" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                    }`}>
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No beneficiaries enrolled yet.</p>
            )}
          </div>

          <div className="bg-white border rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Beneficiary Services</h2>
              <Link href="/admin/erp/beneficiary-services" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {stats?.recentServices?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentServices.map((s) => (
                  <li key={s.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{s.beneficiaryName || "Unknown beneficiary"}</p>
                      <p className="text-xs text-muted-foreground">{s.serviceType} · {s.serviceDate ? new Date(s.serviceDate).toLocaleDateString() : "—"}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">{s.amount ? formatINR(s.amount) : "—"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No services logged yet.</p>
            )}
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}