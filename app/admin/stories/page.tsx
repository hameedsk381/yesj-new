"use client"

import { useEffect, useState, useCallback } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminPagination from "@/components/admin/admin-pagination"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { isRemoteImage } from "@/lib/utils"

interface Story {
  id: number
  title: string
  slug: string
  excerpt: string
  author: string
  category: string
  imagePath: string | null
  featured: boolean
  createdAt: string
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [search])

  const fetchStories = useCallback(async (currentPage = page, searchVal = debouncedSearch) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "24",
      })
      if (searchVal) params.set("search", searchVal)

      const res = await fetch(`/api/admin/stories?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        const data = Array.isArray(result) ? result : (result.data || [])
        const pagination = result.pagination || { total: data.length, totalPages: 1 }
        setStories(data)
        setTotalItems(pagination.total)
        setTotalPages(pagination.totalPages)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchStories(page, debouncedSearch)
  }, [fetchStories, page, debouncedSearch])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this story?")) return
    try {
      const res = await fetch(`/api/admin/stories/${id}`, { method: "DELETE" })
      if (res.ok) fetchStories(page, debouncedSearch)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdminLayout>
      <main className="px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-light text-primary mb-1">Stories &amp; Journal</h1>
            <p className="text-sm text-muted-foreground">Manage news, articles, and youth transformation stories.</p>
          </div>
          <Button asChild className="bg-primary text-white">
            <Link href="/admin/stories/new"><Plus className="h-4 w-4 mr-2" /> New Story</Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stories by title, author, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-white outline-none focus:border-primary transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24 bg-white border border-primary/10 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.length === 0 ? (
                <div className="col-span-full text-center py-20 text-muted-foreground border-2 border-dashed rounded-md bg-gray-50 text-sm">
                  No stories found. Create your first one!
                </div>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      {story.imagePath ? (
                        <Image src={story.imagePath} alt={story.title} fill className="object-cover" unoptimized={isRemoteImage(story.imagePath)} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon className="h-10 w-10" />
                        </div>
                      )}
                      {story.featured && (
                        <div className="absolute top-2 right-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-widest">{story.category}</div>
                      <h3 className="font-bold line-clamp-2 h-12 leading-tight text-foreground">{story.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10">{story.excerpt}</p>
                      <div className="pt-4 flex items-center justify-between border-t">
                        <div className="text-xs text-muted-foreground">{new Date(story.createdAt).toLocaleDateString()}</div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                            <Link href={`/admin/stories/${story.id}`}><Pencil className="h-4 w-4" /></Link>
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(story.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={24}
              onPageChange={(newPage) => setPage(newPage)}
              itemName="stories"
            />
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
