'use client';

import { useTranslations } from 'next-intl';
import { IconSvg } from '../icons/IconSvg';
import { useContactForm } from './useContactForm';

export function Contact(): JSX.Element {
  const t = useTranslations('contact');
  const { state, errorText, handleSubmit, resetForm } = useContactForm();

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 p-0 shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* Left info */}
            <div className="relative p-8 sm:p-12 text-white">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 15% 20%, rgba(58,142,249,0.4) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(45,212,191,0.3) 0%, transparent 45%)',
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {t('eyebrow')}
                </span>
                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {t('title')}
                </h2>
                <p className="mt-4 max-w-md text-base text-white/75">
                  {t('subtitle')}
                </p>

                <blockquote className="mt-10 border-l-2 border-accent-400/60 pl-5 text-sm leading-relaxed italic text-white/80">
                  {t('vision')}
                </blockquote>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/20 text-accent-300">
                      <IconSvg name="mail" className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-white/50">
                        {t('company.emailLabel')}
                      </div>
                      <a
                        href={`mailto:${t('company.email')}`}
                        className="mt-0.5 block text-lg font-semibold text-white transition hover:text-accent-300"
                      >
                        {t('company.email')}
                      </a>
                      <div className="mt-1 text-sm text-white/60">
                        {t('company.name')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="bg-white p-8 sm:p-12">
              {state === 'success' ? (
                <SuccessView t={t} onReset={resetForm} />
              ) : (
                <FormView
                  t={t}
                  state={state}
                  errorText={errorText}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-views (pure presentational)                                    */
/* ------------------------------------------------------------------ */

interface SuccessViewProps {
  readonly t: ReturnType<typeof useTranslations<'contact'>>;
  readonly onReset: () => void;
}

function SuccessView({ t, onReset }: SuccessViewProps): JSX.Element {
  return (
    <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
        <IconSvg name="check" className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-neutral-900">
        {t('form.success')}
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        {t('form.successHint', {
          defaultValue: '我们已收到您的咨询，将通过邮件尽快回复。',
        })}
      </p>
      <p className="mt-1 text-xs text-neutral-500">{t('company.email')}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
      >
        {t('form.submitAnother', { defaultValue: '再提交一条咨询' })}
      </button>
    </div>
  );
}

interface FormViewProps {
  readonly t: ReturnType<typeof useTranslations<'contact'>>;
  readonly state: ReturnType<typeof useContactForm>['state'];
  readonly errorText: string;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function FormView({ t, state, errorText, onSubmit }: FormViewProps): JSX.Element {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('form.name')}
          name="name"
          placeholder={t('form.namePlaceholder')}
          required
        />
        <Field
          label={t('form.company')}
          name="company"
          placeholder={t('form.companyPlaceholder')}
        />
      </div>
      <Field
        label={t('form.email')}
        name="email"
        type="email"
        placeholder={t('form.emailPlaceholder')}
        required
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
          {t('form.message')}
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={t('form.messagePlaceholder')}
          className="block w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100"
        />
      </div>
      {state === 'error' && errorText ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          <IconSvg name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorText}</span>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-primary w-full disabled:opacity-70"
      >
        {state === 'submitting' ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  );
}

interface FieldProps {
  readonly label: string;
  readonly name: string;
  readonly type?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: FieldProps): JSX.Element {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="block w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100"
      />
    </div>
  );
}
