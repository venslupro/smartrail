import { useTranslations } from 'next-intl';
import type { CoreValue } from '@/src/types';
import { IconSvg } from '../icons/IconSvg';
import { SectionHeader } from '../SectionHeader';
import { cn } from '@/src/lib/utils';

const VALUE_STYLES = [
  {
    bg: 'from-primary-50 to-white',
    border: 'hover:border-primary-200',
    iconBg: 'bg-primary-600 text-white',
    tagBg: 'bg-primary-50 text-primary-700',
  },
  {
    bg: 'from-accent-50 to-white',
    border: 'hover:border-accent-200',
    iconBg: 'bg-accent-600 text-white',
    tagBg: 'bg-accent-50 text-accent-700',
  },
  {
    bg: 'from-neutral-50 to-white',
    border: 'hover:border-neutral-200',
    iconBg: 'bg-neutral-800 text-white',
    tagBg: 'bg-neutral-100 text-neutral-700',
  },
] as const;

export function CoreValueSection(): JSX.Element {
  const t = useTranslations('coreValue');
  const values = t.raw('values') as readonly CoreValue[];

  return (
    <section className="section-padding bg-section-gradient">
      <div className="container-page">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {values.map((v, idx) => {
            const s = VALUE_STYLES[idx % VALUE_STYLES.length];
            return (
              <div
                key={v.title}
                className={cn(
                  'card relative overflow-hidden p-8 transition-all duration-300',
                  s.border
                )}
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-40 bg-gradient-to-br opacity-70',
                    s.bg
                  )}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm',
                        s.iconBg
                      )}
                    >
                      <IconSvg name={v.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                        s.tagBg
                      )}
                    >
                      {v.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">
                    {v.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {v.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-neutral-700">
                        <span
                          className={cn(
                            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                            s.tagBg
                          )}
                        >
                          <IconSvg name="check" className="h-3 w-3" />
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
