# Claude Code Werkwijze — Portfolio Stap voor Stap
**Alex Hendrickx | Graduation Portfolio**

> Dit document legt exact uit hoe je het portfolio opbouwt in Claude Code:
> welke prompts je wanneer gebruikt, hoe je persoonlijke info invult,
> en in welke volgorde je alles aanpakt.

---

## De Gouden Regel

**Geef Claude Code altijd maximale context.**
Hoe meer je uitlegt — wie je bent, wat het doel is, welk design je wil — hoe beter het resultaat.
Behandel Claude Code als een senior developer die je project nog niet kent.

---

## Fase 0 — Project opzetten (doe dit éénmalig)

### Stap 0.1 — Next.js project aanmaken

Open je terminal en voer dit uit:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
cd alexhendrickx_portfolio
```

Kies bij de vragen:
- TypeScript → **Yes**
- Tailwind → **Yes**
- ESLint → **Yes**
- App Router → **Yes**
- src/ directory → **No**
- Import alias → **Yes (@/*)**

### Stap 0.2 — Alle dependencies installeren

```bash
# Animaties
npm install framer-motion gsap lenis

# 3D (optioneel maar indrukwekkend)
npm install three @react-three/fiber @react-three/drei

# Spline 3D embed
npm install @splinetool/react-spline @splinetool/runtime

# Icons
npm install lucide-react

# Magic UI CLI
npm install -g uipro-cli
uipro init --ai claude

# Aceternity UI heeft geen npm package — components kopieer je per stuk
# van ui.aceternity.com (zie Fase 2)
```

### Stap 0.3 — CLAUDE.md aanmaken

Maak een bestand `CLAUDE.md` in de root van je project. Dit is het geheugen van Claude Code — het leest dit bij elke sessie.

**Kopieer dit en vul de `[VUL IN]`-velden in:**

```markdown
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
- Deployed op Vercel

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
```

### Stap 0.4 — GitHub repo aanmaken + Vercel koppelen

```bash
git init
git add .
git commit -m "initial setup"
# Maak repo aan op github.com, push ernaar
git remote add origin https://github.com/jouw-username/portfolio.git
git push -u origin main
```

Ga naar vercel.com → "Add new site" → "Import from Git" → koppel je GitHub repo.
Elke `git push` deployt automatisch.

---

## Fase 1 — Fundament (globale layout, Lenis, fonts)

### Claude Code prompt 1 — Globale setup

Open Claude Code in je projectmap en geef deze prompt:

```
Read CLAUDE.md first.

Set up the global foundation for my portfolio:

1. Install and configure next/font with Geist Sans and JetBrains Mono
2. Create lib/gsap.ts that registers ScrollTrigger and other plugins
3. Create components/LenisProvider.tsx — smooth scroll provider that:
   - Uses Lenis with lerp: 0.08
   - Connects Lenis to GSAP ScrollTrigger ticker
   - Is a "use client" component
4. Update app/layout.tsx to:
   - Use Geist + JetBrains Mono via next/font
   - Wrap children in LenisProvider
   - Set dark background color in body className
   - Add basic metadata (title: "Alex Hendrickx | Portfolio")
5. Update globals.css with:
   - CSS variables for all design system colors
   - A subtle noise texture overlay via ::before on body
   - Hide default cursor (we'll add custom cursor later)
   - Base typography styles

Generate all files completely.
```

---

## Fase 2 — Navbar + Page Transitions

### Claude Code prompt 2 — Navbar

```
Read CLAUDE.md first.

Build the Navbar component (components/Navbar.tsx):

Requirements:
- Fixed top, full width, subtle backdrop blur (bg-black/20 backdrop-blur-md)
- Left: "AH" monogram logo (styled, links to /)
- Right: navigation links — Home, About, Stage, Projects
- Active link gets indigo underline (use usePathname)
- On scroll down: navbar gets slightly more opaque
- Mobile: hamburger menu with Framer Motion slide-down drawer
- Smooth transition on all states
- "use client"

Also create components/PageTransition.tsx:
- Wraps children with Framer Motion AnimatePresence
- Uses usePathname as key
- Entry: opacity 0 + y:16 → opacity 1 + y:0 (0.35s, ease [0.22, 1, 0.36, 1])
- Exit: opacity 1 + y:0 → opacity 0 + y:-16

Add PageTransition to app/layout.tsx around {children}.
```

---

## Fase 3 — Home Page + Hero

Dit is de meest impactvolle sectie. Neem hier de meeste tijd voor.

### Stap 3.1 — Aceternity Spotlight component kopiëren

Ga naar: **https://ui.aceternity.com/components/spotlight**
Klik "Copy" → maak bestand `components/ui/spotlight.tsx` → plak de code.

### Stap 3.2 — Magic UI ShimmerButton kopiëren

Ga naar: **https://magicui.design/components/shimmer-button**
Klik "Copy" → maak bestand `components/ui/shimmer-button.tsx` → plak de code.

### Claude Code prompt 3 — Hero sectie

```
Read CLAUDE.md first.

I have already copied these components into components/ui/:
- spotlight.tsx (Aceternity UI)
- shimmer-button.tsx (Magic UI)

Build the Hero section (components/HeroSection.tsx):

Visual structure:
- Full viewport height, dark bg (#0F1117), overflow hidden
- Two large radial gradient blobs as background ambiance:
  - Blob 1: indigo (#6366F1), top-left, 600px, opacity 15%, animate-pulse
  - Blob 2: cyan (#22D3EE), bottom-right, 500px, opacity 10%, animate-pulse delay-1000
- Aceternity Spotlight: two instances, one indigo left, one cyan right
- Content centered vertically and horizontally

Text content:
- Small badge above name: "Graduation Portfolio 2025" with a subtle border
- Main heading: "Alex Hendrickx" — large (text-6xl md:text-8xl), bold, white
  Apply GSAP SplitText animation on mount: each char flies in from y:60, rotateX:-90, stagger 0.02
- Subheading: "Bachelor Informatica · Thomas More"
  Use Magic UI AnimatedGradientText or simple gradient text in indigo→cyan
- Body: one sentence portfolio purpose
- CTA: ShimmerButton "Bekijk mijn stage →" linking to /internship

Entry animation:
- Badge: Framer Motion fadeIn delay 0.2s
- Name: GSAP SplitText (see above), starts after 0.3s
- Subheading: Framer Motion fadeInUp delay 0.8s
- Body + CTA: Framer Motion fadeInUp delay 1.0s

Scroll indicator:
- Bottom center: animated bouncing chevron-down (Lucide) that fades out on scroll

"use client", TypeScript, respect prefers-reduced-motion.
Generate the complete component.
```

### Stap 3.3 — Hero persoonlijk invullen

Na generatie: open `components/HeroSection.tsx` en zoek naar:
- `"Alex Hendrickx"` → staat er al goed in
- De subheading tagline → pas aan naar wat jij wil uitstralen
- De body tekst → schrijf 1 zin over wat dit portfolio is

---

## Fase 4 — About Me

### Stap 4.1 — Magic UI Marquee kopiëren

Ga naar: **https://magicui.design/components/marquee**
Kopieer naar `components/ui/marquee.tsx`.

### Stap 4.2 — Magic UI BlurFade kopiëren

Ga naar: **https://magicui.design/components/blur-fade**
Kopieer naar `components/ui/blur-fade.tsx`.

### Claude Code prompt 4 — About Me

```
Read CLAUDE.md first.

I have copied these into components/ui/:
- marquee.tsx (Magic UI)
- blur-fade.tsx (Magic UI)

Build app/about/page.tsx and components/AboutSection.tsx.

Layout (two columns on desktop, stacked on mobile):
LEFT COLUMN:
- Professional photo (use /public/images/photo.jpg as src, add alt text)
- Below photo: contact row with Lucide icons — Mail, Linkedin, Github
  Each links to the actual contact (placeholders for now: [EMAIL], [LINKEDIN], [GITHUB])
- CV download button (Shimmer style): "Download CV (PDF)" → /documents/cv.pdf target="_blank"

RIGHT COLUMN:
- "About me" heading with indigo left border accent
- Personal intro text (3 paragraphs, first person):
  Paragraph 1: [PLACEHOLDER - who you are, what you study and why]
  Paragraph 2: [PLACEHOLDER - your interests in IT, what excites you technically]
  Paragraph 3: [PLACEHOLDER - personal detail, something outside IT that shows personality]
- Skills section heading: "Tech Stack"
- Magic UI Marquee with tech skill badges (two rows, opposite directions):
  Row 1: TypeScript, React, Next.js, Node.js, Python, Docker, [ADD YOUR SKILLS]
  Row 2: PostgreSQL, Git, Linux, REST API, [ADD YOUR SKILLS]
  Each badge: small pill, dark bg, indigo text/border

Animations:
- BlurFade on every element as it scrolls into view (stagger 0.1s between elements)
- Photo: slight scale-up on hover

"use client", TypeScript.
Generate the complete files.
```

### Stap 4.3 — About Me persoonlijk invullen

Dit is het persoonlijkste onderdeel. Na generatie vul je in:

**Foto:**
- Zet je professionele foto in `/public/images/photo.jpg`
- Verander in de code: `src="/images/photo.jpg"` staat er al

**Tekst (de 3 paragrafen):**
Zoek de `[PLACEHOLDER]` teksten en vervang ze. Tips:
```
Paragraaf 1 voorbeeld:
"Ik ben Alex Hendrickx, een afstuderende student Informatica
aan Thomas More Hogeschool. Mijn interesse in IT begon toen ik
op mijn 14e mijn eerste website bouwde en zag dat code letterlijk
dingen tot leven brengt."

Paragraaf 2 voorbeeld:
"Tijdens mijn opleiding groeide mijn passie voor [jouw specialisatie].
Ik vind het fascinerend hoe [technische interesse]. Mijn stage bij
[bedrijf] gaf me de kans om dit in de praktijk toe te passen."

Paragraaf 3 voorbeeld:
"Buiten programmeren [hobby/persoonlijkheid]. Dit leerde me [wat
het je meegaf — doorzettingsvermogen, creativiteit, ...], iets
wat ik ook in mijn werk als developer terugzie."
```

**Skills:**
Vervang de `[ADD YOUR SKILLS]` door jouw echte skills. Wees eerlijk — de jury kent IT.

**Contact:**
Vervang `[EMAIL]`, `[LINKEDIN]`, `[GITHUB]` met je echte links.

**CV:**
- Zet je CV als PDF in `/public/documents/cv.pdf`
- De download link werkt dan automatisch

---

## Fase 5 — Stage-sectie

### Stap 5.1 — Aceternity Background Beams kopiëren

Ga naar: **https://ui.aceternity.com/components/background-beams**
Kopieer naar `components/ui/background-beams.tsx`.

### Claude Code prompt 5 — Stage sectie

```
Read CLAUDE.md first.

I have copied into components/ui/:
- background-beams.tsx (Aceternity UI)

Build app/internship/page.tsx and components/InternshipSection.tsx.

Structure:

HEADER (full width, relative):
- Aceternity BackgroundBeams as the background
- Over the beams: section title "Stage" (large, white)
- Subtitle: official internship title → "[STAGE_TITEL]"
- Company badge: "[BEDRIJF]" with a subtle border

SUMMARY SECTION:
- Heading: "Overzicht"
- Summary text (3-5 sentences, past tense, what + how):
  [STAGE_SAMENVATTING - placeholder tekst]
- Optional: 3-4 technology badges used during internship

DOCUMENTS SECTION:
- Heading: "Documenten" with Lucide FileText icon
- Three download cards in a responsive grid (1 col mobile, 3 col desktop):
  Card 1: "Projectplan"
    - Lucide FileText icon (indigo)
    - Short description: "Het plan van aanpak voor de stageopdracht."
    - Download button → /documents/projectplan.pdf (target="_blank")
    - Magic UI BorderBeam effect on hover
  Card 2: "Realisatiedocument"
    - Same structure → /documents/realisatie.pdf
    - Description: "De volledige uitwerking van de stageopdracht (thesis)."
  Card 3: "Reflectie"
    - Same structure → /documents/reflectie.pdf
    - Description: "Persoonlijke reflectie op het stageproces."
- Each card: bg #1A1D27, border #2D3748, rounded-xl, hover: border-indigo glow

TECH STACK SECTION (optional):
- "Gebruikte technologieën" heading
- Grid of tech badges with icons

Animations:
- GSAP ScrollTrigger: header title slides in from left on scroll
- Document cards: Framer Motion stagger fadeInUp

"use client", TypeScript.
Generate complete files.
```

### Stap 5.2 — Stage persoonlijk invullen

Zoek in de gegenereerde code naar deze placeholders en vervang:

| Placeholder | Wat invullen |
|---|---|
| `[STAGE_TITEL]` | De officiële titel van je stageopdracht |
| `[BEDRIJF]` | Naam van je stagebedrijf |
| `[STAGE_SAMENVATTING]` | Jouw samenvatting (zie hieronder) |

**Samenvatting schrijven — template:**
```
Tijdens mijn stage bij [BEDRIJF] [wat heb je gedaan — 1 zin].
[Welk probleem loste je op — 1 zin].
Ik werkte met [technologieën] om [hoe je het aanpakte — 1 zin].
Het eindresultaat was [concreet resultaat — 1 zin].
[Optioneel: wat leerde je — 1 zin].
```

Richtlijnen:
- Schrijf in de **verleden tijd** (verplicht per ECTS)
- Focus op **WAT** en **HOE**, niet op wanneer of weekverslag
- Maximaal 5 zinnen
- Geen gevoelige bedrijfsinfo

**Documenten uploaden:**
Zet je PDFs in `/public/documents/`:
```
/public/documents/projectplan.pdf   ← jouw projectplan
/public/documents/realisatie.pdf    ← jouw thesis/realisatiedocument
/public/documents/reflectie.pdf     ← jouw reflectie
```

---

## Fase 6 — Projects & Achievements

### Stap 6.1 — Aceternity 3D Card kopiëren

Ga naar: **https://ui.aceternity.com/components/3d-card-effect**
Kopieer naar `components/ui/3d-card.tsx`.

### Claude Code prompt 6 — Projects overzicht

```
Read CLAUDE.md first.

I have copied into components/ui/:
- 3d-card.tsx (Aceternity UI — CardContainer, CardBody, CardItem)

Build app/projects/page.tsx and components/ProjectsSection.tsx.

Data structure — create a projects array in the component:
```typescript
const projects = [
  {
    id: 1,
    title: "[PROJECT_1_TITEL]",
    context: "[Schoolproject | Persoonlijk project | Hackathon]",
    description: "[PROJECT_1_BESCHRIJVING]",
    tech: ["[TECH_1]", "[TECH_2]"],
    github: "[GITHUB_URL_OF_NULL]",
    demo: "[DEMO_URL_OF_NULL]",
    image: "[/images/project1.png_OF_NULL]",
    featured: true
  },
  // herhaal voor elk project
]
```

Layout:
- Page heading "Projecten & Achievements" with GSAP ScrollTrigger text reveal
- Featured project (featured: true) gets bigger card + Magic UI BorderBeam
- Other projects in Bento Grid (masonry-achtig, 2-3 columns)

Per ProjectCard (gebruik Aceternity 3D Card):
- CardContainer wraps alles
- CardItem translateZ=50: project titel
- CardItem translateZ=20: context badge (kleurcodering: school=indigo, persoonlijk=cyan, hackathon=amber)
- CardItem translateZ=30: beschrijving
- CardItem translateZ=60: tech badges (floaten boven de card)
- CardItem translateZ=80: GitHub + Demo links (Lucide icons, open in new tab)
- CardItem translateZ=100: image als het er is (floats furthest forward)

Achievements sectie (onder projecten):
- Heading "Achievements"
- Grid van achievement badges (bv. online cursus-certificaten, hackathon-prijzen):
  Elke badge: icon + naam + bron + datum

Animaties:
- Framer Motion stagger op alle cards (BlurFade)
- GSAP ScrollTrigger op de sectie-headings

"use client", TypeScript, generate complete files.
```

### Stap 6.2 — Projects persoonlijk invullen

Dit is waar je jouw eigen projecten invoegt. Voor elk project in het `projects` array:

**Vragen om jezelf te stellen per project:**
1. Wat is de officiële naam?
2. Was het een school-, persoonlijk project of hackathon?
3. Beschrijf in 2 zinnen: wat doet het + welke tech?
4. Wat was **jouw** bijdrage (bij groepswerk)?
5. Heb je een GitHub/demo link?
6. Heb je een screenshot?

**Screenshots toevoegen:**
```bash
# Zet screenshots in:
/public/images/project1.png
/public/images/project2.png
# etc.
```

**Achievements voorbeelden:**
- Microsoft Azure Fundamentals badge → voeg toe
- Coursera certificaat → voeg toe
- Hackathon deelname/prijs → voeg toe
- Thomas More project award → voeg toe

---

## Fase 7 — Footer

### Claude Code prompt 7 — Footer

```
Read CLAUDE.md first.

Build components/Footer.tsx:

- Full width, dark bg (#0A0D14 — slightly darker than page bg)
- Subtle top border (border-[#2D3748]/50)
- Three columns on desktop, stacked on mobile:
  LEFT: "Alex Hendrickx" naam + "Bachelor Informatica · Thomas More 2025"
  CENTER: Navigation links (Home, About, Stage, Projects)
  RIGHT: Social links met Lucide icons (Mail, Linkedin, Github)
- Bottom bar: "© 2025 Alex Hendrickx · Graduation Portfolio"
- Optioneel: Aceternity Wavy Background als subtiele footer achtergrond

Add to app/layout.tsx.
```

---

## Fase 8 — Custom cursor + finishing touches

### Claude Code prompt 8 — Custom cursor + polish

```
Read CLAUDE.md first.

Add these finishing touches:

1. Custom cursor (components/CustomCursor.tsx):
   - Small filled circle (w-3 h-3, indigo) that follows mouse exactly
   - Larger ring (w-8 h-8, indigo border) that follows with 80ms delay
   - On hover over links/buttons: cursor expands (scale 2) and ring disappears
   - Hide default system cursor (cursor: none on body)
   - "use client", useEffect, window.addEventListener("mousemove")
   - Add to layout.tsx

2. Scroll progress indicator:
   - Thin line at very top of viewport (position: fixed, top: 0, z-index: 100)
   - Width goes from 0% to 100% as user scrolls down
   - Color: gradient from indigo to cyan
   - Use useScroll from Framer Motion

3. "Back to top" button:
   - Appears when scrolled > 400px
   - Fixed bottom-right, circular, indigo bg
   - Lucide ArrowUp icon
   - Smooth scroll to top via Lenis
   - Framer Motion fade in/out

Add all three to app/layout.tsx.
```

---

## Fase 9 — Responsiveness check + performance

### Claude Code prompt 9 — Final polish

```
Read CLAUDE.md first.

Do a full responsive and performance review of the portfolio:

1. Check every component for responsive breakpoints:
   - Mobile first (375px)
   - Tablet (768px)
   - Desktop (1280px)
   - Fix anything that breaks or looks wrong

2. Optimize images:
   - Replace all <img> tags with Next.js <Image> component
   - Add width, height, and alt to every image
   - Add loading="lazy" to non-critical images

3. Fix any "use client" issues:
   - Components using browser APIs must have "use client"
   - Server components should not import client-only libs

4. Add prefers-reduced-motion check to all GSAP animations:
   - Wrap in: if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)

5. Check all PDF download links:
   - Verify target="_blank" and rel="noopener noreferrer" on every one
   - List all PDF links found

Report what was fixed.
```

---

## Fase 10 — Content review + spellcheck

Dit doe je **zelf**, zonder Claude Code. Dit is cruciaal voor de jury.

### Checklist persoonlijke content

Ga elke pagina door en check:

**Home:**
- [ ] Staat je echte naam er?
- [ ] Is de tagline accuraat?
- [ ] Is de portfoliobeschrijving correct?

**About me:**
- [ ] Staat je echte foto erin?
- [ ] Is de tekst in de **ik-vorm**?
- [ ] Zijn je skills accuraat en eerlijk?
- [ ] Werkt de CV-download?
- [ ] Kloppen je contactlinks (email, LinkedIn, GitHub)?

**Stage:**
- [ ] Staat de correcte officiele stagetitel erin?
- [ ] Is de samenvatting in de **verleden tijd**?
- [ ] Focust de samenvatting op WAT en HOE (geen week-verslag)?
- [ ] Werken alle 3 PDF-downloads (projectplan, realisatie, reflectie)?
- [ ] Geen gevoelige bedrijfsinformatie zichtbaar?

**Projects:**
- [ ] Zijn alle projecten actueel en correct beschreven?
- [ ] Bij groepsprojecten: is jouw eigen bijdrage vermeld?
- [ ] Werken GitHub/demo links?
- [ ] Is credit gegeven aan teamleden?

### Spellcheck stap

```
# Geef dit aan Claude Code:
Do a spelling and grammar check of all user-facing text in the portfolio.
List every potential spelling error, grammar issue, or awkward phrasing found.
The portfolio is in Dutch, check Dutch grammar and spelling.
Also flag any text that sounds too informal or too AI-generated for a professional jury audience.
```

---

## Fase 11 — Pre-launch test

### Claude Code prompt 10 — Dead link check

```
List every external link and every PDF download link in the codebase.
For each link, show:
- The URL
- Which component it's in
- Whether it opens in a new tab (target="_blank")

Flag any links that look like placeholders ([EMAIL], [GITHUB], etc.)
that still need to be filled in.
```

Dan zelf testen:
1. Stuur de Vercel URL naar een vriend (niet van ThomasMore)
2. Laat hen de Canvas-checklist doorlopen
3. Test zelf op je telefoon
4. Test in een incognito venster

---

## Snelle referentie — welke prompt voor welk probleem

| Probleem | Wat je aan Claude Code vraagt |
|---|---|
| Animatie werkt niet op mobiel | "Fix the [component] animation for mobile, it's janky on touch devices" |
| Component ziet er niet goed uit | "Redesign [component] to better match the design system in CLAUDE.md" |
| PDF-link opent niet correct | "Check all PDF download links in [component] and fix target and rel attributes" |
| Tekst moet herschreven worden | "Rewrite the [sectie] text to sound more professional and first-person in Dutch" |
| Lenis + GSAP conflict | "GSAP ScrollTrigger is not responding correctly with Lenis. Fix the integration in LenisProvider.tsx" |
| Spline laadt traag | "Add a loading skeleton for the Spline component and lazy load it" |
| Iets breekt bij deploy | "I'm getting this build error on Vercel: [paste error]. Fix it." |

---

## Tijdsinschatting

| Fase | Geschatte tijd |
|---|---|
| 0 — Setup | 30 min |
| 1 — Fundament | 1 uur |
| 2 — Navbar | 30 min |
| 3 — Hero | 1-2 uur (meeste iteratie) |
| 4 — About me + content | 2 uur |
| 5 — Stage + content | 1.5 uur |
| 6 — Projects + content | 2 uur |
| 7 — Footer | 30 min |
| 8 — Cursor + polish | 45 min |
| 9 — Responsive + perf | 1 uur |
| 10 — Content review | 1-2 uur (doe dit serieus) |
| 11 — Pre-launch test | 1 uur |
| **Totaal** | **~14 uur** |

Start zo vroeg mogelijk met fase 4–6 — de persoonlijke content invullen kost meer tijd dan je denkt.

---

*Succes! De technische kant bouwt Claude Code voor jou. De persoonlijke inhoud — jouw verhaal, jouw projecten, jouw stage — dat ben jij.*
