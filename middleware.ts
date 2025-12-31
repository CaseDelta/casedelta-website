import { NextRequest, NextResponse } from 'next/server'

// Variant configuration - all your existing variant routes
const VARIANTS = [
  'light/side',
  'light/bottom',
  'light/fullscreen',
  'dark/side',
  'dark/bottom',
] as const

type Variant = typeof VARIANTS[number]

// Cookie names for persistence
const COOKIE_VARIANT = 'casedelta_variant'
const COOKIE_DISTINCT_ID = 'casedelta_distinct_id'

export async function middleware(request: NextRequest) {
  // Safety check: Only enable A/B testing if env var is explicitly set to 'true'
  const abTestingEnabled = process.env.NEXT_PUBLIC_ENABLE_AB_TESTING === 'true'

  if (!abTestingEnabled) {
    // A/B testing disabled - let all requests through normally
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname

  // Only run middleware on homepage
  // All existing variant routes (/light/side, /dark/bottom, etc.) pass through unchanged
  if (pathname !== '/') {
    return NextResponse.next()
  }

  try {
    // Get or create distinct ID for user tracking
    let distinctId = request.cookies.get(COOKIE_DISTINCT_ID)?.value
    if (!distinctId) {
      // Generate unique ID for this user
      distinctId = crypto.randomUUID()
    }

    // Check if user already has an assigned variant
    let variant = request.cookies.get(COOKIE_VARIANT)?.value as Variant | undefined

    // Validate that the cookie value is a valid variant
    if (variant && !VARIANTS.includes(variant)) {
      variant = undefined // Invalid variant, will reassign
    }

    // If no variant or invalid variant, assign a new one
    if (!variant) {
      // For now: simple random assignment
      // Later: can integrate PostHog feature flags here
      variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
    }

    // Rewrite to the variant path (URL stays as casedelta.com)
    const url = request.nextUrl.clone()
    url.pathname = `/${variant}`

    const response = NextResponse.rewrite(url)

    // Set persistent cookies (30 days for variant, 1 year for distinct ID)
    response.cookies.set(COOKIE_VARIANT, variant, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Allow client-side access for PostHog
    })

    response.cookies.set(COOKIE_DISTINCT_ID, distinctId, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Allow client-side access for PostHog
    })

    return response
  } catch (error) {
    // Fail-safe: If anything goes wrong, just pass through to homepage
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

// Only run middleware on homepage when A/B testing is enabled
export const config = {
  matcher: '/',
}
