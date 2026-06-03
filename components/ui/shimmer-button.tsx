'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: ReactNode
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'rgba(99, 102, 241, 1)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as CSSProperties
      }
      className={cn(
        'group relative z-0 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
        '[border-radius:var(--radius)]',
        className
      )}
      {...props}
    >
      {/* shimmer layer */}
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          '[border-radius:var(--radius)]'
        )}
      >
        <div className="absolute inset-[-100%] animate-[spin_var(--speed)_linear_infinite]">
          <div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))`,
            }}
          />
        </div>
      </div>

      {/* bg fill */}
      <div
        className="absolute inset-[var(--cut)] z-10 [border-radius:var(--radius)]"
        style={{ background: 'var(--bg)' }}
      />

      <span className="relative z-20 text-sm font-medium">{children}</span>
    </button>
  )
}
