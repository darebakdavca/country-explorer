import { useEffect, useState } from "react"

export function useScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => {
      setHasScrolled(window.scrollY > 0)
    }

    updateScrolled()

    window.addEventListener("scroll", updateScrolled, { passive: true })

    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  return { hasScrolled }
}
