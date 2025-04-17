import './globals.css';
import type { Metadata } from 'next';

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
      <body >
          {children}
      </body>
    </html>
  )
}
