"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

interface GalleryItem {
  id: number
  title: string
  imageUrl: string
  description: string
  category: string
  createdAt: string
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      // Placeholder for actual API call
      // In a real implementation, this would fetch from /api/admin/gallery
      const mockItems: GalleryItem[] = [
        {
          id: 1,
          title: "Summer Shapes 2023",
          imageUrl: "/assets/gallery/summer-shapes-2023.jpg",
          description: "Participants during the training program",
          category: "Programs",
          createdAt: "2023-06-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Leadership Workshop",
          imageUrl: "/assets/gallery/leadership-2023.jpg",
          description: "Group photo from the workshop",
          category: "Events",
          createdAt: "2023-07-20T14:20:00Z"
        }
      ]
      
      setGalleryItems(mockItems)
      setIsLoading(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load gallery items")
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    try {
      // Placeholder for actual API call
      // In a real implementation, this would call DELETE /api/admin/gallery?id={id}
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete gallery item")
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
            <h1 className="text-xl font-light text-primary">Gallery</h1>
          </div>
          <Button className="rounded-none bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
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
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {galleryItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No gallery items found
                    </td>
                  </tr>
                ) : (
                  galleryItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{item.description}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {item.category}
                        </span>
                      </td>
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
                            onClick={() => handleDelete(item.id)}
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
          Total: {galleryItems.length} item{galleryItems.length !== 1 ? "s" : ""}
        </div>
      </main>
    </AdminLayout>
  )
}