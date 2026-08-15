import { logger } from '@/src/lib/logger';
import type { ContactLogSummary, ValidatedContactRecord } from './types';

const TAG = 'contact';

export function maskPartial(value: string): string {
  if (value.length <= 4) return '*'.repeat(value.length);
  return `${value.slice(0, 2)}${'*'.repeat(Math.max(value.length - 4, 2))}${value.slice(-2)}`;
}

export function buildLogSummary(
  record: ValidatedContactRecord,
  gformsEnabled: boolean
): ContactLogSummary {
  return {
    mode: gformsEnabled ? 'GFORMS' : 'LOG-ONLY',
    locale: record.locale,
    emailMasked: maskPartial(record.email),
    nameMasked: maskPartial(record.name),
    companyMasked: record.company ? maskPartial(record.company) : null,
    messageBytes: Buffer.byteLength(record.message, 'utf-8'),
    submittedAt: record.submittedAt,
  };
}

function formatSummary(s: ContactLogSummary): string {
  const parts = [
    `submission=${s.mode}`,
    `locale=${s.locale}`,
    `email=${s.emailMasked}`,
    `name=${s.nameMasked}`,
  ];
  if (s.companyMasked) parts.push(`company=${s.companyMasked}`);
  parts.push(`msgBytes=${s.messageBytes}`, `time=${s.submittedAt}`);
  return parts.join(' ');
}

/** 打印脱敏摘要行（INFO 级别，默认开启）。 */
export function logContactSummary(summary: ContactLogSummary): void {
  logger.info(TAG, formatSummary(summary));
}

/** 打印完整原文（DEBUG 级别，生产可关闭）。包含姓名/邮箱/正文，仅服务端可见。 */
export function logContactFull(record: ValidatedContactRecord): void {
  const companyBlock = record.company ? `  Company: ${record.company}\n` : '';
  const indented = record.message.replace(/\n/g, '\n  ');
  logger.debug(
    TAG,
    `full message:\n  From: ${record.name} <${record.email}>\n${companyBlock}  ${indented}`
  );
}
