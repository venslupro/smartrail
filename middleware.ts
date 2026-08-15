import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/request';

export default createMiddleware({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
