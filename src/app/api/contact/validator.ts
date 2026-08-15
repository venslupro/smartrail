import {
  MAX_MESSAGE_BYTES,
  MAX_NAME_BYTES,
  type ContactPayload,
  type ValidatedContactRecord,
} from './types';

export interface ValidationErrors {
  readonly name: boolean;
  readonly email: boolean;
  readonly message: boolean;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly record: ValidatedContactRecord | null;
  readonly errors: ValidationErrors;
}

function isNonEmptyString(v: unknown, maxBytes: number): v is string {
  if (typeof v !== 'string') return false;
  const s = v.trim();
  if (s.length === 0) return false;
  if (Buffer.byteLength(s, 'utf-8') > maxBytes) return false;
  return true;
}

function isValidEmail(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  const s = v.trim();
  if (s.length < 5 || s.length > 254) return false;
  const safe = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
  return safe.test(s);
}

function normalizeLocale(v: unknown): string {
  return typeof v === 'string' && /^[a-z]{2,3}(-[A-Za-z]{2,})?$/.test(v)
    ? v
    : 'unknown';
}

function normalizeCompany(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s.length > 0 ? s.slice(0, 300) : null;
}

/**
 * 校验联系表单 payload。
 * 非破坏性：即使某字段未通过校验，其他字段的规范化也会继续执行，
 * 以便 errors 对象一次性返回所有缺失项给前端。
 */
export function validateContactPayload(
  payload: ContactPayload
): ValidationResult {
  const name = isNonEmptyString(payload.name, MAX_NAME_BYTES)
    ? payload.name.trim()
    : null;
  const email = isValidEmail(payload.email) ? payload.email.trim() : null;
  const message = isNonEmptyString(payload.message, MAX_MESSAGE_BYTES)
    ? payload.message.trim()
    : null;

  const record: ValidatedContactRecord | null =
    name && email && message
      ? {
          name,
          company: normalizeCompany(payload.company),
          email,
          message,
          locale: normalizeLocale(payload.locale),
          submittedAt: new Date().toISOString(),
        }
      : null;

  return {
    valid: record !== null,
    record,
    errors: {
      name: name === null,
      email: email === null,
      message: message === null,
    },
  };
}
