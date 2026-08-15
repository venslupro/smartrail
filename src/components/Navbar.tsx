'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Link } from '@/src/i18n/navigation';

interface NavLink {
  readonly key: string;
  readonly href: string;
  readonly label: string;
}

export function Navbar(): JSX.Element {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: NavLink[] = [
    { key: 'home', href: '#home', label: t('home') },
    { key: 'about', href: '#about', label: t('about') },
    { key: 'technology', href: '#architecture', label: t('technology') },
    { key: 'cases', href: '#cases', label: t('cases') },
    { key: 'contact', href: '#contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-neutral-200/60 bg-white/85 backdrop-blur-md shadow-sm'
          : 'border-b border-transparent bg-white/60 backdrop-blur'
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link
          href="#home"
          className="group flex items-center gap-2 font-semibold text-neutral-900"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-hero-gradient text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L6 14l4-7 5 11 3-5h2" />
              <path d="M3 20h18" />
              <path d="M9 9l3-2" />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">SMARTRAIL</span>
            <span className="text-[10px] font-medium text-neutral-500">
              HUACHENG TECH
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="navbar" />
          <a
            href="#contact"
            className="hidden rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700 sm:inline-flex"
          >
            {t('contact')}
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-primary-600"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
