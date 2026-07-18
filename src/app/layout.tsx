import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MetroTec CMS',
  description: 'Content Management System for MetroTec IT Solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
