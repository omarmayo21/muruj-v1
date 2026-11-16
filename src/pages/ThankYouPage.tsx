import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Home, MessageCircle, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import {
  fireThankYouConversionOnce,
  getLastSubmittedLeadMeta,
  trackEvent,
  type SubmittedLeadMeta,
} from '../utils/tracking';

export const ThankYouPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [leadMeta, setLeadMeta] = useState<SubmittedLeadMeta | null>(null);
  const [conversionFired, setConversionFired] = useState(false);

  useEffect(() => {
    // 1. Ensure <meta name="robots" content="noindex"> is present on /thank-you
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = robotsMeta?.getAttribute('content') || null;

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    // 2. Load submitted lead summary if available
    setLeadMeta(getLastSubmittedLeadMeta());

    // 3. Fire Google Ads Conversion + GA4 generate_lead + GTM lead_conversion
    // ONLY ONCE if sessionStorage flag was set by a real form submission
    fireThankYouConversionOnce().then((fired) => {
      setConversionFired(fired);
    });

    return () => {
      if (robotsMeta) {
        if (previousContent) {
          robotsMeta.content = previousContent;
        } else {
          robotsMeta.remove();
        }
      }
    };
  }, []);

  const whatsappMessage = leadMeta
    ? lang === 'ar'
      ? `مرحباً، قمت بتسجيل اهتمامي في موقع كمبوند مروج سموحة.\nالاسم: ${leadMeta.name}\nالوحدة المطلوبة: ${leadMeta.unit}`
      : `Hello, I just registered my interest on the Muruj Smouha website.\nName: ${leadMeta.name}\nSelected Unit: ${leadMeta.unit}`
    : SITE_CONFIG.contact.whatsappDefaultMessage[lang];

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappE164}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="min-h-[75vh] bg-limestone py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-hairline bg-travertine shadow-atelier">
          {/* Top Confirmation Banner */}
          <div className="border-b border-bronze-500/30 bg-cypress-900 px-6 py-8 text-center text-limestone sm:px-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-bronze-400/40 bg-cypress-800">
              <CheckCircle2 className="h-8 w-8 text-bronze-400" strokeWidth={1.75} />
            </div>

            <h1 className="text-2xl font-extrabold text-limestone sm:text-3xl">
              شكراً لك، سيتواصل معك فريقنا قريباً
            </h1>
            {lang === 'en' && (
              <p className="mt-1 text-base font-semibold text-bronze-300">
                Thank you, our sales team will contact you shortly.
              </p>
            )}

            <p className="mx-auto mt-3 max-w-xl text-sm text-limestone/80">
              {lang === 'ar'
                ? 'تم استلام طلبك بنجاح لدى فريق مبيعات كمبوند مروج سموحة، وسيتواصل معك مستشار المبيعات المختص لتزويدك بأحدث الأسعار والمساقط الهندسية وجدول السداد.'
                : 'Your inquiry has been received by the Muruj Smouha sales team. A property advisor will reach out with unit availability, floor plans, and payment schedules.'}
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {/* Submitted Lead Details (if redirected from form) */}
            {leadMeta && (
              <div className="mb-8 rounded-xl border border-hairline bg-limestone p-5">
                <h2 className="text-sm font-extrabold text-cypress-900">
                  {lang === 'ar' ? 'ملخص طلبك المسجل' : 'Your Registered Inquiry Summary'}
                </h2>
                <dl className="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:text-sm">
                  <div>
                    <dt className="text-ink-600">{lang === 'ar' ? 'الاسم:' : 'Name:'}</dt>
                    <dd className="font-bold text-ink-950">{leadMeta.name}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-600">{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</dt>
                    <dd dir="ltr" className="font-bold tabular-nums text-ink-950 text-start">
                      {leadMeta.phone}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-ink-600">
                      {lang === 'ar' ? 'الوحدة / المساحة المختارة:' : 'Selected Unit / Area:'}
                    </dt>
                    <dd className="font-bold text-cypress-900">{leadMeta.unit}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Project Summary Ledger */}
            <h2 className="text-base font-extrabold text-ink-950">
              {lang === 'ar'
                ? 'ملخص مشروع كمبوند مروج سموحة (Muruj Compound)'
                : 'Muruj Compound Smouha — Key Facts Summary'}
            </h2>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-hairline bg-limestone p-3.5">
                <dt className="text-xs text-ink-600">
                  {lang === 'ar' ? 'الموقع' : 'Location'}
                </dt>
                <dd className="mt-0.5 text-sm font-extrabold text-ink-950">
                  {t(SITE_CONFIG.project.location)}
                </dd>
              </div>
              <div className="rounded-lg border border-hairline bg-limestone p-3.5">
                <dt className="text-xs text-ink-600">
                  {lang === 'ar' ? 'المساحة الإجمالية والخدمات' : 'Total Area & Club'}
                </dt>
                <dd className="mt-0.5 text-sm font-extrabold text-ink-950">
                  {lang === 'ar'
                    ? '182 فدان (شامل نادي رياضي 14 فدان وكلوب هاوس)'
                    : '182 Feddans (incl. 14-Feddan Sports Club & Clubhouse)'}
                </dd>
              </div>
              <div className="rounded-lg border border-hairline bg-limestone p-3.5">
                <dt className="text-xs text-ink-600">
                  {lang === 'ar' ? 'أنواع ومساحات الوحدات' : 'Units & Areas'}
                </dt>
                <dd className="mt-0.5 text-sm font-extrabold text-ink-950">
                  {t(SITE_CONFIG.project.areaRange)}
                </dd>
              </div>
              <div className="rounded-lg border border-hairline bg-limestone p-3.5">
                <dt className="text-xs text-ink-600">
                  {lang === 'ar' ? 'أنظمة السداد والاستلام' : 'Payment & Delivery'}
                </dt>
                <dd className="mt-0.5 text-sm font-extrabold text-ink-950">
                  {t(SITE_CONFIG.project.downPaymentSummary)}
                </dd>
              </div>
            </dl>

            {/* Primary Action Buttons: WhatsApp + Call + Back to Home */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { whatsapp_location: 'thank_you_page' })}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cypress-900 px-6 py-3.5 text-sm font-bold text-limestone shadow-sm transition hover:bg-cypress-800"
              >
                <MessageCircle className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
                <span>
                  {lang === 'ar' ? 'تواصل الآن عبر واتساب' : 'Chat Now on WhatsApp'}
                </span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                onClick={() => trackEvent('click_call', { call_location: 'thank_you_page' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cypress-900 bg-limestone px-5 py-3.5 text-sm font-bold text-cypress-900 transition hover:bg-travertine"
              >
                <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
                <span dir="ltr" className="tabular-nums">
                  {SITE_CONFIG.contact.phoneDisplay}
                </span>
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-limestone px-5 py-3.5 text-sm font-bold text-ink-950 transition hover:border-bronze-600"
              >
                <Home className="h-4 w-4 text-ink-800" strokeWidth={1.75} />
                <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                ) : (
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                )}
              </Link>
            </div>

            {conversionFired && (
              <p className="mt-4 text-center text-[11px] text-ink-600">
                {lang === 'ar'
                  ? 'تم تأكيد تسجيل طلبك بنجاح.'
                  : 'Your inquiry registration has been verified.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

