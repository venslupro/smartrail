import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { LOCALES } from './request';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: [...LOCALES],
    localePrefix: 'always',
  });
