import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'primereact-theme'
const DEFAULT_THEME = 'lara-light-blue'

const THEMES = {
  'lara-light-blue': 'https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css',
  'lara-dark-blue': 'https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css',
}

export type ThemeName = keyof typeof THEMES

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return (stored && stored in THEMES ? stored : DEFAULT_THEME) as ThemeName
  })

  useEffect(() => {
    // Remove existing theme link
    const existingLink = document.getElementById('primereact-theme')
    if (existingLink) {
      existingLink.remove()
    }

    // Add new theme link
    const link = document.createElement('link')
    link.id = 'primereact-theme'
    link.rel = 'stylesheet'
    link.href = THEMES[theme]
    document.head.appendChild(link)

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme: setThemeState, themes: Object.keys(THEMES) as ThemeName[] }
}
