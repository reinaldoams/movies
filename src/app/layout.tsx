import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BottomNavBar from '../components/BottomNavBar'
import { MoviesListContextProvider } from '@/context/MoviesListContext'

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
    <MoviesListContextProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <BottomNavBar />
        </body>
      </html>
    </MoviesListContextProvider>
  )
}
