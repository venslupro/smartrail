import { useTranslations } from 'next-intl';
import type { StatItem } from '@/src/types';

export function Hero(): JSX.Element {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as readonly StatItem[];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-hero-gradient text-white"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(94,234,212,0.18) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
      </svg>

      <div className="container-page relative pb-20 pt-16 sm:pt-24 lg:pb-28 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              {t('badge')}
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t('titlePrimary')}
              <span className="mt-1 block">
                <span className="bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </span>
              <span className="mt-1 block text-white/90">{t('titleSuffix')}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition hover:bg-white/90"
              >
                {t('ctaPrimary')}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#contact" className="btn-ghost-white">
                {t('ctaSecondary')}
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-white/70 sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative animate-float">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-accent-400/20 via-white/10 to-primary-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-1 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-white to-neutral-100 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20smart%20railway%20infrastructure%20monitoring%20center%2C%20aerial%20view%20of%20railway%20tracks%20with%20futuristic%20sensors%2C%20clean%20blue%20sky%2C%20professional%20industrial%20photography%2C%20bright%20lighting%2C%20high%20quality&image_size=landscape_16_9"
                    alt="Smart railway monitoring"
                    className="block w-full h-auto rounded-2xl object-cover"
                    decoding="async"
                  />
                  {/* Overlay mini metrics */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      ['99.5%', 'Availability'],
                      ['<10min', 'Alert Latency'],
                      ['500+', 'Devices'],
                    ].map(([v, l]) => (
                      <div key={l} className="rounded-xl bg-primary-50 px-3 py-3 text-center">
                        <div className="text-lg font-bold text-primary-700">{v}</div>
                        <div className="mt-0.5 text-[10px] font-medium text-primary-600/80 uppercase tracking-wider">
                          {l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
