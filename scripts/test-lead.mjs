#!/usr/bin/env node
/**
 * scripts/test-lead.mjs
 * Sends a sample lead POST request to /api/lead (and GET to /api/health)
 * and prints the result of each channel (email: ok/failed + reason, sheets: ok/failed + reason)
 * without exposing secrets. If no server is listening on port 3000, starts an embedded local
 * HTTP server executing the exact /api/lead and /api/health logic.
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

async function loadDotEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const content = await fs.readFile(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!(key in process.env)) {
        process.env[key] = val;
      }
    }
  } catch {
    // .env not found or unreadable
  }
}

const samplePayload = {
  name: 'عميل تجريبي - اختبار النظام',
  phone: '+201012345678',
  email: 'test.lead@example.com',
  unit: '3 غرف (131–257 م²)',
  honeypot: '',
  pageUrl:
    'https://muruj-compound.vercel.app/?utm_source=google&utm_medium=cpc&utm_campaign=test_campaign&gclid=EAIaIQobChMI_TEST',
  referrer: 'https://www.google.com/',
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'test_campaign',
  utm_term: 'كمبوند مروج سموحة',
  utm_content: 'ad_variant_a',
  gclid: 'EAIaIQobChMI_TEST',
  device: 'Mobile',
};

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .refine((val) => /^\+[1-9]\d{6,14}$/.test(val) && isValidPhoneNumber(val)),
  email: z.string().trim().optional().default(''),
  unit: z.string().trim().min(1).max(200),
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

function safeReason(err) {
  if (!(err instanceof Error)) return 'Unknown channel error';
  const msg = err.message || 'Channel error';
  if (/not fully configured/i.test(msg)) return msg;
  if (/Invalid login|EAUTH/i.test(msg)) return 'SMTP authentication failed (check SMTP_PASS)';
  if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT/i.test(msg)) return 'Network connection failed';
  return msg.replace(/-----BEGIN[\s\S]*/g, '[REDACTED]');
}

async function startEmbeddedApiServer() {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/api/health') {
      const isCfg = (v) => Boolean(v && v.trim().length > 0);
      const smtpReady =
        isCfg(process.env.SMTP_HOST) &&
        isCfg(process.env.SMTP_PORT) &&
        isCfg(process.env.SMTP_USER) &&
        isCfg(process.env.SMTP_PASS) &&
        isCfg(process.env.EMAIL_TO);
      const googleSheetsReady =
        isCfg(process.env.GOOGLE_SHEET_ID) &&
        isCfg(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) &&
        isCfg(process.env.GOOGLE_PRIVATE_KEY);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          ok: true,
          smtpReady,
          googleSheetsReady,
          anyLeadChannelReady: smtpReady || googleSheetsReady,
        })
      );
      return;
    }

    if (req.url === '/api/lead' && req.method === 'POST') {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      const body = JSON.parse(raw || '{}');
      const parsed = leadSchema.safeParse(body);
      if (!parsed.success) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Validation failed' }));
        return;
      }

      const [emailResult, sheetResult] = await Promise.allSettled([
        (async () => {
          const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;
          if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) {
            throw new Error('SMTP environment variables are not fully configured (SMTP_PASS empty)');
          }
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: Number(SMTP_PORT) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          });
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || SMTP_USER,
            to: EMAIL_TO,
            subject: `عميل جديد - كمبوند مروج - ${parsed.data.name}`,
            text: `${parsed.data.name} | ${parsed.data.phone} | ${parsed.data.unit}`,
          });
        })(),
        (async () => {
          const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
          if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            throw new Error(
              'Google Sheets environment variables are not fully configured (GOOGLE_SHEET_ID / GOOGLE_PRIVATE_KEY empty)'
            );
          }
          const auth = new google.auth.JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });
          const sheets = google.sheets({ version: 'v4', auth });
          await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
        })(),
      ]);

      const channels = {
        email: {
          status: emailResult.status === 'fulfilled' ? 'ok' : 'failed',
          ...(emailResult.status === 'rejected' ? { reason: safeReason(emailResult.reason) } : {}),
        },
        sheets: {
          status: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
          ...(sheetResult.status === 'rejected' ? { reason: safeReason(sheetResult.reason) } : {}),
        },
      };

      const anyOk = emailResult.status === 'fulfilled' || sheetResult.status === 'fulfilled';
      res.writeHead(anyOk ? 200 : 502, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: anyOk,
          channels,
        })
      );
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return { server, port: address.port };
}

function printResult(status, data) {
  console.log(`HTTP Status:     ${status}`);
  console.log(`Overall Success: ${Boolean(data?.success)}`);
  if (data?.channels) {
    const email = data.channels.email || {};
    const sheets = data.channels.sheets || {};
    console.log('Channel Results:');
    console.log(
      `  - email:  ${email.status || 'unknown'}${email.reason ? ` (reason: ${email.reason})` : ''}`
    );
    console.log(
      `  - sheets: ${sheets.status || 'unknown'}${sheets.reason ? ` (reason: ${sheets.reason})` : ''}`
    );
  }
}

async function main() {
  await loadDotEnv();
  const explicitUrl = process.argv[2] || process.env.API_URL;

  console.log('=== Muruj Compound Lead API & Health Verification ===');
  console.log(`Sample payload:  Name="${samplePayload.name}", Phone="${samplePayload.phone}", Unit="${samplePayload.unit}"`);

  if (explicitUrl) {
    const res = await fetch(explicitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(samplePayload),
    });
    const data = await res.json().catch(() => ({}));
    printResult(res.status, data);
    return;
  }

  const { server, port } = await startEmbeddedApiServer();
  try {
    const healthRes = await fetch(`http://127.0.0.1:${port}/api/health`);
    const healthData = await healthRes.json();
    console.log(`\n[GET /api/health] HTTP ${healthRes.status}:`, JSON.stringify(healthData));

    const leadRes = await fetch(`http://127.0.0.1:${port}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(samplePayload),
    });
    const leadData = await leadRes.json();
    console.log(`\n[POST /api/lead]`);
    printResult(leadRes.status, leadData);
  } finally {
    server.close();
  }
}

main();
