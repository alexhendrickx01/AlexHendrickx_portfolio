export type Project = {
  id: number
  slug: string
  title: string
  context: 'Schoolproject' | 'Persoonlijk project' | 'Freelance' | 'Hackathon'
  tagline: string
  description: string
  role: string
  challenge: string
  status: 'Live' | 'In development' | 'Opgeleverd' | 'Afgerond'
  tech: string[]
  github: string | null
  demo: string | null
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'factuurt',
    title: 'Factuurt',
    context: 'Persoonlijk project',
    tagline: 'Van werf tot factuur, alles in één app.',
    description: 'Elektriciens en andere vakarbeiders verliezen dagelijks kostbare tijd aan papierwerk dat niet aansluit op hun praktijk. Factuurt digitaliseert de volledige workflow (offerte, timers, materiaal, factuur) voor gebruik op de werf, ook zonder internet.',
    role: 'Solo founder & developer, van klantgesprekken en UX-design tot multi-tenant backend, PWA en infrastructuur. Alles zelf gebouwd en uitgerold.',
    challenge: 'Offline-first architectuur met WebSocket-based timersync: data moet lokaal werken via IndexedDB en naadloos syncen zodra verbinding terug is, zonder conflicten bij meerdere sessies.',
    status: 'In development',
    tech: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Auth.js', 'IndexedDB', 'Vercel', 'Railway'],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    slug: 'trackline',
    title: 'TrackLine',
    context: 'Schoolproject',
    tagline: 'GDPR-compliant AI-assistent voor treindispatchers: realtime, volledig lokaal.',
    description: 'Dispatchers moeten bij noodgevallen razendsnel handelen terwijl ze tegelijk communicatie verwerken en incidenten rapporteren. TrackLine analyseert realtime spraakcommunicatie, classificeert incidenten automatisch en genereert rapporten, zodat dispatchers zich kunnen focussen op de respons in plaats van de administratie.',
    role: 'Teamproject (7 personen). Gestart op de AI-pipeline, daarna grote delen van de frontend en backend overgenomen om kritieke fouten op te lossen en de applicatie stabiel te krijgen voor de finale oplevering.',
    challenge: 'Volledig lokale AI-inference zonder cloud: Whisper STT + LoRA fine-tuned LLaMA 3.2-7B geoptimaliseerd voor Apple Silicon, met automatische audio-verwijdering na verwerking voor GDPR-compliance.',
    status: 'Afgerond',
    tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Python', 'Whisper', 'LLaMA 3.2', 'Ollama', 'LoRA/QLoRA', 'Docker', 'Firebase Auth', 'spaCy', 'GitLab CI/CD'],
    github: 'https://github.com/trackline-alexhendrickx',
    demo: null,
    featured: true,
  },
  {
    id: 3,
    slug: 'datewatch',
    title: 'DateWatch',
    context: 'Freelance',
    tagline: 'Eén knop. Geen gsm nodig. Jouw noodcontacten weten het meteen.',
    description: 'DateWatch is opgericht door Lindsay Verswyvel en stuurt bij gevaar een pushmelding naar noodcontacten met je realtime locatie en tijdstip. De koppeling met een wearable maakt dat je de alarmknop activeert zonder je gsm te moeten bovenhalen, cruciaal in een bedreigende situatie. Winnaar van de Signature Award, Xplorer Award, More Ice Award en Start Academy Award. Na de stage ga ik hier voluit verder mee: in de zomer volgt een stadstest, op 4 oktober 2026 is de publieke release gepland.',
    role: 'Freelance mobile developer voor studentondernemer Lindsay Verswyvel: ik ben verantwoordelijk voor de Flutter-app, push notificaties, locatiedeling naar noodcontacten en de integratie met het wearable-platform. Gezien in HLN, GVA en Het Nieuwsblad.',
    challenge: 'De wearable-integratie zo betrouwbaar maken dat één druk altijd werkt, ook zonder gsm in de hand. Koppeling tussen hardware trigger, app state en push naar meerdere contacten moet foutloos verlopen onder tijdsdruk.',
    status: 'In development',
    tech: ['Flutter', 'Firebase', 'iOS', 'Android'],
    github: null,
    demo: null,
    featured: false,
  },
]

export const contextStyle: Record<Project['context'], { borderColor: string; bg: string; text: string }> = {
  'Schoolproject':       { borderColor: '#6366F1', bg: 'bg-[#6366F1]/10', text: 'text-[#6366F1]' },
  'Persoonlijk project': { borderColor: '#22D3EE', bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]' },
  'Freelance':           { borderColor: '#06b6d4', bg: 'bg-[#06b6d4]/10', text: 'text-[#06b6d4]' },
  'Hackathon':           { borderColor: '#f59e0b', bg: 'bg-amber-500/10',  text: 'text-amber-400' },
}

export const statusConfig: Record<Project['status'], { color: string; label: string }> = {
  'Live':           { color: '#22D3EE', label: 'Live' },
  'In development': { color: '#6366F1', label: 'In development' },
  'Opgeleverd':     { color: '#22c55e', label: 'Opgeleverd' },
  'Afgerond':       { color: '#94A3B8', label: 'Afgerond' },
}
