'use client'

import Image from 'next/image'
import { Mail, Download } from 'lucide-react'

const CONTACT = {
  email: 'mailto:alexhendrickx01@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexhendrickx/',
  github: 'https://github.com/alexhendrickx01',
}
import { BlurFade } from '@/components/ui/blur-fade'
import { Marquee } from '@/components/ui/marquee'
import { ShimmerButton } from '@/components/ui/shimmer-button'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const skillsRow1 = ['React', 'Next.js', 'TypeScript', 'Python', 'Java', '.NET', 'Flutter', 'PHP', 'Laravel']
const skillsRow2 = ['Azure', 'Firebase', 'Git', 'REST APIs', 'Machine Learning', 'Computer Vision', 'GA4', 'GTM', 'Tailwind']

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="mx-2 inline-flex items-center rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-1 text-xs font-medium text-[#6366F1] whitespace-nowrap">
      {label}
    </span>
  )
}

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 pt-32">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

        {/* ── Left column ── */}
        <div className="flex flex-col items-center gap-6 md:items-start">
          <BlurFade delay={0} inView>
            <div className="group relative h-72 w-64 overflow-hidden rounded-2xl border border-[#2D3748] transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/documents/alexhendrickx.jpeg"
                alt="Alex Hendrickx"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 256px"
              />
            </div>
          </BlurFade>

          {/* Contact icons */}
          <BlurFade delay={0.1} inView>
            <div className="flex items-center gap-4">
              <a
                href={CONTACT.email}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2D3748] bg-[#1A1D27] text-[#94A3B8] transition-colors hover:border-[#6366F1]/50 hover:text-[#6366F1]"
              >
                <Mail size={18} />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2D3748] bg-[#1A1D27] text-[#94A3B8] transition-colors hover:border-[#6366F1]/50 hover:text-[#6366F1]"
              >
                <LinkedInIcon />
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2D3748] bg-[#1A1D27] text-[#94A3B8] transition-colors hover:border-[#6366F1]/50 hover:text-[#6366F1]"
              >
                <GitHubIcon />
              </a>
            </div>
          </BlurFade>

          {/* CV download */}
          <BlurFade delay={0.2} inView>
            <a href="/documents/alexhendrickx_cv.pdf" target="_blank" rel="noopener noreferrer">
              <ShimmerButton className="gap-2 px-5 py-2.5 text-sm">
                <Download size={15} />
                Download CV (PDF)
              </ShimmerButton>
            </a>
          </BlurFade>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-8">
          <BlurFade delay={0.05} inView>
            <h1 className="border-l-4 border-[#6366F1] pl-4 text-3xl font-bold text-[#F1F5F9] md:text-4xl">
              About me
            </h1>
          </BlurFade>

          <BlurFade delay={0.15} inView>
            <p className="text-[#94A3B8] leading-relaxed">
              [PLACEHOLDER — Paragraaf 1: wie ben je, wat studeer je en waarom]
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#94A3B8] leading-relaxed">
              [PLACEHOLDER — Paragraaf 2: interesses in IT, wat boeit je technisch]
            </p>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <p className="text-[#94A3B8] leading-relaxed">
              [PLACEHOLDER — Paragraaf 3: persoonlijk detail buiten IT]
            </p>
          </BlurFade>

          {/* Skills marquee */}
          <BlurFade delay={0.45} inView>
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8]">
                Tech Stack
              </h2>
              <div className="overflow-hidden rounded-xl border border-[#2D3748] bg-[#1A1D27] py-3">
                <Marquee pauseOnHover repeat={2}>
                  {skillsRow1.map((s) => <SkillBadge key={s} label={s} />)}
                </Marquee>
                <Marquee reverse pauseOnHover repeat={2}>
                  {skillsRow2.map((s) => <SkillBadge key={s} label={s} />)}
                </Marquee>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
