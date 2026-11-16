import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, PhoneCall, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/tracking';

export const Header: React.FC = () => {
  const { lang, toggleLang, scrollToLeadForm } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: { ar: 'الرئيسية', en: 'Home' } },
    { path: '/units', label: { ar: 'الوحدات والمساحات', en: 'Units & Areas' } },
    { path: '/gallery', label: { ar: 'المعرض والموقع', en: 'Gallery & Location' } },
  ];

  const handleBookNowClick = () => {
    trackEvent('click_cta', { cta_location: 'sticky_header', page_path: location.pathname });
    setMobileMenuOpen(false);
    if (location.pathname === '/thank-you') {
      navigate('/');
      setTimeout(() => scrollToLeadForm(), 150);
    } else {
      scrollToLeadForm();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-limestone/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 focus:outline-none sm:gap-3"
          aria-label={SITE_CONFIG.project.name[lang]}
        >
          <img
            src="/images/alforat-logo.webp"
            alt={
              lang === 'ar'
                ? 'شعار شركة الفرات للتطوير العقاري — كمبوند مروج سموحة'
                : 'AlForat Development Logo — Muruj Smouha'
            }
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 rounded-md border border-hairline bg-white object-contain p-1 sm:h-11 sm:w-11"
          />
          <div className="min-w-0">
            <span className="block truncate text-sm font-extrabold leading-tight text-cypress-900 sm:text-lg">
              {lang === 'ar' ? 'كمبوند مروج سموحة' : 'Muruj Compound'}
            </span>
            <span className="hidden truncate text-xs font-medium text-ink-600 sm:block">
              {lang === 'ar' ? 'الفرات للتطوير العقاري · الإسكندرية' : 'AlForat Development · Smouha'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main Navigation'}
        >
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`py-1 text-sm font-bold transition ${
                  active
                    ? 'border-b-2 border-bronze-600 text-cypress-900'
                    : 'text-ink-800 hover:text-cypress-900'
                }`}
              >
                {item.label[lang]}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Language Toggle, Direct Phone, Primary CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => {
              toggleLang();
              trackEvent('toggle_language', { next_lang: lang === 'ar' ? 'en' : 'ar' });
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-travertine/70 px-3 py-2 text-xs font-bold text-ink-950 transition hover:border-bronze-600 hover:bg-travertine"
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="h-3.5 w-3.5 text-bronze-700" strokeWidth={1.75} />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            onClick={() => trackEvent('click_call', { call_location: 'header' })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-2 text-xs font-bold tabular-nums text-ink-800 transition hover:border-cypress-900 hover:text-cypress-900"
          >
            <PhoneCall className="h-3.5 w-3.5 text-cypress-900" strokeWidth={1.75} />
            <span dir="ltr">{SITE_CONFIG.contact.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={handleBookNowClick}
            className="inline-flex items-center justify-center rounded-lg bg-cypress-900 px-5 py-2.5 text-sm font-bold text-limestone shadow-sm transition hover:bg-cypress-800"
          >
            {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center gap-1 rounded-md border border-hairline bg-travertine px-2 py-1.5 text-xs font-bold text-ink-950"
          >
            <Globe className="h-3.5 w-3.5 text-bronze-700" strokeWidth={1.75} />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <button
            type="button"
            onClick={handleBookNowClick}
            className="rounded-md bg-cypress-900 px-3 py-1.5 text-xs font-bold text-limestone"
          >
            {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={lang === 'ar' ? 'القائمة' : 'Menu'}
            className="rounded-md border border-hairline p-1.5 text-ink-950"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-hairline bg-limestone px-4 py-4 md:hidden">
          <nav
            className="flex flex-col gap-2"
            aria-label={lang === 'ar' ? 'قائمة الموبايل' : 'Mobile Navigation'}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3.5 py-2.5 text-sm font-bold ${
                    active ? 'bg-cypress-900 text-limestone' : 'text-ink-950 hover:bg-travertine'
                  }`}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
            <a
              href={`tel:${SITE_CONFIG.contact.phoneE164}`}
              onClick={() => trackEvent('click_call', { call_location: 'mobile_menu' })}
              className="mt-1 flex items-center justify-between rounded-lg border border-hairline bg-travertine px-3.5 py-2.5 text-sm font-bold text-ink-950"
            >
              <span>{lang === 'ar' ? 'اتصل بالمبيعات مباشرة' : 'Call Sales Directly'}</span>
              <span dir="ltr" className="tabular-nums text-cypress-900">
                {SITE_CONFIG.contact.phoneDisplay}
              </span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
