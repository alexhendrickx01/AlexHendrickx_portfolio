'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/internship', label: 'Stage' },
  { href: '/projects',   label: 'Projects' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const activeLabel = links.find((l) => l.href === pathname)?.label ?? 'Portfolio'

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`border-b-2 transition-colors duration-300 ${
          scrolled || open
            ? 'border-[#2D3748] bg-[#0F1117]/95 backdrop-blur-md'
            : 'border-[#2D3748]/40 bg-[#0F1117]/70 backdrop-blur-md'
        }`}
      >
        {/* 3-column grid: left-gutter | max-w-7xl | right-gutter
            The border-right of the left cell and border-left of the right cell
            land exactly on the container edges, text sits outside. */}
        <nav
          className="grid h-14 w-full items-stretch"
          style={{ gridTemplateColumns: '1fr minmax(0, 80rem) 1fr' }}
        >
          {/* Left gutter AH, border-right = container left edge */}
          <div className="flex items-stretch justify-end border-r-2 border-[#2D3748]">
            <Link
              href="/"
              className="flex items-center px-5 text-sm font-bold text-[#6366F1] transition-colors hover:bg-[#6366F1]/10"
            >
              AH
            </Link>
          </div>

          {/* Center nav links */}
          <div className="flex items-stretch">
            <ul className="hidden md:flex items-stretch">
              {links.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <li key={href} className="flex items-stretch">
                    <Link
                      href={href}
                      className={`relative flex items-center border-l-2 px-6 text-sm font-semibold transition-colors ${
                        active
                          ? 'border-[#6366F1] bg-[#6366F1]/15 text-[#F1F5F9]'
                          : 'border-transparent text-[#94A3B8] hover:bg-[#1A1D27] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-block"
                          className="absolute inset-0 border-l-2 border-[#6366F1] bg-[#6366F1]/15"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="ml-auto flex items-center border-l-2 border-[#2D3748] px-5 text-[#94A3B8] transition-colors hover:bg-[#1A1D27] hover:text-[#F1F5F9] md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Right gutter page indicator, border-left = container right edge */}
          <div className="hidden md:flex items-center border-l-2 border-[#2D3748] pl-5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#6366F1]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                {activeLabel}
              </span>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="border-b-2 border-[#2D3748] bg-[#0F1117]/98 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col divide-y-2 divide-[#2D3748]">
              {links.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-[#6366F1]/10 text-[#6366F1]'
                          : 'text-[#94A3B8] hover:bg-[#1A1D27] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {active && <span className="h-1.5 w-1.5 bg-[#6366F1]" />}
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
