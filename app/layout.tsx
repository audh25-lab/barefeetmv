export const metadata = {
  title: "BarefeetMV",
  description: "BarefeetMV"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}