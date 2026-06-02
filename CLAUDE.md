# Portfolio Alex Hendrickx — Claude Instructions

## Over mij
- Naam: Alex Hendrickx
- Opleiding: Bachelor Informatica, Thomas More
- Stage bij: [VUL IN: bedrijfsnaam]
- Stageopdracht: [VUL IN: officiële titel van je stage]
- Interesses in IT: [VUL IN: bv. backend development, cloud, security, ...]
- Tech skills: [VUL IN: bv. TypeScript, React, Node.js, Python, Docker, ...]

## Portfolio doel
Graduation portfolio ter bewijs van bachelor-niveau IT voor een jury van IT-professionals.
Deadline invite mail: 10 juni. Geen wijzigingen na verzending.

## Tech stack
- Next.js 14 (App Router)
- Tailwind CSS v3
- Framer Motion (page transitions, scroll reveals)
- GSAP + ScrollTrigger (timeline animaties, SplitText)
- Lenis (smooth scroll, gekoppeld aan GSAP)
- Aceternity UI (Spotlight, 3D Card — copy-paste in components/ui/)
- Magic UI (ShimmerButton, Marquee, BlurFade — copy-paste in components/ui/)
- React Three Fiber + Drei (3D particles hero)
- TypeScript strict
- Deployed op Netlify

## Design system
- Stijl: Dark minimalism + Bento Grid
- bg: #0F1117 | surface: #1A1D27 | border: #2D3748
- Primary: #6366F1 (Indigo) | Accent: #22D3EE (Cyan)
- Text: #F1F5F9 | Muted: #94A3B8
- Font sans: Geist (via next/font) | Font mono: JetBrains Mono
- Animaties: subtiel, professioneel, nooit afleidend van inhoud

## Verplichte secties (ThomasMore ECTS)
1. Home page — doel portfolio, eerste indruk
2. About me — persoonlijk, CV downloadbaar als PDF
3. Stage — titel + samenvatting (verleden tijd) + 3 PDF downloads
4. Achievements & Projects — eigen projecten + bijdrage bij groepswerk

## Code conventies
- "use client" waar browser APIs of animaties gebruikt worden
- Componenten in PascalCase in /components
- Aceternity + Magic UI components in /components/ui/
- PDF-links: target="_blank" rel="noopener noreferrer"
- Geen emojis — gebruik Lucide React
- Respect altijd prefers-reduced-motion
- GSAP plugins registreren in lib/gsap.ts
