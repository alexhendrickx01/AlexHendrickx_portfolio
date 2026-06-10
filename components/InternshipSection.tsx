'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FileText, Download, ExternalLink, Building2, CalendarDays, Database, Zap, Wrench, Lightbulb } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const documents = [
  {
    title: 'Project Approach',
    description: 'Het plan van aanpak voor de stageopdracht doelstellingen, planning en methodologie.',
    href: '/documents/alexhendrickx_project-approach.pdf',
  },
  {
    title: 'Implementation',
    description: 'De volledige technische uitwerking van de stageopdracht (thesis).',
    href: '/documents/alexhendrickx-implementation.pdf',
  },
  {
    title: 'Reflectie',
    description: 'Persoonlijke reflectie op het stageproces, de groei en de leerpunten.',
    href: '/documents/alexhendrickx_reflectie.pdf',
  },
]

const techStack = ['Python', 'GA4 API', 'Google Admin API', 'SQLite', 'Gemini Flash', 'pandas', 'matplotlib', 'GTM', 'Exponential Backoff']

const pipeline = [
  { icon: Database,  step: '01', label: 'Property Discovery',   detail: 'Admin API: alle GA4-properties van IO ophalen en lokaal opslaan in SQLite.' },
  { icon: Database,  step: '02', label: 'Data Extractie',        detail: 'GA4 Data API met dimension packing: ruwe events per property batchen en opslaan.' },
  { icon: Database,  step: '03', label: 'Sectorclassificatie',   detail: 'Gemini Flash: elk account automatisch ingedeeld in een sector op basis van beschikbare metadata.' },
  { icon: Database,  step: '04', label: 'Tijdsenrichment',       detail: 'Events verrijkt met tijdsdimensies voor trendanalyse in de lokale database.' },
  { icon: Database,  step: '05', label: 'Analyse & Visualisatie', detail: 'JOIN-queries in SQLite → Python (pandas + matplotlib) voor grafieken en rapportage.' },
]

const meta = [
  { icon: Building2,    label: 'Bedrijf',  value: 'IO' },
  { icon: CalendarDays, label: 'Periode',  value: 'februari 2026 – mei 2026' },
]

export default function InternshipSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      titleRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <main className="py-24 pt-32">
      <div className="mx-auto max-w-7xl flex flex-col gap-3">

        {/* ══ Hero header ══ */}
        <BlurFade delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] border-2 border-[#2D3748] bg-[#1A1D27]">
            {/* Left: title */}
            <div className="border-b-2 border-[#2D3748] px-8 py-8 md:border-b-0 md:border-r-2">
              <div className="mb-3 inline-flex border border-[#2D3748] bg-[#0F1117] px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Stage</span>
              </div>
              <h1
                ref={titleRef}
                className="border-l-4 border-[#6366F1] pl-4 text-4xl font-bold text-[#F1F5F9] md:text-5xl"
              >
                GA4 Data Pipeline for Portfolio-Wide Analysis
              </h1>
              <p className="mt-3 pl-5 text-lg text-[#94A3B8]">Data & Marketing Technology · IO</p>
            </div>
            {/* Right: meta */}
            <div className="flex flex-col divide-y-2 divide-[#2D3748] min-w-[200px]">
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 px-6 py-5">
                  <Icon size={14} className="shrink-0 text-[#6366F1]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">{label}</p>
                    <p className="text-sm font-bold text-[#F1F5F9]">{value}</p>
                  </div>
                </div>
              ))}
              {/* Cyan accent strip */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#181a24] border-t-2 border-[#06b6d4]">
                <div>
                  <p className="text-xs font-bold text-white">Marketing Technology</p>
                  <p className="text-[11px] text-[#94A3B8]">Data & Automation</p>
                </div>
                <div className="flex gap-1">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="h-2 w-2 bg-[#06b6d4]" style={{ opacity: 0.25 + i * 0.25 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ══ Context strip ══ */}
        <BlurFade delay={0.1} inView>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27] px-8 py-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Context</p>
            <p className="leading-relaxed text-[#94A3B8] text-sm">
              Omwille van de vertrouwelijkheid van de bedrijfsgegevens is alle klant- en organisatiegerelateerde informatie in dit portfolio geanonimiseerd.
              IO zocht manieren om waarde te halen uit de data die ze al bezaten, iets wat tot dan toe nog niet systematisch was aangepakt. Mijn opdracht was dat mogelijk te maken.
            </p>
          </div>
        </BlurFade>

        {/* ══ Bachelorproef ══ */}
        <BlurFade delay={0.12} inView>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
            <div className="flex items-center gap-3 border-b-2 border-[#2D3748] px-8 py-4">
              <Database size={15} className="text-[#6366F1]" />
              <h2 className="border-l-4 border-[#6366F1] pl-3 text-lg font-bold text-[#F1F5F9]">Bachelorproef</h2>
            </div>

            {/* Story */}
            <div className="px-8 py-6 border-b-2 border-[#2D3748]">
              <p className="leading-relaxed text-[#94A3B8]">
                Tijdens mijn stage bij IO heb ik een volledige datapipeline ontwikkeld die via de Google Analytics 4 API bedrijfsdata extraheerde, transformeerde en lokaal opsloeg in SQLite.
                Een cruciaal onderdeel hiervan was het toepassen van classificatiemodellen om de sectorindeling van bedrijven te verfijnen, zodat de data een getrouwer beeld gaf van de klantenportefeuille.
                Het hoofddoel was bepalen welke visualisaties daadwerkelijk waarde toevoegden voor IO, van het selecteren van de juiste statistieken tot het uitwerken van de grafieken in Python.
              </p>
            </div>

            {/* Pipeline horizontal lego flow */}
            <div className="border-b-2 border-[#2D3748] px-8 py-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Pipeline</p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {pipeline.map(({ step, label, detail }) => (
                  <div key={step} className="border-2 border-[#2D3748] bg-[#0F1117] p-4">
                    <span className="text-[10px] font-bold text-[#6366F1]">{step}</span>
                    <p className="mt-1 text-sm font-bold text-[#F1F5F9]">{label}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge block */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={13} className="text-[#22D3EE]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Grootste uitdaging</span>
              </div>
              <p className="text-sm leading-relaxed text-[#94A3B8] mb-4">
                Elke GA4-property vereiste meerdere API-calls in plaats van één, waardoor de quota-limieten van Google snel in zicht kwamen. Dit vroeg om een doordachte architectuurkeuze: dimension packing om calls te bundelen, gecombineerd met drie extra lagen van robuustheid:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Exponential backoff', detail: 'Bij een fout wacht het systeem steeds langer voor een retry, met willekeurige jitter.' },
                  { label: 'Rate spreading',      detail: 'Korte sleeps tussen calls om quota-gebruik gelijkmatig te spreiden over tijd.' },
                  { label: 'Checkpointing',       detail: 'Bij een onderbreking hervat de pipeline zonder alles opnieuw te verwerken.' },
                ].map(({ label, detail }) => (
                  <div key={label} className="border-2 border-[#2D3748] bg-[#0F1117] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#22D3EE]" />
                      <p className="text-sm font-bold text-[#F1F5F9]">{label}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-[#94A3B8]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ══ GTM-projecten ══ */}
        <BlurFade delay={0.14} inView>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] border-2 border-[#2D3748] bg-[#1A1D27]">
            {/* GTM story */}
            <div className="border-b-2 border-[#2D3748] px-8 py-6 md:border-b-0 md:border-r-2">
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={15} className="text-[#22D3EE]" />
                <h2 className="border-l-4 border-[#22D3EE] pl-3 text-lg font-bold text-[#F1F5F9]">GTM-projecten</h2>
              </div>
              <p className="leading-relaxed text-[#94A3B8] mb-4">
                Naast de bachelorproef heb ik meegewerkt aan vier GTM-projecten voor operationele klanten. Een breed palet aan bedrijven, elk met een eigen website en tracking-noden.
                Ik stond in voor zowel het volledig opzetten van Google Tag Manager-omgevingen (tags, triggers, variabelen, conversies) als het debuggen en optimaliseren van bestaande setups.
              </p>
              <p className="leading-relaxed text-[#94A3B8]">
                Bij één debugopdracht heb ik de fout gemaakt om na het oplossen van het probleem niet proactief te communiceren met de klant en pas verder te gaan wanneer mijn stagebegeleider beschikbaar was.
                Dat was een waardevolle les: in een professionele context is tijdige communicatie even belangrijk als technische kwaliteit.
              </p>
            </div>

            {/* Learnings */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={15} className="text-[#6366F1]" />
                <h2 className="border-l-4 border-[#6366F1] pl-3 text-lg font-bold text-[#F1F5F9]">Wat ik meeneem</h2>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { accent: '#6366F1', title: 'Vrijheid als vertrouwen', text: 'IO gaf veel autonomie, ze zochten actief naar wat we konden doen met de beschikbare data. Dat vertrouwen maakte het project inhoudelijk rijker.' },
                  { accent: '#22D3EE', title: 'Vragen stellen loont', text: 'Het enige wat ik anders zou doen: sneller en méér vragen stellen. Elke vraag leverde richting op en voorkwam onnodige omwegen.' },
                  { accent: '#6366F1', title: 'Professionaliteit in de praktijk', text: 'Technisch goed werk is het minimum maar proactief communiceren, ook bij tegenslag, is wat het verschil maakt in een professionele omgeving.' },
                ].map(({ accent, title, text }) => (
                  <div key={title} className="flex gap-3 border-2 border-[#2D3748] bg-[#0F1117] px-4 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: accent }} />
                    <div>
                      <p className="text-sm font-bold text-[#F1F5F9]">{title}</p>
                      <p className="mt-0.5 text-sm text-[#94A3B8]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ══ Tech Stack ══ */}
        <BlurFade delay={0.16} inView>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27] px-8 py-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="border border-[#2D3748] bg-[#0F1117] px-3 py-1.5 text-sm text-[#94A3B8]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ══ Documenten ══ */}
        <BlurFade delay={0.15} inView>
          <div className="border-2 border-[#2D3748] bg-[#1A1D27]">
            <div className="flex items-center gap-3 border-b-2 border-[#2D3748] px-8 py-4">
              <FileText size={16} className="text-[#6366F1]" />
              <h2 className="border-l-4 border-[#6366F1] pl-3 text-lg font-bold text-[#F1F5F9]">
                Documenten
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-3">
              {documents.map((doc, i) => (
                <BlurFade key={doc.title} delay={0.2 + i * 0.08} inView>
                  <div className="flex flex-col gap-5 border-2 border-[#2D3748] bg-[#0F1117] p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#6366F1]/30 bg-[#6366F1]/10">
                        <FileText size={16} className="text-[#6366F1]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#F1F5F9]">{doc.title}</h3>
                        <p className="mt-1 text-sm text-[#94A3B8]">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <Link
                        href={doc.href}
                        download
                        className="flex h-11 items-center justify-center gap-2 border-2 border-[#6366F1] bg-[#6366F1] text-sm font-bold text-white transition-opacity hover:opacity-90"
                      >
                        <Download size={13} /> Download
                      </Link>
                      <Link
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center justify-center gap-2 border-2 border-[#2D3748] bg-transparent text-sm font-semibold text-[#6366F1] transition-colors hover:bg-[#6366F1]/10"
                      >
                        <ExternalLink size={13} /> Open
                      </Link>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>

      </div>
    </main>
  )
}
