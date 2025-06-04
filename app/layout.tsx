import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "69 Boutique Hotel - Booking Engine",
  description: "Mobile-first hotel booking experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="max-w-md mx-auto bg-white min-h-screen">{children}</div>
      </body>
    </html>
  )
}
