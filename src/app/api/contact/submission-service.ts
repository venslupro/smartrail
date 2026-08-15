import { logger } from '@/src/lib/logger';
import {
  type GoogleFormEnv,
  type GoogleFormRequiredEnv,
  type RawGoogleFormEnv,
  type SubmissionResult,
  type ValidatedContactRecord,
} from './types';

const TAG = 'contact:submission';

/**
 * 联系表单提交流的抽象。
 * 上层 handler 只依赖此接口，不关心具体实现（Google Forms / Log-only / …）。
 */
export interface ContactSubmissionService {
  submit(record: ValidatedContactRecord): Promise<SubmissionResult>;
}

/**
 * 从 process.env 读取 Google Forms 相关配置。
 * 所有字段统一返回 string | undefined，由后续步骤判定是否齐全。
 */
export function readGoogleFormEnv(): RawGoogleFormEnv {
  return {
    formId: process.env.GOOGLE_FORM_ID,
    entryName: process.env.GOOGLE_FORM_ENTRY_NAME,
    entryCompany: process.env.GOOGLE_FORM_ENTRY_COMPANY,
    entryEmail: process.env.GOOGLE_FORM_ENTRY_EMAIL,
    entryMessage: process.env.GOOGLE_FORM_ENTRY_MESSAGE,
    entryLocale: process.env.GOOGLE_FORM_ENTRY_LOCALE,
    entrySubmittedAt: process.env.GOOGLE_FORM_ENTRY_SUBMITTED_AT,
  };
}

function hasRequiredKeys(
  env: RawGoogleFormEnv
): env is RawGoogleFormEnv & GoogleFormRequiredEnv {
  return Boolean(
    env.formId && env.entryName && env.entryEmail && env.entryMessage
  );
}

/**
 * 判断是否启用 Google Forms 路径。
 * 需 4 个必填字段（formId / name / email / message）全部存在。
 */
export function isGoogleFormConfigured(
  env: RawGoogleFormEnv
): env is GoogleFormEnv {
  return hasRequiredKeys(env);
}

/* ------------------------------------------------------------------ */
/*  Google Forms implementation                                         */
/* ------------------------------------------------------------------ */

/**
 * 通过 Google Forms 公共 formResponse 端点提交记录。
 *
 * Implementation notes:
 *  - 使用 application/x-www-form-urlencoded（与 Google Forms UI 相同格式）。
 *  - Google Forms 端点返回 HTML 而非 JSON；任何 2xx 且响应包含 "recorded"
 *    字样视为成功，其余视为拒绝。
 *  - 仅抛出网络 / 超时层面的错误，交给调用方降级到 log-only。
 */
export class GoogleFormsSubmissionService implements ContactSubmissionService {
  private readonly env: GoogleFormEnv;

  constructor(env: GoogleFormEnv) {
    this.env = env;
  }

  async submit(record: ValidatedContactRecord): Promise<SubmissionResult> {
    const params = new URLSearchParams();
    params.append(this.env.entryName, record.name);
    params.append(this.env.entryEmail, record.email);
    params.append(this.env.entryMessage, record.message);

    if (this.env.entryCompany && record.company) {
      params.append(this.env.entryCompany, record.company);
    }
    if (this.env.entryLocale) {
      params.append(this.env.entryLocale, record.locale);
    }
    if (this.env.entrySubmittedAt) {
      params.append(this.env.entrySubmittedAt, record.submittedAt);
    }

    const endpoint = `https://docs.google.com/forms/d/e/${this.env.formId}/formResponse`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (compatible; HuachengContactProxy/1.0; +https://www.huacheng-tech.com)',
      },
      body: params.toString(),
      redirect: 'follow',
      signal: AbortSignal.timeout(12_000),
    });

    const bodyText = await res.text();
    const head = bodyText.slice(0, 4000);
    const accepted =
      res.ok &&
      (head.includes('response has been recorded') ||
        head.includes('已记录') ||
        head.includes('recorded') ||
        /\/respond\b/.test(head));

    logger.info(TAG, `Google Forms response status=${res.status} accepted=${accepted} bodyLen=${bodyText.length}`);

    return {
      ok: accepted,
      mode: 'google-forms',
      submittedAt: record.submittedAt,
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Log-only implementation (fallback path)                            */
/* ------------------------------------------------------------------ */

export class LogOnlySubmissionService implements ContactSubmissionService {
  private readonly reason?: 'not-configured' | 'gform-rejected' | 'gform-network-error';

  constructor(reason?: LogOnlySubmissionService['reason']) {
    this.reason = reason;
  }

  async submit(record: ValidatedContactRecord): Promise<SubmissionResult> {
    logger.info(TAG, `log-only mode (reason=${this.reason ?? 'not-configured'}) record accepted: ${record.submittedAt}`);
    const degraded =
      this.reason === 'gform-rejected' || this.reason === 'gform-network-error'
        ? this.reason
        : undefined;
    return {
      ok: true,
      mode: 'log-only',
      degraded,
      submittedAt: record.submittedAt,
    };
  }
}
