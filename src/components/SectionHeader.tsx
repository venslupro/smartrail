import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface SectionHeaderProps {
  readonly eyebrow: ReactNode;
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  /** Use 'loose' for About (mt-5), 'tight' for other sections (mt-4). */
  readonly spacing?: 'loose' | 'tight';
  readonly className?: string;
}

/**
 * Standard section header shared across About / Architecture / CoreValue /
 * CaseSection. Eliminates the repeated mx-auto + eyebrow + h2 + p pattern.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  spacing = 'tight',
  className,
}: SectionHeaderProps): JSX.Element {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'text-base text-neutral-600 sm:text-lg leading-relaxed',
            spacing === 'loose' ? 'mt-5' : 'mt-4'
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
