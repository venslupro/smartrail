'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { logger } from '@/src/lib/logger';

const TAG = 'contact:form';

export type FormState = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormData {
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly message: string;
}

export interface UseContactFormResult {
  readonly state: FormState;
  readonly errorText: string;
  readonly handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  readonly resetForm: () => void;
  readonly extractForm: (form: HTMLFormElement) => ContactFormData;
}

function extractForm(form: HTMLFormElement): ContactFormData {
  const data = new FormData(form);
  return {
    name: String(data.get('name') ?? '').trim(),
    company: String(data.get('company') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    message: String(data.get('message') ?? '').trim(),
  };
}

type ApiBody = {
  readonly ok?: boolean;
  readonly error?: string;
  readonly message?: string;
};

/**
 * 联系表单状态机 + API 调用。
 * 纯逻辑从 Contact 组件中抽离出来，便于单测和复用。
 */
export function useContactForm(): UseContactFormResult {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [state, setState] = useState<FormState>('idle');
  const [errorText, setErrorText] = useState<string>('');

  const resetForm = (): void => {
    setState('idle');
    setErrorText('');
  };

  const pickError = (status: number, body: ApiBody | null): string => {
    if (body?.error === 'VALIDATION_FAILED') {
      return String(t('form.validationError', { defaultValue: '请检查必填项是否正确' }));
    }
    if (status === 413) {
      return String(t('form.messageTooLong', { defaultValue: '内容过长，请精简后重试' }));
    }
    if (status >= 500) {
      return String(
        t('form.serverError', { defaultValue: '服务器临时繁忙，请稍后重试或直接发邮件' })
      );
    }
    return String(
      t('form.submitFailed', { defaultValue: '提交失败，请稍后重试或直接发邮件联系' })
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = extractForm(form);

    if (!payload.name || !payload.email || !payload.message) {
      setErrorText(
        String(t('form.validationError', { defaultValue: '请填写必填项' }))
      );
      setState('error');
      return;
    }

    setState('submitting');
    setErrorText('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      });

      let body: ApiBody | null = null;
      try {
        body = (await res.json()) as ApiBody | null;
      } catch {
        body = null;
      }

      if ((res.status === 201 || res.status === 202) && body?.ok === true) {
        form.reset();
        setState('success');
        return;
      }

      setErrorText(pickError(res.status, body));
      setState('error');
    } catch (err) {
      logger.error(TAG, `submit error: ${err instanceof Error ? err.message : String(err)}`);
      setErrorText(
        String(t('form.networkError', { defaultValue: '网络异常，请检查连接或直接发送邮件' }))
      );
      setState('error');
    }
  };

  return { state, errorText, handleSubmit, resetForm, extractForm };
}
