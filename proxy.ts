import { NextRequest, NextResponse } from 'next/server'

// Variant configuration - all your existing variant routes
const VARIANTS = [
  'light/side',
  'light/bottom',
  'light/fullscreen',
  'dark/side',
  'dark/bottom',
  'dark/fullscreen',
] as const

type Variant = typeof VARIANTS[number]

// Cookie names for persistence
const COOKIE_VARIANT = 'casedelta_variant'
const COOKIE_DISTINCT_ID = 'casedelta_distinct_id'
const COOKIE_PIXEL_BLOCKED = 'cd_pixel_blocked'

// EU + EEA + UK + Switzerland: jurisdictions where strict consent rules apply
// to advertising pixels and where we suppress the Meta Pixel by default.
const PIXEL_BLOCKED_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'GB',
  'CH',
])

function shouldBlockPixel(country: string | null): boolean {
  if (!country) return false
  return PIXEL_BLOCKED_COUNTRIES.has(country.toUpperCase())
}

function applyGeoCookie(request: NextRequest, response: NextResponse): NextResponse {
  const country = request.headers.get('x-vercel-ip-country')
  const block = shouldBlockPixel(country)

  if (block) {
    response.cookies.set(COOKIE_PIXEL_BLOCKED, '1', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Client component must read it to suppress the pixel
    })
  } else if (request.cookies.get(COOKIE_PIXEL_BLOCKED)?.value === '1') {
    // Visitor moved out of a blocked region; clear the stale cookie.
    response.cookies.delete(COOKIE_PIXEL_BLOCKED)
  }

  return response
}

function maybeAbTestRewrite(request: NextRequest): NextResponse | null {
  const abTestingEnabled = process.env.NEXT_PUBLIC_ENABLE_AB_TESTING === 'true'
  if (!abTestingEnabled) return null
  if (request.nextUrl.pathname !== '/') return null

  try {
    let distinctId = request.cookies.get(COOKIE_DISTINCT_ID)?.value
    if (!distinctId) {
      distinctId = crypto.randomUUID()
    }

    let variant = request.cookies.get(COOKIE_VARIANT)?.value as Variant | undefined
    if (variant && !VARIANTS.includes(variant)) {
      variant = undefined
    }
    if (!variant) {
      variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${variant}`

    const response = NextResponse.rewrite(url)

    response.cookies.set(COOKIE_VARIANT, variant, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    })

    response.cookies.set(COOKIE_DISTINCT_ID, distinctId, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    })

    return response
  } catch (error) {
    console.error('AB test middleware error:', error)
    return null
  }
}

export async function proxy(request: NextRequest) {
  const response = maybeAbTestRewrite(request) ?? NextResponse.next()
  return applyGeoCookie(request, response)
}

// Run on all routes except Next internals, API, and static assets so the
// pixel-block cookie is set on every page entry.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|api/|.*\\..*).*)'],
}
