'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="beam-glow" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0F1117" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam3" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <rect width="100%" height="100%" fill="url(#beam-glow)" />

        {/* Beams */}
        <line x1="20%" y1="0" x2="60%" y2="100%" stroke="url(#beam1)" strokeWidth="1.5" className="animate-beam-1" />
        <line x1="50%" y1="0" x2="10%" y2="100%" stroke="url(#beam2)" strokeWidth="1" className="animate-beam-2" />
        <line x1="75%" y1="0" x2="40%" y2="100%" stroke="url(#beam1)" strokeWidth="0.8" className="animate-beam-3" />
        <line x1="35%" y1="0" x2="90%" y2="100%" stroke="url(#beam3)" strokeWidth="1.2" className="animate-beam-1" />
        <line x1="85%" y1="0" x2="25%" y2="100%" stroke="url(#beam2)" strokeWidth="0.6" className="animate-beam-2" />
        <line x1="10%" y1="0" x2="70%" y2="100%" stroke="url(#beam3)" strokeWidth="1" className="animate-beam-3" />
        <line x1="60%" y1="0" x2="5%"  y2="100%" stroke="url(#beam1)" strokeWidth="0.7" className="animate-beam-1" />
        <line x1="90%" y1="0" x2="50%" y2="100%" stroke="url(#beam2)" strokeWidth="1.3" className="animate-beam-2" />
      </svg>
    </div>
  )
}
