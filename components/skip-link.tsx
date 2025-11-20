"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function SkipLink() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleFocus = () => setShow(true)
    const handleBlur = () => setShow(false)

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Skip to main content
    </Link>
  )
}
