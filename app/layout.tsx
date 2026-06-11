import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import LenisProvider from '@/components/LenisProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Alex Hendrickx | Portfolio',
  description: 'Graduation portfolio — Bachelor Informatica, Thomas More',
  icons: {
    icon: [{ url: '/alex-hendrickx-logo.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-full bg-[#0F1117] text-[#F1F5F9]">
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <BackToTop />
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  )
}
