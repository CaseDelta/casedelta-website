'use client'

import { useCallback } from 'react'
import Cookies from 'js-cookie'

/**
 * Hook for tracking conversion events with PostHog
 *
 * Usage:
 *   const { trackEvent } = useTracking()
 *   trackEvent('cta_clicked', { button_location: 'hero' })
 *
 * Features:
 * - Automatically includes variant data from middleware cookie
 * - Lazy-loads PostHog (no performance impact)
 * - Fail-safe (errors don't break the app)
 * - Optional (does nothing if PostHog not configured)
 */
export function useTracking() {
  const trackEvent = useCallback(async (
    eventName: string,
    properties?: Record<string, any>
  ) => {
    try {
      // Only track if PostHog is configured
      if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
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
        return // PostHog not ready, skip
      }

      // Get variant from cookie (set by middleware)
      const variant = Cookies.get('casedelta_variant')

      // Build event properties
      const eventProperties: Record<string, any> = {
        ...properties,
      }

      // Add variant data if available
      if (variant) {
        eventProperties.variant = variant

        // Parse variant into theme and layout
        const [theme, layout] = variant.split('/')
        if (theme && layout) {
          eventProperties.variant_theme = theme
          eventProperties.variant_layout = layout
        }
      }

      // Track the event
      posthog.capture(eventName, eventProperties)

      if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true') {
        console.log('📊 Tracked event:', eventName, eventProperties)
      }
    } catch (error) {
      // Fail silently - tracking errors shouldn't break the app
      console.error('Event tracking failed:', error)
    }
  }, [])

  /**
   * Track a CTA button click
   * Convenience method for the most common conversion event
   */
  const trackCTAClick = useCallback((
    ctaType: 'trial' | 'demo' | 'contact' | 'watch_demo' | 'sign_in',
    location: string
  ) => {
    return trackEvent('cta_clicked', {
      cta_type: ctaType,
      button_location: location,
    })
  }, [trackEvent])

  /**
   * Track a conversion event (signup, demo request, etc.)
   */
  const trackConversion = useCallback((
    conversionType: 'trial_started' | 'demo_scheduled' | 'contact_submitted',
    additionalProperties?: Record<string, any>
  ) => {
    return trackEvent(conversionType, {
      ...additionalProperties,
      // Mark user as converted for cohort analysis
      $set: {
        converted: true,
        conversion_type: conversionType,
        conversion_date: new Date().toISOString(),
      },
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackCTAClick,
    trackConversion,
  }
}
