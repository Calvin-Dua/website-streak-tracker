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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#080810' }}>
        {children}
      </body>
    </html>
  )
}