'use client'

import { useEffect } from 'react'

/**
 * PostHog, lazy-loaded so it never blocks the first render. Off when NEXT_PUBLIC_POSTHOG_KEY is unset.
 *
 * Traffic goes through /ingest on our own domain (rewrites in next.config.ts), because ad
 * blockers drop requests to posthog.com and law-firm networks often run them.
 *
 * Pageviews, page leaves, UTMs, click ids and first-touch attribution are PostHog's own
 * (`defaults`), not hand-rolled. The old version tracked pageviews itself and read two
 * cookies the edge proxy stopped setting when the A/B rewrite was deleted on 2026-09-02.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return
    import('posthog-js')
      .then(({ default: posthog }) => {
        if (posthog.__loaded) return
        posthog.init(key, {
          api_host: '/ingest',
          ui_host: 'https://us.posthog.com',
          defaults: '2025-05-24',
          capture_pageleave: true,
          capture_exceptions: true,
          loaded: (ph) => {
            // Call sites outside React (lib/posthog.ts trackEvent) reach it through window.
            ;(window as unknown as { posthog: typeof ph }).posthog = ph
            if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true') ph.debug()
          },
        })
      })
      .catch((error) => console.error('PostHog initialization failed:', error))
  }, [])

  return <>{children}</>
}
