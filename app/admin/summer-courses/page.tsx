"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, CreditCard, User, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface SummerRegistration {
  id: number
  studentName: string
  parentName: string
  email: string
  phone: string
  age: number
  courseId: string
  courseTitle: string
  batch: string
  paymentMode: string
  amount: number
  razorpayOrderId: string
  razorpayPaymentId: string
  paymentStatus: string
  createdAt: string
}

export default function SummerCoursesAdminPage() {
  const [registrations, setRegistrations] = useState<SummerRegistration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/summer-courses")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch registrations")
      }

      setRegistrations(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = [
      "ID", "Student Name", "Parent Name", "Email", "Phone", "Age", 
      "Course", "Batch", "Payment Mode", "Amount", "Order ID", "Payment ID", "Status", "Date"
    ]

    const rows = registrations.map((reg) => [
      reg.id,
      reg.studentName,
      reg.parentName,
      reg.email,
      reg.phone,
      reg.age,
      reg.courseTitle,
      reg.batch,
      reg.paymentMode,
      reg.amount,
      reg.razorpayOrderId,
      reg.razorpayPaymentId || "N/A",
      reg.paymentStatus,
      new Date(reg.createdAt).toLocaleString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `summer-registrations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between h-20 px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-gray-50 rounded-md">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Summer Courses <span className="text-primary italic">2026</span></h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Registration & Payment Tracking</p>
            </div>
          </div>
          <Button
            onClick={exportToCSV}
            className="rounded-md bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-8 py-10">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-md mb-8 flex items-center justify-between">
            <p className="font-medium">{error}</p>
            <Button variant="ghost" onClick={fetchRegistrations} className="text-xs underline">Retry</Button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Students", value: registrations.length, icon: <User className="w-5 h-5" />, color: "text-blue-600 bg-blue-50" },
            { label: "Paid Registrations", value: registrations.filter(r => r.paymentStatus === 'paid').length, icon: <CreditCard className="w-5 h-5" />, color: "text-green-600 bg-green-50" },
            { label: "Pending Payments", value: registrations.filter(r => r.paymentStatus === 'pending').length, icon: <Clock className="w-5 h-5" />, color: "text-orange-600 bg-orange-50" },
            { label: "Total Revenue", value: `₹${registrations.filter(r => r.paymentStatus === 'paid').reduce((acc, curr) => acc + curr.amount, 0)}`, icon: <BookOpen className="w-5 h-5" />, color: "text-primary bg-primary/5" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-md border border-gray-100 shadow-sm flex items-center gap-5">
              <div className={`w-12 h-12 rounded-md flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student / Contact</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Course & Batch</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Info</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <User className="w-10 h-10 text-gray-200" />
                        <p className="text-gray-400 font-medium">No registrations yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <p className="font-bold text-gray-900">{reg.studentName}</p>
                          <p className="text-xs text-gray-500">{reg.email}</p>
                          <p className="text-xs text-gray-400">{reg.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <p className="font-bold text-gray-700">{reg.courseTitle}</p>
                          <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter">
                            {reg.batch === 'batch1' ? '9 AM - 10 AM' : '4 PM - 5 PM'}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <p className="font-black text-primary text-lg">₹{reg.amount}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {reg.paymentMode === 'full' ? 'Full Fee' : 'Advance 50%'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Badge className={`
                          rounded-md px-3 py-1 font-black text-[10px] uppercase tracking-widest
                          ${reg.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                        `}>
                          {reg.paymentStatus}
                        </Badge>
                        {reg.razorpayPaymentId && (
                          <p className="text-[9px] text-gray-400 mt-1.5 font-mono">{reg.razorpayPaymentId}</p>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                        <p className="text-[10px] text-gray-300">{new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}
