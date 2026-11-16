import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Lock,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import {
  generateTransactionId,
  getCairoTimestamp,
  getDeviceType,
  getStoredAttribution,
  markLeadSubmissionSuccess,
  trackEvent,
} from '../utils/tracking';

interface LeadFormProps {
  id?: string;
  variant?: 'desk' | 'compact';
  formLocation?: string;
  defaultUnit?: string;
}

interface CountryItem {
  iso2: string;
  nameEn: string;
  nameAr: string;
  dialCode: string;
}

/**
 * Self-contained inline vector flag icon that never fails offline or under ad-blockers.
 */
const CountryFlagIcon: React.FC<{ iso2: string }> = ({ iso2 }) => {
  const code = iso2.toLowerCase();
  if (code === 'eg') {
    return (
      <svg
        viewBox="0 0 24 16"
        width="22"
        height="15"
        aria-hidden="true"
        className="shrink-0 rounded-[2px] border border-limestone/25"
      >
        <rect width="24" height="5.33" y="0" fill="#CE1126" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#000000" />
        <circle cx="12" cy="8" r="1.4" fill="#C09300" />
      </svg>
    );
  }
  if (code === 'sa') {
    return (
      <svg
        viewBox="0 0 24 16"
        width="22"
        height="15"
        aria-hidden="true"
        className="shrink-0 rounded-[2px] border border-limestone/25"
      >
        <rect width="24" height="16" fill="#006C35" />
        <rect x="5" y="6" width="14" height="2" rx="1" fill="#FFFFFF" />
        <rect x="7" y="10" width="10" height="1.2" rx="0.6" fill="#FFFFFF" />
      </svg>
    );
  }
  if (code === 'ae') {
    return (
      <svg
        viewBox="0 0 24 16"
        width="22"
        height="15"
        aria-hidden="true"
        className="shrink-0 rounded-[2px] border border-limestone/25"
      >
        <rect width="24" height="5.33" y="0" fill="#00732F" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#000000" />
        <rect width="6" height="16" x="0" fill="#FF0000" />
      </svg>
    );
  }
  if (code === 'kw') {
    return (
      <svg
        viewBox="0 0 24 16"
        width="22"
        height="15"
        aria-hidden="true"
        className="shrink-0 rounded-[2px] border border-limestone/25"
      >
        <rect width="24" height="5.33" y="0" fill="#007A3D" />
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF" />
        <rect width="24" height="5.34" y="10.66" fill="#CE1126" />
        <polygon points="0,0 6,5.33 6,10.66 0,16" fill="#000000" />
      </svg>
    );
  }
  return (
    <span className="inline-flex h-[16px] w-[22px] shrink-0 items-center justify-center rounded-[2px] border border-bronze-400/40 bg-cypress-950 text-[9px] font-extrabold uppercase tracking-tighter text-bronze-300">
      {iso2.toUpperCase()}
    </span>
  );
};

export const LeadForm: React.FC<LeadFormProps> = ({
  id,
  variant = 'desk',
  formLocation = 'home-primary',
  defaultUnit = '',
}) => {
  const { lang, t, selectedUnitForForm } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState(defaultUnit || selectedUnitForForm || '');
  const [honeypot, setHoneypot] = useState('');

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    unit?: string;
    form?: string;
  }>({});

  useEffect(() => {
    if (selectedUnitForForm) {
      setUnit(selectedUnitForForm);
      setErrors((prev) => ({ ...prev, unit: undefined }));
    }
  }, [selectedUnitForForm]);

  useEffect(() => {
    if (defaultUnit && !unit) {
      setUnit(defaultUnit);
    }
  }, [defaultUnit, unit]);

  const allCountries = useMemo<CountryItem[]>(() => {
    let regionNamesAr: Intl.DisplayNames | null = null;
    try {
      regionNamesAr = new Intl.DisplayNames(['ar'], { type: 'region' });
    } catch {
      regionNamesAr = null;
    }

    return defaultCountries.map((c) => {
      const parsed = parseCountry(c);
      const upperIso = parsed.iso2.toUpperCase();
      let nameAr = parsed.name;
      if (regionNamesAr) {
        try {
          nameAr = regionNamesAr.of(upperIso) || parsed.name;
        } catch {
          nameAr = parsed.name;
        }
      }
      return {
        iso2: parsed.iso2,
        nameEn: parsed.name,
        nameAr,
        dialCode: parsed.dialCode,
      };
    });
  }, []);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) =>
        c.nameAr.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.dialCode.includes(q.replace(/^\+/, '')) ||
        c.iso2.toLowerCase().includes(q)
    );
  }, [allCountries, countrySearch]);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'eg',
    value: '+20',
    countries: defaultCountries,
    forceDialCode: true,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    }
    if (countryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 40);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [countryDropdownOpen]);

  const handleFirstInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('form_start', { form_location: formLocation });
    }
  };

  const validateAndFormatPhone = (
    rawPhone: string,
    iso2: string
  ): { valid: boolean; e164: string } => {
    const upperCountry = iso2.toUpperCase() as CountryCode;
    let candidate = rawPhone.trim();

    if (upperCountry === 'EG') {
      candidate = candidate.replace(/^\+20\s*0/, '+20');
    }

    const parsed = parsePhoneNumberFromString(candidate, upperCountry);
    if (parsed && parsed.isValid()) {
      return { valid: true, e164: parsed.number };
    }

    const dialPrefix = `+${country.dialCode}`;
    const nationalPart = candidate.startsWith(dialPrefix)
      ? candidate.slice(dialPrefix.length).trim()
      : candidate;
    const parsedNational = parsePhoneNumberFromString(nationalPart, upperCountry);
    if (parsedNational && parsedNational.isValid()) {
      return { valid: true, e164: parsedNational.number };
    }

    return { valid: false, e164: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    trackEvent('form_submit_attempt', {
      form_location: formLocation,
      selected_unit: unit || 'none',
    });

    const nextErrors: typeof errors = {};

    if (name.trim().length < 2) {
      nextErrors.name =
        lang === 'ar'
          ? 'يرجى إدخال الاسم بالكامل (حرفين على الأقل)'
          : 'Please enter your full name (at least 2 characters)';
    }

    const phoneCheck = validateAndFormatPhone(inputValue, country.iso2);
    if (!phoneCheck.valid) {
      nextErrors.phone =
        lang === 'ar'
          ? `يرجى إدخال رقم هاتف صحيح لدولة (${allCountries.find((c) => c.iso2 === country.iso2)?.nameAr || country.name})`
          : `Please enter a valid phone number for ${country.name}`;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email =
        lang === 'ar'
          ? 'يرجى إدخال بريد إلكتروني صحيح أو ترك الحقل فارغاً'
          : 'Please enter a valid email address or leave it empty';
    }

    if (!unit.trim()) {
      nextErrors.unit =
        lang === 'ar'
          ? 'يرجى اختيار نوع الوحدة أو المساحة المطلوبة'
          : 'Please select your preferred unit type or area';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const attribution = getStoredAttribution();
    const timestamp = getCairoTimestamp();
    const device = getDeviceType();
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const transactionId = generateTransactionId();

    const payload = {
      name: name.trim(),
      phone: phoneCheck.e164,
      email: trimmedEmail,
      unit: unit.trim(),
      honeypot,
      pageUrl,
      referrer: attribution.referrer,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      device,
      timestamp,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            (lang === 'ar'
              ? 'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب أو الاتصال.'
              : 'Could not submit your request. Please try again or contact us directly via WhatsApp or phone.')
        );
      }

      markLeadSubmissionSuccess({
        transactionId,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        unit: payload.unit,
        submittedAt: timestamp,
      });

      navigate('/thank-you');
    } catch (err) {
      const isNetworkErr =
        err instanceof TypeError ||
        (err instanceof Error && /fetch|network|failed/i.test(err.message));

      setErrors({
        form: isNetworkErr
          ? lang === 'ar'
            ? 'تعذر الاتصال بالخادم بسبب ضعف الشبكة أو انقطاع الاتصال. يمكنك المحاولة مرة أخرى أو التواصل معنا فوراً عبر واتساب أو الاتصال المباشر.'
            : 'Network connection error. Please try again or reach us immediately via WhatsApp or phone.'
          : err instanceof Error
            ? err.message
            : lang === 'ar'
              ? 'تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
              : 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCountryItem = allCountries.find((c) => c.iso2 === country.iso2);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappE164}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage[lang]
  )}`;

  return (
    <div
      id={id}
      className={`relative rounded-xl border border-bronze-500/35 bg-cypress-900 text-limestone shadow-desk ${
        variant === 'desk' ? 'p-5 sm:p-8 lg:p-10' : 'p-5 sm:p-7'
      }`}
    >
      <div className="mb-6 flex flex-col gap-2 border-b border-limestone/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-limestone sm:text-2xl">
            {lang === 'ar'
              ? 'سجل اهتمامك الآن للحصول على الأسعار والمساقط التفصيلية'
              : 'Register Your Interest for Official Prices & Floor Plans'}
          </h2>
          <p className="mt-1 text-sm text-bronze-300">
            {lang === 'ar'
              ? 'مقدم يبدأ من 10% · تقسيط حتى 10 سنوات · وحدات استلام فوري وتحت الإنشاء في سموحة'
              : 'From 10% Down Payment · Up to 10 Years Installments · Immediate & Under-Construction Units'}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-md border border-bronze-400/30 bg-cypress-950/60 px-3 py-1.5 text-xs font-medium text-bronze-300 sm:self-center">
          <ShieldCheck className="h-4 w-4 text-bronze-400 shrink-0" />
          <span>
            {lang === 'ar' ? 'مبيعات كمبوند مروج سموحة' : 'Muruj Smouha Direct Sales Desk'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate onFocus={handleFirstInteraction}>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`website-hp-${formLocation}`}>Website</label>
          <input
            id={`website-hp-${formLocation}`}
            type="text"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* 1. Name Field */}
          <div>
            <label
              htmlFor={`lead-name-${formLocation}`}
              className="mb-2 block text-sm font-semibold text-limestone"
            >
              {lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}{' '}
              <span className="text-bronze-400">*</span>
            </label>
            <input
              id={`lead-name-${formLocation}`}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder={lang === 'ar' ? 'مثال: أحمد محمد على' : 'e.g. Ahmed Mohamed'}
              className={`w-full rounded-lg border bg-cypress-950/90 px-4 py-3 text-base text-limestone placeholder:text-limestone/45 transition focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-limestone/25 focus:border-bronze-400 focus:ring-bronze-400/40'
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-red-300" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* 2. International Phone Field with Searchable Country Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label
              htmlFor={`lead-phone-${formLocation}`}
              className="mb-2 block text-sm font-semibold text-limestone"
            >
              {lang === 'ar' ? 'رقم التليفون / واتساب' : 'Phone / WhatsApp Number'}{' '}
              <span className="text-bronze-400">*</span>
            </label>

            <div
              dir="ltr"
              className={`flex items-stretch rounded-lg border bg-cypress-950/90 transition focus-within:ring-2 ${
                errors.phone
                  ? 'border-red-400 focus-within:ring-red-400'
                  : 'border-limestone/25 focus-within:border-bronze-400 focus-within:ring-bronze-400/40'
              }`}
            >
              <button
                type="button"
                onClick={() => setCountryDropdownOpen((prev) => !prev)}
                aria-expanded={countryDropdownOpen}
                aria-label={lang === 'ar' ? 'اختر كود الدولة' : 'Select country code'}
                className="flex items-center gap-2 border-r border-limestone/20 bg-cypress-800/60 px-3 py-3 text-sm font-medium text-limestone hover:bg-cypress-800 focus:outline-none rounded-l-lg shrink-0"
              >
                <CountryFlagIcon iso2={country.iso2} />
                <span className="tabular-nums text-xs font-semibold text-bronze-300">
                  +{country.dialCode}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-limestone/70" />
              </button>

              <input
                ref={inputRef}
                id={`lead-phone-${formLocation}`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={inputValue}
                onChange={(e) => {
                  handlePhoneValueChange(e);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="+20 100 123 4567"
                className="w-full min-w-0 rounded-r-lg bg-transparent px-3.5 py-3 text-base tabular-nums text-limestone placeholder:text-limestone/45 focus:outline-none"
              />
            </div>

            {countryDropdownOpen && (
              <div
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className="absolute left-0 right-0 z-50 mt-1.5 max-h-72 overflow-hidden rounded-lg border border-bronze-400/40 bg-cypress-950 shadow-2xl"
              >
                <div className="sticky top-0 border-b border-limestone/15 bg-cypress-950 p-2.5">
                  <div className="relative flex items-center">
                    <Search className="pointer-events-none absolute start-3 h-4 w-4 text-bronze-300" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder={
                        lang === 'ar'
                          ? 'ابحث باسم الدولة أو الكود (+20, مصر, السعودية...)'
                          : 'Search country name or code (+20, Egypt...)'
                      }
                      className="w-full rounded-md border border-limestone/25 bg-cypress-900 py-2 ps-9 pe-3 text-xs text-limestone placeholder:text-limestone/50 focus:border-bronze-400 focus:outline-none"
                    />
                  </div>
                </div>

                <ul className="max-h-52 overflow-y-auto divide-y divide-limestone/10" role="listbox">
                  {filteredCountries.length === 0 ? (
                    <li className="px-4 py-3 text-xs text-limestone/60">
                      {lang === 'ar' ? 'لا توجد دولة مطابقة للبحث' : 'No matching country found'}
                    </li>
                  ) : (
                    filteredCountries.map((c) => {
                      const isSelected = c.iso2 === country.iso2;
                      return (
                        <li key={c.iso2}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c.iso2);
                              setCountryDropdownOpen(false);
                              setCountrySearch('');
                              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs transition hover:bg-cypress-800 ${
                              isSelected
                                ? 'bg-cypress-800/90 font-bold text-bronze-300'
                                : 'text-limestone'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <CountryFlagIcon iso2={c.iso2} />
                              <span className="truncate">
                                {lang === 'ar' ? `${c.nameAr} (${c.nameEn})` : c.nameEn}
                              </span>
                            </span>
                            <span
                              dir="ltr"
                              className="tabular-nums font-semibold text-bronze-300 ms-2"
                            >
                              +{c.dialCode}
                            </span>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            )}

            <p className="mt-1 text-[11px] text-limestone/65">
              {lang === 'ar'
                ? `الدولة المختارة: ${currentCountryItem?.nameAr || 'مصر'} (+${country.dialCode}) — يتم الحفظ بصيغة دولية E.164`
                : `Selected: ${currentCountryItem?.nameEn || 'Egypt'} (+${country.dialCode}) — E.164 verified`}
            </p>
            {errors.phone && (
              <p className="mt-1 text-xs font-medium text-red-300" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* 3. Optional Email Field */}
          <div>
            <label
              htmlFor={`lead-email-${formLocation}`}
              className="mb-2 flex items-center justify-between text-sm font-semibold text-limestone"
            >
              <span>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
              <span className="text-xs font-normal text-bronze-300">
                {lang === 'ar' ? '(اختياري)' : '(Optional)'}
              </span>
            </label>
            <input
              id={`lead-email-${formLocation}`}
              name="email"
              type="email"
              inputMode="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@example.com"
              className={`w-full rounded-lg border bg-cypress-950/90 px-4 py-3 text-base text-limestone placeholder:text-limestone/45 transition focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-limestone/25 focus:border-bronze-400 focus:ring-bronze-400/40'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-300" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* 4. Required Unit / Area Select Dropdown (5 Verified Options) */}
          <div>
            <label
              htmlFor={`lead-unit-${formLocation}`}
              className="mb-2 block text-sm font-semibold text-limestone"
            >
              {lang === 'ar' ? 'اختر الوحدة / المساحة' : 'Select Unit Type / Area'}{' '}
              <span className="text-bronze-400">*</span>
            </label>
            <select
              id={`lead-unit-${formLocation}`}
              name="unit"
              required
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
                if (errors.unit) setErrors((prev) => ({ ...prev, unit: undefined }));
              }}
              className={`w-full rounded-lg border bg-cypress-950/90 px-4 py-3 text-base text-limestone transition focus:outline-none focus:ring-2 ${
                errors.unit
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-limestone/25 focus:border-bronze-400 focus:ring-bronze-400/40'
              }`}
            >
              <option value="" className="bg-cypress-950 text-limestone/70">
                {lang === 'ar'
                  ? '— اختر الوحدة أو المساحة المطلوبة —'
                  : '— Choose Unit Type or Area (m²) —'}
              </option>
              {SITE_CONFIG.unitOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-cypress-950 font-normal text-limestone"
                >
                  {t(opt.label)}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="mt-1.5 text-xs font-medium text-red-300" role="alert">
                {errors.unit}
              </p>
            )}
          </div>
        </div>

        {/* Network / API Error Banner with Fallback Call & WhatsApp Buttons (Task 6.5) */}
        {errors.form && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-400/50 bg-red-950/75 p-4 text-sm text-red-100"
          >
            <p className="font-semibold">{errors.form}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { whatsapp_location: 'form_error_fallback' })}
                className="inline-flex items-center gap-2 rounded-md bg-bronze-500 px-4 py-2 text-xs font-extrabold text-cypress-950 transition hover:bg-bronze-400"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>{lang === 'ar' ? 'تواصل عبر واتساب الآن' : 'Chat on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                onClick={() => trackEvent('click_call', { call_location: 'form_error_fallback' })}
                className="inline-flex items-center gap-2 rounded-md border border-limestone/30 bg-cypress-900 px-4 py-2 text-xs font-bold text-limestone transition hover:bg-cypress-800"
              >
                <PhoneCall className="h-4 w-4 text-bronze-300" strokeWidth={1.75} />
                <span>{lang === 'ar' ? 'اتصل بنا مباشرة' : 'Call Us Directly'}</span>
              </a>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-bronze-500 px-8 py-4 text-base font-bold text-cypress-950 shadow-lg transition hover:bg-bronze-400 focus:outline-none focus:ring-2 focus:ring-bronze-300 focus:ring-offset-2 focus:ring-offset-cypress-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>
                    {lang === 'ar' ? 'جاري تسجيل طلبك...' : 'Submitting your request...'}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  <span>
                    {lang === 'ar' ? 'احجز الآن / سجل اهتمامك' : 'Book Now / Register Interest'}
                  </span>
                </>
              )}
            </button>

            {/* Mandatory Privacy Consent Line (Task 4) */}
            <p className="mt-2 text-xs text-limestone/80">
              {lang === 'ar' ? (
                <>
                  بالضغط على الزر أنت توافق على{' '}
                  <Link
                    to="/privacy"
                    className="font-bold text-bronze-300 underline hover:text-bronze-200"
                  >
                    سياسة الخصوصية
                  </Link>
                </>
              ) : (
                <>
                  By clicking the button, you agree to our{' '}
                  <Link
                    to="/privacy"
                    className="font-bold text-bronze-300 underline hover:text-bronze-200"
                  >
                    Privacy Policy
                  </Link>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-limestone/75">
            <Lock className="h-4 w-4 text-bronze-400 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'بياناتك سرية تماماً وتصل مباشرة لفريق مبيعات كمبوند مروج.'
                : 'Your details are 100% confidential and sent directly to Muruj sales.'}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
