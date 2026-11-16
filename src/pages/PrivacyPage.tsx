import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappE164}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage[lang]
  )}`;

  return (
    <main className="bg-limestone py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-hairline bg-travertine p-6 shadow-atelier sm:p-10">
          <div className="flex items-center gap-3 border-b border-hairline pb-5">
            <ShieldCheck className="h-7 w-7 text-cypress-900 shrink-0" strokeWidth={1.75} />
            <div>
              <h1 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                {lang === 'ar'
                  ? 'سياسة الخصوصية وشروط الاستخدام'
                  : 'Privacy Policy & Terms of Use'}
              </h1>
              <p className="mt-1 text-xs font-semibold text-ink-600">
                {lang === 'ar'
                  ? 'تاريخ السريان والتحديث الأخير: نوفمبر 2026'
                  : 'Effective & Last Updated Date: November 2026'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink-800 sm:text-base">
            <section>
              <h2 className="text-lg font-extrabold text-ink-950">
                {lang === 'ar' ? '1. طبيعة الموقع والغرض منه' : '1. Website Nature & Purpose'}
              </h2>
              <p className="mt-2">
                {lang === 'ar'
                  ? 'هذا الموقع هو صفحة تسويقية وعقارية مخصصة لتقديم المعلومات واستقبال طلبات الاهتمام بمشروع "كمبوند مروج سموحة" (Muruj Compound Smouha) بالإسكندرية، ولا يمثل الموقع الرسمي للمطور العقاري. جميع الصور والمعلومات المعروضة استرشادية وقابلة للتغيير وفق تحديثات المراحل والوحدات.'
                  : 'This website is a dedicated real-estate marketing page providing information and receiving inquiries for Muruj Compound Smouha in Alexandria, and does not represent the official developer website. All images and specifications are indicative and subject to change.'}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-ink-950">
                {lang === 'ar' ? '2. البيانات التي نقوم بجمعها' : '2. Data We Collect'}
              </h2>
              <p className="mt-2">
                {lang === 'ar'
                  ? 'عند تسجيل اهتمامك عبر نموذج التواصل في الموقع، نقوم بجمع البيانات التالية:'
                  : 'When you submit an inquiry through our lead registration form, we collect the following information:'}
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 font-medium text-ink-950">
                <li>
                  {lang === 'ar'
                    ? 'بيانات التواصل الأساسية: الاسم بالكامل، رقم الهاتف المحمول/واتساب (بصيغة دولية E.164)، والبريد الإلكتروني (في حال اختيارك إدخاله).'
                    : 'Contact Information: Full name, phone/WhatsApp number (in E.164 international format), and optional email address.'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'تفضيلات العقار: نوع الوحدة أو المساحة المختارة (مثل: غرفتين، 3 غرف، دوبلكس، أو فيلا مستقلة).'
                    : 'Property Preferences: Selected unit type or area range (2 bedrooms, 3 bedrooms, duplex, or standalone villa).'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'البيانات التقنية وبيانات الحملات الإعلانية: رابط الصفحة (Page URL)، المصدر المرجعي (Referrer)، نوع الجهاز (موبايل/كمبيوتر)، توقيت التسجيل، ومعرفات الحملات الإعلانية (UTM parameters و gclid / gbraid / wbraid).'
                    : 'Technical & Campaign Attribution Data: Page URL, HTTP referrer, device category, submission timestamp, and advertising parameters (UTM tags and gclid / gbraid / wbraid).'}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-ink-950">
                {lang === 'ar'
                  ? '3. كيفية استخدام البيانات وعدم بيعها'
                  : '3. How We Use Your Data & Non-Sale Guarantee'}
              </h2>
              <p className="mt-2">
                {lang === 'ar'
                  ? 'تُستخدم بياناتك حصرياً لغرض التواصل معك هاتفياً أو عبر تطبيق واتساب أو البريد الإلكتروني من قِبل فريق المبيعات المختص للرد على استفساراتك وتزويدك بتفاصيل الوحدات والمساقط الهندسية وأنظمة السداد في كمبوند مروج سموحة. نحن نلتزم التزاماً كاملاً بعدم بيع أو تأجير أو المتاجرة ببياناتك الشخصية لأي جهات خارجية غير ذات صلة.'
                  : 'Your personal information is used exclusively to contact you via phone, WhatsApp, or email regarding your inquiry about Muruj Compound Smouha. We never sell, rent, or trade your personal data to unrelated third parties.'}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-ink-950">
                {lang === 'ar'
                  ? '4. ملفات تعريف الارتباط (Cookies) وإعلانات جوجل والتحليلات'
                  : '4. Cookies, Google Analytics & Google Ads Tracking'}
              </h2>
              <p className="mt-2">
                {lang === 'ar'
                  ? 'يستخدم هذا الموقع تقنيات القياس وملفات تعريف الارتباط الخاصة بخدمات Google Analytics 4 و Google Tag Manager و Google Ads (بما في ذلك ميزة التحويلات المحسّنة Enhanced Conversions التي تستخدم تشفير SHA-256 أحادي الاتجاه) لقياس كفاءة الحملات الإعلانية وتحسين تجربة المستخدم على الموقع.'
                  : 'This site uses cookies and measurement tags from Google Analytics 4, Google Tag Manager, and Google Ads (including SHA-256 hashed Enhanced Conversions) to measure campaign effectiveness and improve user experience.'}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-ink-950">
                {lang === 'ar'
                  ? '5. كيفية طلب تعديل أو حذف بياناتك'
                  : '5. How to Request Data Access or Deletion'}
              </h2>
              <p className="mt-2">
                {lang === 'ar'
                  ? 'يحق لك في أي وقت طلب الاطلاع على بياناتك المسجلة لدينا أو تعديلها أو حذفها نهائياً من سجلاتنا ومن قائمة المتابعة التسويقية، وذلك عبر التواصل معنا مباشرة من خلال القنوات التالية:'
                  : 'You have the right at any time to request access to, correction of, or permanent deletion of your data from our records by contacting us via:'}
              </p>
              <ul className="mt-3 space-y-2 rounded-xl border border-hairline bg-limestone p-4 text-sm font-bold text-ink-950">
                <li>
                  {lang === 'ar' ? 'الهاتف المباشر: ' : 'Phone: '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                    dir="ltr"
                    className="tabular-nums text-cypress-900 underline"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  {lang === 'ar' ? 'واتساب: ' : 'WhatsApp: '}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cypress-900 underline"
                  >
                    {lang === 'ar' ? 'تواصل عبر واتساب لطلب الحذف أو الاستفسار' : 'Contact via WhatsApp'}
                  </a>
                </li>
                <li>
                  {lang === 'ar' ? 'البريد الإلكتروني: ' : 'Email: '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.emailPlaceholder}`}
                    dir="ltr"
                    className="text-cypress-900 underline"
                  >
                    {SITE_CONFIG.contact.emailPlaceholder}
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-8 border-t border-hairline pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-cypress-900 px-5 py-3 text-sm font-bold text-limestone transition hover:bg-cypress-800"
            >
              <span>{lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home Page'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
              ) : (
                <ArrowRight className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
              )}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

