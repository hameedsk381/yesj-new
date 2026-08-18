"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, 
  Users, 
  FileText, 
  Mail, 
  LogOut,
  Settings,
  Newspaper,
  Image,
  Calendar,
  UserPlus,
  Briefcase,
  Layers,
  Home,
  Info,
  GraduationCap,
  Shield,
  X,
  HeartHandshake,
  Wallet,
  PiggyBank,
  Receipt,
  FolderKanban,
  Clock,
  Boxes,
  Package,
  Building2,
  CalendarCheck,
  CalendarDays,
  Accessibility,
  HandCoins
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Homepage", href: "/admin/homepage", icon: Home },
  { name: "About Page", href: "/admin/about", icon: Info },
  { name: "Programmes", href: "/admin/programs", icon: Briefcase },
  { name: "Registrations", href: "/admin/registrations", icon: Users },
  { name: "Nominations", href: "/admin/nominations", icon: FileText },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Newsletter", href: "/admin/newsletter", icon: Newspaper },
  { name: "Echoes", href: "/admin/echoes", icon: Layers },
  { name: "Stories", href: "/admin/stories", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "Courses", href: "/admin/courses", icon: GraduationCap },
  { name: "ERP", href: "/admin/erp/dashboard", icon: FolderKanban },
  { name: "ERP · Donors", href: "/admin/erp/donors", icon: HeartHandshake },
  { name: "ERP · Donations", href: "/admin/erp/donations", icon: PiggyBank },
  { name: "ERP · Budgets", href: "/admin/erp/budgets", icon: Wallet },
  { name: "ERP · Expenses", href: "/admin/erp/expenses", icon: Receipt },
  { name: "ERP · Volunteers", href: "/admin/erp/volunteers", icon: HeartHandshake },
  { name: "ERP · Vol. Activities", href: "/admin/erp/volunteer-activities", icon: Clock },
  { name: "ERP · Assets", href: "/admin/erp/assets", icon: Boxes },
  { name: "ERP · Inventory", href: "/admin/erp/inventory", icon: Package },
  { name: "ERP · Staff", href: "/admin/erp/staff", icon: Building2 },
  { name: "ERP · Attendance", href: "/admin/erp/attendance", icon: CalendarCheck },
  { name: "ERP · Leave", href: "/admin/erp/leave-requests", icon: CalendarDays },
  { name: "ERP · Beneficiaries", href: "/admin/erp/beneficiaries", icon: Accessibility },
  { name: "ERP · Services", href: "/admin/erp/beneficiary-services", icon: HandCoins },
  { name: "Users", href: "/admin/users", icon: Shield },
  { name: "Team", href: "/admin/team", icon: UserPlus },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  onNavigate?: () => void
}

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-light text-primary">YESJ Admin</h2>
        <button
          onClick={onNavigate}
          aria-label="Close navigation menu"
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-light transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full rounded-md border-primary text-primary hover:bg-primary/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
