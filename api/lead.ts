import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const config = {
  maxDuration: 15,
};

// In-memory rate limiting map: 5 requests per 10 minutes per IP (Task 6.2)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

/**
 * Strip HTML tags and control characters, and enforce max character length.
 */
function sanitizeText(input: string | undefined, maxLength = 300): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Prevent spreadsheet formula injection by prefixing values starting with =, +, -, @ with an apostrophe.
 */
function sanitizeSheetCell(input: string | undefined, maxLength = 300): string {
  const clean = sanitizeText(input, maxLength);
  if (!clean) return '';
  if (/^[=+\-@]/.test(clean)) {
    return `'${clean}`;
  }
  return clean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Redact any sensitive info from error messages before logging or reporting channel status.
 */
function safeErrorReason(err: unknown): string {
  if (!(err instanceof Error)) return 'Unknown channel error';
  const msg = err.message || 'Channel error';
  if (/not fully configured/i.test(msg)) return msg;
  if (/timeout/i.test(msg)) return 'Operation timed out after 8s';
  if (/Invalid login|Username and Password not accepted|EAUTH/i.test(msg)) {
    return 'SMTP authentication failed (check SMTP_USER / SMTP_PASS)';
  }
  if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT/i.test(msg)) {
    return 'Network connection to upstream service failed';
  }
  if (/permission|forbidden|403|not found|404/i.test(msg)) {
    return 'Google Sheets access denied or sheet ID not found';
  }
  if (/PEM|private key|DECODER/i.test(msg)) {
    return 'Invalid GOOGLE_PRIVATE_KEY format';
  }
  return 'Service delivery failed';
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timeout after ${ms}ms`));
    }, ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

const leadSchema = z.object({
  name: z
    .string({ required_error: 'الاسم مطلوب' })
    .trim()
    .min(2, 'الاسم يجب أن يتكون من حرفين على الأقل')
    .max(120, 'الاسم طويل جداً'),
  phone: z
    .string({ required_error: 'رقم التليفون مطلوب' })
    .trim()
    .refine(
      (val) => /^\+[1-9]\d{6,14}$/.test(val) && isValidPhoneNumber(val),
      'يرجى إدخال رقم هاتف دولي صحيح'
    ),
  email: z
    .string()
    .trim()
    .optional()
    .default('')
    .refine(
      (val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'البريد الإلكتروني غير صحيح'
    ),
  unit: z
    .string({ required_error: 'يرجى اختيار الوحدة / المساحة' })
    .trim()
    .min(1, 'يرجى اختيار الوحدة / المساحة')
    .max(200),
  honeypot: z.string().optional().default(''),
  pageUrl: z.string().optional().default(''),
  referrer: z.string().optional().default(''),
  utm_source: z.string().optional().default(''),
  utm_medium: z.string().optional().default(''),
  utm_campaign: z.string().optional().default(''),
  utm_term: z.string().optional().default(''),
  utm_content: z.string().optional().default(''),
  gclid: z.string().optional().default(''),
  gbraid: z.string().optional().default(''),
  wbraid: z.string().optional().default(''),
  device: z.string().optional().default(''),
  timestamp: z.string().optional().default(''),
});

type LeadPayload = z.infer<typeof leadSchema>;

function getCairoTimestamp(provided?: string): string {
  const clean = sanitizeText(provided, 60);
  if (clean.length > 0) {
    return clean;
  }
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

async function sendLeadEmail(
  lead: LeadPayload,
  cairoTime: string,
  combinedGclid: string
): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;
  const to = process.env.EMAIL_TO || user;

  if (!host || !user || !pass || !to) {
    throw new Error('SMTP environment variables are not fully configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 6000,
    greetingTimeout: 5000,
    socketTimeout: 7000,
  });

  const cleanName = sanitizeText(lead.name, 120);
  const cleanPhone = sanitizeText(lead.phone, 30);
  const cleanEmail = sanitizeText(lead.email, 120);
  const cleanUnit = sanitizeText(lead.unit, 150);

  const rows: Array<[string, string]> = [
    ['الاسم', cleanName],
    ['رقم الهاتف (E.164)', cleanPhone],
    ['البريد الإلكتروني', cleanEmail || 'غير محدد'],
    ['الوحدة / المساحة المختارة', cleanUnit],
    ['وقت التسجيل (توقيت القاهرة)', cairoTime],
    ['رابط الصفحة (Page URL)', sanitizeText(lead.pageUrl, 300) || 'غير محدد'],
    ['المصدر المرجعي (Referrer)', sanitizeText(lead.referrer, 300) || 'مباشر'],
    ['نوع الجهاز (Device)', sanitizeText(lead.device, 40) || 'غير محدد'],
    ['UTM Source', sanitizeText(lead.utm_source, 100) || '-'],
    ['UTM Medium', sanitizeText(lead.utm_medium, 100) || '-'],
    ['UTM Campaign', sanitizeText(lead.utm_campaign, 120) || '-'],
    ['UTM Term', sanitizeText(lead.utm_term, 120) || '-'],
    ['UTM Content', sanitizeText(lead.utm_content, 120) || '-'],
    ['معرف نقرة إعلانات جوجل (GCLID / GBRAID / WBRAID)', combinedGclid || '-'],
  ];

  const htmlRows = rows
    .map(
      ([label, val], idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? '#F6F3EC' : '#FFFFFF'};">
        <td style="padding: 12px 16px; border: 1px solid #D8D0C1; font-weight: 700; color: #0D3B2E; width: 36%;">${escapeHtml(label)}</td>
        <td style="padding: 12px 16px; border: 1px solid #D8D0C1; color: #13221D; direction: ltr; text-align: right;">${escapeHtml(val)}</td>
      </tr>`
    )
    .join('');

  const html = `
    <!doctype html>
    <html lang="ar" dir="rtl">
      <body style="margin: 0; padding: 24px; background-color: #EBE5D8; font-family: Tahoma, Arial, sans-serif; direction: rtl;">
        <div style="max-width: 680px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D8D0C1; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0D3B2E; color: #F6F3EC; padding: 20px 24px; border-bottom: 3px solid #B8864B;">
            <h2 style="margin: 0; font-size: 20px;">عميل جديد — كمبوند مروج سموحة (Muruj Compound)</h2>
            <p style="margin: 6px 0 0; font-size: 13px; color: #DEC094;">تم تسجيل طلب اهتمام جديد عبر الموقع الإلكتروني</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tbody>
                ${htmlRows}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"كمبوند مروج - Muruj Compound" <${from}>`,
    to,
    replyTo: cleanEmail ? cleanEmail : undefined,
    subject: `عميل جديد - كمبوند مروج - ${cleanName}`,
    html,
  });
}

async function appendLeadToGoogleSheet(
  lead: LeadPayload,
  cairoTime: string,
  combinedGclid: string
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !clientEmail || !rawPrivateKey) {
    throw new Error('Google Sheets environment variables are not fully configured');
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || 'Sheet1';

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${firstSheetTitle}!A1:N1`,
  });

  const headers = [
    'Timestamp',
    'Name',
    'Phone',
    'Email',
    'Unit',
    'Source',
    'Medium',
    'Campaign',
    'Term',
    'Content',
    'GCLID',
    'Page URL',
    'Referrer',
    'Device',
  ];

  const hasHeader =
    existing.data.values &&
    existing.data.values.length > 0 &&
    existing.data.values[0].length > 0 &&
    String(existing.data.values[0][0]).trim() !== '';

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${firstSheetTitle}!A1:N1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });
  }

  const rowValues = [
    sanitizeSheetCell(cairoTime, 60),
    sanitizeSheetCell(lead.name, 120),
    sanitizeSheetCell(lead.phone, 30),
    sanitizeSheetCell(lead.email, 120),
    sanitizeSheetCell(lead.unit, 150),
    sanitizeSheetCell(lead.utm_source, 100),
    sanitizeSheetCell(lead.utm_medium, 100),
    sanitizeSheetCell(lead.utm_campaign, 120),
    sanitizeSheetCell(lead.utm_term, 120),
    sanitizeSheetCell(lead.utm_content, 120),
    sanitizeSheetCell(combinedGclid, 200),
    sanitizeSheetCell(lead.pageUrl, 300),
    sanitizeSheetCell(lead.referrer, 300),
    sanitizeSheetCell(lead.device, 40),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${firstSheetTitle}!A:N`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues],
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'الطريقة غير مسموحة (POST فقط)',
    });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : Array.isArray(forwarded)
        ? forwarded[0]
        : '') ||
    req.socket?.remoteAddress ||
    'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error:
        'لقد قمت بإرسال عدة طلبات خلال وقت قصير. يرجى الانتظار بضع دقائق والمحاولة مرة أخرى، أو تواصل معنا مباشرة عبر واتساب.',
    });
  }

  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || 'بيانات النموذج غير صحيحة';
    return res.status(400).json({
      success: false,
      error: firstIssue,
    });
  }

  const lead = parsed.data;

  // Anti-spam honeypot check
  if (lead.honeypot && lead.honeypot.trim().length > 0) {
    return res.status(200).json({
      success: true,
      channels: {
        email: { status: 'skipped', reason: 'honeypot' },
        sheets: { status: 'skipped', reason: 'honeypot' },
      },
    });
  }

  const cairoTime = getCairoTimestamp(lead.timestamp);
  const combinedGclid =
    [
      lead.gclid ? `gclid:${sanitizeText(lead.gclid, 100)}` : '',
      lead.gbraid ? `gbraid:${sanitizeText(lead.gbraid, 100)}` : '',
      lead.wbraid ? `wbraid:${sanitizeText(lead.wbraid, 100)}` : '',
    ]
      .filter(Boolean)
      .join(' | ') || sanitizeText(lead.gclid, 100) || '';

  // Run both channels in parallel with an 8-second timeout per channel (Task 6.4)
  const [emailResult, sheetResult] = await Promise.allSettled([
    withTimeout(sendLeadEmail(lead, cairoTime, combinedGclid), 8000, 'SMTP Email'),
    withTimeout(appendLeadToGoogleSheet(lead, cairoTime, combinedGclid), 8000, 'Google Sheets'),
  ]);

  const emailReason =
    emailResult.status === 'rejected' ? safeErrorReason(emailResult.reason) : undefined;
  const sheetReason =
    sheetResult.status === 'rejected' ? safeErrorReason(sheetResult.reason) : undefined;

  if (emailResult.status === 'rejected') {
    console.error('[Lead API] SMTP Email failed:', emailReason);
  }
  if (sheetResult.status === 'rejected') {
    console.error('[Lead API] Google Sheets failed:', sheetReason);
  }

  const channelsReport = {
    email: {
      status: emailResult.status === 'fulfilled' ? ('ok' as const) : ('failed' as const),
      ...(emailReason ? { reason: emailReason } : {}),
    },
    sheets: {
      status: sheetResult.status === 'fulfilled' ? ('ok' as const) : ('failed' as const),
      ...(sheetReason ? { reason: sheetReason } : {}),
    },
  };

  const atLeastOneSucceeded =
    emailResult.status === 'fulfilled' || sheetResult.status === 'fulfilled';

  if (!atLeastOneSucceeded) {
    return res.status(502).json({
      success: false,
      error:
        'تعذر تسجيل طلبك حالياً. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب أو الاتصال.',
      channels: channelsReport,
    });
  }

  return res.status(200).json({
    success: true,
    channels: channelsReport,
  });
}
