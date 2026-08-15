import { useTranslations } from 'next-intl';
import type { FeatureItem } from '@/src/types';
import { IconSvg } from '../icons/IconSvg';
import { SectionHeader } from '../SectionHeader';

const ICON_KEYS = [
  'sparkles',
  'target',
  'globe',
  'shield',
] as const;

export function About(): JSX.Element {
  const t = useTranslations('about');
  const features = t.raw('features') as readonly FeatureItem[];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('description')}
          spacing="loose"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="card card-hover group relative overflow-hidden p-6"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-primary-50 to-accent-50 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-sm">
                  <IconSvg
                    name={ICON_KEYS[idx % ICON_KEYS.length]}
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
