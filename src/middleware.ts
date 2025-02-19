import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import {
  authRoutes as authRoutesObject,
  Pathnames,
  protectedRoutes as protectedRoutesObject,
  routing,
} from './i18n/routing'
import verifySessionToken from './app/(frontend)/[locale]/_utils/verifySessionToken'

const checkRoutes = (routesToCheck: Pathnames[], pathName: string): boolean => {
  // Get the localized paths for the protected routes
  const localizedRoutes = routesToCheck.reduce<string[]>(
    (acc, route) => [
      ...acc,
      ...Object.values(routing.pathnames[route as keyof typeof routing.pathnames]),
    ],
    [],
  )

  // Create a regex to match the protected routes
  const routesRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${localizedRoutes
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  )

  // Check if the request is for a protected route
  return routesRegex.test(pathName)
}

// export default createMiddleware(routing)
export default async function middleware(request: NextRequest) {
  // Get the JWT token from the cookies
  const isLogged = await verifySessionToken()

  // Define protected routes that require authentication
  const protectedRoutes = Object.keys(protectedRoutesObject) as Pathnames[]

  // Define routes that require authentication
  const authRoutes = Object.keys(authRoutesObject) as Pathnames[]

  // Check if the request is for a protected route
  const isProtectedRoute = checkRoutes(protectedRoutes, request.nextUrl.pathname)
  const isAuthRoute = checkRoutes(authRoutes, request.nextUrl.pathname)

  // If the user is trying to access a protected route and is not authenticated, redirect to login
  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && isLogged) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)
  return response
}

// see https://next-intl-docs.vercel.app/docs/routing/middleware
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, or `/admin`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|admin|next|.*\\..*).*)',
  ],
  // Match only internationalized pathnames
  // matcher: ['/', '/(de|en)/:path*']
}
