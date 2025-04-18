import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

// Load local Arabic font

export const metadata: Metadata = {
  title: "STC - الشركة الكويتية للاتصالات",
  description: "الموقع الرسمي للشركة الكويتية للاتصالات",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body className={`min-h-screen bg-background antialiased font-sans`}>
          {children}
      </body>
    </html>
  )
}


import './globals.css'