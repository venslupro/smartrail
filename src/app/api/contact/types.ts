export const MAX_MESSAGE_BYTES = 20_000;
export const MAX_NAME_BYTES = 200;

export interface ContactPayload {
  readonly name?: unknown;
  readonly company?: unknown;
  readonly email?: unknown;
  readonly message?: unknown;
  readonly locale?: unknown;
}

/**
 * Google Forms 环境变量的必填子集。
 * 仅当这些字段都配置了，才尝试走 Google Forms 提交路径。
 */
export interface GoogleFormRequiredEnv {
  readonly formId: string;
  readonly entryName: string;
  readonly entryEmail: string;
  readonly entryMessage: string;
}

/**
 * Google Forms 环境变量的可选扩展字段。
 * 未配置时这些字段不会附加到提交请求。
 */
export interface GoogleFormOptionalEnv {
  readonly entryCompany?: string;
  readonly entryLocale?: string;
  readonly entrySubmittedAt?: string;
}

/** 合并后的完整环境变量配置（4 个必填 + 3 个可选）。 */
export interface GoogleFormEnv
  extends GoogleFormRequiredEnv,
    Partial<GoogleFormOptionalEnv> {}

/**
 * 环境变量的原始读取结果。
 * 3 个可选字段使用 `?:` 声明：它们本身就可以完全不在 process.env 中出现，
 * 与 GoogleFormEnv（它们是 Partial<Optional>）保持结构兼容，便于类型收窄。
 */
export interface RawGoogleFormEnv {
  readonly formId?: string;
  readonly entryName?: string;
  readonly entryEmail?: string;
  readonly entryMessage?: string;
  readonly entryCompany?: string;
  readonly entryLocale?: string;
  readonly entrySubmittedAt?: string;
}

/** 经过校验的联系表单记录。 */
export interface ValidatedContactRecord {
  readonly name: string;
  readonly company: string | null;
  readonly email: string;
  readonly message: string;
  readonly locale: string;
  readonly submittedAt: string;
}

/** 提交流水账使用的脱敏摘要。 */
export interface ContactLogSummary {
  readonly mode: 'GFORMS' | 'LOG-ONLY';
  readonly locale: string;
  readonly emailMasked: string;
  readonly nameMasked: string;
  readonly companyMasked: string | null;
  readonly messageBytes: number;
  readonly submittedAt: string;
}

export type SubmissionMode = 'google-forms' | 'log-only';

export interface SubmissionResult {
  readonly ok: boolean;
  readonly mode: SubmissionMode;
  readonly degraded?: 'gform-rejected' | 'gform-network-error';
  readonly submittedAt: string;
}
