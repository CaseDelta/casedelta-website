'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'

/**
 * PostHog Analytics Provider
 *
 * Features:
 * - Lazy-loads PostHog (zero impact on page load performance)
 * - Automatically tracks variant assignments from middleware cookies
 * - Completely optional - disabled if NEXT_PUBLIC_POSTHOG_KEY is not set
 * - Fail-safe - errors don't break the app
 */

// Internal component that tracks pageviews - uses useSearchParams so must be wrapped in Suspense
function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track pageviews with variant data
    const trackPageview = async () => {
      try {
        const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
        if (!posthogKey || !pathname) {
          return
        }

        const posthog = (await import('posthog-js')).default

        // Wait for PostHog to load (with timeout)
        let attempts = 0
        while (!posthog.__loaded && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          attempts++
        }

        if (!posthog.__loaded) {
          return // PostHog didn't load in time, skip tracking
        }

        // Get variant from middleware cookie
        const variant = Cookies.get('casedelta_variant')

        // Build event properties
        const properties: Record<string, any> = {
          $current_url: window.location.href,
        }

        // Add variant data if available
        if (variant) {
          properties.variant = variant

          // Parse variant into theme and layout
          const [theme, layout] = variant.split('/')
          if (theme && layout) {
            properties.variant_theme = theme
            properties.variant_layout = layout
          }

          // Set as person property for cohort analysis
          posthog.setPersonProperties({
            landing_variant: variant,
          })
        }

        // Include UTM parameters for attribution
        if (searchParams) {
          const utmSource = searchParams.get('utm_source')
          const utmMedium = searchParams.get('utm_medium')
          const utmCampaign = searchParams.get('utm_campaign')

          if (utmSource) properties.utm_source = utmSource
          if (utmMedium) properties.utm_medium = utmMedium
          if (utmCampaign) properties.utm_campaign = utmCampaign
        }

        // Track pageview
        posthog.capture('$pageview', properties)
      } catch (error) {
        // Fail silently
        console.error('PostHog pageview tracking failed:', error)
      }
    }

    trackPageview()
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize if PostHog key is configured
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!posthogKey) {
      // PostHog not configured - skip initialization
      return
    }

    // Lazy-load PostHog to avoid blocking page render
    const initPostHog = async () => {
      try {
        const posthog = (await import('posthog-js')).default

        // Check if already initialized
        if (posthog.__loaded) {
          return
        }

        posthog.init(posthogKey, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

          // Performance optimizations
          capture_pageview: false, // We manually track with variant data
          capture_pageleave: true, // Important for landing pages
          advanced_disable_decide: true, // Not using feature flags yet

          // Session recording (lazy-loaded automatically by PostHog)
          disable_session_recording: false,

          // Development debugging
          loaded: (ph) => {
            if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true') {
              ph.debug()
              console.log('✅ PostHog loaded and initialized')
            }
          },
        })

        // Identify user with distinct ID from middleware cookie
        const distinctId = Cookies.get('casedelta_distinct_id')
        if (distinctId) {
          posthog.identify(distinctId)
        }
      } catch (error) {
        // Fail silently - analytics failure shouldn't break the app
        console.error('PostHog initialization failed:', error)
      }
    }

    // Initialize PostHog
    initPostHog()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  )
}
