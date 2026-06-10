import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page and auth API through
  if (pathname === '/internship/login' || pathname.startsWith('/api/internship-auth')) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get('internship-auth')
  if (cookie?.value === process.env.BASIC_AUTH_PASSWORD) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/internship/login', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/internship', '/internship/:path*'],
}
