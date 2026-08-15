import { MetadataRoute } from 'next';
import { LOCALES, DEFAULT_LOCALE } from '@/src/i18n/request';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://smartrail.vercel.app';
  const routes = [''];
  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    }))
  );
}
