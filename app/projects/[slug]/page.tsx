import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Zap, ExternalLink } from 'lucide-react'
import { projects, contextStyle, statusConfig } from '@/lib/projects'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return { title: `${project.title} — Alex Hendrickx` }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const cs = contextStyle[project.context]
  const sc = statusConfig[project.status]

  return (
    <main className="py-24 pt-32">
      <div className="mx-auto max-w-7xl flex flex-col gap-3">

        {/* ── Back ── */}
        <Link
          href="/projects"
          className="flex w-fit items-center gap-2 border-2 border-[#2D3748] bg-[#1A1D27] px-4 py-2.5 text-sm text-[#94A3B8] transition-colors hover:bg-[#1e2130] hover:text-[#F1F5F9]"
        >
          <ArrowLeft size={14} /> Terug naar projecten
        </Link>

        {/* ── Hero ── */}
        <div
          className="border-2 bg-[#1A1D27]"
          style={{ borderColor: project.featured ? '#6366F1' : '#2D3748' }}
        >
          {/* Badges + links */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-[#2D3748] px-8 py-4">
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
            <div className="flex items-center gap-4">
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

          {/* Title */}
          <div className="px-8 py-7">
            <h1 className="border-l-4 border-[#6366F1] pl-4 text-3xl font-bold text-[#F1F5F9] md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 pl-5 text-lg font-medium text-[#6366F1]">{project.tagline}</p>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="border-2 border-[#2D3748] bg-[#1A1D27] px-8 py-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-3">Over dit project</p>
          <p className="leading-relaxed text-[#94A3B8]">{project.description}</p>
        </div>

        {/* ── Rol + Uitdaging ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
            <div className="flex items-center gap-2 border-b-2 border-[#2D3748] px-6 py-4">
              <User size={13} className="text-[#6366F1]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Mijn rol</span>
            </div>
            <p className="px-6 py-5 text-sm leading-relaxed text-[#94A3B8]">{project.role}</p>
          </div>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
            <div className="flex items-center gap-2 border-b-2 border-[#2D3748] px-6 py-4">
              <Zap size={13} className="text-[#22D3EE]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Grootste uitdaging</span>
            </div>
            <p className="px-6 py-5 text-sm leading-relaxed text-[#94A3B8]">{project.challenge}</p>
          </div>
        </div>

        {/* ── Tech stack ── */}
        <div className="border-2 border-[#2D3748] bg-[#1A1D27] px-8 py-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-[#2D3748] bg-[#0F1117] px-3 py-1.5 text-sm text-[#94A3B8]">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
