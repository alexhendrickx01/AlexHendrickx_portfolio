'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Download, ExternalLink } from 'lucide-react'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { BlurFade } from '@/components/ui/blur-fade'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const documents = [
  {
    title: 'Projectplan',
    description: 'Het plan van aanpak voor de stageopdracht.',
    href: '/documents/projectplan.pdf',
  },
  {
    title: 'Realisatiedocument',
    description: 'De volledige uitwerking van de stageopdracht (thesis).',
    href: '/documents/realisatie.pdf',
  },
  {
    title: 'Reflectie',
    description: 'Persoonlijke reflectie op het stageproces.',
    href: '/documents/reflectie.pdf',
  },
]

const techStack = [
  '[TECH_1]',
  '[TECH_2]',
  '[TECH_3]',
  '[TECH_4]',
]

export default function InternshipSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      titleRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <main>
      {/* ── Header with beams ── */}
      <section className="relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden bg-[#0F1117] px-6 pt-24 pb-16 text-center">
        <BackgroundBeams />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <BlurFade delay={0.1}>
            <span className="inline-flex items-center rounded-full border border-[#2D3748] bg-[#1A1D27] px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
              IO
            </span>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1
              ref={titleRef}
              className="text-4xl font-bold text-[#F1F5F9] md:text-6xl"
            >
              Stage
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="max-w-xl text-lg text-[#94A3B8]">
              [STAGE_TITEL]
            </p>
          </BlurFade>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col gap-16">

        {/* ── Summary ── */}
        <section>
          <BlurFade delay={0} inView>
            <h2 className="mb-6 border-l-4 border-[#6366F1] pl-4 text-2xl font-bold text-[#F1F5F9]">
              Overzicht
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="leading-relaxed text-[#94A3B8]">
              [STAGE_SAMENVATTING — schrijf hier 3–5 zinnen in verleden tijd: wat heb je gedaan,
              welk probleem loste je op, welke technologieën gebruikte je, wat was het resultaat.]
            </p>
          </BlurFade>

          {/* Tech badges */}
          <BlurFade delay={0.2} inView>
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#2D3748] bg-[#1A1D27] px-3 py-1 text-xs font-medium text-[#94A3B8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BlurFade>
        </section>

        {/* ── Documents ── */}
        <section>
          <BlurFade delay={0} inView>
            <h2 className="mb-8 flex items-center gap-3 border-l-4 border-[#6366F1] pl-4 text-2xl font-bold text-[#F1F5F9]">
              <FileText size={22} className="text-[#6366F1]" />
              Documenten
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {documents.map((doc, i) => (
              <BlurFade key={doc.title} delay={i * 0.1} inView>
                <motion.div
                  whileHover={{ borderColor: 'rgba(99,102,241,0.5)', boxShadow: '0 0 20px rgba(99,102,241,0.12)' }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col gap-4 rounded-xl border border-[#2D3748] bg-[#1A1D27] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#6366F1]/20 bg-[#6366F1]/10">
                      <FileText size={18} className="text-[#6366F1]" />
                    </div>
                    <h3 className="font-semibold text-[#F1F5F9]">{doc.title}</h3>
                  </div>
                  <p className="flex-1 text-sm text-[#94A3B8]">{doc.description}</p>
                  <Link
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/10 px-4 py-2 text-sm font-medium text-[#6366F1] transition-colors hover:bg-[#6366F1]/20"
                  >
                    <Download size={14} />
                    Download
                  </Link>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
