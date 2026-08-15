import { useTranslations } from 'next-intl';
import type { ArchitectureLayer, ArchitectureMetrics } from '@/src/types';
import { IconSvg } from '../icons/IconSvg';
import { SectionHeader } from '../SectionHeader';
import { cn } from '@/src/lib/utils';

const LAYER_ICONS = ['chip', 'server', 'cloud'] as const;
const LAYER_STYLES = [
  {
    bar: 'bg-primary-600',
    barBg: 'bg-primary-50',
    badge: 'bg-primary-50 text-primary-700 border-primary-100',
    chip: 'bg-primary-600 text-white',
    feature: 'bg-primary-50 text-primary-700',
  },
  {
    bar: 'bg-accent-600',
    barBg: 'bg-accent-50',
    badge: 'bg-accent-50 text-accent-700 border-accent-100',
    chip: 'bg-accent-600 text-white',
    feature: 'bg-accent-50 text-accent-700',
  },
  {
    bar: 'bg-neutral-800',
    barBg: 'bg-neutral-100',
    badge: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    chip: 'bg-neutral-800 text-white',
    feature: 'bg-neutral-100 text-neutral-700',
  },
] as const;

export function Architecture(): JSX.Element {
  const t = useTranslations('architecture');
  const layers = t.raw('layers') as readonly ArchitectureLayer[];
  const metrics = t.raw('metrics') as ArchitectureMetrics;

  return (
    <section id="architecture" className="section-padding bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative mt-16 space-y-6">
          {/* Connecting line */}
          <div
            className="pointer-events-none absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-neutral-700 lg:block"
            aria-hidden="true"
          />

          {layers.map((layer, idx) => {
            const s = LAYER_STYLES[idx % LAYER_STYLES.length];
            return (
              <div key={layer.name} className="relative">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                  {/* Icon node */}
                  <div className="hidden lg:col-span-1 lg:flex lg:justify-center">
                    <div
                      className={cn(
                        'relative z-10 flex h-12 w-12 items-center justify-center rounded-xl shadow-md',
                        s.chip
                      )}
                    >
                      <IconSvg
                        name={LAYER_ICONS[idx % LAYER_ICONS.length]}
                        className="h-6 w-6"
                      />
                    </div>
                  </div>

                  {/* Main card */}
                  <div className="lg:col-span-11">
                    <div className="card overflow-hidden">
                      <div className={cn('h-1 w-full', s.bar)} />
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 lg:hidden">
                              <span
                                className={cn(
                                  'flex h-10 w-10 items-center justify-center rounded-lg',
                                  s.chip
                                )}
                              >
                                <IconSvg
                                  name={LAYER_ICONS[idx % LAYER_ICONS.length]}
                                  className="h-5 w-5"
                                />
                              </span>
                            </div>
                            <h3 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
                              {layer.name}
                            </h3>
                            <p
                              className={cn(
                                'mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                                s.badge
                              )}
                            >
                              {layer.subname}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {layer.features.map((f) => (
                              <span
                                key={f}
                                className={cn(
                                  'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium',
                                  s.feature
                                )}
                              >
                                <IconSvg
                                  name="check"
                                  className="h-3 w-3"
                                />
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                          {layer.description}
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {layer.specs.map((spec) => (
                            <div
                              key={spec}
                              className={cn(
                                'rounded-xl border px-4 py-3 text-sm',
                                s.barBg,
                                'border-transparent'
                              )}
                            >
                              <div className="flex gap-2 text-neutral-800">
                                <IconSvg
                                  name="check"
                                  className={cn(
                                    'mt-0.5 h-4 w-4 shrink-0',
                                    s.feature
                                  )}
                                />
                                <span className="leading-snug">{spec}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics */}
        <div className="mt-16 rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-primary-50/40 p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              { key: metrics.availability, icon: 'shield' as const },
              { key: metrics.integrity, icon: 'check' as const },
              { key: metrics.accuracy, icon: 'target' as const },
              { key: metrics.latency, icon: 'clock' as const },
              { key: metrics.mtbf, icon: 'chip' as const },
              { key: metrics.cost, icon: 'trending' as const },
            ].map((m) => (
              <div
                key={m.key}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-100"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <IconSvg name={m.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-neutral-800">
                  {m.key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
