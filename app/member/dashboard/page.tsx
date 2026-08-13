"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Loader2, UserRound, LogOut, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface MemberData {
  id: number
  applicationType: string
  name: string
  gender: string
  registrationNo: string
  course: string
  age: number
  mobileNo: string
  whatsappNo: string
  emailId: string
  religion: string
  address: string
  status: string
  createdAt: string
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
}

export default function MemberDashboardPage() {
  const router = useRouter()
  const [member, setMember] = useState<MemberData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch("/api/member/me")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to load member data")
        }

        setMember(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load member data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMember()
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded max-w-md w-full text-center">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  const rows = member
    ? [
        { label: "Name", value: member.name },
        { label: "Application Type", value: member.applicationType === "membership" ? "Membership" : "Leadership" },
        { label: "Email", value: member.emailId },
        { label: "Mobile", value: member.mobileNo },
        { label: "WhatsApp", value: member.whatsappNo },
        { label: "Registration No.", value: member.registrationNo },
        { label: "Course", value: member.course },
        { label: "Gender", value: member.gender },
        { label: "Age", value: member.age?.toString() },
        { label: "Religion", value: member.religion },
        { label: "Address", value: member.address },
        { label: "Applied On", value: new Date(member.createdAt).toLocaleDateString() },
      ]
    : []

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-background pt-32 lg:pt-36">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-primary/10">
                  <UserRound className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-light text-primary">Member Dashboard</h1>
                  <p className="text-muted-foreground font-extralight">Welcome, {member?.name}!</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium capitalize ${
                    statusStyles[member?.status || "pending"] || statusStyles.pending
                  }`}
                >
                  {member?.status || "pending"}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="rounded-md border-primary text-primary hover:bg-primary/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/60">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-light text-primary">Application Details</h2>
              </div>

              <div className="bg-white border border-primary/10 rounded-md overflow-hidden">
                <dl className="divide-y divide-gray-100">
                  {rows.map((row) => (
                    <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 px-6 py-4">
                      <dt className="sm:w-48 shrink-0 text-sm font-medium text-muted-foreground">{row.label}</dt>
                      <dd className="text-sm">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button variant="outline" className="w-full sm:w-auto rounded-md border-primary text-primary hover:bg-primary/10">
                    Submit Another Application
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full sm:w-auto rounded-md bg-primary hover:bg-primary/90 text-white">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}