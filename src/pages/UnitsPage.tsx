import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Expand, Maximize2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { LeadForm } from '../components/LeadForm';
import { ImageLightbox, type LightboxImageItem } from '../components/ImageLightbox';
import { trackEvent } from '../utils/tracking';

export const UnitsPage: React.FC = () => {
  const { lang, t, scrollToLeadForm } = useLanguage();
  const [bedroomFilter, setBedroomFilter] = useState<'all' | 2 | 3>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxImageItem[]>([]);

  const filteredApartments =
    bedroomFilter === 'all'
      ? SITE_CONFIG.apartmentUnits
      : SITE_CONFIG.apartmentUnits.filter((u) => u.bedrooms === bedroomFilter);

  const openLightbox = (items: LightboxImageItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  return (
    <main>
      {/* Page Title & Quick Action */}
      <section className="border-b border-hairline bg-limestone py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
                {lang === 'ar'
                  ? 'دليل الوحدات والمساحات والمساقط الأفقية في كمبوند مروج سموحة'
                  : 'Units, Areas & Architectural Floor Plans in Muruj Smouha'}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-ink-800 sm:text-lg">
                {lang === 'ar'
                  ? 'استعرض كافة خيارات السكن والاستثمار داخل مجتمع مروج (182 فدان): فيلات الفرات المستقلة (V1–V4)، المساقط الهندسية المعتمدة بالأبعاد التفصيلية، ومقارنة المشروعات الداخلية والمساحات من 106 م² حتى 479 م².'
                  : 'Compare every residential and investment option inside the 182-feddan Muruj Smouha community: AlForat standalone villas (V1–V4), dimensioned architectural floor plans, and apartment areas from 106 m² to 479 m².'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                trackEvent('click_cta', { cta_location: 'units_hero' });
                scrollToLeadForm();
              }}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-cypress-900 px-6 py-3.5 text-sm font-bold text-limestone shadow-atelier transition hover:bg-cypress-800 lg:self-end shrink-0"
            >
              <span>
                {lang === 'ar' ? 'اطلب قائمة الأسعار والوحدات المتاحة' : 'Request Price List & Availability'}
              </span>
              {lang === 'ar' ? (
                <ArrowLeft className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
              ) : (
                <ArrowRight className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Architectural Floor Plans & Room Dimensions */}
      <section className="border-b border-hairline bg-travertine py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'المساقط الأفقية المعتمدة والأبعاد الهندسية للغرف'
              : 'Verified Architectural Floor Plans & Room Dimensions'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'اضغط على أي مسقط هندسي لتكبيره بملء الشاشة ومراجعة توزيع الغرف والأبعاد بالمتر.'
              : 'Click any architectural drawing to inspect full-resolution room layouts and dimensions.'}
          </p>

          <div className="mt-8 space-y-8">
            {SITE_CONFIG.floorPlans.map((fp) => (
              <article
                key={fp.id}
                className="overflow-hidden rounded-xl border border-hairline bg-limestone shadow-atelier"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-cypress-900 px-6 py-4 text-limestone">
                  <div>
                    <h3 className="text-lg font-extrabold">{t(fp.project)}</h3>
                    <p className="text-xs text-bronze-300">
                      {t(fp.developer)} · {t(fp.modelName)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-bronze-500 px-3 py-1 text-xs font-extrabold tabular-nums text-cypress-950">
                      {t(fp.area)}
                    </span>
                    <span className="rounded border border-limestone/25 bg-cypress-950/60 px-3 py-1 text-xs font-semibold text-limestone">
                      {t(fp.bedrooms)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12">
                  {/* Floor Plan Image */}
                  <div className="lg:col-span-7">
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          [
                            {
                              src: fp.image.src,
                              alt: t(fp.image.alt),
                              title: `${t(fp.project)} — ${t(fp.modelName)} (${t(fp.area)})`,
                              width: fp.image.width,
                              height: fp.image.height,
                            },
                          ],
                          0
                        )
                      }
                      className="group relative block w-full overflow-hidden rounded-lg border border-hairline bg-white p-2"
                    >
                      <img
                        src={fp.image.src}
                        alt={t(fp.image.alt)}
                        width={fp.image.width}
                        height={fp.image.height}
                        loading="lazy"
                        className="max-h-[420px] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-md bg-cypress-950/90 px-3 py-1.5 text-xs font-bold text-limestone">
                        <Expand className="h-3.5 w-3.5 text-bronze-300" />
                        {lang === 'ar' ? 'تكبير المسقط الهندسي' : 'Zoom Floor Plan'}
                      </span>
                    </button>
                  </div>

                  {/* Room Dimensions Table */}
                  <div className="flex flex-col justify-between lg:col-span-5">
                    <div>
                      <h4 className="text-base font-extrabold text-ink-950">
                        {lang === 'ar'
                          ? 'جدول أبعاد الغرف والمساحات الداخلية'
                          : 'Internal Room Dimensions Schedule'}
                      </h4>
                      <div className="mt-3 overflow-hidden rounded-lg border border-hairline bg-travertine/50">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-hairline bg-travertine text-ink-800">
                              <th className="px-3.5 py-2.5 text-start font-bold">
                                {lang === 'ar' ? 'الفراغ المعماري / النموذج' : 'Space / Model'}
                              </th>
                              <th className="px-3.5 py-2.5 text-end font-bold">
                                {lang === 'ar' ? 'الأبعاد / المساحة' : 'Dimensions / Area'}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-hairline">
                            {fp.roomDimensions.map((rm, idx) => (
                              <tr key={idx} className="bg-limestone/80">
                                <td className="px-3.5 py-2 font-semibold text-ink-950">
                                  {t(rm.name)}
                                </td>
                                <td
                                  dir="ltr"
                                  className="px-3.5 py-2 text-end font-bold tabular-nums text-cypress-900"
                                >
                                  {rm.dimensions}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        trackEvent('click_cta', {
                          cta_location: 'floorplan_card',
                          floorplan_id: fp.id,
                        });
                        scrollToLeadForm(fp.unitSelectValue);
                      }}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cypress-900 px-5 py-3 text-sm font-bold text-limestone transition hover:bg-cypress-800"
                    >
                      <span>
                        {lang === 'ar'
                          ? `اسأل عن الوحدات المتاحة بهذا المسقط (${t(fp.area)})`
                          : `Inquire About Units with This Layout (${t(fp.area)})`}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: AlForat Standalone Villas V1–V4 Complete Models */}
      <section className="border-b border-hairline bg-limestone py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'طرازات فيلات شركة الفرات المستقلة (V1 · V2 · V3 · V4)'
              : 'AlForat Standalone Villa Models (V1 · V2 · V3 · V4)'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'جميع الطرازات عبارة عن فيلات مستقلة بالكامل (Standalone Villas) محاطة بالحدائق داخل قطاع الفيلات في مروج سموحة.'
              : 'All 4 models are fully standalone family villas surrounded by landscaped gardens inside the villas enclave of Muruj Smouha.'}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {SITE_CONFIG.villaModels.map((villa) => (
              <article
                key={villa.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-travertine/65 shadow-atelier"
              >
                <div>
                  <div className="grid grid-cols-2 gap-1 bg-hairline">
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          [
                            {
                              src: villa.frontImage.src,
                              alt: t(villa.frontImage.alt),
                              title: `${t(villa.name)} — ${lang === 'ar' ? 'الواجهة الأمامية' : 'Front View'}`,
                              width: villa.frontImage.width,
                              height: villa.frontImage.height,
                            },
                            {
                              src: villa.backImage.src,
                              alt: t(villa.backImage.alt),
                              title: `${t(villa.name)} — ${lang === 'ar' ? 'الواجهة الخلفية' : 'Back View'}`,
                              width: villa.backImage.width,
                              height: villa.backImage.height,
                            },
                          ],
                          0
                        )
                      }
                      className="group relative aspect-[16/11] overflow-hidden bg-cypress-950"
                    >
                      <img
                        src={villa.frontImage.src}
                        alt={t(villa.frontImage.alt)}
                        width={villa.frontImage.width}
                        height={villa.frontImage.height}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 start-2 rounded bg-cypress-950/85 px-2 py-0.5 text-[11px] font-bold text-limestone">
                        {lang === 'ar' ? 'الواجهة الأمامية' : 'Front'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          [
                            {
                              src: villa.frontImage.src,
                              alt: t(villa.frontImage.alt),
                              title: `${t(villa.name)} — ${lang === 'ar' ? 'الواجهة الأمامية' : 'Front View'}`,
                              width: villa.frontImage.width,
                              height: villa.frontImage.height,
                            },
                            {
                              src: villa.backImage.src,
                              alt: t(villa.backImage.alt),
                              title: `${t(villa.name)} — ${lang === 'ar' ? 'الواجهة الخلفية' : 'Back View'}`,
                              width: villa.backImage.width,
                              height: villa.backImage.height,
                            },
                          ],
                          1
                        )
                      }
                      className="group relative aspect-[16/11] overflow-hidden bg-cypress-950"
                    >
                      <img
                        src={villa.backImage.src}
                        alt={t(villa.backImage.alt)}
                        width={villa.backImage.width}
                        height={villa.backImage.height}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 start-2 rounded bg-cypress-950/85 px-2 py-0.5 text-[11px] font-bold text-limestone">
                        {lang === 'ar' ? 'الواجهة الخلفية والحديقة' : 'Backyard'}
                      </span>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-extrabold text-ink-950">{t(villa.name)}</h3>
                      <span className="rounded bg-cypress-900 px-3 py-1 text-xs font-extrabold text-bronze-300">
                        {villa.code}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-800">
                      {t(villa.description)}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                      {villa.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-semibold text-ink-950">
                          <Check className="mt-0.5 h-3.5 w-3.5 text-cypress-900 shrink-0" strokeWidth={2} />
                          <span>{t(spec)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('click_cta', {
                        cta_location: 'units_villa_card',
                        unit_model: villa.code,
                      });
                      scrollToLeadForm(villa.unitSelectValue);
                    }}
                    className="w-full rounded-lg bg-cypress-900 py-3 text-xs font-bold text-limestone transition hover:bg-cypress-800"
                  >
                    {lang === 'ar'
                      ? `احجز معاينة أو اطلب تفاصيل فيلا ${villa.code}`
                      : `Request Details & Viewing for Villa ${villa.code}`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Complete Apartment Units Directory with Bedroom Filter */}
      <section className="border-b border-hairline bg-travertine py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                {lang === 'ar'
                  ? 'كافة مساحات الشقق السكنية والدوبلكس المتاحة'
                  : 'All Residential Apartment & Duplex Area Options'}
              </h2>
              <p className="mt-2 text-base text-ink-800">
                {lang === 'ar'
                  ? 'فلتر الوحدات حسب عدد الغرف لاختيار المساحة الأنسب لعائلتك.'
                  : 'Filter available models by bedroom count to match your family needs.'}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2" role="group">
              <button
                type="button"
                onClick={() => setBedroomFilter('all')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  bedroomFilter === 'all'
                    ? 'bg-cypress-900 text-limestone'
                    : 'border border-hairline bg-limestone text-ink-950 hover:border-cypress-900'
                }`}
              >
                {lang === 'ar' ? 'جميع المساحات (106 – 479 م²)' : 'All Areas (106 – 479 m²)'}
              </button>
              <button
                type="button"
                onClick={() => setBedroomFilter(2)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  bedroomFilter === 2
                    ? 'bg-cypress-900 text-limestone'
                    : 'border border-hairline bg-limestone text-ink-950 hover:border-cypress-900'
                }`}
              >
                {lang === 'ar' ? 'شقق غرفتين نوم (106 – 123 م²)' : '2 Bedrooms (106 – 123 m²)'}
              </button>
              <button
                type="button"
                onClick={() => setBedroomFilter(3)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  bedroomFilter === 3
                    ? 'bg-cypress-900 text-limestone'
                    : 'border border-hairline bg-limestone text-ink-950 hover:border-cypress-900'
                }`}
              >
                {lang === 'ar' ? 'شقق 3 غرف نوم ودوبلكس (131 – 479 م²)' : '3 Bedrooms & Duplexes'}
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApartments.map((apt) => (
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
                    <h3 className="text-base font-extrabold text-ink-950">{t(apt.title)}</h3>
                    <p className="mt-1 text-xs font-semibold text-ink-600">
                      {t(apt.subProject)} · {t(apt.status)}
                    </p>

                    <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-hairline py-3 text-center text-xs">
                      <div>
                        <dt className="text-ink-600">{lang === 'ar' ? 'المساحة' : 'Area'}</dt>
                        <dd className="mt-0.5 font-extrabold tabular-nums text-ink-950">
                          {apt.areaSqm} {lang === 'ar' ? 'م²' : 'm²'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-ink-600">{lang === 'ar' ? 'الغرف والحمامات' : 'Rooms'}</dt>
                        <dd className="mt-0.5 font-extrabold tabular-nums text-ink-950">
                          {apt.bedrooms} {lang === 'ar' ? 'غرف' : 'BR'} · {apt.bathrooms}{' '}
                          {lang === 'ar' ? 'حمام' : 'BA'}
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
                        cta_location: 'units_directory_card',
                        unit_area: apt.areaSqm,
                      });
                      scrollToLeadForm(apt.unitSelectValue);
                    }}
                    className="w-full rounded-lg bg-cypress-900 py-2.5 text-xs font-bold text-limestone transition hover:bg-cypress-800"
                  >
                    {lang === 'ar'
                      ? `اطلب عرض السعر وجدول السداد (${apt.areaSqm} م²)`
                      : `Request Offer & Payment Plan (${apt.areaSqm} m²)`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Sub-Projects Comparison Table inside Muruj */}
      <section className="border-b border-hairline bg-limestone py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            {lang === 'ar'
              ? 'مقارنة المشروعات والمراحل الداخلية داخل مجتمع مروج سموحة'
              : 'Internal Sub-Projects & Developers Comparison inside Muruj'}
          </h2>
          <p className="mt-2 text-base text-ink-800">
            {lang === 'ar'
              ? 'يضم مجتمع مروج (182 فدان) عدة مراحل ومطورين معتمدين؛ قارن بين الفيلات والشقق والدوبلكس واختر المرحلة المناسبة لك.'
              : 'Muruj encompasses specialized phases across 182 feddans; compare unit ranges, finishing, and payment highlights below.'}
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-hairline shadow-atelier">
            <table className="w-full min-w-[720px] border-collapse bg-limestone text-sm">
              <thead>
                <tr className="border-b border-hairline bg-cypress-900 text-limestone">
                  <th className="px-4 py-3.5 text-start font-bold">
                    {lang === 'ar' ? 'المشروع الداخلي' : 'Internal Project'}
                  </th>
                  <th className="px-4 py-3.5 text-start font-bold">
                    {lang === 'ar' ? 'المطور العقاري' : 'Developer'}
                  </th>
                  <th className="px-4 py-3.5 text-start font-bold">
                    {lang === 'ar' ? 'نطاق المساحات' : 'Area Range'}
                  </th>
                  <th className="px-4 py-3.5 text-start font-bold">
                    {lang === 'ar' ? 'أنواع الوحدات والتشطيب' : 'Unit Types & Finishing'}
                  </th>
                  <th className="px-4 py-3.5 text-start font-bold">
                    {lang === 'ar' ? 'نظام السداد الأبرز' : 'Payment Highlight'}
                  </th>
                  <th className="px-4 py-3.5 text-center font-bold">
                    {lang === 'ar' ? 'الاستفسار' : 'Action'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {SITE_CONFIG.subProjects.map((sp) => (
                  <tr key={sp.id} className="hover:bg-travertine/55">
                    <td className="px-4 py-4 font-extrabold text-cypress-900">{t(sp.name)}</td>
                    <td className="px-4 py-4 font-semibold text-ink-800">{t(sp.developer)}</td>
                    <td className="px-4 py-4 font-bold tabular-nums text-ink-950">
                      {t(sp.areaRange)}
                    </td>
                    <td className="px-4 py-4 text-xs text-ink-800">
                      <span className="block font-semibold text-ink-950">{t(sp.unitTypes)}</span>
                      <span className="text-ink-600">
                        {t(sp.status)} · {t(sp.finishing)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-bronze-800">
                      {t(sp.paymentHighlight)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => scrollToLeadForm(sp.unitSelectValue)}
                        className="rounded-md bg-cypress-900 px-3.5 py-2 text-xs font-bold text-limestone hover:bg-cypress-800"
                      >
                        {lang === 'ar' ? 'اطلب التفاصيل' : 'Inquire'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Lead Form */}
      <section className="bg-travertine py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <LeadForm id="lead-form-section" variant="desk" formLocation="units-page-bottom" />
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

