'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ToggleTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme("light")}>
        Light
      </button>
      <button onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button onClick={() => setTheme("system")}>
        System
      </button>
    </div>
  )
}
