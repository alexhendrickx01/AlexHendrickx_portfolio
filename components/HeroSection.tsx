'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [chevronVisible, setChevronVisible] = useState(true)

  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 120], [1, 0])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !headingRef.current) return

    gsap.registerPlugin(ScrollTrigger, SplitText)

    const split = new SplitText(headingRef.current, { type: 'chars' })

    gsap.fromTo(
      split.chars,
      { y: 60, rotateX: -90, opacity: 0 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.02,
        delay: 0.3,
        onComplete: () => split.revert(),
      }
    )

    return () => {
      split.revert()
    }
  }, [])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setChevronVisible(v < 80))
    return unsub
  }, [scrollY])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0F1117]"
    >
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] animate-pulse rounded-full bg-[#6366F1] opacity-[0.08] blur-[120px]" />
        <div
          className="absolute -bottom-32 -right-32 h-[500px] w-[500px] animate-pulse rounded-full bg-[#22D3EE] opacity-[0.07] blur-[120px]"
          style={{ animationDelay: '1000ms' }}
        />
      </div>

      {/* Spotlights */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#6366F1" />
      <Spotlight className="top-10 right-0 md:right-60" fill="#22D3EE" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-4 py-1.5 text-xs font-medium text-[#6366F1]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] animate-pulse" />
          Graduation Portfolio 2025
        </motion.div>

        {/* Main heading — GSAP SplitText animates this */}
        <h1
          ref={headingRef}
          className="text-6xl font-bold tracking-tight text-[#F1F5F9] md:text-8xl [perspective:800px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Alex Hendrickx
        </h1>

        {/* Subheading — gradient */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-xl font-medium text-transparent md:text-2xl"
        >
          Bachelor Informatica · Thomas More
        </motion.p>

        {/* Body + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="max-w-md text-base text-[#94A3B8]">
            Dit portfolio toont mijn groei, stage-ervaring en projecten als
            afstuderende student informatica.
          </p>

          <Link href="/internship">
            <ShimmerButton>Bekijk mijn stage →</ShimmerButton>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-[#94A3B8]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
