import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ur'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes (/api), admin panel (/admin), and static files
    '/((?!api|_next|admin|.*\\..*).*)',
    // Match the root '/' or explicit locales
    '/',
    '/(en|ur)/:path*'
  ]
};
