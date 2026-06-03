'use client'

import { createContext, useContext, useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

type CardContextValue = { rotateX: number; rotateY: number }
const CardContext = createContext<CardContextValue>({ rotateX: 0, rotateY: 0 })

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / (width / 2)
    const y = (e.clientY - top - height / 2) / (height / 2)
    setRotate({ rotateX: -y * 10, rotateY: x * 10 })
  }

  function handleMouseLeave() {
    setRotate({ rotateX: 0, rotateY: 0 })
  }

  return (
    <CardContext.Provider value={rotate}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn('flex items-center justify-center', containerClassName)}
        style={{ perspective: '1000px' }}
      >
        <div
          className={cn('relative transition-transform duration-200 ease-out', className)}
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg)`,
          }}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  )
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('h-full w-full', className)} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export function CardItem({
  as: Tag = 'div',
  children,
  className,
  translateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateZ?: number
  [key: string]: unknown
}) {
  return (
    <Tag
      className={cn('w-fit', className)}
      style={{ transform: `translateZ(${translateZ}px)` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
