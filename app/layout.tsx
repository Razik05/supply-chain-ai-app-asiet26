import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Supply Chain AI',
  description: 'Real-time AI-powered supply chain management and disruption detection',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
