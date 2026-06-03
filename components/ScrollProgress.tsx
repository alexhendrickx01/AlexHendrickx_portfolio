'use client'

import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #6366F1, #22D3EE)',
      }}
    />
  )
}
