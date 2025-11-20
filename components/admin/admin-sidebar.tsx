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
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Registrations", href: "/admin/registrations", icon: Users },
  { name: "Nominations", href: "/admin/nominations", icon: FileText },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Newsletter", href: "/admin/newsletter", icon: Newspaper },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "Team", href: "/admin/team", icon: UserPlus },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="flex flex-col h-full border-r bg-white">
      <div className="p-6 border-b">
        <h2 className="text-xl font-light text-primary">YESJ Admin</h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
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
          className="w-full rounded-none border-primary text-primary hover:bg-primary/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}