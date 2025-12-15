"use client"

import { useEffect } from "react"
import { generateIcon } from "../lib/iconEngine"
import { injectFontStyle } from "../lib/fontEngine"
import { applyTheme } from "../lib/themeEngine"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    generateIcon()
    injectFontStyle()
    applyTheme()
  }, [])

  return (
    <html lang="en">
      <body>
        <header>
          <a href="/">BarefeetMV 👣</a>
          <nav>
            <a href="/play">Play</a>
            <a href="/safety">Safety</a>
          </nav>
        </header>

        {children}

        <footer>
          Safe for kids • No ads • No tracking
        </footer>
      </body>
    </html>
  )
}