import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

// Load local Arabic font

export const metadata: Metadata = {
  title: "STC - الشركة السعودية للاتصالات",
  description: "الموقع الرسمي للشركة السعودية للاتصالات",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`min-h-screen bg-background antialiased font-sans`}>
          {children}
      </body>
    </html>
  )
}


import './globals.css'