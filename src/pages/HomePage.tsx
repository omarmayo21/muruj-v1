import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Expand,
  MapPin,
  Shield,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { LeadForm } from '../components/LeadForm';
import { ImageLightbox, type LightboxImageItem } from '../components/ImageLightbox';
import { trackEvent } from '../utils/tracking';

export const HomePage: React.FC = () => {
  const { lang, t, scrollToLeadForm } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVillaIndex, setActiveVillaIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxImageItem[]>([]);

  const slides = SITE_CONFIG.heroSlides;
  const activeVilla = SITE_CONFIG.villaModels[activeVillaIndex];

  const openLightbox = (items: LightboxImageItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  return (
    <main>
      {/* =====================================================================
          SECTION 1: HERO SECTION (FIRST SECTION - MANDATORY)
          Project image slider + key project facts ledger + strong headline + CTA
      ===================================================================== */}
      <section className="border-b border-hairline bg-limestone pt-6 pb-12 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Hero Copy, CTA & Architectural Fact Ledger (5 cols) */}
            <div className="lg:col-span-5">
              <h1 className="text-3xl font-extrabold leading-[1.22] text-ink-950 sm:text-4xl lg:text-[2.65rem]">
                {lang === 'ar'
                  ? 'كمبوند مروج سموحة — مجتمع عمراني متكامل على مساحة 182 فدان في قلب الإسكندرية'
                  : 'Muruj Compound Smouha — A 182-Feddan Gated Urban Sanctuary in Alexandria'}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink-800 sm:text-lg">
                {lang === 'ar'
                  ? 'أمام جرين بلازا مباشرة على محور 14 مايو وشارع الهيلتون. يجمع بين فيلات شركة الفرات المستقلة الفاخرة (V1–V4) والشقق السكنية والدوبلكس كاملة التشطيب بمساحات تبدأ من 106 م² ونادي رياضي على مساحة 14 فدان.'
                  : 'Directly opposite Green Plaza along 14 May Bridge Rd. & Hilton St. Featuring AlForat luxury standalone villas (V1–V4), fully finished apartments & duplexes starting from 106 m², and a 14-feddan sporting club.'}
              </p>

              {/* Primary Hero CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('click_cta', { cta_location: 'hero_primary' });
                    scrollToLeadForm();
                  }}
                  className="inline-flex items-center gap-2.5 rounded-lg bg-cypress-900 px-6 py-3.5 text-base font-bold text-limestone shadow-atelier transition hover:bg-cypress-800"
                >
                  <span>
                    {lang === 'ar'
                      ? 'احجز وحدتك / اطلب قائمة الأسعار'
                      : 'Book Your Unit / Request Price List'}
                  </span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
                  )}
                </button>

                <Link
                  to="/units"
                  onClick={() => trackEvent('click_cta', { cta_location: 'hero_explore_units' })}
                  className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-travertine px-5 py-3.5 text-sm font-bold text-ink-950 transition hover:border-bronze-600"
                >
                  <span>
                    {lang === 'ar' ? 'استعرض المساحات والمساقط' : 'View Units & Floor Plans'}
                  </span>
                </Link>
              </div>

              {/* Key Project Information Highlight Ledger */}
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
                {SITE_CONFIG.heroHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between bg-travertine/75 p-3.5 sm:p-4"
                  >
                    <dt className="text-xs font-semibold text-ink-600">{t(item.label)}</dt>
                    <dd className="mt-1 text-sm font-extrabold tabular-nums text-cypress-900 sm:text-base">
                      {t(item.value)}
                    </dd>
                    <span className="mt-0.5 text-[11px] font-medium text-ink-600">
                      {t(item.detail)}
                    </span>
                  </div>
                ))}
              </dl>
            </div>

            {/* Interactive Hero Image Slider / Gallery (7 cols) */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-hairline bg-travertine shadow-atelier">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cypress-950">
                  <img
                    src={slides[activeSlide].src}
                    alt={t(slides[activeSlide].alt)}
                    width={slides[activeSlide].width}
                    height={slides[activeSlide].height}
                    loading="eager"
                    fetchPriority="high"
                    className="h-full w-full object-cover transition-opacity duration-300"
                  />

                  {/* Top overlay controls */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-cypress-950/75 via-cypress-950/25 to-transparent p-4">
                    <span className="rounded-md border border-bronze-400/40 bg-cypress-950/85 px-3 py-1 text-xs font-bold text-bronze-300">
                      {t(slides[activeSlide].badge)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          slides.map((s) => ({
                            src: s.src,
                            alt: t(s.alt),
                            title: t(s.caption),
                            width: s.width,
                            height: s.height,
                          })),
                          activeSlide
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-md border border-limestone/25 bg-cypress-950/80 px-3 py-1.5 text-xs font-semibold text-limestone hover:bg-cypress-900"
                    >
                      <Expand className="h-3.5 w-3.5 text-bronze-300" strokeWidth={1.75} />
                      <span>{lang === 'ar' ? 'تكبير الصورة' : 'Full Screen'}</span>
                    </button>
                  </div>

                  {/* Prev / Next Slider Controls */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
                    }
                    aria-label={lang === 'ar' ? 'الصورة السابقة' : 'Previous slide'}
                    className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full border border-limestone/30 bg-cypress-950/80 p-2.5 text-limestone transition hover:bg-cypress-900"
                  >
                    {lang === 'ar' ? (
                      <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                    ) : (
                      <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                    aria-label={lang === 'ar' ? 'الصورة التالية' : 'Next slide'}
                    className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full border border-limestone/30 bg-cypress-950/80 p-2.5 text-limestone transition hover:bg-cypress-900"
                  >
                    {lang === 'ar' ? (
                      <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                    ) : (
                      <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                    )}
                  </button>

                  {/* Bottom Caption Bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cypress-950/90 via-cypress-950/60 to-transparent px-4 pb-3.5 pt-8 text-limestone">
                    <p className="text-xs font-medium sm:text-sm">{t(slides[activeSlide].caption)}</p>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-2 border-t border-hairline bg-travertine p-2.5">
                  {slides.map((s, idx) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-label={t(s.badge)}
                      aria-current={activeSlide === idx}
                      className={`relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition ${
                        activeSlide === idx
                          ? 'border-cypress-900 ring-2 ring-bronze-500/50'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={s.src}
                        alt={t(s.alt)}
                        width={320}
                        height={200}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: LEAD FORM SECTION (IMMEDIATELY AFTER THE HERO - MANDATORY)
      ===================================================================== */}
      <section className="border-b border-hairline bg-travertine py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <LeadForm id="lead-form-section" variant="desk" formLocation="home-immediate-after-hero" />
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: ABOUT THE PROJECT (Description & Masterplan from Sources)
      ===================================================================== */}
      <section className="border-b border-hairline bg-limestone py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                {lang === 'ar'
                  ? 'عن كمبوند مروج سموحة — مدينة متكاملة تجمع الفيلات المستقلة والشقق السكنية'
                  : 'About Muruj Smouha — An Integrated Community of Villas & Apartments'}
              </h2>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-800">
                <p>
                  {lang === 'ar'
                    ? 'يمتد كمبوند مروج سموحة على مساحة 182 فداناً في واحدة من أرقى مناطق الإسكندرية عند مدخل سموحة أمام جرين بلازا مباشرة، ليكون مجتمعاً عمرانياً مسوراً ومتكاملاً يجمع بين الهدوء، الخصوصية، والقرب المباشر من كافة محاور الحركة والخدمات الرئيسية.'
                    : 'Spanning 182 feddans in one of Alexandria’s most prestigious districts at the entrance of Smouha directly opposite Green Plaza, Muruj Compound is a fully gated master-planned urban community balancing serenity with central accessibility.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'يضم المشروع قطاع الفيلات المستقلة الفاخرة من تطوير شركة الفرات للتطوير العقاري (AlForat Compound) بـ 4 طرازات مستقلة (V1–V4) مع كلوب هاوس خاص، إلى جانب المشروعات السكنية المتنوعة لـ 15 مطوراً معتمداً داخل المجتمع — ومنها يو بارك (تشييد)، ڤي مروج (الغنيمي)، زينيا مروج (MWA)، ومروج هايتس — مما يمنحك حرية الاختيار بين الشقق الجاهزة للاستلام الفوري أو الوحدات بالتقسيط المرن.'
                    : 'The compound features the luxury standalone villas sector developed by AlForat Development (4 villa types: V1–V4) with its dedicated Clubhouse, alongside residential phases by 15 accredited developers—including U Park (Tasheed), Vee Muruj (El-Ghoniemy), Zinnia (MWA), and Muruj Heights.'}
                </p>
              </div>

              {/* Infrastructure & Community Proof List */}
              <ul className="mt-6 space-y-2.5 border-t border-hairline pt-6">
                {SITE_CONFIG.infrastructureFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-ink-950">
                    <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                    <span>{t(feat)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Masterplan & Real Site Split Showcase */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
              <figure className="overflow-hidden rounded-xl border border-hairline bg-white p-3 shadow-atelier">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      [
                        {
                          src: '/images/masterplan-horizontal.webp',
                          alt:
                            lang === 'ar'
                              ? 'المخطط العام لكمبوند الفرات داخل مروج سموحة'
                              : 'Master Plan of AlForat Compound in Muruj Smouha',
                          title:
                            lang === 'ar'
                              ? 'المخطط العام (Master Plan) — كمبوند مروج سموحة'
                              : 'Master Plan — Muruj Smouha Compound',
                          width: 1300,
                          height: 1076,
                        },
                      ],
                      0
                    )
                  }
                  className="group relative block w-full overflow-hidden rounded-lg"
                >
                  <img
                    src="/images/masterplan-horizontal.webp"
                    alt={
                      lang === 'ar'
                        ? 'المخطط العام لكمبوند الفرات داخل مروج سموحة'
                        : 'Master Plan of AlForat Compound in Muruj Smouha'
                    }
                    width={1300}
                    height={1076}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 end-2 inline-flex items-center gap-1 rounded bg-cypress-950/85 px-2.5 py-1 text-xs font-bold text-limestone">
                    <Expand className="h-3.5 w-3.5 text-bronze-300" />
                    {lang === 'ar' ? 'عرض الماستر بلان' : 'View Master Plan'}
                  </span>
                </button>
                <figcaption className="mt-2.5 text-xs font-bold text-ink-800">
                  {lang === 'ar'
                    ? 'المخطط الهندسي العام وتوزيع الفيلات والكلوب هاوس واللاندسكيب'
                    : 'Master Plan layout showing villas, central clubhouse, and green corridors'}
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-xl border border-hairline bg-white p-3 shadow-atelier">
                <img
                  src="/images/gallery-alforat-real-01.webp"
                  alt={
                    lang === 'ar'
                      ? 'صورة واقعية للفيلات المنفذة في كمبوند مروج سموحة'
                      : 'Real on-site photograph of villas in Muruj Smouha'
                  }
                  width={1400}
                  height={935}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
                <figcaption className="mt-2.5 text-xs font-bold text-ink-800">
                  {lang === 'ar'
                    ? 'صورة حقيقية من أرض الواقع للوحدات المنفذة والحدائق داخل الكمبوند'
                    : 'Real on-site photography of constructed villas and gardens inside Muruj'}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: UNIT TYPES & AREAS (Villas V1–V4 + Apartments & Floor Plans)
      ===================================================================== */}
      <section className="border-b border-hairline bg-travertine py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                {lang === 'ar'
                  ? 'أنواع الوحدات والمساحات في كمبوند مروج سموحة'
                  : 'Unit Types, Areas & Architectural Models'}
              </h2>
              <p className="mt-2 text-base text-ink-800">
                {lang === 'ar'
                  ? 'فيلات الفرات المستقلة (V1–V4)، شقق غرفتين و3 غرف نوم، ودوبلكس بمساحات من 106 م² حتى 479 م².'
                  : 'AlForat standalone villas (V1–V4), 2 & 3-bedroom apartments, and duplexes from 106 m² to 479 m².'}
              </p>
            </div>

            <Link
              to="/units"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-cypress-900 bg-limestone px-4 py-2.5 text-sm font-bold text-cypress-900 transition hover:bg-cypress-900 hover:text-limestone"
            >
              <span>
                {lang === 'ar' ? 'تصفح جميع الوحدات والمساقط' : 'Explore All Units & Floor Plans'}
              </span>
              {lang === 'ar' ? (
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              )}
            </Link>
          </div>

          {/* Part 4A: Interactive Standalone Villas Showcase (V1 - V4) */}
          <div className="mt-10 overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-cypress-900 px-5 py-4 text-limestone">
              <div>
                <h3 className="text-lg font-extrabold">
                  {lang === 'ar'
                    ? 'قطاع فيلات الفرات المستقلة (Standalone Villas V1 – V4)'
                    : 'AlForat Standalone Villas Sector (Models V1 – V4)'}
                </h3>
                <p className="text-xs text-bronze-300">
                  {lang === 'ar'
                    ? 'أول كمبوند فيلات مستقلة فاخرة في سموحة بالإسكندرية — اختر النموذج لاستعراض الواجهات الأمامية والخلفية'
                    : 'First luxury standalone villas compound in Smouha — Select a model to inspect front & rear elevations'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2" role="tablist">
                {SITE_CONFIG.villaModels.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={activeVillaIndex === idx}
                    onClick={() => setActiveVillaIndex(idx)}
                    className={`rounded-md px-4 py-2 text-xs font-extrabold transition ${
                      activeVillaIndex === idx
                        ? 'bg-bronze-500 text-cypress-950 shadow-sm'
                        : 'border border-limestone/25 bg-cypress-950/60 text-limestone hover:bg-cypress-800'
                    }`}
                  >
                    {lang === 'ar' ? `ستاند ألون ${v.code}` : `Model ${v.code}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12 lg:p-8">
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <span className="inline-block rounded border border-bronze-600/40 bg-bronze-100 px-2.5 py-1 text-xs font-bold text-bronze-800">
                    {t(activeVilla.developer)}
                  </span>
                  <h4 className="mt-3 text-2xl font-extrabold text-ink-950">
                    {t(activeVilla.name)}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-800">
                    {t(activeVilla.description)}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-hairline pt-4">
                    {activeVilla.specs.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-medium text-ink-950">
                        <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                        <span>{t(s)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('click_cta', {
                        cta_location: 'home_villa_model',
                        unit_model: activeVilla.code,
                      });
                      scrollToLeadForm(activeVilla.unitSelectValue);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cypress-900 px-5 py-3.5 text-sm font-bold text-limestone transition hover:bg-cypress-800 sm:w-auto"
                  >
                    <span>
                      {lang === 'ar'
                        ? `اطلب تفاصيل وأسعار فيلا ${activeVilla.code}`
                        : `Request Villa ${activeVilla.code} Details & Pricing`}
                    </span>
                    {lang === 'ar' ? (
                      <ArrowLeft className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                <figure className="overflow-hidden rounded-lg border border-hairline bg-white">
                  <img
                    src={activeVilla.frontImage.src}
                    alt={t(activeVilla.frontImage.alt)}
                    width={activeVilla.frontImage.width}
                    height={activeVilla.frontImage.height}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <figcaption className="px-3.5 py-2.5 text-xs font-bold text-ink-800">
                    {lang === 'ar'
                      ? `الواجهة الأمامية — نموذج ${activeVilla.code}`
                      : `Front Elevation — Model ${activeVilla.code}`}
                  </figcaption>
                </figure>

                <figure className="overflow-hidden rounded-lg border border-hairline bg-white">
                  <img
                    src={activeVilla.backImage.src}
                    alt={t(activeVilla.backImage.alt)}
                    width={activeVilla.backImage.width}
                    height={activeVilla.backImage.height}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <figcaption className="px-3.5 py-2.5 text-xs font-bold text-ink-800">
                    {lang === 'ar'
                      ? `الواجهة الخلفية والحديقة — نموذج ${activeVilla.code}`
                      : `Rear & Garden View — Model ${activeVilla.code}`}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          {/* Part 4B: Featured Apartments & Floor Plans Grid */}
          <h3 className="mt-14 text-xl font-extrabold text-ink-950 sm:text-2xl">
            {lang === 'ar'
              ? 'نماذج الشقق السكنية والمساحات المتاحة داخل مروج سموحة'
              : 'Featured Residential Apartments & Area Models'}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.apartmentUnits.slice(0, 6).map((apt) => (
              <article
                key={apt.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier"
              >
                <div>
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-cypress-950">
                    <img
                      src={apt.image.src}
                      alt={t(apt.image.alt)}
                      width={apt.image.width}
                      height={apt.image.height}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute start-3 top-3 rounded bg-cypress-950/90 px-2.5 py-1 text-xs font-bold text-bronze-300">
                      {t(apt.paymentBadge)}
                    </span>
                    <span className="absolute bottom-3 end-3 rounded bg-limestone/95 px-2.5 py-1 text-xs font-extrabold tabular-nums text-cypress-900">
                      {apt.areaSqm} {lang === 'ar' ? 'م²' : 'm²'}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-extrabold text-ink-950">{t(apt.title)}</h4>
                    <p className="mt-1 text-xs font-semibold text-ink-600">{t(apt.subProject)}</p>

                    <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-hairline py-3 text-center text-xs">
                      <div>
                        <dt className="text-ink-600">{lang === 'ar' ? 'المساحة' : 'Area'}</dt>
                        <dd className="mt-0.5 font-extrabold tabular-nums text-ink-950">
                          {apt.areaSqm} {lang === 'ar' ? 'م²' : 'm²'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-ink-600">{lang === 'ar' ? 'الغرف' : 'Bedrooms'}</dt>
                        <dd className="mt-0.5 font-extrabold tabular-nums text-ink-950">
                          {apt.bedrooms} {lang === 'ar' ? 'غرف' : 'BR'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-ink-600">{lang === 'ar' ? 'التشطيب' : 'Finishing'}</dt>
                        <dd className="mt-0.5 font-extrabold text-cypress-900">
                          {t(apt.finishing)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('click_cta', {
                        cta_location: 'home_unit_card',
                        unit_area: apt.areaSqm,
                      });
                      scrollToLeadForm(apt.unitSelectValue);
                    }}
                    className="w-full rounded-lg border border-cypress-900 bg-cypress-900 px-4 py-2.5 text-xs font-bold text-limestone transition hover:bg-cypress-800"
                  >
                    {lang === 'ar'
                      ? `سجل اهتمامك بمساحة ${apt.areaSqm} م²`
                      : `Inquire About ${apt.areaSqm} m² Unit`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: AMENITIES & SERVICES (Merged from all 4 sources)
      ===================================================================== */}
      <section className="border-b border-hairline bg-limestone py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'الخدمات والمرافق المتكاملة في كمبوند مروج سموحة'
              : 'Integrated Amenities, Sporting Club & Facilities'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'مجتمع مكتفي ذاتياً يضم نادياً رياضياً على مساحة 14 فدان، كلوب هاوس، مدرسة، مستشفى، ومناطق تجارية وإدارية.'
              : 'A self-sustained urban sanctuary featuring a 14-feddan sporting club, clubhouse, school, hospital, and commercial hubs.'}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.amenities.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-xl border border-hairline bg-travertine/65"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-cypress-950">
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-ink-950">{t(item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">
                    {t(item.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: LOCATION & NEARBY LANDMARKS (Maps + Landmarks + Google Map)
      ===================================================================== */}
      <section className="border-b border-hairline bg-travertine py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'موقع كمبوند مروج سموحة والمعالم الحيوية المحيطة'
              : 'Strategic Location in Smouha & Nearby Landmarks'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'عند مدخل سموحة أمام جرين بلازا مباشرة، بمحاذاة طريق 14 مايو وشارع الهيلتون ومحور المحمودية.'
              : 'At the entrance of Smouha directly opposite Green Plaza, along 14 May Bridge Road, Hilton St., and Mahmoudia Axis.'}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Official Location Maps (7 cols) */}
            <div className="space-y-6 lg:col-span-7">
              <figure className="overflow-hidden rounded-xl border border-hairline bg-limestone p-3 shadow-atelier">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      [
                        {
                          src: '/images/location-map-smouha.webp',
                          alt:
                            lang === 'ar'
                              ? 'خريطة موقع مروج سموحة وطريق 14 مايو وشارع الهيلتون وأقرب المعالم'
                              : 'Muruj Smouha Location Map along 14 May Road & Hilton St.',
                          title:
                            lang === 'ar'
                              ? 'مخطط موقع كمبوند مروج سموحة والمعالم المحيطة'
                              : 'Muruj Smouha Location & Landmarks Map',
                          width: 1600,
                          height: 1050,
                        },
                        {
                          src: '/images/location-map-alforat.webp',
                          alt:
                            lang === 'ar'
                              ? 'خريطة المسافات الزمنية لكمبوند الفرات مروج سموحة'
                              : 'AlForat Compound Muruj Smouha Driving Time Map',
                          title:
                            lang === 'ar'
                              ? 'خريطة المسافات الزمنية من موقع شركة الفرات الرسمي'
                              : 'Official AlForat Driving Distance Map',
                          width: 1040,
                          height: 624,
                        },
                      ],
                      0
                    )
                  }
                  className="group relative block w-full overflow-hidden rounded-lg"
                >
                  <img
                    src="/images/location-map-smouha.webp"
                    alt={
                      lang === 'ar'
                        ? 'خريطة موقع مروج سموحة، طريق 14 مايو وشارع الهيلتون وأقرب المعالم'
                        : 'Muruj Smouha location map and nearby landmarks'
                    }
                    width={1600}
                    height={1050}
                    loading="lazy"
                    className="w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-md bg-cypress-950/90 px-3 py-1.5 text-xs font-bold text-limestone">
                    <Expand className="h-3.5 w-3.5 text-bronze-300" />
                    {lang === 'ar' ? 'تكبير الخريطة' : 'Enlarge Map'}
                  </span>
                </button>
                <figcaption className="mt-2.5 text-xs font-bold text-ink-800">
                  {lang === 'ar'
                    ? 'مخطط موقع مروج سموحة وعلاقته بجرين بلازا، طريق 14 مايو، نادي سموحة، وجامعة فاروس'
                    : 'Muruj Smouha location map showing Green Plaza, 14 May Rd., Smouha Club, and Pharos University'}
                </figcaption>
              </figure>

              {/* Embedded Interactive Google Map */}
              <div className="overflow-hidden rounded-xl border border-hairline bg-limestone p-3 shadow-atelier">
                <iframe
                  title={
                    lang === 'ar'
                      ? 'موقع كمبوند مروج سموحة على خرائط جوجل'
                      : 'Muruj Compound Smouha Google Map'
                  }
                  src="https://maps.google.com/maps?q=Muruj%20Smouha%20Green%20Plaza%20Alexandria&t=m&z=15&output=embed&iwloc=near"
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-lg border border-hairline"
                />
              </div>
            </div>

            {/* Landmarks Distance Ledger Table (5 cols) */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier">
                <div className="border-b border-hairline bg-cypress-900 px-5 py-4 text-limestone">
                  <h3 className="text-base font-extrabold">
                    {lang === 'ar'
                      ? 'المسافات والمدد الزمنية لأهم معالم الإسكندرية'
                      : 'Driving Distances & Times to Key Landmarks'}
                  </h3>
                  <p className="mt-0.5 text-xs text-bronze-300">
                    {lang === 'ar'
                      ? 'وفق خريطة شركة الفرات الرسمية وقياسات المسافة بالسيارة'
                      : 'Verified from AlForat official map & driving distance metrics'}
                  </p>
                </div>

                <div className="divide-y divide-hairline">
                  {SITE_CONFIG.landmarks.map((lm, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-travertine/50"
                    >
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0"
                          strokeWidth={1.75}
                        />
                        <div>
                          <p className="text-sm font-bold text-ink-950">{t(lm.name)}</p>
                          <p className="text-xs text-ink-600">{t(lm.smouhaMetric)}</p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-md border border-bronze-500/30 bg-travertine px-2.5 py-1 text-xs font-extrabold tabular-nums text-cypress-900">
                        {t(lm.alforatTime)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: PAYMENT PLANS (Strictly from Sources, No Total Prices)
      ===================================================================== */}
      <section className="border-b border-hairline bg-limestone py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'أنظمة السداد والتقسيط المتاحة في كمبوند مروج سموحة'
              : 'Flexible Down Payments & Installment Plans'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'تسهيلات سداد متنوعة تناسب خطتك الاستثمارية أو السكنية حسب المرحلة والمطور الداخلي.'
              : 'Tailored payment structures across Muruj Smouha phases to match your move-in and investment timeline.'}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONFIG.paymentPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col justify-between rounded-xl border border-hairline bg-travertine/75 p-6 shadow-atelier"
              >
                <div>
                  <span className="inline-block rounded bg-cypress-900 px-2.5 py-1 text-xs font-bold text-bronze-300">
                    {t(plan.badge)}
                  </span>

                  <div className="mt-5 flex items-baseline gap-2 border-b border-hairline pb-4">
                    <span className="text-4xl font-extrabold tabular-nums text-cypress-900">
                      {plan.downPayment}
                    </span>
                    <span className="text-sm font-bold text-ink-800">
                      {lang === 'ar' ? 'مقدم تعاقد' : 'Down Payment'}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="font-medium text-ink-600">
                        {lang === 'ar' ? 'مدة التقسيط:' : 'Installment Period:'}
                      </dt>
                      <dd className="font-extrabold text-ink-950">{t(plan.duration)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-ink-600">
                        {lang === 'ar' ? 'نظام الأقساط:' : 'Schedule:'}
                      </dt>
                      <dd className="font-extrabold text-ink-950">{t(plan.schedule)}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-xs leading-relaxed text-ink-800">
                    {t(plan.description)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    trackEvent('click_cta', {
                      cta_location: 'payment_plan_card',
                      plan_id: plan.id,
                    });
                    scrollToLeadForm();
                  }}
                  className="mt-6 w-full rounded-lg border border-cypress-900 bg-limestone py-2.5 text-xs font-bold text-cypress-900 transition hover:bg-cypress-900 hover:text-limestone"
                >
                  {lang === 'ar' ? 'اطلب جدول السداد التفصيلي' : 'Request Payment Schedule'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: SHORT FAQ (Accordion from Sources)
      ===================================================================== */}
      <section className="border-b border-hairline bg-travertine py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'الأسئلة الشائعة عن كمبوند مروج سموحة'
              : 'Frequently Asked Questions About Muruj Smouha'}
          </h2>

          <div className="mt-8 space-y-3">
            {SITE_CONFIG.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group overflow-hidden rounded-xl border border-hairline bg-limestone transition"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-extrabold text-ink-950 hover:bg-travertine/40">
                  <span>{t(faq.question)}</span>
                  <ChevronDown
                    className="h-5 w-5 text-cypress-900 transition-transform duration-200 group-open:rotate-180 shrink-0"
                    strokeWidth={1.75}
                  />
                </summary>
                <div className="border-t border-hairline px-6 py-4 text-sm leading-relaxed text-ink-800">
                  {t(faq.answer)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: FINAL CTA WITH THE SAME FORM AGAIN (MANDATORY)
      ===================================================================== */}
      <section className="bg-limestone py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
              {lang === 'ar'
                ? 'ابدأ خطوتك الآن في كمبوند مروج سموحة'
                : 'Take Your Next Step in Muruj Smouha Today'}
            </h2>
            <p className="mx-auto mt-2 text-base text-ink-800">
              {lang === 'ar'
                ? 'سجل بياناتك ليتواصل معك مستشار المبيعات بتفاصيل الوحدات المتاحة، المساقط الهندسية، وجدول السداد المناسب لك.'
                : 'Register your contact details to receive current unit availability, architectural floor plans, and tailored payment schedules.'}
            </p>
          </div>

          <LeadForm variant="desk" formLocation="home-final-cta" />
        </div>
      </section>

      <ImageLightbox
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
      />
    </main>
  );
};

