/**
 * 站点级固定配置。
 *
 * 域名策略（用户已确认：永远使用 smartrail.vercel.app）：
 *   - 默认使用 Vercel 默认域名 https://smartrail.vercel.app
 *   - 允许通过 NEXT_PUBLIC_SITE_URL 环境变量临时覆盖（本地调试 / 自定义域名场景）
 *   - 也会兜底读取 Vercel 平台自动注入的 VERCEL_URL，避免部署错配
 *
 *   单一来源：sitemap.ts / robots.ts / metadata metadataBase 三处统一引用。
 */

const DEFAULT_SITE_URL = 'https://smartail.vercel.app';

function pickSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || DEFAULT_SITE_URL;
  if (!raw) return DEFAULT_SITE_URL;
  const withProtocol = raw.startsWith('http') ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, '');
}

/** 站点基础 URL，无尾部斜杠。默认：https://smartrail.vercel.app */
export const SITE_URL = pickSiteUrl();

/** 默认地区语言，用于 SEO 权重排序。 */
export { DEFAULT_LOCALE, LOCALES } from '@/src/i18n/request';
export type { Locale } from '@/src/i18n/request';
