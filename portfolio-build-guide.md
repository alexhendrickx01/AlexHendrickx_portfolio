# Graduation Portfolio — Complete Build Guide
**Alex Hendrickx | Informatica | ThomasMore**

---

## Inhoudsopgave

1. [Tech Stack Keuze](#1-tech-stack-keuze)
2. [Design System](#2-design-system)
3. [Epic Design & Animaties — Tools & Technieken](#3-epic-design--animaties--tools--technieken)
4. [Paginastructuur & Content](#4-paginastructuur--content)
5. [Claude Code Setup — Skills & Tools](#5-claude-code-setup--skills--tools)
6. [Prompts per sectie](#6-prompts-per-sectie)
7. [UX & Toegankelijkheid](#7-ux--toegankelijkheid)
8. [Pre-launch checklist](#8-pre-launch-checklist)

---

## 1. Tech Stack Keuze

### Aanbevolen stack: Next.js + Tailwind CSS + Vercel

Je huidige site draait al op Vercel, dus de deploy-pipeline bestaat al. Dit is de volledige aanbevolen stack inclusief alle animatie- en visuele tools:

| Laag | Keuze | Waarom |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSG/SSR, perfecte SEO, file-based routing, eenvoudig te hosten |
| Styling | **Tailwind CSS v3** | Utility-first, snel, consistent design tokens, geen CSS spaghetti |
| Animaties (core) | **Framer Motion** | Professionele page transitions, scroll-animaties, layout animations |
| Animaties (pro) | **GSAP + ScrollTrigger** | De industriestandaard voor complexe timeline-animaties en scroll-driven effecten |
| Smooth scroll | **Lenis** | Butter-smooth momentum scroll, pairs perfect met GSAP ScrollTrigger |
| 3D (visueel) | **Spline** | Browser-based 3D tool — exporteer interactieve 3D scenes zonder code |
| 3D (code) | **React Three Fiber (R3F) + Drei** | Three.js als React components, voor programmeerbare 3D hero-effecten |
| UI Components | **Aceternity UI + Magic UI** | Copy-paste animated components: spotlight, 3D cards, glowing beams, particle bg |
| Icons | **Lucide React** | Schoon, consistent icon systeem (geen emojis als iconen!) |
| Fonts | Via `next/font/google` | Inter + JetBrains Mono, geoptimaliseerd geladen |
| Hosting | **Vercel** (houd je bestaande setup) | Gratis, betrouwbaar, auto-deploy vanuit GitHub |
| Documenten | **PDF via download links** | Verplicht: projectplan, thesis, reflectie als PDF |

### Alternatief: Astro (statisch, nog sneller)

Als je geen React wilt maar toch component-based wil werken, is **Astro** een goed alternatief. Het genereert volledig statische HTML, is razendsnel en integreert met Tailwind. Ook GSAP en Lenis werken perfect in Astro.

### Mappenstructuur (Next.js App Router)

```
portfolio/
├── app/
│   ├── page.tsx                  ← Home
│   ├── about/page.tsx            ← About me
│   ├── internship/page.tsx       ← Stage-sectie
│   ├── projects/page.tsx         ← Achievements & Projects
│   └── layout.tsx                ← Globale layout + nav + Lenis provider
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx           ← Bevat Spline 3D scene of R3F blob
│   ├── ProjectCard.tsx           ← Aceternity UI 3D card
│   ├── DocumentLink.tsx          ← Opent PDF in nieuw tabblad
│   ├── ScrollReveal.tsx          ← GSAP ScrollTrigger wrapper
│   ├── ParticleBackground.tsx    ← tsParticles of Aceternity sparkles
│   └── Footer.tsx
├── lib/
│   └── gsap.ts                   ← GSAP + ScrollTrigger registratie
├── public/
│   └── documents/                ← PDF bestanden hier
│       ├── projectplan.pdf
│       ├── realisatie.pdf
│       └── reflectie.pdf
├── styles/
│   └── globals.css
└── tailwind.config.ts
```

---

## 2. Design System

### Stijladvies voor een IT-portfolio (informatica)

Op basis van de **UI UX Pro Max skill** valt een IT/developer portfolio in de categorie "Portfolio – Creative/Tech". De aanbevolen stijl:

**Primaire stijl: Minimalism + Bento Grid**
- Schone lijnen, veel whitespace, focus op inhoud
- Bento-grid cards voor projecten (modern, populair in tech portfolios)
- Donker thema met lichte accenten werkt goed voor IT-profielen (professioneel, technisch)

**Alternatief: Neubrutalism** (bold borders, raw aesthetic) — werkt als je een sterkere persoonlijkheid wil uitstralen.

### Kleurenpalet

```
/* Primair thema: Dark mode + accent */
--color-bg:         #0F1117   /* Bijna zwart, minder hard dan #000 */
--color-surface:    #1A1D27   /* Cards, sections */
--color-border:     #2D3748   /* Subtiele borders */
--color-primary:    #6366F1   /* Indigo — tech, modern, professioneel */
--color-accent:     #22D3EE   /* Cyan — highlights, hover states */
--color-text:       #F1F5F9   /* Bijna wit voor leesbaarheid */
--color-muted:      #94A3B8   /* Secundaire tekst, labels */

/* Alternatief: licht thema */
--color-bg:         #FAFAFA
--color-surface:    #FFFFFF
--color-primary:    #4F46E5   /* Indigo */
--color-accent:     #06B6D4   /* Cyan */
--color-text:       #0F172A
--color-muted:      #64748B
```

> Kies één thema en houd het consistent. Dark mode is populair bij IT-professionals.

### Typografie

```css
/* Aanbevolen combinatie: Inter + JetBrains Mono */
--font-sans: 'Inter', sans-serif;      /* Body, headings */
--font-mono: 'JetBrains Mono', monospace; /* Code snippets, tech labels */

/* Import in Next.js via next/font/google */
```

Grootte-schaal (gebruik consistent):
- `text-xs` (12px) — labels, badges, metadata
- `text-sm` (14px) — beschrijvende tekst, subtitles
- `text-base` (16px) — body tekst
- `text-xl` (20px) — card titels
- `text-3xl` (30px) — sectie headings
- `text-5xl` (48px) — hero heading

### Spacing & Layout

```css
/* Gebruik Tailwind spacing tokens consistent */
section padding:    py-24 px-6  (of container klasse)
card padding:       p-6
gap tussen cards:   gap-6 (24px)
max breedte site:   max-w-6xl mx-auto
border radius:      rounded-xl voor cards, rounded-lg voor knoppen
```

### Animaties (Framer Motion)

```tsx
// Gebruik dit patroon voor elke sectie die inscrollt:
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

// Stagger voor meerdere cards:
const container = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

Anti-patroon: **geen** zware animaties, geen paginabrede parallax, geen autoplay video's. Jury-leden willen inhoud lezen, geen cinematisch intro.

---

## 3. Epic Design & Animaties — Tools & Technieken

Dit hoofdstuk gaat dieper in op de tools die je portfolio laten uitspringen. Gebaseerd op de beste developer portfolios van 2025–2026.

---

### 3.1 GSAP + ScrollTrigger — de animatie-ruggengraat

**GSAP (GreenSock Animation Platform)** is de absolute industriestandaard voor professionele webanimaties. Het is wat studios als Active Theory, Resn en Bruno Simon gebruiken. Sneller dan CSS animations, precisiecontrole, en ScrollTrigger koppelt alles aan scroll-positie.

**Installatie:**
```bash
npm install gsap
```

**Setup in Next.js (`lib/gsap.ts`):**
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // GSAP Club plugin

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger };
```

**Effect 1: Tekst die letter per letter inscrollt (SplitText)**
```typescript
// Elke letter vliegt apart in vanuit onder
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".hero-title", start: "top 80%" }
});
const split = new SplitText(".hero-title", { type: "chars" });
tl.from(split.chars, {
  opacity: 0,
  y: 60,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.6,
  ease: "back.out(1.7)"
});
```

**Effect 2: Scroll-pinning — sectie "plakt" terwijl content inscrollt**
```typescript
// Sectie blijft staan terwijl de inhoud animeert
gsap.to(".project-content", {
  x: "-200%",
  ease: "none",
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: true,
  },
});
```

**Effect 3: Scroll-driven kleurovergang voor de hele pagina**
```typescript
gsap.to("body", {
  backgroundColor: "#1A1D27",
  scrollTrigger: {
    trigger: ".dark-section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

**Resources:**
- Documentatie: https://gsap.com/docs/v3/
- ScrollTrigger demos: https://gsap.com/scroll/
- Gratis voor persoonlijk gebruik; Club GSAP ($150/jaar) voor SplitText en MorphSVG

---

### 3.2 Lenis — smooth scroll die alles beter maakt

**Lenis** vervangt de standaard browser-scroll door een fysica-gebaseerde smooth scroll. Het gevoel: als je door een top-tier site scrollt en alles "vloeit". Pairs perfect met GSAP ScrollTrigger.

**Installatie:**
```bash
npm install lenis
```

**Setup als React context (`components/LenisProvider.tsx`):**
```typescript
"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "@/lib/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;

    // Koppel Lenis aan GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
```

Wrap je `layout.tsx` hiermee:
```tsx
<LenisProvider>
  <Navbar />
  {children}
  <Footer />
</LenisProvider>
```

---

### 3.3 Spline — 3D scenes zonder Three.js code

**Spline** (spline.design) is een browser-based 3D design tool. Je bouwt een 3D scene visueel, en exporteert het als een React component of embed-script. Geen Three.js kennis nodig. Ideaal voor een hero-achtergrond of een animerend 3D object achter je naam.

**Populaire use cases voor een developer portfolio:**
- Zwevende 3D geometrie (icosahedron, torus) als hero-achtergrond
- Interactieve 3D laptop/computer die reageert op cursor
- Abstract "blob" dat muisbewegingen volgt
- Technologie-iconen in 3D die ronddraaien

**Installatie:**
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

**Gebruik:**
```tsx
"use client";
import Spline from "@splinetool/react-spline";

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Spline scene="https://prod.spline.design/JOUW-SCENE-URL/scene.splinecode" />
    </div>
  );
}
```

**Workflow:**
1. Ga naar spline.design → maak gratis account
2. Kies een template (bv. "Blob", "Floating Geometry", "Tech Grid")
3. Pas kleuren aan op je design system (indigo/cyan)
4. Exporteer → "For Web" → kopieer de scene URL
5. Embed in je hero component

**Gratis tier:** voldoende voor een portfolio. Opgelet: Spline scenes zijn niet licht — gebruik `loading="lazy"` en toon een eenvoudige fallback voor trage verbindingen.

---

### 3.4 React Three Fiber (R3F) — geprogrammeerde 3D effecten

Voor meer controle dan Spline: **React Three Fiber** laat je Three.js gebruiken als React JSX. De **Drei** helper library voegt kant-en-klare componenten toe.

**Installatie:**
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
```

**Effect: Interactieve particle-bol die meebeweegt met de cursor**
```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * 1.5;
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 1.5;
      arr[i * 3 + 2] = Math.cos(phi) * 1.5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#6366F1" size={0.005} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export function HeroCanvas() {
  return (
    <Canvas className="absolute inset-0 -z-10" camera={{ position: [0, 0, 3] }}>
      <Particles />
    </Canvas>
  );
}
```

**Effect: Floating 3D tech-logo's** — gebruik `@react-three/drei`'s `Float` component:
```tsx
import { Float, Text3D, Center } from "@react-three/drei";

<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
  <Center>
    <Text3D font="/fonts/inter.json" size={0.4}>
      TypeScript
      <meshStandardMaterial color="#6366F1" metalness={0.8} roughness={0.2} />
    </Text3D>
  </Center>
</Float>
```

---

### 3.5 Aceternity UI — copy-paste animated components

**Aceternity UI** (ui.aceternity.com) is een collectie van 200+ geprefabriceerde animated components voor Next.js + Tailwind + Framer Motion. Je kopieert de code rechtstreeks in je project — geen npm package nodig.

**Top components voor je portfolio:**

| Component | Effect | Gebruik op |
|---|---|---|
| **Spotlight** | Lichtstraal die de muis volgt over een dark surface | Hero sectie achtergrond |
| **3D Card Effect** | Card kantelt mee met muispositie (perspective tilt) | Project cards |
| **Background Beams** | Gloeiende stralen die door het scherm lopen | Stage-sectie header |
| **Sparkles** | Willekeurige glinsterende deeltjes | Naam in hero of section titles |
| **Text Generate Effect** | Woorden verschijnen één voor één alsof ze getypt worden | Hero tagline |
| **Wavy Background** | SVG golven animeren als achtergrond | Footer of transities tussen secties |
| **Animated Tooltip** | Hover-tooltip met vloeiende animatie | Tech stack badges |
| **Bento Grid** | Responsive mosaic layout voor cards | Achievements sectie |

**Spotlight + Hero voorbeeld:**
```tsx
// Kopieer de Spotlight component van ui.aceternity.com/components/spotlight
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0F1117] overflow-hidden">
      <Spotlight className="-top-40 -left-10" fill="#6366F1" />
      <Spotlight className="top-10 right-0" fill="#22D3EE" />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white">Alex Hendrickx</h1>
        <p className="text-xl text-slate-400 mt-4">Bachelor Informatica · Thomas More</p>
      </div>
    </div>
  );
}
```

**3D Card voor projecten:**
```tsx
// ui.aceternity.com/components/3d-card-effect
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ProjectCard({ title, description, tech }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#1A1D27] border border-[#2D3748] rounded-xl p-6 w-80 h-auto">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          {title}
        </CardItem>
        <CardItem translateZ="30" className="text-sm text-slate-400 mt-2">
          {description}
        </CardItem>
        <CardItem translateZ="60" className="mt-4 flex gap-2 flex-wrap">
          {tech.map(t => (
            <span key={t} className="px-2 py-1 text-xs bg-indigo-900/40 text-indigo-300 rounded-full">{t}</span>
          ))}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
```

**Website:** https://ui.aceternity.com/components
**Alle components zijn gratis**, premium templates kosten eenmalig $199 (niet nodig voor een portfolio).

---

### 3.6 Magic UI — micro-interactions en marketing animations

**Magic UI** (magicui.design) focust op gepolijste micro-interactions die premium aanvoelen zonder theatraal te zijn. Veel gebruikt op developer portfolio-sites en indie SaaS products. Ook hier: copy-paste filosofie.

**Top components voor je portfolio:**

| Component | Effect | Gebruik op |
|---|---|---|
| **Shimmer Button** | CTA-knop met een glinsterende lichtstreep die over de knop beweegt | "Bekijk mijn stage" CTA |
| **Animated Gradient Text** | Tekst met een animerende kleurgradiënt | Naam in hero of sectie-titels |
| **Blur Fade** | Content verschijnt met een vloeiende blur-to-focus animatie | Elke sectie bij scroll |
| **Retro Grid** | Animated perspectief-grid als achtergrond | Hero achtergrond |
| **Animated Beam** | Lijn die animeert van punt A naar punt B | Technologie-verbindingen visualiseren |
| **Border Beam** | Animerende gloeiende rand rond een card | Featured projectcard |
| **Marquee** | Oneindige scrollende rij van items | Tech stack skills-balk |
| **Number Ticker** | Getal telt op van 0 naar eindwaarde | Stats boven de fold |
| **Word Rotate** | Woorden wisselen vloeiend af op dezelfde plek | Hero tagline variaties |

**Installatie:**
```bash
npx magicui-cli add shimmer-button
npx magicui-cli add animated-gradient-text
npx magicui-cli add blur-fade
```

**Shimmer Button voorbeeld:**
```tsx
import { ShimmerButton } from "@/components/magicui/shimmer-button";

<ShimmerButton
  shimmerColor="#6366F1"
  background="#1A1D27"
  className="text-white font-semibold px-8 py-3"
>
  Bekijk mijn stage
</ShimmerButton>
```

**Marquee tech stack:**
```tsx
import { Marquee } from "@/components/magicui/marquee";

const skills = ["TypeScript", "React", "Next.js", "Docker", "Python", "PostgreSQL", "Node.js", "Git"];

<Marquee className="py-4" pauseOnHover>
  {skills.map(skill => (
    <div key={skill} className="mx-4 px-4 py-2 bg-[#1A1D27] border border-[#2D3748] rounded-lg text-slate-300 text-sm">
      {skill}
    </div>
  ))}
</Marquee>
```

**Website:** https://magicui.design/components

---

### 3.7 react-bits — #2 JS Rising Stars 2025

**react-bits** (react-bits.dev) is de snelst groeiende animated component library van 2025. 110+ components, copy-paste, geen npm install. Fokust op tekst-animaties en scroll-reveals die bijzonder goed werken voor portfolio's.

**Top components:**

| Component | Effect |
|---|---|
| **SplitText** | Elke letter/woord animeert apart in |
| **BlurText** | Tekst verschijnt van wazig naar scherp |
| **ScrollReveal** | Tekst onthult zichzelf woord per woord bij scroll |
| **RotatingText** | Woorden draaien verticaal als een flip-klok |
| **GlitchText** | Tekst heeft een cyberpunk glitch-effect |
| **Silk** | Vloeiende zijde-achtige achtergrond (WebGL) |
| **Orb** | Gloeiende interactieve bol die muisbewegingen volgt |
| **Noise** | Organisch noise-patroon als achtergrond |
| **MagneticButton** | Knop wordt magnetisch aangetrokken door de cursor |

**Website:** https://react-bits.dev

---

### 3.8 Custom cursor effecten

Een custom cursor is een van de meest opvallende kenmerken van een developer portfolio. Simpel te implementeren, groot visueel effect.

**Optie 1: Magnetische cursor (pure CSS + JS)**
```tsx
"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      if (trailRef.current) {
        setTimeout(() => {
          if (trailRef.current) {
            trailRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
          }
        }, 80);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-indigo-400 rounded-full pointer-events-none z-50 transition-transform duration-75" />
      <div ref={trailRef} className="fixed top-0 left-0 w-8 h-8 border border-indigo-400/50 rounded-full pointer-events-none z-50 transition-transform duration-200" />
    </>
  );
}
```

**Optie 2: react-bits `MagneticButton`** — knoppen worden magnetisch aangetrokken.

---

### 3.9 Texture & noise achtergronden

Echte top-tier portfolios gebruiken subtiele noise/texture overlays. Dit geeft het "premium printed" gevoel.

**Noise overlay (CSS only):**
```css
/* globals.css */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}
```

**Grainy gradient hero achtergrond (Tailwind):**
```tsx
<div className="relative min-h-screen">
  {/* Radial gradient blobs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
  {/* Content bovenop */}
  <div className="relative z-10">...</div>
</div>
```

---

### 3.10 Page transitions met Framer Motion

Vloeiende overgangen tussen pagina's geven een app-gevoel aan je portfolio.

**`layout.tsx` — AnimatePresence wrapper:**
```tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### 3.11 Snelheids- en performance tips

Animaties mogen niet ten koste gaan van laadtijd. Dit zijn de regels:

- Gebruik `will-change: transform` alleen waar nodig (kan geheugen kosten)
- Spline scenes: laad `lazy`, toon skeleton fallback
- R3F Canvas: gebruik `frameloop="demand"` als de scene niet continu animeert
- GSAP ScrollTrigger: gebruik `invalidateOnRefresh: true` voor responsive correctheid
- Framer Motion: gebruik `layout` animaties spaarzaam (duur voor de CPU)
- Altijd `@media (prefers-reduced-motion: reduce)` respecteren:

```typescript
// GSAP: check reduced motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  // animaties pas hier
}
```

---

### 3.12 Visuele hiërarchie — welk effect waar

| Sectie | Aanbevolen effects |
|---|---|
| **Hero** | Spline 3D achtergrond of R3F particles + Spotlight (Aceternity) + SplitText (GSAP) + Shimmer CTA (Magic UI) |
| **About me** | Blur Fade bij scroll (Magic UI) + Marquee voor skills (Magic UI) + 3D card voor CV-download |
| **Stage** | Background Beams (Aceternity) achter de header + Border Beam op document-download cards |
| **Projects** | 3D Card Effect per projectcard (Aceternity) + GSAP scroll-pin voor horizontale scroll |
| **Footer** | Wavy Background (Aceternity) + Animated Beam tussen socials |
| **Globaal** | Lenis smooth scroll + Custom cursor + Page transitions (Framer Motion) + Noise texture overlay |

---

## 4. Paginastructuur & Content

### Home Page

**Doel:** Eerste indruk, context geven, navigatie.

Structuur:
1. **Navbar** — logo/naam links, links rechts (About, Stage, Projects)
2. **Hero section**
   - Naam + korte tagline: bv. "IT-student | Informatica @ Thomas More"
   - 1 zin wat dit portfolio is: "Dit is mijn graduation portfolio — een overzicht van mijn stage en projecten als bewijs van mijn bachelor-niveau in IT."
   - CTA-knop: "Bekijk mijn stage" → link naar /internship
3. **Korte preview** — 2-3 highlight cards (stage, top project, achievement)
4. **Footer** — links naar socials, contact

> Pas op voor overlap met About me. Home = context + navigatie. About me = wie jij bent.

### About Me

**Doel:** Persoonlijke connectie maken met de jury.

Structuur:
1. Professionele foto (verplicht — geen selfie, geen groepsfoto)
2. Introductietekst in eerste persoon:
   - Wie ben je? Wat studeer je en waarom?
   - Wat zijn je interesses binnen IT (bv. backend, cloud, security)?
   - 1-2 persoonlijke details die je menselijk maken
3. Skills-overzicht (bv. badges met tech: JavaScript, Python, Docker, ...)
4. Downloadknop CV (verplicht — als PDF, knop opent download of nieuw tabblad)
5. Contact: e-mail, LinkedIn, GitHub

> Schrijf in de ik-vorm. Vermijd zakelijke derde persoon ("Alex is een gemotiveerde student...").

### Stage-sectie (nieuw — verplicht)

**Doel:** Aantonen dat je je stage succesvol hebt afgerond + jury informeren.

Structuur:
1. **Titel van de stageopdracht** (officiële titel)
2. **Samenvatting** — 3-5 zinnen synopsis/abstract
   - Focus op WHAT en HOW
   - In de **verleden tijd** (verplicht per ECTS)
   - GEEN week-per-week verslag
   - Voorbeeld: "Tijdens mijn stage bij [Bedrijf] ontwikkelde ik een [wat]. Ik gebruikte [technologieën] om [wat op te lossen]. Het resultaat was [concreet resultaat]."
3. **Download-sectie** — drie duidelijke download-knoppen, elk opent PDF in nieuw tabblad:
   - Projectplan
   - Realisatiedocument (thesis)
   - Reflectie
4. Optioneel: screenshots, architectuurdiagram, technologie-badges

> Geen gevoelige bedrijfsinformatie publiceren. Check of documenten mogen worden gedeeld.

### Achievements & Projects

**Doel:** Bewijzen dat je meer bent dan alleen je stage — breed bachelor-niveau tonen.

Per project/achievement:
1. Titel
2. Context: "Schoolproject — [vak]" of "Persoonlijk project" of "Hackathon"
3. Samenvatting: wat en hoe (focus op jouw bijdrage bij groepswerk)
4. Tech stack badges
5. Visuele ondersteuning: screenshot, video, link naar repo
6. Eventueel: link naar live demo of GitHub

Wat je kan highlighten:
- Badges van online cursussen (Coursera, Azure, AWS, ...)
- Hackathon-deelnames of prijzen
- Interessante schoolprojecten
- Persoonlijke side projects
- Open source bijdrages

> Bij teamprojecten: benadruk expliciet jouw eigen bijdrage. Geef ook credit aan teamleden.

---

## 5. Claude Code Setup — Skills & Tools

### Waarom Claude Code gebruiken voor je portfolio?

Claude Code werkt in je terminal en heeft directe toegang tot je projectbestanden. In combinatie met skills en MCP-servers kan het je volledige portfolio-codebase begrijpen en versneld helpen bouwen.

### Stap 1: Claude Code installeren

```bash
npm install -g @anthropic-ai/claude-code
claude  # eerste keer authenticeren
```

> Je hebt Claude Code voor VS Code of de terminal. Beide werken.

### Stap 2: UI UX Pro Max Skill installeren

De **UI UX Pro Max skill** (github.com/nextlevelbuilder/ui-ux-pro-max-skill) geeft Claude Code een compleet design intelligence systeem: 67 stijlen, 161 kleurenpaletten, 57 font-combinaties, en een reasoning engine die automatisch het beste design system selecteert voor jouw use case.

```bash
# Installeer de CLI globaal
npm install -g uipro-cli

# Ga naar je portfolio project
cd /path/to/portfolio

# Installeer de skill voor Claude Code
uipro init --ai claude
```

Dit schrijft de skill naar `.claude/skills/ui-ux-pro-max/`. Claude Code pikt dit automatisch op.

**Gebruik:**
```
# In Claude Code terminal:
Build a portfolio landing page for an IT student graduating in computer science
```
De skill genereert automatisch een compleet design system op basis van je context.

### Stap 3: Graphify installeren (optioneel maar nuttig)

De **Graphify skill** (github.com/safishamsi/graphify) bouwt een knowledge graph van je codebase. Handig als je portfolio complexer wordt en je wil dat Claude Code de hele structuur begrijpt.

```bash
# Installeer graphify
uv tool install graphifyy

# Registreer de skill
graphify install  # schrijft naar ~/.claude/

# Bouw de graph van je project
cd /path/to/portfolio
/graphify .
```

Na de graph-build snapt Claude Code in één keer hoe alle componenten samenhangen. Gebruik je dan `/graphify query "hoe werkt de navigatie"` om context-rijke antwoorden te krijgen.

### Stap 4: MCP-servers (optioneel)

Je hebt al Google Drive, Gmail en Google Calendar verbonden. Nuttige use cases voor je portfolio:

- **Google Drive MCP**: laat Claude Code je stagedocumenten rechtstreeks ophalen vanuit Drive voor referentie
- **Gmail MCP**: help bij het schrijven van de jury invite mail

Activeer ze in claude.ai via Settings > Integrations (al actief voor jou).

### CLAUDE.md — instructies voor je project

Maak een `CLAUDE.md` aan in de root van je portfolio-project. Dit is het "geheugen" van Claude Code voor jouw specifieke project:

```markdown
# Portfolio Alex Hendrickx — Claude Instructions

## Project context
Dit is een graduation portfolio voor de opleiding Informatica aan Thomas More.
Het portfolio moet voldoen aan de vereisten van het vak ITF – Internship & Portfolio.

## Tech stack
- Next.js 14 (App Router)
- Tailwind CSS v3
- Framer Motion (page transitions, scroll reveals, layout animations)
- GSAP + ScrollTrigger (timeline animations, scroll-driven effects, SplitText)
- Lenis (smooth scroll, gekoppeld aan GSAP ScrollTrigger)
- Aceternity UI (Spotlight, 3D Card, Background Beams, Sparkles — copy-paste components)
- Magic UI (ShimmerButton, Marquee, BlurFade, BorderBeam — copy-paste components)
- React Three Fiber + Drei (optioneel: 3D particle hero)
- TypeScript
- Deployed op Vercel

## Design system
- Stijl: Minimalism + Bento Grid, dark theme
- Primaire kleur: Indigo (#6366F1)
- Accent: Cyan (#22D3EE)
- Achtergrond: #0F1117
- Surface/cards: #1A1D27
- Borders: #2D3748
- Font: Inter (sans) + JetBrains Mono (code)
- Alle page transitions via Framer Motion AnimatePresence
- Scroll-animaties via GSAP ScrollTrigger + Lenis
- Aceternity Spotlight op hero, 3D Card voor projects, Background Beams voor stage
- Magic UI ShimmerButton voor CTA's, Marquee voor tech stack

## Vereisten portfolio (ThomasMore)
- Home page met doel van portfolio
- About me sectie met downloadbare CV
- Stage-sectie met: titel, samenvatting (verleden tijd, what+how), 3 download-links (PDF: projectplan, realisatie, reflectie)
- Achievements & Projects sectie

## Code conventies
- Gebruik altijd TypeScript
- Componentnamen in PascalCase
- "use client" directive waar animaties of browser APIs worden gebruikt
- Tailwind classes, geen custom CSS tenzij noodzakelijk
- Alle PDF-links openen in nieuw tabblad (target="_blank" + rel="noopener")
- Geen emojis als decoratieve iconen — gebruik Lucide React
- Respecteer altijd prefers-reduced-motion voor animaties
- GSAP: registreer plugins in lib/gsap.ts, importeer van daar
- Aceternity/Magic UI components staan in components/ui/ (copy-paste)
```

---

## 6. Prompts per sectie

Gebruik deze prompts in Claude Code of claude.ai om elke sectie te bouwen.

### Prompt: Hero + Home Page (met epic animaties)

```
Build the home page hero section for my graduation portfolio.

Context:
- Name: Alex Hendrickx
- Study: Bachelor Informatica at Thomas More
- Purpose: Graduation portfolio showing internship + projects
- Style: Dark theme, minimalist, professional IT portfolio
- Stack: Next.js 14, Tailwind CSS, Framer Motion, GSAP, TypeScript

Requirements:
- Full-screen hero with dark background (#0F1117)
- Two radial gradient "blob" glows (indigo + cyan) as background ambiance
- Aceternity UI Spotlight effect that follows the mouse
- Animated headline using GSAP SplitText: each character flies in from below on load
- Tagline using Magic UI "Word Rotate" cycling through: "Developer", "IT Student", "Problem Solver"
- Magic UI Shimmer Button as CTA: "Bekijk mijn stage" linking to /internship
- Lenis smooth scroll already set up globally
- Framer Motion page entry animation (opacity + y)
- Responsive (mobile + desktop)
- Wrap everything in a "use client" component
- Respect prefers-reduced-motion

Generate the full Hero component in TypeScript with all imports.
```

### Prompt: About Me sectie

```
Build an About Me section for my IT graduation portfolio.

Requirements:
- First-person tone, professional but personal
- Includes: intro text, skills badges (tech stack), CV download button
- CV download opens in new tab (PDF)
- Skills: [VUL IN: jouw eigen tech stack hier]
- Contact links: email, LinkedIn, GitHub
- Photo placeholder (I'll replace with my own image)
- Stack: Next.js, Tailwind CSS, TypeScript, Framer Motion
- Style: dark theme, clean, no emojis
- CV download button must be clearly visible and labeled "Download CV (PDF)"

Generate the full AboutSection component.
```

### Prompt: Stage-sectie

```
Build the Internship section for my graduation portfolio.

Requirements:
- Section title: "Stage"
- Internship title: [VUL IN: officiële titel van je stage]
- Summary: 3-5 sentences about what I did and how (past tense, focus on what+how)
  [VUL IN: je eigen samenvatting hier]
- Three download buttons (PDF, each opens in new tab):
  1. "Projectplan" → /documents/projectplan.pdf
  2. "Realisatiedocument" → /documents/realisatie.pdf
  3. "Reflectie" → /documents/reflectie.pdf
- Optional: technology badges used during internship
- Stack: Next.js, Tailwind CSS, TypeScript
- Style: dark theme, clear document download section with icons (Lucide: FileText)

Generate the full InternshipSection component.
```

### Prompt: Project Card component (met 3D tilt effect)

```
Build a reusable ProjectCard component for my portfolio's Achievements & Projects section.
Use the Aceternity UI "3D Card Effect" (CardContainer + CardBody + CardItem).

Each card should show:
- Project title (translateZ 50)
- Context label: "Schoolproject", "Persoonlijk project" or "Hackathon" (translateZ 20)
- Short description (translateZ 30)
- Tech stack badges as colored pills (translateZ 60 — floats above card)
- Optional: GitHub link + live demo link (translateZ 80 — furthest forward)
- Optional: screenshot image as CardItem

Requirements:
- 3D perspective tilt on mouse hover (Aceternity CardContainer)
- Magic UI BorderBeam effect on the featured/first card
- Dark theme (bg: #1A1D27, border: #2D3748)
- Framer Motion BlurFade entrance animation when scrolling into view
- TypeScript interface for props
- Stack: Next.js, Tailwind CSS, Framer Motion, Aceternity UI

Generate the ProjectCard component with TypeScript interface and a usage example with 3 sample projects.
```

### Prompt: Jury Invite Mail

```
Write a professional jury invite email for my graduation portfolio presentation.

Context:
- My name: Alex Hendrickx
- Study: Bachelor Informatica, Thomas More
- Portfolio URL: https://alexhendrickx.vercel.app/
- Presentation date: [VUL IN]
- I need to send individual emails to each jury member

Requirements:
- Professional and polite tone
- Thank them for being part of the jury
- Include portfolio URL clearly
- Ask for confirmation of receipt
- Subject line included
- In Dutch (formal "u")

Generate two versions: one formal, one slightly warmer in tone.
```

### Prompt: Design System laten genereren (UI UX Pro Max)

```
Using the UI UX Pro Max skill, generate a complete design system for my project:

Project: Graduation portfolio for an IT Bachelor student (Computer Science)
Target audience: IT professionals and jury members
Goal: Prove bachelor-level competency in IT

Please generate:
- Recommended UI style with reasoning
- Complete color palette (hex values)
- Typography recommendation (Google Fonts)
- Key effects and interactions
- Anti-patterns to avoid
- Pre-delivery checklist
```

---

## 7. UX & Toegankelijkheid

### Verplichte UX-regels (per syllabus)

- Alle ondersteunende documenten (PDF) openen in nieuw tabblad
- Controleer alle externe links op beschikbaarheid (geen dode links)
- Correct taalgebruik: geen spelfouten, formele maar vlotte stijl
- Gebruik spellcheck EN laat iemand meelezen
- Site moet beschikbaar zijn voor externe gebruikers (niet alleen intern netwerk)

### Extra UX best practices

- `cursor-pointer` op alle klikbare elementen
- Hover states met vloeiende transities (150–300ms)
- Focus states zichtbaar voor toetsenbord-navigatie
- Minimale tekstcontrast: 4.5:1 (WCAG AA)
- `prefers-reduced-motion` respecteren voor animaties
- Responsief: test op 375px (mobiel), 768px (tablet), 1440px (desktop)
- Alle afbeeldingen hebben `alt`-tekst
- Geen autoplay audio of video

### Document-links checklist

Elke PDF-downloadlink moet:
- In een nieuw tabblad openen: `target="_blank" rel="noopener noreferrer"`
- Een duidelijk label hebben (bv. "Download Projectplan (PDF)")
- Een FileText-icoon hebben (Lucide React)
- Bereikbaar zijn voor externe gebruikers (upload naar Vercel `public/` folder)

---

## 8. Pre-launch checklist

Doorloop dit voordat je de invite mail stuurt.

### Inhoud

- [ ] Home page: doel van portfolio duidelijk, geen overlap met About me
- [ ] About me: professionele foto, CV downloadbaar als PDF, contactgegevens aanwezig
- [ ] Stage: officiële titel, samenvatting in verleden tijd, alle 3 documenten downloadbaar
- [ ] Achievements: minstens 2-3 projecten uitgewerkt met context + eigen bijdrage
- [ ] Geen spelfouten (dubbele check door iemand anders)

### Technisch

- [ ] Alle PDF-links werken en openen in nieuw tabblad
- [ ] Geen dode links (check elke externe link)
- [ ] Site bereikbaar zonder login voor externe gebruikers
- [ ] Link getest via account buiten Thomas More netwerk (vriend/familielid)
- [ ] Responsive op mobiel + desktop
- [ ] Laadtijd acceptabel (geen enorme niet-geoptimaliseerde afbeeldingen)

### Confidentialiteit

- [ ] Geen gevoelige bedrijfsinformatie gepubliceerd
- [ ] Stagedocumenten goedgekeurd voor publicatie
- [ ] Geen persoonlijke data van derden zichtbaar

### Vóór de invite mail

- [ ] Supervisor van ThomasMore heeft een "go-ahead" gegeven na portfoliocheck
- [ ] Canvas checklist doorlopen
- [ ] Vriend/kennis (geen ThomasMore-lid) heeft de checklist ook doorlopen
- [ ] Lijst met e-mailadressen jurymembers beschikbaar (Canvas, vanaf 2 juni)
- [ ] Portfoliolink klaar voor verzending

### Invite mail timing

- Mag pas verstuurd worden **na 3 juni**
- Uiterste deadline: **10 juni (middernacht)**
- Na verzending: **geen wijzigingen** meer aan portfolio
- Upload ook zip van portfolio naar Canvas (assignments)

---

## Bronnen

**Framework & Hosting**
- Next.js documentatie: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel deploy: https://docs.vercel.com

**Animaties & Motion**
- GSAP documentatie: https://gsap.com/docs/v3/
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Framer Motion: https://www.framer.com/motion/
- Lenis smooth scroll: https://github.com/darkroomengineering/lenis

**3D & WebGL**
- Spline (3D design tool): https://spline.design
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Drei helpers: https://github.com/pmndrs/drei

**Component Libraries**
- Aceternity UI: https://ui.aceternity.com/components
- Magic UI: https://magicui.design/components
- react-bits: https://react-bits.dev

**Skills & AI Tools**
- UI UX Pro Max Skill: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Graphify Skill: https://github.com/safishamsi/graphify
- Claude Code documentatie: https://docs.claude.com

**Icons**
- Lucide React: https://lucide.dev

---

*Dit document is opgesteld op basis van de officiële ECTS-vereisten van het vak ITF – Internship & Portfolio (ThomasMore), de aanbevelingen uit de UI UX Pro Max en Graphify skills, en de beste developer portfolio-practices van 2025–2026.*
