import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local"

// Load local Arabic font
const tajawal = localFont({
  src: [
    {
      path: "../public/fonts/Tajawal-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Tajawal-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "STC - الشركة السعودية للاتصالات",
  description: "الموقع الرسمي للشركة السعودية للاتصالات",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`min-h-screen bg-background antialiased ${tajawal.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'