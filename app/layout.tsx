import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2nd Brain - Command Center',
  description: 'Monitor all Associate work and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-slate-200">{children}</body>
    </html>
  )
}
