"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "YESJ - Youth Empowering Service Jesuits",
    siteDescription: "Empowering 50,000+ youth across Telugu states to break barriers and build futures",
    contactEmail: "contact@yesj.in",
    contactPhone: "+91 9876543210",
    address: "Jesuit Social Centre, Hyderabad, Telangana",
    socialLinks: {
      facebook: "https://facebook.com/yesj",
      twitter: "https://twitter.com/yesj",
      instagram: "https://instagram.com/yesj",
      linkedin: "https://linkedin.com/company/yesj"
    }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialLinkChange = (platform: keyof SiteSettings['socialLinks'], value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    
    try {
      // Placeholder for actual API call
      // In a real implementation, this would POST to /api/admin/settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-light text-primary">Settings</h1>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-none bg-primary hover:bg-primary/90 text-white"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-primary/10 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-light text-primary mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-light text-primary mb-6">Social Media Links</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.socialLinks.facebook || ''}
                  onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  className="mt-1"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={settings.socialLinks.twitter || ''}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  className="mt-1"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.socialLinks.instagram || ''}
                  onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  className="mt-1"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={settings.socialLinks.linkedin || ''}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  className="mt-1"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </div>
          
          {saveSuccess && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
              Settings saved successfully!
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  )
}