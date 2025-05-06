import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { GoogleTagManager } from "@next/third-parties/google"

// Load local Arabic font

export const metadata: Metadata = {
  title: "STC - الشركة الكويتية للاتصالات",
  description: "الموقع الرسمي للشركة الكويتية للاتصالات",
  keywords:"  عروض stc مسبقة الدفع,  عروض stc,  باقات stc,  باقات stc مسبقة الدفع,  باقات stc إنترنت مسبقة الدفع,  عروض اس تي سي,  اقساط stc,  شحن stc,  باقات اس تي سي,  باقات stc إنترنت,  انترنت stc,  stc مسبق الدفع,  دفع فواتير,  عروض stc نت,  شحن اس تي سي,  باقات انترنت stc,  خدماتي stc,  دفع فاتورة النت,  شركة الاتصالات السعودية,  عروض انترنت stc,  كويك نت stc,  عروض النت stc,  راوتر stc,  مسبق الدفع stc,stc prepaid offers, stc offers, stc packages, stc prepaid packages, stc prepaid internet packages, stc offers, stc installments, stc recharge, stc packages, stc internet packages, stc internet, stc prepaid, bill payment, stc net offers, stc recharge, stc internet packages, my stc services, internet bill payment, Saudi Telecom Company, stc internet offers, stc quicknet, stc internet offers, stc router, stc prepaid  ",  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
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
          <GoogleTagManager gtmId="AW-17053649156" />
      </body>
    </html>
  )
}


import './globals.css'
