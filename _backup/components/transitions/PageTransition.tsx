'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelectedLayoutSegment } from 'next/navigation'
import { FrozenRouter } from './FrozenRouter'
import type { ReactNode, CSSProperties } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function PageTransition({
  children,
  className,
  style
}: PageTransitionProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        className={className}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.35,
          ease: [0.33, 1, 0.68, 1] // CaseDelta's --easing-out
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
