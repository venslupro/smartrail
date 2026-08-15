import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/src/i18n/request';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import '../globals.css';

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale: locale as Locale }));
}

interface LocaleLayoutProps {
  readonly children: ReactNode;
  readonly params: { locale: string };
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const titleByLocale: Record<string, string> = {
    zh: '江苏华骋科技有限公司 | 智慧铁路基础设施监测解决方案',
    en: 'Jiangsu Huacheng Technology | Smart Railway Solutions',
    ru: 'Jiangsu Huacheng Technology | Умный мониторинг ж/д инфраструктуры',
  };
  const descByLocale: Record<string, string> = {
    zh: '江苏华骋科技有限公司专注于智慧铁路基础设施监测，提供基于智能感知技术的铁路状态监测与预测性维护系统，服务一带一路倡议。',
    en: 'Jiangsu Huacheng Technology Co., Ltd. specializes in smart railway infrastructure monitoring with end-edge-cloud architecture under Belt and Road Initiative.',
    ru: 'Jiangsu Huacheng Technology Co., Ltd. специализируется на интеллектуальном мониторинге железнодорожной инфраструктуры — архитектура «устройство — край — облако», инициатива «Один пояс, один путь».',
  };
  const ogTitleByLocale: Record<string, string> = {
    zh: '智慧铁路基础设施监测解决方案',
    en: 'Smart Railway Solutions',
    ru: 'Решения для умной железнодорожной инфраструктуры',
  };
  const ogDescByLocale: Record<string, string> = {
    zh: '江苏华骋科技有限公司 - 智慧铁路基础设施监测领导者',
    en: 'Jiangsu Huacheng Technology - Smart Railway Leader',
    ru: 'Jiangsu Huacheng Technology — лидер умного мониторинга ж/д инфраструктуры',
  };

  const locale = params.locale;
  const title = titleByLocale[locale] ?? titleByLocale.en;
  const description = descByLocale[locale] ?? descByLocale.en;
  const ogTitle = ogTitleByLocale[locale] ?? ogTitleByLocale.en;
  const ogDescription = ogDescByLocale[locale] ?? ogDescByLocale.en;

  return {
    metadataBase: new URL('https://smartrail.vercel.app'),
    title,
    description,
    keywords: [
      'smart railway',
      'умная железная дорога',
      '智慧铁路',
      'railway monitoring',
      'predictive maintenance',
      '智能轨枕',
      'infrastructure monitoring',
      'Jiangsu Huacheng',
      '江苏华骋',
      'Belt and Road',
    ],
    authors: [{ name: 'Jiangsu Huacheng Technology Co., Ltd.' }],
    openGraph: {
      type: 'website',
      locale,
      title: ogTitle,
      description: ogDescription,
      siteName: 'Smartrail | Huacheng Tech',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Smartrail | Huacheng Tech',
      description: 'Smart Railway Infrastructure Monitoring Solutions',
    },
    icons: {
      icon: [
        {
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%23246fef'/%3E%3Cpath d='M4 18L6 14l4-7 5 11 3-5h2' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cpath d='M3 20h18M9 9l3-2' stroke='white' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
          type: 'image/svg+xml',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<JSX.Element> {
  if (!LOCALES.includes(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-md"
          >
            <SkipToMainContent locale={locale} />
          </a>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function SkipToMainContent({ locale }: { locale: Locale }): string {
  return locale === 'zh' ? '跳转到主要内容' : 'Skip to main content';
}
