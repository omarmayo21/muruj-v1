import type { VercelRequest, VercelResponse } from '@vercel/node';

function isConfigured(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const envStatus = {
    SMTP_HOST: isConfigured(process.env.SMTP_HOST),
    SMTP_PORT: isConfigured(process.env.SMTP_PORT),
    SMTP_USER: isConfigured(process.env.SMTP_USER),
    SMTP_PASS: isConfigured(process.env.SMTP_PASS),
    EMAIL_FROM: isConfigured(process.env.EMAIL_FROM),
    EMAIL_TO: isConfigured(process.env.EMAIL_TO),
    GOOGLE_SHEET_ID: isConfigured(process.env.GOOGLE_SHEET_ID),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: isConfigured(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
    GOOGLE_PRIVATE_KEY: isConfigured(process.env.GOOGLE_PRIVATE_KEY),
    VITE_GA_MEASUREMENT_ID: isConfigured(process.env.VITE_GA_MEASUREMENT_ID),
    VITE_GTM_ID: isConfigured(process.env.VITE_GTM_ID),
    VITE_GOOGLE_ADS_ID: isConfigured(process.env.VITE_GOOGLE_ADS_ID),
    VITE_GOOGLE_ADS_CONVERSION_ID: isConfigured(process.env.VITE_GOOGLE_ADS_CONVERSION_ID),
    VITE_GOOGLE_ADS_CONVERSION_LABEL: isConfigured(process.env.VITE_GOOGLE_ADS_CONVERSION_LABEL),
  };

  const smtpReady =
    envStatus.SMTP_HOST &&
    envStatus.SMTP_PORT &&
    envStatus.SMTP_USER &&
    envStatus.SMTP_PASS &&
    envStatus.EMAIL_TO;

  const googleSheetsReady =
    envStatus.GOOGLE_SHEET_ID &&
    envStatus.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    envStatus.GOOGLE_PRIVATE_KEY;

  return res.status(200).json({
    ok: true,
    smtpReady,
    googleSheetsReady,
    anyLeadChannelReady: smtpReady || googleSheetsReady,
    channels: {
      smtpReady,
      googleSheetsReady,
      anyLeadChannelReady: smtpReady || googleSheetsReady,
    },
    env: envStatus,
  });
}
