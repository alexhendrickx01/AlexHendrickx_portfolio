import { NextRequest, NextResponse } from 'next/server'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/internship/login' || pathname.startsWith('/api/internship-auth')) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get('internship-auth')
  const expected = await sha256(process.env.BASIC_AUTH_PASSWORD ?? '')
  if (cookie?.value === expected) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/internship/login', request.url))
}

export const config = {
  matcher: ['/internship', '/internship/:path*'],
}
