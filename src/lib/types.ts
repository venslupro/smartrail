import type { Locale } from '../i18n/request';

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | { readonly [key: string]: boolean | undefined | null };

export interface NavItem {
  readonly key: string;
  readonly href: string;
  readonly labelKey: string;
}

export interface SiteConfig {
  readonly locales: readonly Locale[];
  readonly defaultLocale: Locale;
}
