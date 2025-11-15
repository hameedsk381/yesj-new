import { useEffect } from "react"

export function useFormPersistence<T>(
  key: string,
  formData: T,
  enabled: boolean = true
) {


  useEffect(() => {
    if (!enabled) return

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(formData))
      } catch (error) {
        console.error("Failed to save form data:", error)
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [key, formData, enabled])

  const clearSavedData = () => {
    localStorage.removeItem(key)
  }

  return { clearSavedData }
}

export function getSavedFormData<T>(key: string): T | null {
  if (typeof window === "undefined") return null

  try {
    const savedData = localStorage.getItem(key)
    if (savedData) {
      return JSON.parse(savedData)
    }
  } catch (error) {
    console.error("Failed to get saved form data:", error)
  }
  return null
}
