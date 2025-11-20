"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, User } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  createdAt: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      // Placeholder for actual API call
      // In a real implementation, this would fetch from /api/admin/team
      const mockMembers: TeamMember[] = [
        {
          id: 1,
          name: "John Doe",
          role: "Executive Director",
          bio: "Leading YESJ with passion and vision",
          imageUrl: "/assets/team/john-doe.jpg",
          socialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe"
          },
          createdAt: "2023-01-15T10:30:00Z"
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "Program Manager",
          bio: "Managing all our youth programs",
          imageUrl: "/assets/team/jane-smith.jpg",
          socialLinks: {
            instagram: "https://instagram.com/janesmith"
          },
          createdAt: "2023-03-20T14:20:00Z"
        }
      ]
      
      setTeamMembers(mockMembers)
      setIsLoading(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load team members")
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      // Placeholder for actual API call
      // In a real implementation, this would call DELETE /api/admin/team?id={id}
      setTeamMembers(teamMembers.filter(member => member.id !== id))
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete team member")
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    )
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
            <h1 className="text-xl font-light text-primary">Team</h1>
          </div>
          <Button className="rounded-none bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-primary/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bio
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No team members found
                    </td>
                  </tr>
                ) : (
                  teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">{member.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{member.role}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{member.bio}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 rounded-none"
                            title="Edit"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(member.id)}
                            className="h-7 px-2 rounded-none"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Total: {teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""}
        </div>
      </main>
    </AdminLayout>
  )
}