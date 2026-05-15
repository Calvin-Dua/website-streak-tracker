import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Streakly — Track your daily website habits',
  description: 'Build consistency by tracking how often you visit websites daily. Maintain streaks, visualize progress, build lasting habits.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: '#080810' }}>
        {children}
      </body>
    </html>
  )
}