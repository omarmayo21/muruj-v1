export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  referrer: string;
  landingPageUrl: string;
}

export interface SubmittedLeadMeta {
  transactionId: string;
  name: string;
  phone: string;
  email?: string;
  unit: string;
  submittedAt: string;
}

export interface ConsentStateV2 {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
    gtag?: (...args: unknown[]) => void;
    __murujAnalyticsInitialized?: boolean;
    __murujFiredConversions?: Array<Record<string, unknown>>;
  }
}

const ATTRIBUTION_STORAGE_KEY = 'muruj_attribution_v1';
const CONVERSION_PENDING_KEY = 'muruj_conversion_pending_v1';
const LAST_LEAD_META_KEY = 'muruj_last_lead_meta_v1';

const env = {
  gaMeasurementId: (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim(),
  gtmId: (import.meta.env.VITE_GTM_ID || '').trim(),
  googleAdsId: (import.meta.env.VITE_GOOGLE_ADS_ID || '').trim(),
  googleAdsConversionId: (import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID || '').trim(),
  googleAdsConversionLabel: (import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL || '').trim(),
};

/**
 * Default Consent Mode v2 configuration (non-blocking for Egypt/MENA market,
 * structured so a cookie banner can call updateConsentModeV2 later if needed).
 */
export const DEFAULT_CONSENT_V2: ConsentStateV2 = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
};

export function updateConsentModeV2(nextState: Partial<ConsentStateV2>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ...DEFAULT_CONSENT_V2,
    ...nextState,
  });
}

/**
 * Initialize GTM and/or gtag.js (GA4 + Google Ads) only when IDs are configured.
 * Silently does nothing when env variables are empty (zero external script loads, zero console errors).
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || window.__murujAnalyticsInitialized) {
    return;
  }
  window.__murujAnalyticsInitialized = true;

  const hasAnyTrackingId = Boolean(
    env.gtmId || env.gaMeasurementId || env.googleAdsId || env.googleAdsConversionId
  );

  if (!hasAnyTrackingId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  // Set Consent Mode v2 default before loading tags
  window.gtag('consent', 'default', DEFAULT_CONSENT_V2);

  // 1. Load Google Tag Manager if VITE_GTM_ID is provided
  if (env.gtmId) {
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(env.gtmId)}`;
    document.head.appendChild(gtmScript);
  }

  // 2. Load gtag.js if GA4 or Google Ads ID is provided
  const primaryGtagId = env.gaMeasurementId || env.googleAdsId || env.googleAdsConversionId;
  if (primaryGtagId) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryGtagId)}`;
    document.head.appendChild(gtagScript);

    window.gtag('js', new Date());

    if (env.gaMeasurementId) {
      window.gtag('config', env.gaMeasurementId, {
        send_page_view: false,
      });
    }

    const adsAccountId = env.googleAdsId || env.googleAdsConversionId;
    if (adsAccountId) {
      window.gtag('config', adsAccountId, {
        allow_enhanced_conversions: true,
      });
    }
  }
}

/**
 * Capture and persist UTM parameters and Google click IDs on initial landing.
 */
export function captureAttributionOnLanding(): AttributionData {
  const defaultData: AttributionData = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    gbraid: '',
    wbraid: '',
    referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
    landingPageUrl: typeof window !== 'undefined' ? window.location.href : '',
  };

  if (typeof window === 'undefined') {
    return defaultData;
  }

  let stored: Partial<AttributionData> = {};
  try {
    const rawSession = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const rawLocal = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    stored = JSON.parse(rawSession || rawLocal || '{}');
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const updated: AttributionData = {
    utm_source: params.get('utm_source') || stored.utm_source || '',
    utm_medium: params.get('utm_medium') || stored.utm_medium || '',
    utm_campaign: params.get('utm_campaign') || stored.utm_campaign || '',
    utm_term: params.get('utm_term') || stored.utm_term || '',
    utm_content: params.get('utm_content') || stored.utm_content || '',
    gclid: params.get('gclid') || stored.gclid || '',
    gbraid: params.get('gbraid') || stored.gbraid || '',
    wbraid: params.get('wbraid') || stored.wbraid || '',
    referrer: stored.referrer || document.referrer || '',
    landingPageUrl: stored.landingPageUrl || window.location.href,
  };

  try {
    const serialized = JSON.stringify(updated);
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, serialized);
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, serialized);
  } catch {
    // Ignore storage quota errors
  }

  return updated;
}

export function getStoredAttribution(): AttributionData {
  return captureAttributionOnLanding();
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent || '';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'Mobile';
  }
  return window.innerWidth < 768 ? 'Mobile' : 'Desktop';
}

export function getCairoTimestamp(): string {
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

export function generateTransactionId(): string {
  const rand =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().split('-')[0]
      : Math.random().toString(36).slice(2, 10);
  return `muruj_${Date.now()}_${rand}`;
}

/**
 * Push an event safely to both dataLayer (GTM) and gtag (GA4 / Google Ads) when loaded.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  if (window.dataLayer && env.gtmId) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;
  const pageLocation = window.location.origin + path + window.location.search;

  if (window.dataLayer && env.gtmId) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: title,
      page_location: pageLocation,
    });
  }

  if (typeof window.gtag === 'function' && env.gaMeasurementId) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: pageLocation,
      send_to: env.gaMeasurementId,
    });
  }
}

export async function sha256Hex(input: string): Promise<string> {
  try {
    if (typeof window === 'undefined' || !window.crypto?.subtle) {
      return '';
    }
    const normalized = input.trim().toLowerCase();
    if (!normalized) return '';
    const encoded = new TextEncoder().encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return '';
  }
}

/**
 * Mark a real lead submission in sessionStorage right before navigating to /thank-you
 */
export function markLeadSubmissionSuccess(meta: SubmittedLeadMeta): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CONVERSION_PENDING_KEY, 'true');
    sessionStorage.setItem(LAST_LEAD_META_KEY, JSON.stringify(meta));
  } catch {
    // Ignore storage error
  }
}

export function getLastSubmittedLeadMeta(): SubmittedLeadMeta | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(LAST_LEAD_META_KEY);
    return raw ? (JSON.parse(raw) as SubmittedLeadMeta) : null;
  } catch {
    return null;
  }
}

/**
 * Fires the Google Ads Conversion + GA4 generate_lead + GTM lead_conversion
 * ONLY ONCE on /thank-you after a verified form submission.
 * Returns true if the conversion was fired on this visit, false if skipped (direct visit or refresh).
 */
export async function fireThankYouConversionOnce(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  let isPending = false;
  try {
    isPending = sessionStorage.getItem(CONVERSION_PENDING_KEY) === 'true';
    if (isPending) {
      // Clear immediately to prevent duplicate firing on page refresh
      sessionStorage.removeItem(CONVERSION_PENDING_KEY);
    }
  } catch {
    return false;
  }

  if (!isPending) {
    return false;
  }

  const meta = getLastSubmittedLeadMeta();
  const transactionId = meta?.transactionId || generateTransactionId();
  const hashedPhone = meta?.phone ? await sha256Hex(meta.phone) : '';
  const hashedEmail = meta?.email ? await sha256Hex(meta.email) : '';

  const userData: Record<string, string> = {};
  if (hashedPhone) userData.sha256_phone_number = hashedPhone;
  if (hashedEmail) userData.sha256_email_address = hashedEmail;

  // Enhanced Conversions user_data if gtag is loaded
  if (typeof window.gtag === 'function' && Object.keys(userData).length > 0) {
    window.gtag('set', 'user_data', userData);
  }

  const conversionPayload = {
    send_to:
      env.googleAdsConversionId && env.googleAdsConversionLabel
        ? `${env.googleAdsConversionId}/${env.googleAdsConversionLabel}`
        : undefined,
    value: 1.0,
    currency: 'EGP',
    transaction_id: transactionId,
    user_data: Object.keys(userData).length > 0 ? userData : undefined,
  };

  // Record in-memory for automated E2E / Playwright verification
  window.__murujFiredConversions = window.__murujFiredConversions || [];
  window.__murujFiredConversions.push({
    event: 'conversion',
    ...conversionPayload,
  });

  // 1. Fire Google Ads Conversion if configured (or if custom gtag listener is attached)
  if (
    typeof window.gtag === 'function' &&
    env.googleAdsConversionId &&
    env.googleAdsConversionLabel
  ) {
    window.gtag('event', 'conversion', conversionPayload);
  }

  // 2. Fire GA4 generate_lead event
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      currency: 'EGP',
      value: 1.0,
      transaction_id: transactionId,
      lead_unit: meta?.unit || '',
    });
  }

  // 3. Push GTM dataLayer lead_conversion event
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_conversion',
    value: 1.0,
    currency: 'EGP',
    transaction_id: transactionId,
    lead_unit: meta?.unit || '',
    user_data: Object.keys(userData).length > 0 ? userData : undefined,
  });

  return true;
}
