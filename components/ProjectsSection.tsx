'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GitFork, Award, Calendar } from 'lucide-react'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { BlurFade } from '@/components/ui/blur-fade'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type Project = {
  id: number
  title: string
  context: 'Schoolproject' | 'Persoonlijk project' | 'Hackathon'
  description: string
  tech: string[]
  github: string | null
  demo: string | null
  featured: boolean
}

type Achievement = {
  title: string
  source: string
  date: string
}

const projects: Project[] = [
  {
    id: 1,
    title: '[PROJECT_1_TITEL]',
    context: 'Schoolproject',
    description: '[PROJECT_1_BESCHRIJVING — wat doet het en welke tech? 2 zinnen. Bij groepswerk: vermeld jouw bijdrage.]',
    tech: ['[TECH_1]', '[TECH_2]', '[TECH_3]'],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: '[PROJECT_2_TITEL]',
    context: 'Persoonlijk project',
    description: '[PROJECT_2_BESCHRIJVING]',
    tech: ['[TECH_1]', '[TECH_2]'],
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 3,
    title: '[PROJECT_3_TITEL]',
    context: 'Schoolproject',
    description: '[PROJECT_3_BESCHRIJVING]',
    tech: ['[TECH_1]', '[TECH_2]'],
    github: null,
    demo: null,
    featured: false,
  },
]

const achievements: Achievement[] = [
  { title: '[ACHIEVEMENT_1]', source: '[Bron / Platform]', date: '[2024]' },
  { title: '[ACHIEVEMENT_2]', source: '[Bron / Platform]', date: '[2024]' },
]

const contextColors: Record<Project['context'], string> = {
  'Schoolproject':    'border-[#6366F1]/40 bg-[#6366F1]/10 text-[#6366F1]',
  'Persoonlijk project': 'border-[#22D3EE]/40 bg-[#22D3EE]/10 text-[#22D3EE]',
  'Hackathon':        'border-amber-500/40 bg-amber-500/10 text-amber-400',
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <BlurFade delay={index * 0.1} inView>
      <CardContainer containerClassName="w-full" className="w-full">
        <CardBody
          className={`relative flex h-full w-full flex-col gap-4 rounded-xl border border-[#2D3748] bg-[#1A1D27] p-6 transition-colors hover:border-[#6366F1]/40 ${
            project.featured ? 'ring-1 ring-[#6366F1]/20' : ''
          }`}
        >
          {project.featured && (
            <CardItem translateZ={20}>
              <span className="rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-2.5 py-0.5 text-xs font-medium text-[#6366F1]">
                Featured
              </span>
            </CardItem>
          )}

          <CardItem translateZ={50}>
            <h3 className="text-lg font-bold text-[#F1F5F9]">{project.title}</h3>
          </CardItem>

          <CardItem translateZ={20}>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${contextColors[project.context]}`}>
              {project.context}
            </span>
          </CardItem>

          <CardItem translateZ={30} className="flex-1">
            <p className="text-sm leading-relaxed text-[#94A3B8]">{project.description}</p>
          </CardItem>

          <CardItem translateZ={60} className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[#2D3748] bg-[#0F1117] px-2 py-0.5 text-xs text-[#94A3B8]"
              >
                {t}
              </span>
            ))}
          </CardItem>

          {(project.github || project.demo) && (
            <CardItem translateZ={80} className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#F1F5F9]"
                >
                  <GitHubIcon /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#F1F5F9]"
                >
                  <ExternalLink size={12} /> Demo
                </a>
              )}
            </CardItem>
          )}
        </CardBody>
      </CardContainer>
    </BlurFade>
  )
}

export default function ProjectsSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const achievingHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)

    const targets = [headingRef.current, achievingHeadingRef.current].filter(Boolean)
    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      )
    })
  }, [])

  const featured  = projects.filter((p) => p.featured)
  const rest      = projects.filter((p) => !p.featured)

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 pt-32">

      {/* Heading */}
      <BlurFade delay={0} inView>
        <h1
          ref={headingRef}
          className="mb-12 border-l-4 border-[#6366F1] pl-4 text-3xl font-bold text-[#F1F5F9] md:text-4xl"
        >
          Projecten &amp; Achievements
        </h1>
      </BlurFade>

      {/* Featured projects */}
      {featured.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      {/* Bento grid — remaining projects */}
      {rest.length > 0 && (
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + featured.length} />
          ))}
        </div>
      )}

      {/* Achievements */}
      <div>
        <BlurFade delay={0} inView>
          <h2
            ref={achievingHeadingRef}
            className="mb-8 border-l-4 border-[#22D3EE] pl-4 text-2xl font-bold text-[#F1F5F9]"
          >
            Achievements
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <BlurFade key={a.title} delay={i * 0.1} inView>
              <motion.div
                whileHover={{ borderColor: 'rgba(34,211,238,0.4)' }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 rounded-xl border border-[#2D3748] bg-[#1A1D27] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#22D3EE]/20 bg-[#22D3EE]/10">
                  <Award size={18} className="text-[#22D3EE]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[#F1F5F9]">{a.title}</span>
                  <span className="text-xs text-[#94A3B8]">{a.source}</span>
                  <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                    <Calendar size={11} /> {a.date}
                  </span>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
