import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/src/components/sections/Hero';
import { About } from '@/src/components/sections/About';
import { CoreValueSection } from '@/src/components/sections/CoreValueSection';
import { Architecture } from '@/src/components/sections/Architecture';
import { CaseSection } from '@/src/components/sections/CaseSection';
import { Contact } from '@/src/components/sections/Contact';
import type { Locale } from '@/src/i18n/request';

interface HomePageProps {
  readonly params: { locale: string };
}

export default function HomePage({ params }: HomePageProps): JSX.Element {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <CoreValueSection />
      <Architecture />
      <CaseSection />
      <Contact />
    </>
  );
}
