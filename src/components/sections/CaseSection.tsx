import { useTranslations } from 'next-intl';
import type { PilotInfo, TargetItem, RoadmapPhase, StrategyItem } from '@/src/types';
import { IconSvg } from '../icons/IconSvg';
import { SectionHeader } from '../SectionHeader';
import { cn } from '@/src/lib/utils';

export function CaseSection(): JSX.Element {
  const t = useTranslations('case');
  const pilotInfo = t.raw('pilotInfo') as PilotInfo;
  const features = t.raw('features') as readonly string[];
  const targets = t.raw('targets') as readonly TargetItem[];
  const roadmap = t.raw('roadmap') as readonly RoadmapPhase[];
  const br = t.raw('beltRoad');
  const strategies = br.strategies as readonly StrategyItem[];
  const localItems = br.localItems as readonly string[];

  return (
    <section id="cases" className="section-padding bg-section-gradient">
      <div className="container-page">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Pilot info */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-hero-gradient p-1">
              <div className="relative w-full overflow-hidden rounded-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wide%20panorama%20of%20Kazakhstan%20railway%20landscape%2C%20modern%20freight%20train%20on%20railroad%20tracks%2C%20vast%20grasslands%2C%20golden%20hour%20sunset%20light%2C%20professional%20photography%2C%20clean%20composition&image_size=landscape_4_3"
                  alt="Kazakhstan pilot railway"
                  className="block w-full h-auto object-cover"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                    <IconSvg name="globe" className="h-3.5 w-3.5" />
                    Belt and Road Initiative
                  </div>
                  <div className="mt-3 text-2xl font-bold leading-tight">
                    50%+ {t('beltRoad.effect')}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {[pilotInfo.length, pilotInfo.type, pilotInfo.devices, pilotInfo.density].map(
                  (item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4"
                    >
                      <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {item.label}
                      </div>
                      <div className="mt-1 text-xl font-bold text-neutral-900">
                        {item.value}
                      </div>
                    </div>
                  )
                )}
              </div>
              <h3 className="mt-7 text-lg font-semibold text-neutral-900">
                Pilot Line Features
              </h3>
              <ul className="mt-4 space-y-2.5">
                {features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <IconSvg name="check" className="h-3 w-3" />
                    </span>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Targets */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {targets.map((tg, idx) => (
            <div key={tg.title} className="card card-hover p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <IconSvg name="target" className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold text-neutral-400 tabular-nums">
                  0{idx + 1}
                </span>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                {tg.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {tg.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {t('roadmapTitle')}
          </h3>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-neutral-300 md:block" />
            <div className="grid gap-6 md:grid-cols-3">
              {roadmap.map((phase, idx) => (
                <div key={phase.phase} className="relative">
                  <div className="relative mx-auto w-fit md:mx-0">
                    <span
                      className={cn(
                        'relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-md',
                        idx === 0
                          ? 'bg-primary-600'
                          : idx === 1
                            ? 'bg-accent-600'
                            : 'bg-neutral-800'
                      )}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div className="mt-5 card p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-900">
                        {phase.phase}
                      </h4>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                        {phase.time}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-neutral-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Belt and Road */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-accent-50/50 p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
              <IconSvg name="globe" className="h-3.5 w-3.5" />
              Belt and Road
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {br.title}
            </h3>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {strategies.map((st, idx) => (
              <div
                key={st.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-semibold text-neutral-900">
                    {st.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <h4 className="text-base font-semibold text-neutral-800">
              {br.localTitle}
            </h4>
            {localItems.map((l) => (
              <div
                key={l}
                className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <IconSvg name="sparkles" className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-neutral-700">
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
