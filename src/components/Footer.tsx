import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/tracking';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappE164}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage[lang]
  )}`;

  return (
    <footer className="border-t border-hairline bg-cypress-950 pb-24 pt-14 text-limestone md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-limestone/15 pb-10 md:grid-cols-12">
          {/* Column 1: Brand & Developer Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/alforat-logo.webp"
                alt={lang === 'ar' ? 'شعار شركة الفرات للتطوير العقاري' : 'AlForat Development Logo'}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 rounded-md bg-white object-contain p-1"
              />
              <div>
                <h2 className="text-lg font-extrabold text-limestone">
                  {t(SITE_CONFIG.project.name)}
                </h2>
                <p className="text-xs text-bronze-300">
                  {t(SITE_CONFIG.project.primaryDeveloper)}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-limestone/80">
              {lang === 'ar'
                ? 'مجتمع عمراني متكامل ومسور على مساحة 182 فدان عند مدخل سموحة بالإسكندرية أمام جرين بلازا مباشرة. يضم فيلات الفرات المستقلة (V1–V4)، شقق ودوبلكس بمساحات تبدأ من 106 م²، ونادي رياضي على مساحة 14 فدان.'
                : 'A 182-feddan gated master urban community at the entrance of Smouha, Alexandria directly opposite Green Plaza. Featuring AlForat standalone villas (V1–V4), apartments & duplexes from 106 m², and a 14-feddan sporting club.'}
            </p>
          </div>

          {/* Column 2: Quick Navigation & Privacy Policy */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-bronze-300">
              {lang === 'ar' ? 'صفحات الموقع' : 'Site Links'}
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-limestone/85 transition hover:text-bronze-300">
                  {lang === 'ar' ? 'الرئيسية — نظرة شاملة' : 'Home — Project Overview'}
                </Link>
              </li>
              <li>
                <Link to="/units" className="text-limestone/85 transition hover:text-bronze-300">
                  {lang === 'ar' ? 'الوحدات والمساحات والمساقط' : 'Units, Areas & Floor Plans'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-limestone/85 transition hover:text-bronze-300">
                  {lang === 'ar' ? 'معرض الصور والماستر بلان والموقع' : 'Gallery, Master Plan & Location'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-limestone/85 transition hover:text-bronze-300">
                  {lang === 'ar' ? 'سياسة الخصوصية وشروط الاستخدام' : 'Privacy Policy & Terms'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Placeholder Contact Details */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-bronze-300">
              {lang === 'ar' ? 'التواصل مع المبيعات' : 'Sales Contact'}
            </h3>
            <ul className="mt-3 space-y-3 text-sm text-limestone/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-bronze-400 shrink-0" strokeWidth={1.75} />
                <span>{t(SITE_CONFIG.project.location)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="h-4 w-4 text-bronze-400 shrink-0" strokeWidth={1.75} />
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                  onClick={() => trackEvent('click_call', { call_location: 'footer' })}
                  dir="ltr"
                  className="tabular-nums font-semibold hover:text-bronze-300"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-bronze-400 shrink-0" strokeWidth={1.75} />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_whatsapp', { whatsapp_location: 'footer' })}
                  className="font-semibold text-bronze-300 hover:underline"
                >
                  {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimers & Copyright */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-limestone/75 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-bronze-300">
              الصور والمعلومات استرشادية وقابلة للتغيير
              {lang === 'en' && ' — Images and information are indicative and subject to change.'}
            </p>
            <p className="font-medium text-limestone/80">
              هذا الموقع تسويقي ولا يمثل الموقع الرسمي للمطور
              {lang === 'en' && ' — This is a marketing website and does not represent the official developer site.'}
            </p>
          </div>
          <p className="tabular-nums shrink-0">
            © {new Date().getFullYear()} {t(SITE_CONFIG.project.name)}.{' '}
            {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
