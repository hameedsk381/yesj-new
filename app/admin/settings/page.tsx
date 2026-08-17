"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { ImageField } from "@/components/admin/image-field"

type NavItem = { label: string; href: string }
type NavData = {
  headerAboutLinks: NavItem[]
  headerGetInvolvedLinks: NavItem[]
  headerProgramLinks: NavItem[]
  footerProgramLinks: NavItem[]
  footerQuickLinks: NavItem[]
}

const FIELDS = [
  { key: "siteName", label: "Site Name", type: "text" },
  { key: "title", label: "Site Title", type: "text" },
  { key: "description", label: "SEO Description", type: "textarea" },
  { key: "aboutHeroImage", label: "About Page Hero Image", type: "image", folder: "website" },
  { key: "aboutMissionImage", label: "About Page Mission Image", type: "image", folder: "website" },
  { key: "contactHeroImage", label: "Contact Page Hero Image", type: "image", folder: "website" },
  { key: "email", label: "Contact Email", type: "email" },
  { key: "phone", label: "Contact Phone", type: "text" },
  { key: "whatsapp", label: "WhatsApp Number", type: "text" },
  { key: "facebook", label: "Facebook Link", type: "text" },
  { key: "instagram", label: "Instagram Link", type: "text" },
  { key: "linkedin", label: "LinkedIn Link", type: "text" },
  { key: "youtube", label: "YouTube Link", type: "text" },
]

const NAV_SECTIONS: { key: keyof NavData; label: string }[] = [
  { key: "headerAboutLinks", label: "Header — About Links" },
  { key: "headerGetInvolvedLinks", label: "Header — Get Involved Links" },
  { key: "headerProgramLinks", label: "Header — Program Links" },
  { key: "footerProgramLinks", label: "Footer — Program Links" },
  { key: "footerQuickLinks", label: "Footer — Quick Links" },
]

const CONTACT_FIELDS = ["email", "phone", "whatsapp"]
const SOCIAL_FIELDS = ["facebook", "instagram", "linkedin", "youtube"]

function defaultNav(): NavData {
  return {
    headerAboutLinks: [
      { href: "/about#story", label: "Our Story" },
      { href: "/about#philosophy", label: "Our Philosophy" },
      { href: "/about/team", label: "Leadership & Team" },
      { href: "/centre-for-excellence", label: "Centre for Excellence" },
      { href: "/impact#annual-reports", label: "Annual Reports" },
    ],
    headerGetInvolvedLinks: [
      { href: "/volunteer", label: "Volunteer with Us" },
      { href: "/donate", label: "Donate / Support" },
      { href: "/contact", label: "Partner with YES-J" },
      { href: "/get-involved#internship-details", label: "Intern with Us" },
    ],
    headerProgramLinks: [
      { href: "/programs/pep", label: "PEP" },
      { href: "/programs/magic", label: "MAGIC" },
      { href: "/programs/must", label: "MuST" },
      { href: "/programs/summer-shapes", label: "Summer Shapes" },
      { href: "/programs/ssp", label: "SSP" },
      { href: "/programs/joy-desk", label: "JoY Desk" },
      { href: "/programs/vip", label: "VIP" },
      { href: "/programs/compassion-connect", label: "Compassion Connect" },
      { href: "/programs/sthri", label: "STHRI" },
      { href: "/programs/ogod", label: "O GOD" },
      { href: "/programs/magis", label: "MAGIS / Yuvotsavaalu" },
      { href: "/programs/eott", label: "Each One Teach Ten" },
      { href: "/programs/y-hub", label: "Y HUB" },
    ],
    footerProgramLinks: [
      { label: "Summer Shapes", href: "/programs/summer-shapes" },
      { label: "Scholar Support (SSP)", href: "/programs/ssp" },
      { label: "MAGIC Youth", href: "/programs/magic" },
      { label: "Personality Enhancement (PEP)", href: "/programs/pep" },
      { label: "Multi Skilled (MuST)", href: "/programs/must" },
      { label: "JoY Desk", href: "/programs/joy-desk" },
      { label: "Y HUB", href: "/programs/y-hub" },
    ],
    footerQuickLinks: [
      { label: "Our Story", href: "/about" },
      { label: "Programmes", href: "/programs" },
      { label: "Impact & Data", href: "/impact" },
      { label: "Media Hub", href: "/media" },
      { label: "Contact", href: "/contact" },
    ],
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [nav, setNav] = useState<NavData>(defaultNav())
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<"site" | "nav">("site")

  useEffect(() => {
    Promise.all([fetchSettings(), fetchNav()]).finally(() => setIsLoading(false))
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings")
      if (res.ok) {
        const data = await res.json()
        setSettings({
          siteName: data.name || data.siteName || "",
          title: data.title || "",
          description: data.description || "",
          email: data.contact?.email || "",
          phone: data.contact?.phone || "",
          whatsapp: data.contact?.whatsapp || "",
          facebook: data.social?.facebook || "",
          instagram: data.social?.instagram || "",
          linkedin: data.social?.linkedin || "",
          youtube: data.social?.youtube || "",
          aboutHeroImage: data.aboutHeroImage || "",
          aboutMissionImage: data.aboutMissionImage || "",
          contactHeroImage: data.contactHeroImage || "",
        })
      }
    } catch (error) { console.error(error) }
  }

  const fetchNav = async () => {
    try {
      const res = await fetch("/api/nav")
      if (res.ok) {
        const data = await res.json()
        if (data) setNav({ ...defaultNav(), ...data })
      }
    } catch (error) { console.error(error) }
  }

  const buildStorage = async (key: string, value: string): Promise<{ key: string; value: string }> => {
    if (key === "siteName") {
      return { key: "name", value }
    }

    if (CONTACT_FIELDS.includes(key)) {
      const res = await fetch("/api/settings")
      const data = res.ok ? await res.json() : {}
      const contact = { ...(data.contact || {}), [key]: value }
      return { key: "contact", value: JSON.stringify(contact) }
    }

    if (SOCIAL_FIELDS.includes(key)) {
      const res = await fetch("/api/settings")
      const data = res.ok ? await res.json() : {}
      const social = { ...(data.social || {}), [key]: value }
      return { key: "social", value: JSON.stringify(social) }
    }

    return { key, value }
  }

  const handleSave = async (key: string, value: string) => {
    setIsSaving(true)
    setMessage(null)
    try {
      const { key: storageKey, value: storageValue } = await buildStorage(key, value)
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: storageKey, value: storageValue })
      })
      if (res.ok) {
        setMessage({ type: 'success', text: "Saved successfully" })
      } else {
        throw new Error("Failed to save")
      }
    } catch {
      setMessage({ type: 'error', text: "Failed to save" })
    } finally {
      setIsSaving(false)
    }
  }

  const saveNav = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "nav", value: JSON.stringify(nav) })
      })
      if (res.ok) {
        setMessage({ type: 'success', text: "Navigation saved successfully" })
      } else {
        throw new Error("Failed to save")
      }
    } catch {
      setMessage({ type: 'error', text: "Failed to save navigation" })
    } finally {
      setIsSaving(false)
    }
  }

  const addNavItem = (field: keyof NavData) => setNav({ ...nav, [field]: [...nav[field], { label: "", href: "" }] })
  const removeNavItem = (field: keyof NavData, i: number) => {
    const items = [...nav[field]]; items.splice(i, 1); setNav({ ...nav, [field]: items })
  }
  const updateNavItem = (field: keyof NavData, i: number, key: "label" | "href", value: string) => {
    const items = [...nav[field]]; items[i] = { ...items[i], [key]: value }; setNav({ ...nav, [field]: items })
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8 max-w-5xl">
        <h1 className="text-2xl font-light text-primary mb-6">Site Settings</h1>
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-8">
            {message && (
              <div className={`p-4 rounded-md border text-sm ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {message.text}
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 border-b pb-0">
              {[
                { key: "site" as const, label: "Site Info & Contact" },
                { key: "nav" as const, label: "Navigation" },
              ].map(tab => (
                <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Site Info Tab */}
            {activeTab === "site" && (
              <div className="bg-white border rounded-md divide-y shadow-sm">
                {FIELDS.map((field) => (
                  <div key={field.key} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <label className="text-sm font-medium text-gray-700 pt-2">{field.label}</label>
                    <div className="md:col-span-2 space-y-3">
                      {field.type === "textarea" ? (
                        <textarea className="w-full border rounded p-2 min-h-[100px] text-sm outline-none focus:border-primary" value={settings[field.key] || ""} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} />
                      ) : field.type === "image" ? (
                        <div className="space-y-3">
                          <ImageField
                            label={field.label}
                            value={settings[field.key] || ""}
                            prefix={field.folder || "website"}
                            onChange={(url) => {
                              setSettings({ ...settings, [field.key]: url })
                              handleSave(field.key, url)
                            }}
                          />
                        </div>
                      ) : (
                        <input type={field.type} className="w-full border rounded p-2 text-sm outline-none focus:border-primary" value={settings[field.key] || ""} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} />
                      )}
                      {field.type !== "image" && (
                        <Button size="sm" onClick={() => handleSave(field.key, settings[field.key])} disabled={isSaving} className="bg-primary text-white">
                          <Save className="h-4 w-4 mr-2" /> Save {field.label}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Tab */}
            {activeTab === "nav" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Edit the navigation links shown in the header, mega menu, and footer.</p>
                  <Button onClick={saveNav} disabled={isSaving} className="bg-primary text-white">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save All Navigation
                  </Button>
                </div>

                {NAV_SECTIONS.map(section => (
                  <div key={section.key} className="bg-white border rounded-lg p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-sm font-bold uppercase text-gray-500">{section.label}</h3>
                      <Button size="sm" variant="outline" onClick={() => addNavItem(section.key)}>
                        <Plus className="h-3 w-3 mr-1" /> Add Link
                      </Button>
                    </div>
                    {nav[section.key].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input className="flex-1 border rounded p-2 text-sm" placeholder="Label" value={item.label}
                          onChange={e => updateNavItem(section.key, i, "label", e.target.value)} />
                        <input className="flex-1 border rounded p-2 text-sm font-mono" placeholder="/path" value={item.href}
                          onChange={e => updateNavItem(section.key, i, "href", e.target.value)} />
                        <button onClick={() => removeNavItem(section.key, i)} className="text-red-400 hover:text-red-600 p-1" title="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
