import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/src/i18n/request';

export default function RootPage(): never {
  redirect(`/${DEFAULT_LOCALE}`);
}
