import Link from 'next/link'

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/internship', label: 'Stage' },
  { href: '/projects',   label: 'Projects' },
]

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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
      <rect width="20" height="16" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#2D3748] bg-[#0A0D14]">

      {/* Same 3-column grid as navbar: 1fr | max-w-7xl | 1fr */}
      <div
        className="grid w-full"
        style={{ gridTemplateColumns: '1fr minmax(0, 80rem) 1fr' }}
      >
        {/* Left gutter */}
        <div className="hidden sm:block" />

        {/* Center footer content */}
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#2D3748]">

          {/* Identity block */}
          <div className="py-8 px-6 sm:pl-0">
            <div className="mb-4 inline-flex border-2 border-[#6366F1]/40 bg-[#6366F1]/10 px-3 py-1.5">
              <span className="text-sm font-bold text-[#6366F1]">AH</span>
            </div>
            <p className="font-bold text-[#F1F5F9]">Alex Hendrickx</p>
            <p className="mt-1 text-sm text-[#94A3B8]">Bachelor Informatica</p>
            <p className="text-sm text-[#94A3B8]">Thomas More · 2026</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#22D3EE]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#22D3EE]">
                Student Software Engineer
              </span>
            </div>
          </div>

          {/* Navigation block */}
          <div className="px-6 py-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Navigatie</p>
            <ul className="flex flex-col gap-0 divide-y divide-[#2D3748]/50">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-[#F1F5F9]"
                  >
                    <span className="h-px w-3 bg-[#2D3748]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block */}
          <div className="py-8 px-6 sm:pr-0">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Contact</p>
            <div className="flex flex-col gap-0 divide-y divide-[#2D3748]/50">
              <a
                href="mailto:alexhendrickx01@gmail.com"
                className="flex items-center gap-3 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-[#6366F1]"
              >
                <MailIcon /> alexhendrickx01@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/alexhendrickx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-[#6366F1]"
              >
                <LinkedInIcon /> linkedin.com/in/alexhendrickx
              </a>
              <a
                href="https://github.com/alexhendrickx01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2.5 text-sm text-[#94A3B8] transition-colors hover:text-[#6366F1]"
              >
                <GitHubIcon /> github.com/alexhendrickx01
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t-2 border-[#2D3748] py-4">
          <span className="text-xs text-[#94A3B8]">© 2026 Alex Hendrickx · Graduation Portfolio</span>
          <div className="flex items-center gap-1.5">
            {[0,1,2,3].map((i) => (
              <div key={i} className="h-2 w-2 bg-[#6366F1]" style={{ opacity: 0.2 + i * 0.27 }} />
            ))}
          </div>
        </div>
        </div>

        {/* Right gutter */}
        <div className="hidden sm:block" />
      </div>
    </footer>
  )
}
