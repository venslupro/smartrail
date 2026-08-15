'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import type { Locale } from '@/src/i18n/request';
import { LOCALES } from '@/src/i18n/request';
import { stripLocalePrefix } from '@/src/i18n/utils';
import { Link } from '@/src/i18n/navigation';

interface LanguageSwitcherProps {
  readonly variant?: 'navbar' | 'footer';
}

const LABEL_KEYS: Record<Locale, 'langZh' | 'langEn' | 'langRu'> = {
  zh: 'langZh',
  en: 'langEn',
  ru: 'langRu',
};

export function LanguageSwitcher({
  variant = 'navbar',
}: LanguageSwitcherProps): JSX.Element {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // NOTE: next-intl Link (from createSharedPathnamesNavigation) applies the
  // locale prefix automatically. The href must be the base (unprefixed) path
  // and the `locale` prop must be set explicitly — this prevents double
  // prefixing (e.g. /zh/en) which previously caused 404s.
  const basePath = stripLocalePrefix(pathname || '/');

  const toggle = (): void => setOpen((prev) => !prev);
  const close = (): void => setOpen(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="Switch language"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
          variant === 'navbar'
            ? 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-700'
            : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
        )}
      >
        <GlobeMini />
        <span className="tabular-nums">{t(LABEL_KEYS[locale])}</span>
        <svg
          className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.068l3.71-3.838a.75.75 0 0 1 1.08 1.04l-4.25 4.4a.75.75 0 0 1-1.08 0l-4.25-4.4a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[110px] overflow-hidden rounded-lg border bg-white shadow-lg right-0'
          )}
          onMouseLeave={close}
        >
          {LOCALES.map((loc) => {
            const targetLocale = loc as Locale;
            const active = loc === locale;
            return (
              <Link
                key={loc}
                href={basePath}
                locale={targetLocale}
                onClick={close}
                className={cn(
                  'block w-full px-4 py-2 text-left text-sm transition-colors',
                  active
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                )}
              >
                {t(LABEL_KEYS[targetLocale])}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GlobeMini(): JSX.Element {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
    </svg>
  );
}
