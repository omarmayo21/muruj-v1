import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContactBar } from './components/FloatingContactBar';
import { HomePage } from './pages/HomePage';
import {
  captureAttributionOnLanding,
  initAnalytics,
  trackPageView,
} from './utils/tracking';

// Route-level code-splitting for secondary routes (Task 7)
const UnitsPage = lazy(() =>
  import('./pages/UnitsPage').then((m) => ({ default: m.UnitsPage }))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);
const ThankYouPage = lazy(() =>
  import('./pages/ThankYouPage').then((m) => ({ default: m.ThankYouPage }))
);
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);

interface PageSeoMeta {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  canonicalPath: string;
}

const ROUTE_SEO: Record<string, PageSeoMeta> = {
  '/': {
    title: {
      ar: 'كمبوند مروج سموحة الإسكندرية | Muruj Compound Smouha — الفرات للتطوير العقاري',
      en: 'Muruj Compound Smouha Alexandria | AlForat Development & 182-Feddan Community',
    },
    description: {
      ar: 'كمبوند مروج سموحة بالإسكندرية أمام جرين بلازا مباشرة على مساحة 182 فدان. فيلات الفرات المستقلة (V1–V4)، شقق سكنية ودوبلكس بمساحات تبدأ من 106 م²، بمقدم يبدأ من 10% وتقسيط حتى 10 سنوات.',
      en: 'Muruj Compound Smouha in Alexandria directly opposite Green Plaza across 182 feddans. AlForat standalone villas (V1–V4), apartments & duplexes from 106 m², from 10% down payment.',
    },
    canonicalPath: '/',
  },
  '/units': {
    title: {
      ar: 'الوحدات والمساحات والمساقط الأفقية | كمبوند مروج سموحة الإسكندرية',
      en: 'Units, Areas & Architectural Floor Plans | Muruj Compound Smouha',
    },
    description: {
      ar: 'استعرض مساحات وتقسيمات كمبوند مروج سموحة: شقق غرفتين (106–123 م²)، شقق 3 غرف (131–257 م²)، دوبلكس (حتى 479 م²)، وفيلات الفرات المستقلة (V1–V4) مع المساقط الهندسية المعتمدة.',
      en: 'Explore unit areas and floor plans in Muruj Smouha: 2-bedroom (106–123 m²), 3-bedroom (131–257 m²), duplexes (up to 479 m²), and AlForat standalone villas (V1–V4).',
    },
    canonicalPath: '/units',
  },
  '/gallery': {
    title: {
      ar: 'معرض الصور والماستر بلان والموقع | كمبوند مروج سموحة الإسكندرية',
      en: 'Photo Gallery, Master Plan & Location Map | Muruj Compound Smouha',
    },
    description: {
      ar: 'شاهد الصور الحقيقية من أرض الواقع، التصورات المعمارية، المخطط العام (Master Plan)، وخريطة موقع كمبوند مروج سموحة أمام جرين بلازا وطريق 14 مايو.',
      en: 'View real on-site construction photos, architectural renders, the Master Plan, and location map of Muruj Compound Smouha opposite Green Plaza.',
    },
    canonicalPath: '/gallery',
  },
  '/thank-you': {
    title: {
      ar: 'شكراً لتسجيل اهتمامك | كمبوند مروج سموحة',
      en: 'Thank You for Registering | Muruj Compound Smouha',
    },
    description: {
      ar: 'شكراً لك، تم استلام طلبك بنجاح وسيتواصل معك فريق مبيعات كمبوند مروج سموحة قريباً.',
      en: 'Thank you, your inquiry has been received and the Muruj Smouha team will contact you shortly.',
    },
    canonicalPath: '/thank-you',
  },
  '/privacy': {
    title: {
      ar: 'سياسة الخصوصية وشروط الاستخدام | كمبوند مروج سموحة',
      en: 'Privacy Policy & Terms of Use | Muruj Compound Smouha',
    },
    description: {
      ar: 'سياسة الخصوصية وحماية البيانات الشخصية لزوار وعملاء الموقع التسويقي لكمبوند مروج سموحة بالإسكندرية.',
      en: 'Privacy policy and personal data protection terms for visitors of the Muruj Compound Smouha marketing website.',
    },
    canonicalPath: '/privacy',
  },
};

const RouteTracker: React.FC = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const seo = ROUTE_SEO[location.pathname] || ROUTE_SEO['/'];
    const pageTitle = seo.title[lang];
    const pageDesc = seo.description[lang];
    const canonicalUrl = `https://muruj-compound.vercel.app${seo.canonicalPath}`;

    document.title = pageTitle;

    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descEl) descEl.content = pageDesc;

    const ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.content = pageTitle;

    const ogDescEl = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.content = pageDesc;

    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.content = canonicalUrl;

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.href = canonicalUrl;

    trackPageView(location.pathname, pageTitle);
  }, [location.pathname, lang]);

  return null;
};

export const App: React.FC = () => {
  useEffect(() => {
    initAnalytics();
    captureAttributionOnLanding();
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteTracker />
        <div className="flex min-h-screen flex-col bg-limestone text-ink-950">
          <Header />
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="flex min-h-[50vh] items-center justify-center bg-limestone p-8 text-sm font-bold text-cypress-900">
                  جاري التحميل...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/units" element={<UnitsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <FloatingContactBar />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
