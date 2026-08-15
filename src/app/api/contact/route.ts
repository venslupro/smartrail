import { NextResponse } from 'next/server';
import { logger } from '@/src/lib/logger';
import { validateContactPayload } from './validator';
import {
  GoogleFormsSubmissionService,
  LogOnlySubmissionService,
  isGoogleFormConfigured,
  readGoogleFormEnv,
  type ContactSubmissionService,
} from './submission-service';
import {
  buildLogSummary,
  logContactFull,
  logContactSummary,
} from './contact-logger';
import type { ContactPayload, GoogleFormEnv } from './types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TAG = 'contact:route';

/* ------------------------------------------------------------------ */
/*  Route handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(request: Request): Promise<NextResponse> {
  const payload = await parseJsonBody(request);
  if (payload === null) {
    return NextResponse.json(
      { ok: false, error: 'INVALID_JSON', message: 'Invalid JSON body' },
      { status: 400 }
    );
  }
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json(
      { ok: false, error: 'INVALID_BODY', message: 'Body must be a JSON object' },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(payload as ContactPayload);
  if (!validation.valid || !validation.record) {
    return NextResponse.json(
      {
        ok: false,
        error: 'VALIDATION_FAILED',
        message: 'Required fields missing: name / email / message',
        fields: validation.errors,
      },
      { status: 422 }
    );
  }

  const record = validation.record;
  const rawEnv = readGoogleFormEnv();
  const gfEnabled = isGoogleFormConfigured(rawEnv);

  const summary = buildLogSummary(record, gfEnabled);
  logContactSummary(summary);
  logContactFull(record);

  const service = createSubmissionService(rawEnv, gfEnabled);
  const result = await submitWithFallback(service, record, gfEnabled);

  return buildResponse(result);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

async function parseJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function createSubmissionService(
  rawEnv: ReturnType<typeof readGoogleFormEnv>,
  gfEnabled: boolean
): ContactSubmissionService {
  if (gfEnabled) {
    // 上游 isGoogleFormConfigured(rawEnv) === true 已保证必填字段非空。
    return new GoogleFormsSubmissionService(rawEnv as GoogleFormEnv);
  }
  return new LogOnlySubmissionService('not-configured');
}

/**
 * 尝试提交，失败时自动降级为 log-only 模式。
 * 对用户始终返回成功（201 / 202），真实错误只打服务端日志。
 */
async function submitWithFallback(
  primary: ContactSubmissionService,
  record: Awaited<ReturnType<typeof validateContactPayload>>['record'] & object,
  gfEnabled: boolean
): Promise<Awaited<ReturnType<ContactSubmissionService['submit']>>> {
  const rec = record as Parameters<ContactSubmissionService['submit']>[0];

  if (!gfEnabled) {
    return primary.submit(rec);
  }

  try {
    const result = await primary.submit(rec);
    if (!result.ok) {
      // Google Forms 返回拒绝页（字段变动、表单关闭等）。
      logger.error(
        TAG,
        'Google Forms submission declined — fallback to log-only. ' +
          'If this repeats, verify GOOGLE_FORM_ENTRY_* values against the form.'
      );
      return new LogOnlySubmissionService('gform-rejected').submit(rec);
    }
    logger.info(TAG, `Google Forms stored OK status in result`);
    return result;
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    logger.error(
      TAG,
      `Google Forms unreachable (network/timeout): ${msg} — fallback to log-only. ` +
        'Hint: deploy to a region that can reach docs.google.com.'
    );
    return new LogOnlySubmissionService('gform-network-error').submit(rec);
  }
}

function buildResponse(
  result: Awaited<ReturnType<ContactSubmissionService['submit']>>
): NextResponse {
  if (result.mode === 'google-forms' && !result.degraded) {
    return NextResponse.json(
      { ok: true, id: null, submittedAt: result.submittedAt, mode: 'google-forms' },
      { status: 201 }
    );
  }
  return NextResponse.json(
    {
      ok: true,
      id: null,
      submittedAt: result.submittedAt,
      mode: 'log-only',
      degraded: result.degraded,
    },
    { status: 202 }
  );
}
