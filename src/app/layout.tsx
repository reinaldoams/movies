import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BottomNavBar from './Components/BottomNavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Website listing movies from movies database api',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <BottomNavBar />
      </body>
    </html>
  )
}
