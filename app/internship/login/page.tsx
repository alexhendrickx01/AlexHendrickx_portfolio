'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function InternshipLogin() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/internship-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/internship')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F1117] px-4">
      <div className="w-full max-w-sm border-2 border-[#2D3748] bg-[#1A1D27]">

        <div className="flex items-center gap-3 border-b-2 border-[#2D3748] px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-[#6366F1]/30 bg-[#6366F1]/10">
            <Lock size={14} className="text-[#6366F1]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Beveiligd</p>
            <p className="text-sm font-bold text-[#F1F5F9]">Stage — Alex Hendrickx</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="border-2 border-[#2D3748] bg-[#0F1117] px-4 py-3 text-sm text-[#F1F5F9] outline-none transition-colors focus:border-[#6366F1] placeholder:text-[#94A3B8]/50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="border-2 border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              Ongeldig wachtwoord. Probeer opnieuw.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="flex h-11 items-center justify-center border-2 border-[#6366F1] bg-[#6366F1] text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {loading ? 'Bezig…' : 'Toegang'}
          </button>
        </form>
      </div>
    </main>
  )
}
