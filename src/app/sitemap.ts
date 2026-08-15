import { MetadataRoute } from 'next';
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/src/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''];
  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    }))
  );
}
