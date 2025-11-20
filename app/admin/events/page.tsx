"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  createdAt: string
}

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      // Placeholder for actual API call
      // In a real implementation, this would fetch from /api/admin/events
      const mockEvents: Event[] = [
        {
          id: 1,
          title: "Summer Shapes 2024",
          description: "30-day residential training program",
          date: "2024-06-15",
          location: "Hyderabad",
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Leadership Workshop",
          description: "Developing future leaders",
          date: "2024-07-20",
          location: "Vijayawada",
          createdAt: "2024-02-10T14:20:00Z"
        }
      ]
      
      setEvents(mockEvents)
      setIsLoading(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load events")
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      // Placeholder for actual API call
      // In a real implementation, this would call DELETE /api/admin/events?id={id}
      setEvents(events.filter(event => event.id !== id))
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete event")
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
            <h1 className="text-xl font-light text-primary">Events</h1>
          </div>
          <Button className="rounded-none bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
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
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No events found
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{event.title}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{event.description}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">{event.location}</td>
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
                            onClick={() => handleDelete(event.id)}
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
          Total: {events.length} event{events.length !== 1 ? "s" : ""}
        </div>
      </main>
    </AdminLayout>
  )
}