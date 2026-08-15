import type { ClassValue } from './types';

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const push = (item: ClassValue): void => {
    if (!item) return;
    if (typeof item === 'string' || typeof item === 'number') {
      out.push(String(item));
    } else if (Array.isArray(item)) {
      for (const sub of item) push(sub);
    } else if (typeof item === 'object') {
      for (const [key, val] of Object.entries(item)) {
        if (val) out.push(key);
      }
    }
  };
  for (const item of inputs) push(item);
  return out.join(' ');
}

export function buildSectionId(sectionKey: string): string {
  return sectionKey;
}
