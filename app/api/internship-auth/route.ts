import { NextRequest, NextResponse } from 'next/server'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  if (
    username === process.env.BASIC_AUTH_USER &&
    password === process.env.BASIC_AUTH_PASSWORD
  ) {
    const hash = await sha256(process.env.BASIC_AUTH_PASSWORD!)
    const res = NextResponse.json({ ok: true })
    res.cookies.set('internship-auth', hash, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
