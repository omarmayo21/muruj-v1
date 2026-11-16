export type Language = 'ar' | 'en';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface UnitOption {
  value: string;
  label: BilingualText;
}

export interface VillaModel {
  id: string;
  code: string;
  name: BilingualText;
  developer: BilingualText;
  type: BilingualText;
  description: BilingualText;
  specs: BilingualText[];
  frontImage: {
    src: string;
    width: number;
    height: number;
    alt: BilingualText;
  };
  backImage: {
    src: string;
    width: number;
    height: number;
    alt: BilingualText;
  };
  extraImage?: {
    src: string;
    width: number;
    height: number;
    alt: BilingualText;
  };
  unitSelectValue: string;
}

export interface FloorPlanItem {
  id: string;
  project: BilingualText;
  developer: BilingualText;
  modelName: BilingualText;
  area: BilingualText;
  bedrooms: BilingualText;
  bathrooms: BilingualText;
  image: {
    src: string;
    width: number;
    height: number;
    alt: BilingualText;
  };
  roomDimensions: Array<{
    name: BilingualText;
    dimensions: string;
  }>;
  unitSelectValue: string;
}

export interface SubProjectItem {
  id: string;
  name: BilingualText;
  developer: BilingualText;
  areaRange: BilingualText;
  unitTypes: BilingualText;
  status: BilingualText;
  finishing: BilingualText;
  paymentHighlight: BilingualText;
  unitSelectValue: string;
}

export interface ApartmentShowcaseItem {
  id: string;
  title: BilingualText;
  subProject: BilingualText;
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  status: BilingualText;
  finishing: BilingualText;
  paymentBadge: BilingualText;
  image: {
    src: string;
    width: number;
    height: number;
    alt: BilingualText;
  };
  unitSelectValue: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  category: 'villas' | 'apartments' | 'construction' | 'masterplan';
  title: BilingualText;
  alt: BilingualText;
}

export const SITE_CONFIG = {
  // ============================================================================
  // PLACEHOLDER CONTACT DETAILS — Edit these before launching Google Ads
  // ============================================================================
  contact: {
    phoneDisplay: '+20 100 000 0000',
    phoneE164: '+201000000000',
    whatsappE164: '201000000000', // Digits only for wa.me link
    emailPlaceholder: 'info@muruj-smouha.com',
    whatsappDefaultMessage: {
      ar: 'مرحباً، مهتم بكمبوند مروج سموحة وأرغب في معرفة التفاصيل',
      en: 'Hello, I am interested in Muruj Compound Smouha and would like to know the details',
    },
  },

  project: {
    name: {
      ar: 'كمبوند مروج سموحة',
      en: 'Muruj Compound Smouha',
    },
    shortName: {
      ar: 'مروج سموحة',
      en: 'Muruj Smouha',
    },
    primaryDeveloper: {
      ar: 'شركة الفرات للتطوير العقاري (AlForat Development) وتحالف 15 مطوراً معتمداً',
      en: 'AlForat Development & Consortium of 15 Accredited Developers',
    },
    location: {
      ar: 'سموحة، الإسكندرية — أمام جرين بلازا مباشرة (طريق 14 مايو وشارع الهيلتون)',
      en: 'Smouha, Alexandria — Directly opposite Green Plaza (14 May Rd. & Hilton St.)',
    },
    totalArea: {
      ar: '182 فدان',
      en: '182 Feddans',
    },
    clubArea: {
      ar: '14 فدان',
      en: '14 Feddans',
    },
    areaRange: {
      ar: 'من 106 م² إلى 479 م² + فيلات مستقلة (V1–V4)',
      en: '106 m² to 479 m² + Standalone Villas (V1–V4)',
    },
    downPaymentSummary: {
      ar: 'مقدم يبدأ من 10% وتقسيط حتى 10 سنوات',
      en: 'From 10% Down & Up to 10 Years Installments',
    },
    deliverySummary: {
      ar: 'استلام فوري (مكتمل متشطب) / 2027 / 2028 حسب المرحلة',
      en: 'Immediate Delivery (Finished) / 2027 / 2028 by Phase',
    },
  },

  // ============================================================================
  // LEAD FORM UNIT SELECT OPTIONS (Strictly matching real project data)
  // Note: 1-bedroom / studio units do NOT exist in any of the 4 sources.
  // ============================================================================
  unitOptions: [
    {
      value: 'غرفتين (106–123 م²)',
      label: { ar: 'غرفتين (106–123 م²)', en: '2 Bedrooms (106–123 m²)' },
    },
    {
      value: '3 غرف (131–257 م²)',
      label: { ar: '3 غرف (131–257 م²)', en: '3 Bedrooms (131–257 m²)' },
    },
    {
      value: 'دوبلكس (حتى 479 م²)',
      label: { ar: 'دوبلكس (حتى 479 م²)', en: 'Duplex (Up to 479 m²)' },
    },
    {
      value: 'فيلا مستقلة (الفرات V1–V4)',
      label: { ar: 'فيلا مستقلة (الفرات V1–V4)', en: 'Standalone Villa (AlForat V1–V4)' },
    },
    {
      value: 'غير محدد / أريد استشارة',
      label: { ar: 'غير محدد / أريد استشارة', en: 'Unspecified / I Want a Consultation' },
    },
  ] satisfies UnitOption[],

  // ============================================================================
  // HERO SLIDES & HIGHLIGHT CARDS (Page 1 - Section 1)
  // ============================================================================
  heroSlides: [
    {
      src: '/images/hero-alforat-villas.webp',
      width: 1600,
      height: 1067,
      badge: { ar: 'قطاع فيلات الفرات المستقلة', en: 'AlForat Standalone Villas Sector' },
      caption: {
        ar: 'فيلات الفرات المستقلة (V1–V4) بتصميم كلاسيكي معاصر داخل كمبوند مروج سموحة',
        en: 'AlForat Standalone Villas (V1–V4) inside Muruj Smouha Compound',
      },
      alt: {
        ar: 'واجهات فيلات الفرات المستقلة الفاخرة داخل كمبوند مروج سموحة بالإسكندرية',
        en: 'Luxury standalone villas facades at AlForat Compound in Muruj Smouha Alexandria',
      },
    },
    {
      src: '/images/hero-muruj-towers.webp',
      width: 1600,
      height: 900,
      badge: { ar: 'العمائر السكنية والمول التجاري', en: 'Residential Towers & Commercial Podium' },
      caption: {
        ar: 'تصور معماري للعمائر السكنية والواجهات التجارية في مجتمع مروج سموحة (182 فدان)',
        en: 'Architectural view of Muruj Smouha residential buildings and commercial podium',
      },
      alt: {
        ar: 'تصور معماري لمباني كمبوند مروج سموحة والواجهات السكنية والتجارية',
        en: 'Architectural rendering of Muruj Smouha residential buildings and commercial facades',
      },
    },
    {
      src: '/images/hero-muruj-aerial.webp',
      width: 1280,
      height: 448,
      badge: { ar: 'المخطط العمراني الشامل', en: 'Master Urban Planning' },
      caption: {
        ar: 'تصور علوي للشوارع الرئيسية واللاندسكيب وتوزيع الفيلات والمباني السكنية',
        en: 'Aerial perspective of internal streets, landscaping, and villa layout in Muruj',
      },
      alt: {
        ar: 'تصور علوي للمباني والشوارع واللاندسكيب في كمبوند مروج سموحة',
        en: 'Aerial view of buildings, streets, and landscaping in Muruj Smouha',
      },
    },
    {
      src: '/images/gallery-alforat-real-04.webp',
      width: 1400,
      height: 933,
      badge: { ar: 'صور واقعية من أرض المشروع', en: 'Real On-Site Photography' },
      caption: {
        ar: 'لقطة حقيقية من أرض الواقع لوحدات وشوارع كمبوند مروج سموحة المكتملة',
        en: 'Real on-site photograph of completed villas and avenues inside Muruj Smouha',
      },
      alt: {
        ar: 'صورة حقيقية من أرض الواقع للوحدات المنفذة في كمبوند مروج سموحة',
        en: 'Real site photograph of completed units in Muruj Smouha Compound',
      },
    },
  ],

  heroHighlights: [
    {
      label: { ar: 'الموقع الاستراتيجي', en: 'Prime Location' },
      value: { ar: 'سموحة — أمام جرين بلازا', en: 'Smouha — Opp. Green Plaza' },
      detail: { ar: 'محور 14 مايو وشارع الهيلتون', en: '14 May Rd. & Hilton St.' },
    },
    {
      label: { ar: 'المساحة الإجمالية', en: 'Total Land Area' },
      value: { ar: '182 فدان متكامل', en: '182 Feddans Gated' },
      detail: { ar: 'نادي رياضي على مساحة 14 فدان', en: 'Includes 14-Feddan Sports Club' },
    },
    {
      label: { ar: 'تنوع الوحدات', en: 'Unit Varieties' },
      value: { ar: 'فيلات (V1–V4) · شقق · دوبلكس', en: 'Villas (V1–V4) · Apts · Duplexes' },
      detail: { ar: 'بالإضافة لوحدات تجارية وإدارية وطبية', en: 'Plus Commercial, Admin & Medical' },
    },
    {
      label: { ar: 'مساحات الوحدات', en: 'Unit Area Range' },
      value: { ar: '106 م² حتى 479 م²', en: '106 m² up to 479 m²' },
      detail: { ar: 'شقق غرفتين و3 غرف + فيلات مستقلة', en: '2 & 3-Bedroom Apts + Standalone Villas' },
    },
    {
      label: { ar: 'أنظمة السداد والمقدم', en: 'Payment Plans' },
      value: { ar: 'مقدم يبدأ من 10% و15%', en: 'From 10% & 15% Down' },
      detail: { ar: 'تقسيط على 4 و5 و6 وحتى 10 سنوات', en: '4, 5, 6 & up to 10 Years Installments' },
    },
    {
      label: { ar: 'الاستلام والتشطيب', en: 'Delivery & Finishing' },
      value: { ar: 'فوري (متشطب) / 2027 / 2028', en: 'Immediate / 2027 / 2028' },
      detail: { ar: 'تشطيب كامل سوبر لوكس حسب المرحلة', en: 'Fully Finished Super Lux by Phase' },
    },
  ],

  // ============================================================================
  // STANDALONE VILLA MODELS V1–V4 (AlForat Official Site)
  // ============================================================================
  villaModels: [
    {
      id: 'villa-v1',
      code: 'V1',
      name: { ar: 'فيلا ستاند ألون — نموذج V1', en: 'Standalone Villa — Type V1' },
      developer: { ar: 'شركة الفرات للتطوير العقاري', en: 'AlForat Development' },
      type: { ar: 'فيلا مستقلة (Standalone Villa)', en: 'Standalone Villa' },
      description: {
        ar: 'التصميم الأكبر ضمن قطاع فيلات الفرات في كمبوند مروج سموحة، يجمع بين الخصوصية الكاملة والحديقة الخاصة مع إطلالة مباشرة على اللاندسكيب.',
        en: 'The flagship standalone villa model in AlForat Compound within Muruj Smouha, designed for families seeking generous living spaces and private garden views.',
      },
      specs: [
        { ar: 'فيلا مستقلة بالكامل بحديقة خاصة', en: 'Fully standalone villa with private garden' },
        { ar: 'ولوج مباشر للكلوب هاوس والملاعب عبر تطبيق الفرات', en: 'Direct access to Clubhouse & courts via AlForat App' },
        { ar: 'بنية تحتية ذكية (ألياف ضوئية، شبكة ري، إطفاء حريق)', en: 'Smart infrastructure (Fiber optics, irrigation, firefighting)' },
      ],
      frontImage: {
        src: '/images/villa-v1-front.webp',
        width: 989,
        height: 593,
        alt: {
          ar: 'واجهة فيلا ستاند ألون نموذج V1 في كمبوند الفرات مروج سموحة',
          en: 'Front facade of Standalone Villa V1 in AlForat Compound Muruj Smouha',
        },
      },
      backImage: {
        src: '/images/villa-v1-back.webp',
        width: 802,
        height: 480,
        alt: {
          ar: 'الواجهة الخلفية والحديقة لفيلا ستاند ألون نموذج V1 في كمبوند مروج سموحة',
          en: 'Rear garden view of Standalone Villa V1 in Muruj Smouha',
        },
      },
      unitSelectValue: 'فيلا مستقلة (الفرات V1–V4)',
    },
    {
      id: 'villa-v2',
      code: 'V2',
      name: { ar: 'فيلا ستاند ألون — نموذج V2', en: 'Standalone Villa — Type V2' },
      developer: { ar: 'شركة الفرات للتطوير العقاري', en: 'AlForat Development' },
      type: { ar: 'فيلا مستقلة (Standalone Villa)', en: 'Standalone Villa' },
      description: {
        ar: 'تصميم عائلي متوازن بواجهات كلاسيكية دافئة وأسقف قرميدية وتراسات رحبة تطل على الحديقة الخلفية والممرات الخضراء.',
        en: 'Balanced family standalone villa featuring warm limestone-toned facades, pitched tile roofs, and spacious garden terraces.',
      },
      specs: [
        { ar: 'تصميم مستقل بمدخل خاص وحديقة خلفية', en: 'Standalone layout with private entrance and backyard' },
        { ar: 'تراسات علوية بإطلالات مفتوحة على المساحات الخضراء', en: 'Upper terraces with open views over landscaped parks' },
        { ar: 'ضمن مجتمع فيلات مسور وهادئ في قلب سموحة', en: 'Inside a peaceful gated villa enclave in the heart of Smouha' },
      ],
      frontImage: {
        src: '/images/villa-v2-front.webp',
        width: 797,
        height: 480,
        alt: {
          ar: 'الواجهة الأمامية لفيلا ستاند ألون نموذج V2 في كمبوند الفرات مروج سموحة',
          en: 'Front view of Standalone Villa V2 in AlForat Compound Muruj Smouha',
        },
      },
      backImage: {
        src: '/images/villa-v2-back-1.webp',
        width: 797,
        height: 480,
        alt: {
          ar: 'الواجهة الخلفية لفيلا ستاند ألون نموذج V2 في كمبوند مروج سموحة',
          en: 'Back view of Standalone Villa V2 in Muruj Smouha',
        },
      },
      extraImage: {
        src: '/images/villa-v2-back-2.webp',
        width: 797,
        height: 480,
        alt: {
          ar: 'زاوية ثانية للواجهة الخلفية لفيلا ستاند ألون نموذج V2 في كمبوند مروج سموحة',
          en: 'Secondary rear perspective of Standalone Villa V2 in Muruj Smouha',
        },
      },
      unitSelectValue: 'فيلا مستقلة (الفرات V1–V4)',
    },
    {
      id: 'villa-v3',
      code: 'V3',
      name: { ar: 'فيلا ستاند ألون — نموذج V3', en: 'Standalone Villa — Type V3' },
      developer: { ar: 'شركة الفرات للتطوير العقاري', en: 'AlForat Development' },
      type: { ar: 'فيلا مستقلة (Standalone Villa)', en: 'Standalone Villa' },
      description: {
        ar: 'نموذج V3 المستقل يمنح العائلة توزيعاً عملياً للمساحات مع حديقة خلفية واسعة وموقف سيارات خاص وتفاصيل معمارية راقية.',
        en: 'Standalone Villa V3 offers practical family proportions with a generous backyard, private parking, and refined architectural detailing.',
      },
      specs: [
        { ar: 'حديقة خلفية خاصة مناسبة للجلسات العائلية', en: 'Private backyard tailored for family outdoor living' },
        { ar: 'قرب مباشر من المركز الترفيهي والكلوب هاوس والمسجد', en: 'Close proximity to the Clubhouse, sports courts, and mosque' },
        { ar: 'خصوصية تامة داخل قطاع الفيلات في مروج', en: 'Complete privacy within the dedicated villas sector of Muruj' },
      ],
      frontImage: {
        src: '/images/villa-v3-front.webp',
        width: 801,
        height: 480,
        alt: {
          ar: 'الواجهة الأمامية لفيلا ستاند ألون نموذج V3 في كمبوند الفرات مروج سموحة',
          en: 'Front facade of Standalone Villa V3 in AlForat Compound Muruj Smouha',
        },
      },
      backImage: {
        src: '/images/villa-v3-backyard.webp',
        width: 797,
        height: 480,
        alt: {
          ar: 'الحديقة الخلفية لفيلا ستاند ألون نموذج V3 في كمبوند مروج سموحة',
          en: 'Backyard view of Standalone Villa V3 in Muruj Smouha',
        },
      },
      unitSelectValue: 'فيلا مستقلة (الفرات V1–V4)',
    },
    {
      id: 'villa-v4',
      code: 'V4',
      name: { ar: 'فيلا ستاند ألون — نموذج V4', en: 'Standalone Villa — Type V4' },
      developer: { ar: 'شركة الفرات للتطوير العقاري', en: 'AlForat Development' },
      type: { ar: 'فيلا مستقلة (Standalone Villa)', en: 'Standalone Villa' },
      description: {
        ar: 'نموذج V4 المستقل يجمع بين الكفاءة الهندسية والواجهات الحجرية الأنيقة، ليقدم تجربة سكن فيلا مستقلة متكاملة في قلب سموحة.',
        en: 'Standalone Villa V4 blends architectural efficiency with classic stone-accented elevations for serene family living in Smouha.',
      },
      specs: [
        { ar: 'فيلا مستقلة بتصميم معماري متناسق وإضاءة طبيعية غامرة', en: 'Standalone villa with harmonious proportions and abundant natural light' },
        { ar: 'استخدام كامل لمرافق الفرات (حمام السباحة، الاسكواش، الكافيه)', en: 'Full access to AlForat facilities (Pool, squash court, cafe, meeting room)' },
        { ar: 'أمن وبوابات خاصة على مدار الساعة', en: '24/7 gated security and dedicated infrastructure' },
      ],
      frontImage: {
        src: '/images/villa-v4-front.webp',
        width: 798,
        height: 480,
        alt: {
          ar: 'الواجهة الأمامية لفيلا ستاند ألون نموذج V4 في كمبوند الفرات مروج سموحة',
          en: 'Front facade of Standalone Villa V4 in AlForat Compound Muruj Smouha',
        },
      },
      backImage: {
        src: '/images/villa-v4-back.webp',
        width: 797,
        height: 480,
        alt: {
          ar: 'الواجهة الخلفية لفيلا ستاند ألون نموذج V4 في كمبوند مروج سموحة',
          en: 'Rear view of Standalone Villa V4 in Muruj Smouha',
        },
      },
      unitSelectValue: 'فيلا مستقلة (الفرات V1–V4)',
    },
  ] satisfies VillaModel[],

  // ============================================================================
  // VERIFIED FLOOR PLANS
  // ============================================================================
  floorPlans: [
    {
      id: 'fp-vee-106',
      project: { ar: 'ڤي مروج (Vee Muruj) — مرحلة ڤي سيبا 37', en: 'Vee Muruj — Vee Seba 37 Phase' },
      developer: { ar: 'شركة الغنيمي للاستثمار العقاري', en: 'El-Ghoniemy Real Estate' },
      modelName: { ar: 'النموذج 2 (Type 2)', en: 'Model Type 2' },
      area: { ar: '106 م²', en: '106 m²' },
      bedrooms: { ar: 'غرفتين نوم (منها غرفة ماستر)', en: '2 Bedrooms (incl. Master Bedroom)' },
      bathrooms: { ar: 'حمام رئيسي', en: '1 Bathroom' },
      image: {
        src: '/images/floorplan-vee-muruj-106m.webp',
        width: 1400,
        height: 745,
        alt: {
          ar: 'مسقط أفقي لشقة غرفتين نوم بمساحة 106 متر مربع في ڤي مروج سموحة',
          en: 'Floor plan of 106 sqm 2-bedroom apartment in Vee Muruj Smouha',
        },
      },
      roomDimensions: [
        { name: { ar: '01. الاستقبال (Reception)', en: '01. Reception' }, dimensions: '8.60 m × 3.40 m' },
        { name: { ar: '02. تراس 1 (Terrace 1)', en: '02. Terrace 1' }, dimensions: '3.40 m × 1.20 m' },
        { name: { ar: '03. المطبخ (Kitchen)', en: '03. Kitchen' }, dimensions: '3.30 m × 3.20 m' },
        { name: { ar: '04. الحمام (Bathroom)', en: '04. Bathroom' }, dimensions: '2.20 m × 1.90 m' },
        { name: { ar: '05. غرفة النوم الرئيسية (Master Bedroom)', en: '05. Master Bedroom' }, dimensions: '5.10 m × 3.60 m' },
        { name: { ar: '06. غرفة نوم 1 (Bedroom 1)', en: '06. Bedroom 1' }, dimensions: '3.60 m × 3.50 m' },
      ],
      unitSelectValue: 'غرفتين (106–123 م²)',
    },
    {
      id: 'fp-zinnia-140',
      project: { ar: 'زينيا مروج (Zinnia Muruj)', en: 'Zinnia Muruj' },
      developer: { ar: 'شركة MWA للاستثمار العقاري', en: 'MWA Developments' },
      modelName: { ar: 'مبنى A — شقة 1 (Building A · Flat 1)', en: 'Building A — Flat (1)' },
      area: { ar: '140 م²', en: '140 m²' },
      bedrooms: { ar: '3 غرف نوم', en: '3 Bedrooms' },
      bathrooms: { ar: 'حمام رئيسي + تواليت ضيوف', en: '1 Bathroom + Guest Toilet' },
      image: {
        src: '/images/floorplan-zinnia-mwa-140m.webp',
        width: 900,
        height: 713,
        alt: {
          ar: 'مسقط أفقي لشقة 3 غرف نوم بمساحة 140 متر مربع في زينيا مروج سموحة مبنى A شقة 1',
          en: 'Floor plan of 140 sqm 3-bedroom apartment in Zinnia Muruj Building A Flat 1',
        },
      },
      roomDimensions: [
        { name: { ar: '01. مدخل الشقة (Entrance Hall)', en: '01. Entrance Hall' }, dimensions: '4.30 m × 1.40 m' },
        { name: { ar: '02. تواليت ضيوف (Toilet)', en: '02. Guest Toilet' }, dimensions: '2.60 m × 1.20 m' },
        { name: { ar: '03. المطبخ (Kitchen)', en: '03. Kitchen' }, dimensions: '3.10 m × 2.60 m' },
        { name: { ar: '04. الريسبشن (Reception)', en: '04. Reception' }, dimensions: '8.10 m × 4.00 m' },
        { name: { ar: '05. تراس 1 (Terrace 1)', en: '05. Terrace 1' }, dimensions: '3.70 m × 1.20 m' },
        { name: { ar: '06. غرفة نوم 1 (Bedroom 1)', en: '06. Bedroom 1' }, dimensions: '3.80 m × 3.70 m' },
        { name: { ar: '07. غرفة نوم 2 (Bedroom 2)', en: '07. Bedroom 2' }, dimensions: '3.80 m × 3.50 m' },
        { name: { ar: '08. غرفة نوم 3 (Bedroom 3)', en: '08. Bedroom 3' }, dimensions: '3.70 m × 4.10 m' },
        { name: { ar: '09. الحمام الرئيسي (Bathroom)', en: '09. Bathroom' }, dimensions: '3.10 m × 1.90 m' },
        { name: { ar: '10. تراس 2 (Terrace 2)', en: '10. Terrace 2' }, dimensions: '1.20 m × 1.00 m' },
      ],
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'fp-heights-c-d',
      project: { ar: 'مروج هايتس (Muruj Heights)', en: 'Muruj Heights' },
      developer: { ar: 'مروج هايتس — سموحة', en: 'Muruj Heights Development' },
      modelName: { ar: 'لوحة نماذج مبنى C ومبنى D (Type B15)', en: 'Building C & Building D Layouts (Type B15)' },
      area: { ar: '121 م² إلى 180 م²', en: '121 m² to 180 m²' },
      bedrooms: { ar: 'غرفتين نوم و3 غرف نوم', en: '2 & 3 Bedrooms' },
      bathrooms: { ar: '2 إلى 3 حمامات حسب النموذج', en: '2 to 3 Bathrooms by Type' },
      image: {
        src: '/images/floorplan-muruj-heights-121m-180m.webp',
        width: 1208,
        height: 1038,
        alt: {
          ar: 'مساقط الدور لمشروع مروج هايتس مبنى C ومبنى D بمساحات من 121 إلى 180 متر مربع',
          en: 'Floor plans of Muruj Heights Building C and Building D from 121 to 180 sqm',
        },
      },
      roomDimensions: [
        { name: { ar: 'مبنى C — نموذج C1', en: 'Building C — Type C1' }, dimensions: '121 m²' },
        { name: { ar: 'مبنى C — نموذج C2', en: 'Building C — Type C2' }, dimensions: '121 m²' },
        { name: { ar: 'مبنى C — نموذج C3', en: 'Building C — Type C3' }, dimensions: '123 m²' },
        { name: { ar: 'مبنى C — نموذج C4', en: 'Building C — Type C4' }, dimensions: '123 m²' },
        { name: { ar: 'مبنى D — نموذج D1', en: 'Building D — Type D1' }, dimensions: '153 m²' },
        { name: { ar: 'مبنى D — نموذج D2', en: 'Building D — Type D2' }, dimensions: '180 m²' },
        { name: { ar: 'مبنى D — نموذج D3', en: 'Building D — Type D3' }, dimensions: '178 m²' },
        { name: { ar: 'مبنى D — نموذج D4', en: 'Building D — Type D4' }, dimensions: '163 m²' },
      ],
      unitSelectValue: '3 غرف (131–257 م²)',
    },
  ] satisfies FloorPlanItem[],

  // ============================================================================
  // SUB-PROJECTS COMPARISON INSIDE MURUJ
  // ============================================================================
  subProjects: [
    {
      id: 'sp-alforat',
      name: { ar: 'كمبوند الفرات للفيلات (AlForat Compound)', en: 'AlForat Villas Compound' },
      developer: { ar: 'شركة الفرات للتطوير العقاري', en: 'AlForat Development' },
      areaRange: { ar: '4 طرازات فيلات مستقلة (V1 – V4)', en: '4 Standalone Villa Types (V1 – V4)' },
      unitTypes: { ar: 'فيلات ستاند ألون بحديقة خاصة وكلوب هاوس مستقل', en: 'Standalone Villas with private garden & clubhouse' },
      status: { ar: 'وحدات منفذة على الطبيعة', en: 'Constructed on site' },
      finishing: { ar: 'واجهات كاملة ولاندسكيب متكامل', en: 'Completed elevations & full landscaping' },
      paymentHighlight: { ar: 'تسهيلات تعاقدية مخصصة — سجل لمعرفة التفاصيل', en: 'Tailored payment plans upon inquiry' },
      unitSelectValue: 'فيلا مستقلة (الفرات V1–V4)',
    },
    {
      id: 'sp-upark',
      name: { ar: 'يو بارك مروج (U Park)', en: 'U Park Muruj' },
      developer: { ar: 'شركة تشييد للتطوير العقاري (Tasheed)', en: 'Tasheed Developments' },
      areaRange: { ar: '125 م² – 479 م²', en: '125 m² – 479 m²' },
      unitTypes: { ar: 'شقق سكنية ودوبلكس + وحدات إدارية وطبية', en: 'Apartments & Duplexes + Admin & Medical Units' },
      status: { ar: 'تحت الإنشاء + وحدات مكتملة', en: 'Under Construction & Completed Options' },
      finishing: { ar: 'تشطيب كامل سوبر لوكس', en: 'Fully Finished Super Lux' },
      paymentHighlight: { ar: 'مقدم يبدأ من 10% وتقسيط على 4 سنوات', en: 'From 10% down payment over 4 years' },
      unitSelectValue: 'دوبلكس (حتى 479 م²)',
    },
    {
      id: 'sp-veemuruj',
      name: { ar: 'ڤي مروج (Vee Muruj)', en: 'Vee Muruj' },
      developer: { ar: 'شركة الغنيمي للاستثمار العقاري', en: 'El-Ghoniemy Real Estate' },
      areaRange: { ar: '106 م² (غرفتين) · 169–207 م² (3 غرف)', en: '106 m² (2BR) · 169–207 m² (3BR)' },
      unitTypes: { ar: 'شقق غرفتين و3 غرف نوم ومراحل بنماذج مستقلة', en: '2 & 3-Bedroom Apartments across dedicated phases' },
      status: { ar: 'وحدات جاهزة للاستلام ومراحل متعددة', en: 'Ready-to-move & multi-phase options' },
      finishing: { ar: 'تشطيب كامل', en: 'Fully Finished' },
      paymentHighlight: { ar: 'متاح وحدات استلام فوري وتسهيلات سداد', en: 'Immediate delivery & installment options' },
      unitSelectValue: 'غرفتين (106–123 م²)',
    },
    {
      id: 'sp-zinnia',
      name: { ar: 'زينيا مروج (Zinnia Muruj)', en: 'Zinnia Muruj' },
      developer: { ar: 'شركة MWA للاستثمار العقاري', en: 'MWA Developments' },
      areaRange: { ar: '114 م² – 205 م² (منها 140 و164 و172 م²)', en: '114 m² – 205 m² (incl. 140, 164, 172 m²)' },
      unitTypes: { ar: 'شقق غرفتين و3 غرف نوم وروف بتراسات منفصلة', en: '2 & 3-Bedroom Apartments & Roof with private terraces' },
      status: { ar: 'استلام 2027 ووحدات جاهزة', en: '2027 Delivery & Ready Options' },
      finishing: { ar: 'كامل التشطيب', en: 'Fully Finished' },
      paymentHighlight: { ar: 'مقدم 20% وتقسيط الباقي على 5 سنوات (أو نقدي)', en: '20% down payment over 5 years (or Cash)' },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'sp-heights',
      name: { ar: 'مروج هايتس (Muruj Heights)', en: 'Muruj Heights' },
      developer: { ar: 'مروج هايتس', en: 'Muruj Heights' },
      areaRange: { ar: '121، 123، 153، 163، 165، 169، 178، 180 م²', en: '121, 123, 153, 163, 165, 169, 178, 180 m²' },
      unitTypes: { ar: 'شقق غرفتين و3 غرف نوم بتقسيمات دور متنوعة', en: '2 & 3-Bedroom Apartments across Building C & D' },
      status: { ar: 'مواعيد تعاقد حسب المبنى والوحدة', en: 'Scheduled delivery per building & unit' },
      finishing: { ar: 'تشطيب سوبر لوكس', en: 'Super Lux Finishing' },
      paymentHighlight: { ar: 'أنظمة تقسيط مرنة حسب الوحدة', en: 'Flexible installment schedules per unit' },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
  ] satisfies SubProjectItem[],

  // ============================================================================
  // APARTMENT UNITS SHOWCASE
  // ============================================================================
  apartmentUnits: [
    {
      id: 'apt-114',
      title: { ar: 'شقة 114 م² في كمبوند مروج سموحة', en: '114 m² Apartment in Muruj Smouha' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 114,
      bedrooms: 2,
      bathrooms: 2,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'بمقدم 10%', en: '10% Down Payment' },
      image: {
        src: '/images/unit-apt-114m.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 114 متر مربع غرفتين نوم متشطبة في كمبوند مروج سموحة',
          en: '114 sqm 2-bedroom finished apartment in Muruj Smouha Compound',
        },
      },
      unitSelectValue: 'غرفتين (106–123 م²)',
    },
    {
      id: 'apt-120-1',
      title: { ar: 'شقة 120 م² متشطبة في مروج سموحة', en: '120 m² Finished Apartment in Muruj Smouha' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 120,
      bedrooms: 2,
      bathrooms: 2,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'استلام فوري · تسهيلات سداد', en: 'Immediate Delivery · Flexible Plan' },
      image: {
        src: '/images/unit-apt-120m-1.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 120 متر مربع غرفتين نوم مكتملة الإنشاء في كمبوند مروج سموحة',
          en: '120 sqm 2-bedroom completed apartment in Muruj Smouha',
        },
      },
      unitSelectValue: 'غرفتين (106–123 م²)',
    },
    {
      id: 'apt-123',
      title: { ar: 'شقة 123 م² في كمبوند مروج سموحة', en: '123 m² Apartment in Muruj Smouha' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 123,
      bedrooms: 2,
      bathrooms: 2,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'جاهزة للمعاينة والسكن', en: 'Ready for Inspection & Move-in' },
      image: {
        src: '/images/unit-apt-123m.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 123 متر مربع غرفتين نوم متشطبة في كمبوند مروج سموحة',
          en: '123 sqm 2-bedroom finished apartment in Muruj Smouha',
        },
      },
      unitSelectValue: 'غرفتين (106–123 م²)',
    },
    {
      id: 'apt-131-plaza',
      title: { ar: 'شقة 131 م² — إطلالة مفتوحة على البلازا', en: '131 m² Apartment — Open Plaza View' },
      subProject: { ar: 'مروج سموحة — فيو بلازا', en: 'Muruj Smouha — Plaza View' },
      areaSqm: 131,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'قيد الإنشاء', en: 'Under Construction' },
      finishing: { ar: 'يُسلم متشطب بالكامل', en: 'Delivered Fully Finished' },
      paymentBadge: { ar: 'مقدم 15% وتقسيط حتى 6 سنوات', en: '15% Down · Up to 6 Years' },
      image: {
        src: '/images/unit-apt-131m-plaza-view.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 131 متر مربع 3 غرف نوم فيو بلازا في كمبوند مروج سموحة',
          en: '131 sqm 3-bedroom apartment with plaza view in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-135',
      title: { ar: 'شقة 135 م² (3 غرف نوم) في مروج سموحة', en: '135 m² (3-Bedroom) Apartment in Muruj' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 135,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'مكتمل الإنشاء · استلام فوري', en: 'Completed · Immediate Delivery' },
      image: {
        src: '/images/unit-apt-135m.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 135 متر مربع 3 غرف نوم متشطبة في كمبوند مروج سموحة',
          en: '135 sqm 3-bedroom finished apartment in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-140-tasheed',
      title: { ar: 'شقة 140 م² (3 غرف) — تشييد — فيو مفتوح', en: '140 m² (3-Bedroom) — Tasheed — Open View' },
      subProject: { ar: 'مروج سموحة — تشييد', en: 'Muruj Smouha — Tasheed' },
      areaSqm: 140,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'إطلالة مفتوحة · تشطيب كامل', en: 'Open View · Fully Finished' },
      image: {
        src: '/images/unit-apt-140m-tasheed.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 140 متر مربع 3 غرف نوم في كمبوند مروج سموحة تشييد فيو مفتوح',
          en: '140 sqm 3-bedroom apartment in Muruj Smouha Tasheed with open view',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-145-club',
      title: { ar: 'شقة 145 م² — فيو النادي الرياضي', en: '145 m² Apartment — Sports Club View' },
      subProject: { ar: 'مروج سموحة — إطلالة النادي', en: 'Muruj Smouha — Club View' },
      areaSqm: 145,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'إطلالة مباشرة على نادي 14 فدان', en: 'Direct View of 14-Feddan Club' },
      image: {
        src: '/images/unit-apt-145m-club-view.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 145 متر مربع 3 غرف نوم بإطلالة على النادي في كمبوند مروج سموحة',
          en: '145 sqm 3-bedroom apartment overlooking the club in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-148',
      title: { ar: 'شقة 148 م² (3 غرف نوم) في مروج سموحة', en: '148 m² (3-Bedroom) Apartment in Muruj Smouha' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 148,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'مكتمل الإنشاء · متشطب', en: 'Completed · Fully Finished' },
      image: {
        src: '/images/unit-apt-148m.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 148 متر مربع 3 غرف نوم متشطبة في كمبوند مروج سموحة',
          en: '148 sqm 3-bedroom finished apartment in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-150',
      title: { ar: 'شقة 150 م² (3 غرف نوم) — إطلالة مفتوحة', en: '150 m² (3-Bedroom) Apartment — Open View' },
      subProject: { ar: 'مروج سموحة', en: 'Muruj Smouha' },
      areaSqm: 150,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'متاح مكتمل / استلام 2028', en: 'Completed / 2028 Options' },
      finishing: { ar: 'كامل التشطيب', en: 'Fully Finished' },
      paymentBadge: { ar: 'بمقدم 10% وتقسيط 4 سنوات', en: '10% Down · 4 Years Installments' },
      image: {
        src: '/images/unit-apt-150m.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 150 متر مربع 3 غرف نوم بمقدم 10% في كمبوند مروج سموحة',
          en: '150 sqm 3-bedroom apartment with 10% down payment in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-151-club',
      title: { ar: 'شقة 151 م² (3 غرف) — فيو مفتوح على النادي', en: '151 m² (3-Bedroom) — Open Club View' },
      subProject: { ar: 'مروج سموحة / يو بارك', en: 'Muruj Smouha / U Park' },
      areaSqm: 151,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء + تقسيط', en: 'Completed & Installment Options' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'مقدم 10% على 4 سنوات أو استلام فوري', en: '10% Down over 4 Yrs or Immediate' },
      image: {
        src: '/images/unit-apt-151m-club-view.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 151 متر مربع 3 غرف نوم فيو مفتوح على النادي في كمبوند مروج سموحة',
          en: '151 sqm 3-bedroom apartment with open club view in Muruj Smouha',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-179-elbonyan',
      title: { ar: 'شقة 179 م² (3 غرف و3 حمامات) — مطلات مفتوحة', en: '179 m² (3BR, 3BA) — Open Panoramic Views' },
      subProject: { ar: 'مروج سموحة — البنيان', en: 'Muruj Smouha — El-Bonyan' },
      areaSqm: 179,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'مكتمل الإنشاء', en: 'Completed Construction' },
      finishing: { ar: 'متشطب بالكامل', en: 'Fully Finished' },
      paymentBadge: { ar: 'مساحة عائلية كبرى · 3 حمامات', en: 'Generous Family Layout · 3 Baths' },
      image: {
        src: '/images/unit-apt-179m-elbonyan.webp',
        width: 900,
        height: 600,
        alt: {
          ar: 'شقة 179 متر مربع 3 غرف و3 حمامات في كمبوند مروج سموحة البنيان',
          en: '179 sqm 3-bedroom 3-bathroom apartment in Muruj Smouha El-Bonyan',
        },
      },
      unitSelectValue: '3 غرف (131–257 م²)',
    },
    {
      id: 'apt-217-large',
      title: { ar: 'شقق كبرى ودوبلكس (205 م² – 217 م² – 257 م² – 479 م²)', en: 'Grand Apartments & Duplexes (205 – 479 m²)' },
      subProject: { ar: 'يو بارك / زينيا / ڤي مروج', en: 'U Park / Zinnia / Vee Muruj' },
      areaSqm: 217,
      bedrooms: 3,
      bathrooms: 3,
      status: { ar: 'استلام 2027 ومراحل متنوعة', en: '2027 Delivery & Multiple Phases' },
      finishing: { ar: 'تشطيب كامل سوبر لوكس', en: 'Super Lux Finishing' },
      paymentBadge: { ar: 'مقدم 10% وتقسيط على 4 إلى 6 سنوات', en: '10% Down · 4 to 6 Years Plan' },
      image: {
        src: '/images/gallery-smouha-facades.webp',
        width: 1400,
        height: 788,
        alt: {
          ar: 'شقق بمساحات كبيرة ودوبلكس في كمبوند مروج سموحة بالإسكندرية',
          en: 'Large apartments and duplexes in Muruj Smouha Compound Alexandria',
        },
      },
      unitSelectValue: 'دوبلكس (حتى 479 م²)',
    },
  ] satisfies ApartmentShowcaseItem[],

  // ============================================================================
  // PAYMENT PLANS (Factual Only — No Discounts, No Urgency, No Prices)
  // ============================================================================
  paymentPlans: [
    {
      id: 'plan-10-10',
      badge: { ar: 'نظام التقسيط الممتد', en: 'Extended Installment Plan' },
      downPayment: '10%',
      duration: { ar: 'حتى 10 سنوات', en: 'Up to 10 Years' },
      schedule: { ar: 'أقساط متساوية', en: 'Equal Installments' },
      description: {
        ar: 'نظام تقسيط معلن في مراحل محددة داخل مروج سموحة بمقدم 10% وتقسيط متساوٍ يصل إلى 10 سنوات حسب المرحلة والوحدة.',
        en: 'Extended installment schedule announced for selected phases in Muruj Smouha with 10% down payment and equal installments up to 10 years.',
      },
    },
    {
      id: 'plan-15-6',
      badge: { ar: 'النظام القياسي (ربع سنوي)', en: 'Standard Quarterly Plan' },
      downPayment: '15%',
      duration: { ar: '6 سنوات', en: '6 Years' },
      schedule: { ar: 'أقساط ربع سنوية', en: 'Quarterly Installments' },
      description: {
        ar: 'نظام السداد الأساسي في المشروع بمقدم تعاقد 15% وسداد المتبقي على أقساط ربع سنوية لمدة 6 سنوات.',
        en: 'Core project payment plan with a 15% contract down payment and quarterly installments over 6 years.',
      },
    },
    {
      id: 'plan-10-4',
      badge: { ar: 'يو بارك ونماذج الشقق المختارة', en: 'U Park & Selected Apartments' },
      downPayment: '10%',
      duration: { ar: '4 سنوات', en: '4 Years' },
      schedule: { ar: '16 قسطاً ربع سنوي', en: '16 Quarterly Installments' },
      description: {
        ar: 'متاح لنماذج مختارة (مثل 150 م² و151 م² و168 م² و217 م²) بمقدم يبدأ من 10% وتقسيط الباقي على 4 سنوات.',
        en: 'Available for selected models (150 m², 151 m², 168 m², and 217 m²) starting from 10% down over 4 years.',
      },
    },
    {
      id: 'plan-20-5',
      badge: { ar: 'نظام زينيا مروج والوحدات النقدية', en: 'Zinnia Plan & Ready Cash Units' },
      downPayment: '20%',
      duration: { ar: '5 سنوات', en: '5 Years' },
      schedule: { ar: 'تقسيط مرن أو تعاقد نقدي', en: 'Installments or Cash Contract' },
      description: {
        ar: 'مقدم 20% وتقسيط الباقي على 5 سنوات في مرحلة زينيا مروج، بالإضافة إلى توافر وحدات مكتملة جاهزة للتعاقد النقدي.',
        en: '20% down payment over 5 years in Zinnia Muruj, alongside completed ready-to-move units available for cash purchase.',
      },
    },
  ],

  // ============================================================================
  // AMENITIES & FACILITIES
  // ============================================================================
  amenities: [
    {
      id: 'club-14',
      title: { ar: 'نادي رياضي واجتماعي على 14 فدان', en: '14-Feddan Sports & Social Club' },
      description: {
        ar: 'نادي رياضي واجتماعي متكامل داخل كمبوند مروج يمتد على مساحة 14 فداناً لخدمة السكان والعائلات.',
        en: 'A dedicated 14-feddan sporting and social club at the heart of Muruj Compound serving residents and families.',
      },
      image: '/images/facility-multipurpose-court.webp',
      width: 468,
      height: 509,
    },
    {
      id: 'pool-clubhouse',
      title: { ar: 'كلوب هاوس وحمامات سباحة', en: 'Clubhouse & Swimming Pools' },
      description: {
        ar: 'مركز ترفيهي نابض بالحياة يضم حمامات سباحة، مقهى (كافيه)، غرفة اجتماعات، ومكتب استقبال.',
        en: 'A vibrant Clubhouse featuring swimming pools, a cafe, meeting room, and reception desk.',
      },
      image: '/images/facility-swimming-pool.webp',
      width: 468,
      height: 509,
    },
    {
      id: 'courts',
      title: { ar: 'ملاعب متعددة الأغراض واسكواش', en: 'Multi-Purpose & Squash Courts' },
      description: {
        ar: 'ملاعب للتنس، كرة القدم، كرة اليد، وكرة السلة متاحة للحجز عبر تطبيق الفرات، بالإضافة إلى ملعب اسكواش داخلي.',
        en: 'Courts for tennis, football, handball, and basketball bookable via the AlForat app, plus an indoor squash court.',
      },
      image: '/images/facility-multipurpose-court.webp',
      width: 468,
      height: 509,
    },
    {
      id: 'kids-area',
      title: { ar: 'منطقة ألعاب أطفال وحدائق مفتوحة', en: 'Kids Playground & Lush Parks' },
      description: {
        ar: 'مناطق ترفيهية مخصصة للأطفال وسط مساحات خضراء واسعة وأفنية داخلية بعيداً عن حركة السيارات.',
        en: 'Safe children play zones surrounded by landscaped gardens and internal courtyards.',
      },
      image: '/images/facility-kids-area.webp',
      width: 468,
      height: 509,
    },
    {
      id: 'mosque',
      title: { ar: 'مسجد داخل الكمبوند', en: 'Compound Mosque' },
      description: {
        ar: 'مسجد بتصميم معماري مميز داخل الكمبوند لخدمة السكان على مدار اليوم.',
        en: 'Architecturally designed mosque located within the compound for daily prayers.',
      },
      image: '/images/facility-mosque.webp',
      width: 468,
      height: 509,
    },
    {
      id: 'school-hospital-mall',
      title: { ar: 'مدرسة، مستشفى، ومول تجاري وإداري', en: 'School, Hospital & Commercial Mall' },
      description: {
        ar: 'يضم المخطط العام مدرسة، مستشفى تخصصي، مول تجاري، ووحدات إدارية وطبية لتلبية كافة احتياجات الحياة اليومية.',
        en: 'The master plan integrates a school, hospital, commercial mall, and administrative/medical hubs.',
      },
      image: '/images/hero-muruj-towers.webp',
      width: 1600,
      height: 900,
    },
  ],

  infrastructureFeatures: [
    { ar: 'شبكة طرق داخلية متكاملة ومداخل مستقلة للمباني', en: 'Integrated internal road network & independent building entrances' },
    { ar: 'شبكة إنترنت ألياف ضوئية (Fiber Optics)', en: 'High-speed Fiber Optics internet network' },
    { ar: 'نظام متكامل لإطفاء الحريق وإنارة الشوارع', en: 'Comprehensive firefighting & street lighting systems' },
    { ar: 'شبكة صرف صحي متطورة وشبكة ري للحدائق', en: 'Modern sewage network & automated landscape irrigation' },
    { ar: 'مجتمع سكني مسور بالكامل مع جراجات مخصصة', en: 'Fully gated residential community with dedicated parking garages' },
  ],

  // ============================================================================
  // LOCATION & NEARBY LANDMARKS
  // ============================================================================
  landmarks: [
    {
      name: { ar: 'جرين بلازا (Green Plaza)', en: 'Green Plaza Mall & Hilton' },
      alforatTime: { ar: 'أمام الكمبوند مباشرة', en: 'Directly Opposite' },
      smouhaMetric: { ar: '3.2 كم · نحو 11 دقيقة بالسيارة من المبنى 12', en: '3.2 km · ~11 mins drive from Bldg 12' },
    },
    {
      name: { ar: 'كارفور سيتي سنتر (Carrefour)', en: 'Carrefour City Centre' },
      alforatTime: { ar: 'دقيقتان (2 mins)', en: '2 mins' },
      smouhaMetric: { ar: 'محور مدخل الإسكندرية المباشر', en: 'Direct Alexandria entrance axis' },
    },
    {
      name: { ar: 'مسجد عبد المنعم رياض', en: 'Abd Elmoniem Ryiad Mosque' },
      alforatTime: { ar: 'دقيقتان (2 mins)', en: '2 mins' },
      smouhaMetric: { ar: 'عند محور 14 مايو', en: 'Along 14 May Axis' },
    },
    {
      name: { ar: 'مبنى المحافظة الجديدة', en: 'New Governorate Building' },
      alforatTime: { ar: '3 دقائق (3 mins)', en: '3 mins' },
      smouhaMetric: { ar: 'نطاق سموحة الإداري', en: 'Smouha Administrative District' },
    },
    {
      name: { ar: 'نادي الاتحاد الرياضي', en: 'Al-Ittihad Sports Club' },
      alforatTime: { ar: '4 دقائق (4 mins)', en: '4 mins' },
      smouhaMetric: { ar: 'نطاق سموحة الجديدة', en: 'New Smouha District' },
    },
    {
      name: { ar: 'نادي سموحة الرياضي', en: 'Smouha Sporting Club' },
      alforatTime: { ar: '6 دقائق (6 mins)', en: '6 mins' },
      smouhaMetric: { ar: '3.7 كم (مدخل فيكتور) · نحو 17 دقيقة', en: '3.7 km (Victor Gate) · ~17 mins' },
    },
    {
      name: { ar: 'جامعة فاروس بالإسكندرية', en: 'Pharos University in Alexandria' },
      alforatTime: { ar: 'دقائق معدودة', en: 'Minutes away' },
      smouhaMetric: { ar: '4.9 كم · نحو 15 دقيقة بالسيارة', en: '4.9 km · ~15 mins drive' },
    },
    {
      name: { ar: 'محطة قطار سيدي جابر', en: 'Sidi Gaber Railway Station' },
      alforatTime: { ar: 'محور سموحة الرئيسي', en: 'Main Smouha Axis' },
      smouhaMetric: { ar: '4.3 كم · نحو 20 دقيقة بالسيارة', en: '4.3 km · ~20 mins drive' },
    },
    {
      name: { ar: 'شاطئ كليوباترا والكورنيش', en: 'Cleopatra Beach & Corniche' },
      alforatTime: { ar: 'اتصال مباشر عبر سموحة', en: 'Direct link via Smouha' },
      smouhaMetric: { ar: '5.9 كم · نحو 25 دقيقة بالسيارة', en: '5.9 km · ~25 mins drive' },
    },
  ],

  // ============================================================================
  // FAQ ITEMS
  // ============================================================================
  faqs: [
    {
      question: {
        ar: 'هل كمبوند مروج سموحة مشروع واحد أم يضم عدة مشروعات داخلية؟',
        en: 'Is Muruj Smouha a single project or a master community with multiple sub-projects?',
      },
      answer: {
        ar: 'مروج هو مجتمع عمراني متكامل ومسور يمتد على مساحة 182 فدان عند مدخل سموحة أمام جرين بلازا، ويضم مشروعات داخلية لـ 15 مطوراً معتمداً؛ منها قطاع الفيلات المستقلة (V1–V4) من شركة الفرات للتطوير العقاري، ومشروع يو بارك من تشييد، وڤي مروج من الغنيمي، وزينيا مروج من MWA، ومروج هايتس، بالإضافة إلى المناطق التجارية والإدارية.',
        en: 'Muruj is a 182-feddan gated master community at the entrance of Smouha opposite Green Plaza. It hosts internal projects by 15 accredited developers, including AlForat Compound for standalone villas (V1–V4), U Park by Tasheed, Vee Muruj by El-Ghoniemy, Zinnia by MWA, and Muruj Heights.',
      },
    },
    {
      question: {
        ar: 'ما هي المساحات وأنواع الوحدات المتوفرة داخل كمبوند مروج؟',
        en: 'What unit types and areas are available inside Muruj Compound?',
      },
      answer: {
        ar: 'تتنوع الوحدات بين فيلات الفرات المستقلة (4 طرازات V1، V2، V3، V4)، وشقق سكنية بغرفتين نوم (تبدأ من 106 م² حتى 123 م²)، وشقق 3 غرف نوم (بمساحات من 131 م² حتى 257 م²)، ودوبلكس يصل إلى 479 م² في يو بارك، إلى جانب الوحدات التجارية والإدارية والطبية.',
        en: 'Units range from AlForat standalone villas (4 types: V1–V4), 2-bedroom apartments (106 m² to 123 m²), and 3-bedroom apartments (131 m² to 257 m²), up to 479 m² duplexes in U Park, alongside commercial, administrative, and medical units.',
      },
    },
    {
      question: {
        ar: 'ما هي أنظمة السداد والمقدمات المتاحة؟',
        en: 'What down payments and installment plans are available?',
      },
      answer: {
        ar: 'تبدأ المقدمات من 10% وتقسيط متساوٍ يصل إلى 10 سنوات في مراحل محددة، كما يتوفر النظام القياسي بمقدم 15% وأقساط ربع سنوية حتى 6 سنوات، وأنظمة مقدم 10% على 4 سنوات (في يو بارك وعروض مروج)، ومقدم 20% على 5 سنوات (في زينيا)، بالإضافة إلى وحدات جاهزة للتعاقد النقدي.',
        en: 'Down payments start from 10% with equal installments up to 10 years on selected phases, alongside the standard 15% down payment over 6 years (quarterly installments), 10% down over 4 years, and 20% down over 5 years.',
      },
    },
    {
      question: {
        ar: 'متى يتم استلام الوحدات وما هو مستوى التشطيب؟',
        en: 'When are units delivered and what is the finishing specification?',
      },
      answer: {
        ar: 'لا يخضع مجتمع مروج لموعد استلام واحد؛ توجد وحدات مكتملة الإنشاء وجاهزة للاستلام الفوري بتشطيب كامل سوبر لوكس (مثل عروض 114، 120، 123، 135، 140، 145، 148، 151، 169، 179 م²)، بينما توجد وحدات بتسليم 2027 (مثل عروض 164، 168، 217 م²) وأخرى بتسليم 2028 أو تحت الإنشاء (مثل يو بارك وعرض 131 م²).',
        en: 'Delivery depends on the specific internal project and building: many completed apartments offer immediate delivery with full Super Lux finishing, while other phases are scheduled for 2027 and 2028 delivery.',
      },
    },
    {
      question: {
        ar: 'أين يقع كمبوند مروج سموحة بالتحديد؟',
        en: 'Where exactly is Muruj Smouha located?',
      },
      answer: {
        ar: 'يقع الكمبوند عند مدخل سموحة في قلب الإسكندرية أمام جرين بلازا مباشرة، بمحاذاة طريق 14 مايو وشارع الهيلتون ومحور المحمودية، على بُعد دقيقتين من كارفور ومسجد عبد المنعم رياض، و6 دقائق من نادي سموحة الرياضي.',
        en: 'Located at the entrance of Smouha in Alexandria directly opposite Green Plaza along 14 May Bridge Road, Hilton St., and the Mahmoudia Axis—2 minutes from Carrefour and 6 minutes from Smouha Sporting Club.',
      },
    },
  ],

  // ============================================================================
  // FULL IMAGE GALLERY (Page 3 - /gallery)
  // ============================================================================
  galleryImages: [
    {
      id: 'gal-1',
      src: '/images/hero-alforat-villas.webp',
      width: 1600,
      height: 1067,
      category: 'villas',
      title: { ar: 'واجهات فيلات الفرات المستقلة', en: 'AlForat Standalone Villas Facades' },
      alt: { ar: 'صورة لواجهات فيلات الفرات المستقلة في كمبوند مروج سموحة بالإسكندرية', en: 'AlForat standalone villas facades in Muruj Smouha Alexandria' },
    },
    {
      id: 'gal-2',
      src: '/images/hero-muruj-towers.webp',
      width: 1600,
      height: 900,
      category: 'apartments',
      title: { ar: 'العمائر السكنية والمول التجاري', en: 'Residential Buildings & Commercial Podium' },
      alt: { ar: 'تصور معماري لمباني مروج سموحة والواجهات السكنية والتجارية', en: 'Architectural rendering of Muruj Smouha residential buildings' },
    },
    {
      id: 'gal-3',
      src: '/images/hero-muruj-aerial.webp',
      width: 1280,
      height: 448,
      category: 'villas',
      title: { ar: 'منظور علوي للشوارع والفيلات', en: 'Aerial Street & Villa Perspective' },
      alt: { ar: 'تصور علوي للمباني والشارع في كمبوند الفرات مروج سموحة', en: 'Aerial view of buildings and street in Muruj Smouha' },
    },
    {
      id: 'gal-4',
      src: '/images/gallery-landscape-02.webp',
      width: 1330,
      height: 778,
      category: 'villas',
      title: { ar: 'اللاندسكيب والواجهات المعمارية', en: 'Landscaping & Architectural Elevations' },
      alt: { ar: 'تصور الواجهات واللاندسكيب في كمبوند الفرات مروج سموحة', en: 'Elevations and landscaping in AlForat Compound Muruj Smouha' },
    },
    {
      id: 'gal-5',
      src: '/images/gallery-landscape-03.webp',
      width: 1280,
      height: 677,
      category: 'villas',
      title: { ar: 'الممرات الخضراء بين الفيلات', en: 'Green Walkways Between Villas' },
      alt: { ar: 'المساحات الخضراء والواجهات في كمبوند مروج سموحة', en: 'Green spaces and facades in Muruj Smouha Compound' },
    },
    {
      id: 'gal-6',
      src: '/images/gallery-alforat-real-01.webp',
      width: 1400,
      height: 935,
      category: 'construction',
      title: { ar: 'لقطة واقعية للفيلات المنفذة (1)', en: 'On-Site Completed Villas (1)' },
      alt: { ar: 'صورة واقعية من أرض المشروع للفيلات المنفذة في كمبوند مروج سموحة', en: 'Real site photo of completed villas in Muruj Smouha' },
    },
    {
      id: 'gal-7',
      src: '/images/gallery-alforat-real-02.webp',
      width: 1400,
      height: 935,
      category: 'construction',
      title: { ar: 'لقطة واقعية للفيلات المنفذة (2)', en: 'On-Site Completed Villas (2)' },
      alt: { ar: 'صورة حقيقية لوحدات كمبوند مروج سموحة من أرض الواقع', en: 'Real photograph of Muruj Smouha units on site' },
    },
    {
      id: 'gal-8',
      src: '/images/gallery-alforat-real-04.webp',
      width: 1400,
      height: 933,
      category: 'construction',
      title: { ar: 'الشوارع الداخلية واللاندسكيب المنفذ', en: 'Completed Internal Streets & Landscaping' },
      alt: { ar: 'صورة واقعية للشوارع الداخلية والفيلات في كمبوند مروج سموحة', en: 'Real photo of internal streets and villas in Muruj Smouha' },
    },
    {
      id: 'gal-9',
      src: '/images/gallery-alforat-real-06.webp',
      width: 1400,
      height: 933,
      category: 'construction',
      title: { ar: 'تفاصيل التشطيب الخارجي للواجهات', en: 'Exterior Facade Finishing Details' },
      alt: { ar: 'صورة حقيقية لتشطيبات واجهات الفيلات في كمبوند الفرات مروج سموحة', en: 'Exterior facade finishing details at AlForat Muruj Smouha' },
    },
    {
      id: 'gal-10',
      src: '/images/gallery-alforat-real-07.webp',
      width: 1400,
      height: 933,
      category: 'construction',
      title: { ar: 'الحدائق والممرات على الطبيعة', en: 'On-Site Gardens & Pathways' },
      alt: { ar: 'صورة واقعية للحدائق والممرات داخل كمبوند مروج سموحة', en: 'On-site gardens and pathways inside Muruj Smouha' },
    },
    {
      id: 'gal-11',
      src: '/images/gallery-alforat-real-08.webp',
      width: 1400,
      height: 933,
      category: 'construction',
      title: { ar: 'إطلالة بانورامية لقطاع الفيلات', en: 'Panoramic View of the Villas Sector' },
      alt: { ar: 'لقطة بانورامية واقعية لقطاع الفيلات في كمبوند مروج سموحة', en: 'Panoramic site view of the villas sector in Muruj Smouha' },
    },
    {
      id: 'gal-12',
      src: '/images/gallery-alforat-real-09.webp',
      width: 1400,
      height: 933,
      category: 'construction',
      title: { ar: 'تناسق المباني السكنية والفيلات', en: 'Harmony of Residential & Villa Sectors' },
      alt: { ar: 'صورة واقعية لتكامل المباني والفيلات في كمبوند مروج سموحة', en: 'Real view of residential buildings and villas in Muruj Smouha' },
    },
    {
      id: 'gal-13',
      src: '/images/gallery-central-park.webp',
      width: 1000,
      height: 578,
      category: 'villas',
      title: { ar: 'الحديقة المركزية واللاندسكيب', en: 'Central Park & Green Spine' },
      alt: { ar: 'إطلالة الحديقة المركزية والمساحات الخضراء في كمبوند مروج سموحة', en: 'Central park and green spaces view in Muruj Smouha' },
    },
    {
      id: 'gal-14',
      src: '/images/gallery-aerial-overview.webp',
      width: 1000,
      height: 546,
      category: 'masterplan',
      title: { ar: 'لقطة جوية شاملة لقطاع الفرات', en: 'Aerial Overview of AlForat Sector' },
      alt: { ar: 'لقطة جوية شاملة لكمبوند الفرات داخل مروج سموحة', en: 'Aerial overview of AlForat Compound in Muruj Smouha' },
    },
    {
      id: 'gal-15',
      src: '/images/gallery-smouha-facades.webp',
      width: 1400,
      height: 788,
      category: 'apartments',
      title: { ar: 'تصور معماري للواجهات السكنية', en: 'Architectural Render of Residential Facades' },
      alt: { ar: 'تصور معماري للواجهات السكنية في كمبوند مروج سموحة', en: 'Architectural render of residential facades in Muruj Smouha' },
    },
    {
      id: 'gal-16',
      src: '/images/gallery-smouha-night.webp',
      width: 1400,
      height: 788,
      category: 'apartments',
      title: { ar: 'تصور ليلي للمباني والإضاءة المعمارية', en: 'Night Architectural Render of Buildings' },
      alt: { ar: 'تصور ليلي للمباني السكنية والإضاءة في كمبوند مروج سموحة', en: 'Night rendering of residential buildings in Muruj Smouha' },
    },
    {
      id: 'gal-17',
      src: '/images/gallery-smouha-garage.webp',
      width: 1400,
      height: 788,
      category: 'apartments',
      title: { ar: 'منطقة الجراجات السفلية المنظمة', en: 'Organized Underground Parking Garage' },
      alt: { ar: 'تصور لمنطقة الجراجات السفلية في كمبوند مروج سموحة', en: 'Underground parking garage rendering in Muruj Smouha' },
    },
    {
      id: 'gal-18',
      src: '/images/gallery-smouha-ground.webp',
      width: 1400,
      height: 788,
      category: 'apartments',
      title: { ar: 'تفاصيل الواجهة والدور الأرضي التجاري', en: 'Ground Floor & Commercial Podium Details' },
      alt: { ar: 'تفاصيل الواجهة والدور الأرضي في كمبوند مروج سموحة', en: 'Ground floor and facade details in Muruj Smouha' },
    },
    {
      id: 'gal-19',
      src: '/images/masterplan-horizontal.webp',
      width: 1300,
      height: 1076,
      category: 'masterplan',
      title: { ar: 'المخطط العام (Master Plan)', en: 'Compound Master Plan' },
      alt: { ar: 'المخطط العام الماستر بلان لكمبوند الفرات مروج سموحة', en: 'Master plan of AlForat Compound Muruj Smouha' },
    },
    {
      id: 'gal-20',
      src: '/images/hero-muruj-compound.webp',
      width: 1280,
      height: 800,
      category: 'apartments',
      title: { ar: 'إطلالة عامة على عمائر مروج سموحة', en: 'General View of Muruj Smouha Towers' },
      alt: { ar: 'صورة عامة لعمائر ومباني كمبوند مروج سموحة بالإسكندرية', en: 'General view of Muruj Smouha Compound buildings in Alexandria' },
    },
  ] satisfies GalleryItem[],
};
