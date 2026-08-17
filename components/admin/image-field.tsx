"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Upload, FolderOpen, Loader2, ImageIcon } from "lucide-react"

const ImagePicker = dynamic(
  () => import("./image-picker").then((m) => m.ImagePicker),
  { ssr: false }
)

interface ImageFieldProps {
  value?: string
  onChange: (url: string) => void
  prefix?: string
  label?: string
  hint?: string
}

export function ImageField({ value, onChange, prefix = "website", label = "Image", hint }: ImageFieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", prefix || "website")
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (res.ok) {
        const data = await res.json()
        if (data.url) onChange(data.url)
        else alert("Upload failed")
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
        {hint && <span className="text-[11px] text-muted-foreground/70">{hint}</span>}
      </div>

      <div className="flex items-start gap-3">
        <div className="relative w-32 h-24 rounded-lg overflow-hidden border bg-muted shrink-0">
          {value ? (
            <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => setPickerOpen(true)}>
            <FolderOpen className="h-4 w-4 mr-2" /> Choose Existing
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
            Upload New
          </Button>
          {value && (
            <Button type="button" size="sm" variant="ghost" className="text-red-600" onClick={() => onChange("")}>
              Remove
            </Button>
          )}
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

      {pickerOpen && (
        <ImagePicker
          title={`Select ${label.replace(/:$/, "").toLowerCase()}`}
          prefix={prefix}
          currentValue={value}
          onSelect={(url) => { onChange(url); setPickerOpen(false) }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}