import React, { useState } from 'react';
import { Check, Expand, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { LeadForm } from '../components/LeadForm';
import { ImageLightbox, type LightboxImageItem } from '../components/ImageLightbox';

export const GalleryPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'villas' | 'apartments' | 'construction' | 'masterplan'
  >('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxImageItem[]>([]);

  const filteredGallery =
    categoryFilter === 'all'
      ? SITE_CONFIG.galleryImages
      : SITE_CONFIG.galleryImages.filter((img) => img.category === categoryFilter);

  const openLightbox = (items: LightboxImageItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  return (
    <main>
      {/* Page Header */}
      <section className="border-b border-hairline bg-limestone py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {lang === 'ar'
              ? 'معرض الصور والماستر بلان وموقع كمبوند مروج سموحة'
              : 'Photo Gallery, Master Plan & Location of Muruj Smouha'}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-800 sm:text-lg">
            {lang === 'ar'
              ? 'شاهد الصور الحقيقية من أرض الواقع، التصورات المعمارية للفيلات والعمارات السكنية، المخطط العام (Master Plan)، وموقع الكمبوند أمام جرين بلازا مباشرة.'
              : 'Explore real on-site construction photos, architectural renderings of villas and residential buildings, the Master Plan, and the location opposite Green Plaza.'}
          </p>
        </div>
      </section>

      {/* Section 1: Full Image Gallery with Category Filter & Lightbox */}
      <section className="border-b border-hairline bg-travertine py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                {lang === 'ar'
                  ? 'ألبوم صور كمبوند مروج سموحة (صور واقعية وتصورات معمارية)'
                  : 'Muruj Smouha Complete Visual Gallery'}
              </h2>
              <p className="mt-1.5 text-sm text-ink-800">
                {lang === 'ar'
                  ? 'اضغط على أي صورة لفتحها في عارض الصور بالحجم الكامل (Lightbox).'
                  : 'Click any image to open it in the full-screen Lightbox viewer.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group">
              {[
                { key: 'all', label: { ar: 'كل الصور (20)', en: 'All Photos (20)' } },
                { key: 'construction', label: { ar: 'صور واقعية من الموقع', en: 'Real On-Site Photos' } },
                { key: 'villas', label: { ar: 'فيلات الفرات واللاندسكيب', en: 'Villas & Landscaping' } },
                { key: 'apartments', label: { ar: 'العمارات السكنية والجراج', en: 'Residential Buildings' } },
                { key: 'masterplan', label: { ar: 'الماستر بلان ولقطات جوية', en: 'Master Plan & Aerial' } },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setCategoryFilter(tab.key as typeof categoryFilter)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                    categoryFilter === tab.key
                      ? 'bg-cypress-900 text-limestone'
                      : 'border border-hairline bg-limestone text-ink-950 hover:border-cypress-900'
                  }`}
                >
                  {tab.label[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((img, idx) => (
              <figure
                key={img.id}
                className="overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier"
              >
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      filteredGallery.map((item) => ({
                        src: item.src,
                        alt: t(item.alt),
                        title: t(item.title),
                        width: item.width,
                        height: item.height,
                      })),
                      idx
                    )
                  }
                  className="group relative block aspect-[16/10] w-full overflow-hidden bg-cypress-950"
                >
                  <img
                    src={img.src}
                    alt={t(img.alt)}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 end-2.5 inline-flex items-center gap-1 rounded bg-cypress-950/85 px-2.5 py-1 text-xs font-bold text-limestone">
                    <Expand className="h-3.5 w-3.5 text-bronze-300" />
                    {lang === 'ar' ? 'تكبير' : 'Zoom'}
                  </span>
                </button>
                <figcaption className="px-4 py-3 text-xs font-bold text-ink-950">
                  {t(img.title)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Master Plan Section */}
      <section className="border-b border-hairline bg-limestone py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'المخطط العام للمشروع (Master Plan)'
              : 'Compound Architectural Master Plan'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'توزيع هندسي مدروس يضمن إطلالات خضراء مفتوحة، شوارع داخلية فسيحة، وتمركز الكلوب هاوس والخدمات في قلب المجتمع.'
              : 'Engineered master layout ensuring open green views, wide internal avenues, and central clubhouse access.'}
          </p>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    [
                      {
                        src: '/images/masterplan-horizontal.webp',
                        alt:
                          lang === 'ar'
                            ? 'المخطط العام الأفقي لكمبوند الفرات مروج سموحة'
                            : 'Horizontal Master Plan of AlForat Compound Muruj Smouha',
                        title:
                          lang === 'ar'
                            ? 'المخطط العام (Master Plan) — كمبوند مروج سموحة'
                            : 'Master Plan — Muruj Smouha Compound',
                        width: 1300,
                        height: 1076,
                      },
                      {
                        src: '/images/masterplan-vertical.webp',
                        alt:
                          lang === 'ar'
                            ? 'المخطط العام الرأسي لقطاع فيلات الفرات في مروج سموحة'
                            : 'Vertical Master Plan of AlForat Villas Sector',
                        title:
                          lang === 'ar'
                            ? 'المخطط التفصيلي لقطاع الفيلات والكلوب هاوس'
                            : 'Detailed Villas & Clubhouse Master Plan',
                        width: 411,
                        height: 581,
                      },
                    ],
                    0
                  )
                }
                className="group relative block w-full overflow-hidden rounded-xl border border-hairline bg-white p-3 shadow-atelier"
              >
                <img
                  src="/images/masterplan-horizontal.webp"
                  alt={
                    lang === 'ar'
                      ? 'المخطط العام لكمبوند الفرات مروج سموحة'
                      : 'Master Plan of AlForat Compound Muruj Smouha'
                  }
                  width={1300}
                  height={1076}
                  loading="lazy"
                  className="max-h-[500px] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-md bg-cypress-950/90 px-3.5 py-2 text-xs font-bold text-limestone">
                  <Expand className="h-4 w-4 text-bronze-300" />
                  {lang === 'ar' ? 'فتح الماستر بلان بالحجم الكامل' : 'Open Full-Size Master Plan'}
                </span>
              </button>
            </div>

            <div className="space-y-4 lg:col-span-4">
              <div className="rounded-xl border border-hairline bg-travertine p-6">
                <h3 className="text-lg font-extrabold text-ink-950">
                  {lang === 'ar' ? 'عناصر المخطط العام' : 'Master Plan Highlights'}
                </h3>
                <ul className="mt-4 space-y-3 text-sm font-medium text-ink-800">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                    <span>
                      {lang === 'ar'
                        ? 'إجمالي مساحة مجتمع مروج: 182 فداناً عند مدخل سموحة.'
                        : 'Total community area: 182 feddans at Smouha entrance.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                    <span>
                      {lang === 'ar'
                        ? 'نادي رياضي واجتماعي على مساحة 14 فداناً.'
                        : '14-feddan sporting and social club.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                    <span>
                      {lang === 'ar'
                        ? 'كلوب هاوس يضم حمام سباحة، ملاعب تنس وكرة قدم وسلة ويد، ملعب اسكواش، وكافيه.'
                        : 'Clubhouse with pool, tennis/football/basketball/handball courts, squash court, and cafe.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cypress-900 shrink-0" strokeWidth={2} />
                    <span>
                      {lang === 'ar'
                        ? 'مدرسة، مستشفى، مسجد، ومناطق تجارية وإدارية متكاملة.'
                        : 'School, hospital, mosque, and integrated commercial/admin zones.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Amenities & Services */}
      <section className="border-b border-hairline bg-travertine py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'المرافق والخدمات الحياتية والترفيهية'
              : 'Lifestyle Facilities & Community Services'}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.amenities.map((am) => (
              <div
                key={am.id}
                className="overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier"
              >
                <img
                  src={am.image}
                  alt={t(am.title)}
                  width={am.width}
                  height={am.height}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-ink-950">{t(am.title)}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-800">
                    {t(am.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Location & Nearby Landmarks */}
      <section className="border-b border-hairline bg-limestone py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'الموقع الجغرافي وخريطة المعالم المحيطة بسموحة'
              : 'Location Maps & Nearby Alexandria Landmarks'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'يقع كمبوند مروج سموحة أمام جرين بلازا مباشرة، على تقاطع طريق 14 مايو وشارع الهيلتون ومحور المحمودية.'
              : 'Muruj Smouha sits directly opposite Green Plaza along 14 May Bridge Road, Hilton St., and the Mahmoudia Axis.'}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Map 1: Smouha Vector Map */}
            <figure className="overflow-hidden rounded-xl border border-hairline bg-travertine p-3">
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    [
                      {
                        src: '/images/location-map-smouha.webp',
                        alt:
                          lang === 'ar'
                            ? 'خريطة مروج سموحة وطريق 14 مايو وشارع الهيلتون'
                            : 'Muruj Smouha road and landmark map',
                        title:
                          lang === 'ar'
                            ? 'خريطة مروج سموحة والمحاور المحيطة'
                            : 'Muruj Smouha Axis & Landmarks Map',
                        width: 1600,
                        height: 1050,
                      },
                    ],
                    0
                  )
                }
                className="relative block w-full overflow-hidden rounded-lg bg-white"
              >
                <img
                  src="/images/location-map-smouha.webp"
                  alt={
                    lang === 'ar'
                      ? 'خريطة مروج سموحة وطريق 14 مايو وشارع الهيلتون'
                      : 'Muruj Smouha road and landmark map'
                  }
                  width={1600}
                  height={1050}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </button>
              <figcaption className="mt-2.5 text-xs font-bold text-ink-950">
                {lang === 'ar'
                  ? 'خريطة المحاور: جرين بلازا، طريق 14 مايو، حدائق أنطونيادس، جامعة فاروس، ونادي سموحة'
                  : 'Road Network Map: Green Plaza, 14 May Rd., Antoniadis Gardens, Pharos University, and Smouha Club'}
              </figcaption>
            </figure>

            {/* Map 2: AlForat Official Satellite Driving Map */}
            <figure className="overflow-hidden rounded-xl border border-hairline bg-travertine p-3">
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    [
                      {
                        src: '/images/location-map-alforat.webp',
                        alt:
                          lang === 'ar'
                            ? 'خريطة المسافات الزمنية الرسمية من شركة الفرات'
                            : 'Official AlForat driving time satellite map',
                        title:
                          lang === 'ar'
                            ? 'خريطة المسافات الزمنية الرسمية — شركة الفرات للتطوير العقاري'
                            : 'Official Driving Time Map — AlForat Development',
                        width: 1040,
                        height: 624,
                      },
                    ],
                    0
                  )
                }
                className="relative block w-full overflow-hidden rounded-lg bg-cypress-950"
              >
                <img
                  src="/images/location-map-alforat.webp"
                  alt={
                    lang === 'ar'
                      ? 'خريطة المسافات الزمنية الرسمية من شركة الفرات'
                      : 'Official AlForat driving time satellite map'
                  }
                  width={1040}
                  height={624}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </button>
              <figcaption className="mt-2.5 text-xs font-bold text-ink-950">
                {lang === 'ar'
                  ? 'خريطة المسافات الزمنية: كارفور (دقيقتان)، المحافظة الجديدة (3 دقائق)، نادي الاتحاد (4 دقائق)، نادي سموحة (6 دقائق)'
                  : 'Driving Times: Carrefour (2 mins), New Governorate (3 mins), Al-Ittihad Club (4 mins), Smouha Club (6 mins)'}
              </figcaption>
            </figure>
          </div>

          {/* Landmarks Grid */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.landmarks.map((lm, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-hairline bg-travertine/70 px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-cypress-900 shrink-0" strokeWidth={1.75} />
                  <div>
                    <p className="text-xs font-extrabold text-ink-950">{t(lm.name)}</p>
                    <p className="text-[11px] text-ink-600">{t(lm.smouhaMetric)}</p>
                  </div>
                </div>
                <span className="rounded bg-cypress-900 px-2 py-1 text-[11px] font-bold tabular-nums text-bronze-300">
                  {t(lm.alforatTime)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Lead Form */}
      <section className="bg-travertine py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <LeadForm id="lead-form-section" variant="desk" formLocation="gallery-page-bottom" />
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

