"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2, Search, Upload, X, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePickerProps {
  onSelect: (url: string) => void
  onClose: () => void
  currentValue?: string
  prefix?: string
  allowUpload?: boolean
  title?: string
}

const FOLDERS = ["", "website", "programs", "events", "gallery", "team", "stories", "courses", "uploads"]

export function ImagePicker({ onSelect, onClose, currentValue, prefix, allowUpload = true, title }: ImagePickerProps) {
  const [folder, setFolder] = useState(prefix || "")
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [images, setImages] = useState<{ name: string; url: string }[]>([])
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 300ms debounce for search query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(handler)
  }, [query])

  const load = useCallback(async (pageToken?: string, replace = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (folder) params.set("prefix", folder)
      if (debouncedQuery) params.set("q", debouncedQuery)
      if (pageToken) params.set("pageToken", pageToken)

      const res = await fetch(`/api/admin/images?${params.toString()}`)
      if (!res.ok) return
      const data = await res.json()
      const files: { name: string; url: string }[] = data.files || []
      setImages((prev) => (replace ? files : [...prev, ...files]))
      setNextToken(data.nextPageToken || null)
    } catch (error) {
      console.error("Failed to load images", error)
    } finally {
      setLoading(false)
    }
  }, [folder, debouncedQuery])

  useEffect(() => {
    setImages([])
    setNextToken(null)
    load(undefined, true)
  }, [folder, debouncedQuery, load])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", folder || "website")
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (res.ok) {
        const data = await res.json()
        if (data.url) {
          onSelect(data.url)
          onClose()
          return
        }
      }
      alert("Upload failed")
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" /> {title || "Select Existing Image"}
          </h3>
          <div className="flex items-center gap-2">
            {allowUpload && (
              <Button size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-primary text-white">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload New
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onClose}>
              <X className="h-4 w-4" /> Close
            </Button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-b space-y-3 shrink-0">
          <div className="flex flex-wrap gap-2">
            {FOLDERS.map((f) => (
              <button
                key={f || "all"}
                onClick={() => setFolder(f)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                  folder === f ? "bg-primary text-white border-primary" : "bg-white text-gray-500 border-gray-200 hover:border-primary/50"
                )}
              >
                {f === "" ? "All" : f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search image name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && images.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : images.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="font-bold">No images found in this folder.</p>
              <p className="text-sm mt-1">Upload one or pick a different folder.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => onSelect(img.url)}
                    title={img.name}
                    className={cn(
                      "group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all",
                      currentValue === img.url ? "border-primary ring-2 ring-primary/40" : "border-transparent hover:border-primary"
                    )}
                  >
                    <Image src={img.url} alt={img.name} fill className="object-cover" unoptimized />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-[10px] text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.name.split("/").pop()}
                    </div>
                  </button>
                ))}
              </div>

              {nextToken && (
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => load(nextToken)} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}