"use client"

export default function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-maroon"></div>
        <p className="text-sm text-muted-foreground font-extralight">Loading registration form...</p>
      </div>
    </div>
  )
}
