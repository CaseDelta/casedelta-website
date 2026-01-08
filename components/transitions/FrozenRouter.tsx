'use client'
import { useContext, useRef, useEffect, type ReactNode } from 'react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useSelectedLayoutSegment } from 'next/navigation'

/**
 * Hook to retain previous value during renders
 */
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined)

  useEffect(() => {
    prevValue.current = value
    return () => {
      prevValue.current = undefined
    }
  })

  return prevValue.current
}

/**
 * FrozenRouter prevents router context updates during animations
 * This allows Framer Motion exit animations to complete before unmounting
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context) || null

  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)

  // Detect route change
  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}
