import { useTranslations } from 'next-intl';
import { IconSvg } from './icons/IconSvg';
import { Link } from '@/src/i18n/navigation';

export function Footer(): JSX.Element {
  const t = useTranslations('footer');
  const sections = [
    {
      title: t('sections.0.title'),
      links: t.raw('sections.0.links') as readonly string[],
      hrefs: ['#home', '#about', '#architecture', '#cases'],
    },
    {
      title: t('sections.1.title'),
      links: t.raw('sections.1.links') as readonly string[],
      hrefs: ['#architecture', '#architecture', '#architecture', '#architecture'],
    },
    {
      title: t('sections.2.title'),
      links: t.raw('sections.2.links') as readonly string[],
      hrefs: ['#contact', '#contact', '#contact'],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900 to-primary-950 text-neutral-300">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(58,142,249,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(45,212,191,0.15) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative section-padding !pb-10">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="#home"
              className="group flex items-center gap-2 font-semibold text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <IconSvg name="target" className="h-5 w-5 text-accent-300" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight">
                  SMARTRAIL
                </span>
                <span className="text-[10px] font-medium text-neutral-400">
                  HUACHENG TECHNOLOGY
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t('desc')}
            </p>
          </div>

          {sections.map((s, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold text-white">{s.title}</h4>
              <ul className="mt-5 space-y-3">
                {s.links.map((label, i) => (
                  <li key={label + i}>
                    <a
                      href={s.hrefs[i]}
                      className="text-sm text-neutral-400 transition-colors hover:text-accent-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-500">{t('copyright')}</p>
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            <a href="mailto:venslu.pro@gmail.com" className="inline-flex items-center gap-1.5 hover:text-accent-300">
              <IconSvg name="mail" className="h-3.5 w-3.5" />
              venslu.pro@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
