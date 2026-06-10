import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const user     = process.env.BASIC_AUTH_USER
  const password = process.env.BASIC_AUTH_PASSWORD

  // Skip protection if env vars not set (local dev without .env.local)
  if (!user || !password) return NextResponse.next()

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded    = Buffer.from(encoded, 'base64').toString('utf-8')
      const [u, ...p]  = decoded.split(':')
      if (u === user && p.join(':') === password) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Toegang geweigerd', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Stage — Alex Hendrickx Portfolio"',
    },
  })
}

export const config = {
  matcher: ['/internship', '/internship/:path*'],
}
