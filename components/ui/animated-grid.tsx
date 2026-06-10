'use client'

import { useEffect, useRef } from 'react'

interface LightParticle {
  x: number
  y: number
  targetX: number
  targetY: number
  speed: number
  brightness: number
  color: 'indigo' | 'cyan'
  gridLine: 'horizontal' | 'vertical'
  progress: number
  trailLength: number
}

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lights: LightParticle[] = []
    const GRID = 48
    let lastTime = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width  * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const spawn = (): LightParticle => {
      const w = canvas.width  / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      const isH = Math.random() > 0.5
      const color = Math.random() > 0.5 ? 'indigo' : 'cyan'

      if (isH) {
        const row = Math.floor(Math.random() * Math.floor(h / GRID))
        const y   = row * GRID
        return { x: 0, y, targetX: w, targetY: y, speed: 0.3 + Math.random() * 0.5,
          brightness: 0.7 + Math.random() * 0.3, color, gridLine: 'horizontal',
          progress: 0, trailLength: 0.08 + Math.random() * 0.12 }
      } else {
        const col = Math.floor(Math.random() * Math.floor(w / GRID))
        const x   = col * GRID
        return { x, y: 0, targetX: x, targetY: h, speed: 0.3 + Math.random() * 0.5,
          brightness: 0.7 + Math.random() * 0.3, color, gridLine: 'vertical',
          progress: 0, trailLength: 0.08 + Math.random() * 0.12 }
      }
    }

    const drawGrid = () => {
      const w = canvas.width  / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(45, 55, 72, 0.6)'
      ctx.lineWidth = 1

      for (let x = 0; x <= w; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y <= h; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }
    }

    const drawLights = () => {
      const w = canvas.width  / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      lights.forEach((light) => {
        const isH = light.gridLine === 'horizontal'
        const total = isH ? w : h
        const cur   = light.progress * total
        const trail = light.trailLength * total

        const x = isH ? cur       : light.x
        const y = isH ? light.y   : cur

        // Trail gradient
        const tx = isH ? cur - trail : light.x
        const ty = isH ? light.y     : cur - trail

        const [r, g, b] = light.color === 'indigo' ? [99, 102, 241] : [34, 211, 238]

        const grad = ctx.createLinearGradient(tx, ty, x, y)
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},${light.brightness * 0.9})`)

        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        if (isH) {
          ctx.moveTo(tx, ty); ctx.lineTo(x, y)
        } else {
          ctx.moveTo(tx, ty); ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Glow dot
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12)
        glow.addColorStop(0, `rgba(${r},${g},${b},${light.brightness})`)
        glow.addColorStop(0.4, `rgba(${r},${g},${b},${light.brightness * 0.4})`)
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill()

        // Bright core
        ctx.fillStyle = `rgba(${r},${g},${b},${light.brightness})`
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill()
      })
    }

    const animate = (now: number) => {
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      lights.forEach((l, i) => {
        l.progress += l.speed * dt * 0.001
        if (l.progress >= 1) lights.splice(i, 1)
      })

      if (Math.random() < 0.025 && lights.length < 10) lights.push(spawn())

      drawGrid()
      drawLights()

      animRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
