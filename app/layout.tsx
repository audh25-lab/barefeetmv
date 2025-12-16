import "./globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Theme bootstrap (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const saved = localStorage.getItem("theme")
                  const prefersDark =
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                  const theme = saved || (prefersDark ? "dark" : "light")
                  document.documentElement.dataset.theme = theme
                } catch {}
              })()
            `
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}