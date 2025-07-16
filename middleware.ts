import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN', 'zh-HK', 'ko-KR'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Redirect to the locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh-CN|zh-HK|en|ko-KR)/:path*']
}; 