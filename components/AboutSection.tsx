'use client'

import Image from 'next/image'
import { Mail, Download, ExternalLink, GraduationCap, MapPin, BookOpen, Layers, Server, Brain, Cloud } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'

const CONTACT = {
  email:    'mailto:alexhendrickx01@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexhendrickx/',
  github:   'https://github.com/alexhendrickx01',
}
const CV_URL = '/documents/alexhendrickx_cv.pdf'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="border border-[#2D3748] bg-[#0F1117] px-3 py-1.5 text-sm text-[#94A3B8]">
      {label}
    </span>
  )
}

const infoRows = [
  { icon: GraduationCap, label: 'School',    value: 'Thomas More Hogeschool' },
  { icon: MapPin,        label: 'Locatie',    value: 'Geel, België · Beschikbaar' },
  { icon: BookOpen,      label: 'Opleiding',  value: 'Bachelor Informatica' },
]

const skillCategories = [
  {
    icon: Layers,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Flutter', 'Alpine.js'],
    accent: '#6366F1',
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Java', 'Python', '.NET', 'PHP', 'Laravel', 'SQL'],
    accent: '#22D3EE',
  },
  {
    icon: Brain,
    title: 'AI & Data',
    skills: ['Machine Learning', 'Computer Vision', 'NLP', 'Semantic Kernel', 'FastAI'],
    accent: '#6366F1',
  },
  {
    icon: Cloud,
    title: 'Cloud & Tools',
    skills: ['Azure', 'Firebase', 'Git', 'Docker', 'REST APIs', 'GA4', 'GTM'],
    accent: '#22D3EE',
  },
]

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl py-24 pt-32">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[300px_1fr]">

        {/* ══ Left column ══ */}
        <div className="flex flex-col gap-3">

          {/* Photo / ID badge */}
          <BlurFade delay={0} inView>
            <div className="border-2 border-[#2D3748]">
              {/* Indigo photo block */}
              <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-[#6366F1]">
                <Image
                  src="/documents/alexhendrickx.jpeg"
                  alt="Alex Hendrickx"
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                  priority
                />
              </div>
              {/* Name stamp */}
              <div className="border-t-2 border-[#2D3748] bg-[#1A1D27] px-4 py-3">
                <p className="text-base font-bold text-[#F1F5F9]">
                  Alex Hendrickx <span className="font-normal text-[#94A3B8]">· 2025</span>
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Info rows */}
          <BlurFade delay={0.08} inView>
            <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
              {infoRows.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-start gap-3 px-4 py-4 ${i < infoRows.length - 1 ? 'border-b-2 border-[#2D3748]' : ''}`}
                >
                  <Icon size={14} className="mt-0.5 shrink-0 text-[#6366F1]" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">{label}</p>
                    <p className="mt-0.5 text-sm font-bold text-[#F1F5F9]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>

          {/* Contact block */}
          <BlurFade delay={0.14} inView>
            <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
              <div className="border-b-2 border-[#2D3748] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Contact</p>
              </div>
              <div className="flex flex-col divide-y-2 divide-[#2D3748]">
                <a
                  href={CONTACT.email}
                  className="flex items-center gap-3 px-4 py-3.5 text-sm text-[#94A3B8] transition-colors hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
                >
                  <Mail size={14} className="shrink-0 text-[#6366F1]" />
                  alexhendrickx01@gmail.com
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 text-sm text-[#94A3B8] transition-colors hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
                >
                  <span className="shrink-0 text-[#6366F1]"><LinkedInIcon /></span>
                  linkedin.com/in/alexhendrickx
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 text-sm text-[#94A3B8] transition-colors hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
                >
                  <span className="shrink-0 text-[#6366F1]"><GitHubIcon /></span>
                  github.com/alexhendrickx01
                </a>
              </div>
            </div>
          </BlurFade>

          {/* CV buttons */}
          <BlurFade delay={0.18} inView>
            <div className="flex flex-col">
              <a
                href={CV_URL}
                download
                className="flex h-14 items-center justify-center gap-2.5 border-2 border-[#6366F1] bg-[#6366F1] text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Download CV (PDF)
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2.5 border-2 border-[#2D3748] bg-[#1A1D27] text-sm font-semibold text-[#6366F1] transition-colors hover:bg-[#6366F1]/10"
              >
                <ExternalLink size={14} />
                Open CV
              </a>
            </div>
          </BlurFade>
        </div>

        {/* ══ Right column ══ */}
        <div className="flex flex-col gap-3">

          {/* About me card */}
          <BlurFade delay={0.05} inView>
            <div className="border-2 border-[#2D3748] bg-[#1A1D27] p-7">
              <h1 className="mb-6 border-l-4 border-[#6366F1] pl-4 text-3xl font-bold text-[#F1F5F9]">
                About me
              </h1>
              <div className="flex flex-col gap-5">
                <p className="leading-relaxed text-[#94A3B8]">
                  Ik ben Alex Hendrickx, student Toegepaste Informatica aan IT Factory Thomas More Geel. Gedreven software engineer met focus op AI, backend development en schaalbare applicaties, opgebouwd via stage-, freelance- en persoonlijke projecten. Ik los graag echte problemen op met software die er ook écht toe doet.
                </p>
                <p className="leading-relaxed text-[#94A3B8]">
                  Technisch boeit me vooral de combinatie van AI en fullstack development: van computer vision en machine learning tot het bouwen van complete applicaties van frontend tot database. De laatste tijd ga ik daar nog een stap verder in als freelance mobile developer, door zelfstandig te werken aan iOS- en Android-apps, rechtstreeks met klanten van requirements tot oplevering.
                </p>
                <p className="leading-relaxed text-[#94A3B8]">
                  Naast mijn studies en freelancewerk bouw ik actief aan mijn eigen idee: Factuurt, een mobile-first platform voor Belgische vakmensen. Het doel is hun volledige workflow, van de werf tot de factuur, in één app te vatten, volledig op maat van hoe zij werken. Van de grond op gebouwd, omdat ik geloof dat goede software vakmannen vrijheid geeft in plaats van extra administratie.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Cyan accent block */}
          <BlurFade delay={0.12} inView>
            <div className="flex items-center justify-between border border-[#06b6d4] bg-[#181a24] px-6 py-4">
              <div>
                <p className="font-bold text-white">Student Software Engineer</p>
                <p className="text-sm text-[#94A3B8]">AI & Fullstack Development</p>
              </div>
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-2.5 w-2.5 bg-[#06b6d4]"
                    style={{ opacity: 0.25 + i * 0.25 }}
                  />
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Tech stack heading */}
          <BlurFade delay={0.18} inView>
            <div className="border-2 border-[#2D3748] px-6 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">Tech Stack</p>
            </div>
          </BlurFade>

          {/* Skill grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skillCategories.map(({ icon: Icon, title, skills, accent }, i) => (
                <BlurFade key={title} delay={0.22 + i * 0.06} inView>
                  <div className="flex h-full flex-col gap-4 border-2 border-[#2D3748] bg-[#1A1D27] p-5">
                    {/* Header */}
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} style={{ color: accent }} />
                      <span className="font-bold text-[#F1F5F9]">{title}</span>
                    </div>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => <Chip key={s} label={s} />)}
                    </div>
                  </div>
                </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
