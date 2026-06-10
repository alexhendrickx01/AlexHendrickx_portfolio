'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { projects, contextStyle, statusConfig, type Project } from '@/lib/projects'


function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

/* ── Project card: description + tech visible, click → detail ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cs = contextStyle[project.context]
  const sc = statusConfig[project.status]
  const router = useRouter()

  return (
    <BlurFade delay={index * 0.07} inView className="h-full">
      <div
        className="group flex h-full cursor-pointer flex-col border-2 bg-[#1A1D27] transition-colors hover:bg-[#1e2130]"
        style={{ borderColor: project.featured ? '#6366F1' : '#2D3748' }}
        onClick={() => router.push(`/projects/${project.slug}`)}
      >
        {/* Badges + links */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-[#2D3748] px-5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`border px-2.5 py-0.5 text-xs font-semibold ${cs.bg} ${cs.text}`}
              style={{ borderColor: `${cs.borderColor}50` }}
            >
              {project.context}
            </span>
            <span
              className="border px-2.5 py-0.5 text-xs font-semibold"
              style={{ borderColor: `${sc.color}40`, color: sc.color, backgroundColor: `${sc.color}10` }}
            >
              {sc.label}
            </span>
          </div>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#F1F5F9]">
                <GitHubIcon /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#F1F5F9]">
                <ExternalLink size={12} /> Demo
              </a>
            )}
          </div>
        </div>

        {/* Title + tagline */}
        <div className="border-b-2 border-[#2D3748] px-5 py-5">
          <h3 className="font-bold text-[#F1F5F9]">{project.title}</h3>
          <p className="mt-0.5 text-sm font-medium" style={{ color: project.featured ? '#6366F1' : '#94A3B8' }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <div className="flex-1 border-b-2 border-[#2D3748] px-5 py-5">
          <p className="text-sm leading-relaxed text-[#94A3B8]">{project.description}</p>
        </div>

        {/* Tech + arrow */}
        <div className="flex items-end justify-between gap-3 px-5 py-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="border border-[#2D3748] bg-[#0F1117] px-2.5 py-1 text-xs text-[#94A3B8]">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="border border-[#2D3748] bg-[#0F1117] px-2.5 py-1 text-xs text-[#94A3B8]">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
          <ArrowRight size={15} className="shrink-0 text-[#2D3748] transition-colors group-hover:text-[#6366F1]" />
        </div>
      </div>
    </BlurFade>
  )
}

export default function ProjectsSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    if (!headingRef.current) return
    gsap.fromTo(headingRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' } }
    )
  }, [])

  return (
    <section className="py-24 pt-32">
      <div className="mx-auto max-w-7xl flex flex-col gap-3">

        {/* ── Page heading ── */}
        <BlurFade delay={0} inView>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27] px-8 py-6">
            <h1
              ref={headingRef}
              className="border-l-4 border-[#6366F1] pl-4 text-3xl font-bold text-[#F1F5F9] md:text-4xl"
            >
              Projecten
            </h1>
            <p className="mt-2 pl-5 text-[#94A3B8]">Schoolprojecten, persoonlijk werk en freelance opdrachten.</p>
          </div>
        </BlurFade>

        {/* ── All projects 2-col grid, equal height ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

      </div>
    </section>
  )
}
