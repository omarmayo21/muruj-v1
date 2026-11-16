# موقع كمبوند مروج سموحة (Muruj Compound) — جاهز للنشر على Vercel وحملات Google Ads

موقع عقاري متكامل لتوليد العملاء المحتملين (Lead Generation) لمشروع **كمبوند مروج سموحة بالإسكندرية**، مبني باستخدام **Vite + React + TypeScript + Tailwind CSS + React Router** مع **Vercel Serverless Functions** لإرسال بيانات العملاء بالتوازي إلى **البريد الإلكتروني (SMTP)** و**جدول بيانات جوجل (Google Sheets)**، وتتبع كامل لتحويلات **Google Ads (Enhanced Conversions + Transaction ID)** و**GA4** و**GTM**.

---

## قائمة التحقق السريعة قبل الإطلاق (Pre-Launch & Google Ads Checklist)

راجع أيضاً ملف [`PRE_LAUNCH_CHECKLIST.md`](PRE_LAUNCH_CHECKLIST.md) للحصول على القائمة الكاملة:
- [ ] **تحديث أرقام الهاتف والواتساب:** افتح [`src/config/site.ts`](src/config/site.ts) وعدّل الكائن `contact` (`phoneDisplay`, `phoneE164`, `whatsappE164`, `emailPlaceholder`).
- [ ] **مراجعة حقوق استخدام الصور:** الصور والمخططات الهندسية في `/public/images` مستخرجة للاستخدام التسويقي للمشروع؛ يجب على مالك الموقع التأكد من صلاحية وحقوق الاستخدام التجاري/التسويقي مع المطور قبل إطلاق الإعلانات الممولة.
- [ ] **إضافة متغيرات البيئة في Vercel:** أضف متغيرات `SMTP_*` و`GOOGLE_*` و`VITE_*` في `Vercel > Settings > Environment Variables`.
- [ ] **إعادة النشر (Redeploy) بعد تعديل `VITE_*`:** لأن متغيرات `VITE_*` تُدمج وقت البناء (`npm run build`)، يجب عمل Redeploy في Vercel بعد إضافتها أو تعديلها.
- [ ] **التأكد من عمل صفحة الخصوصية (`/privacy`):** مطلوبة لسياسات إعلانات جوجل ومربوطة في الفوتر وتحت زر النموذج.
- [ ] **اختبار التحويل (Conversion Verification):** تحقق عبر Google Tag Assistant أن التحويل يعمل مرة واحدة فقط في `/thank-you` بعد إرسال حقيقي للنموذج.

---

## إعداد ملف البيئة المحلي (`.env`) وتشغيل سكربت الاختبار

### 1. إنشاء ملف `.env` محلياً
انسخ ملف القالب `.env.example` إلى `.env`:
```bash
cp .env.example .env
```
*(ملف `.env` مضاف في `.gitignore` ولن يتم رفعه أبداً إلى Git).*

### 2. تشغيل سكربت اختبار إرسال العملاء (`scripts/test-lead.mjs`)
لاختبار نقطة النهاية `/api/lead` والتحقق من حالة كل قناة (`email` و`sheets`) دون كشف أي كلمات سر:
```bash
# ضد الخادم المحلي (مثلاً مع vercel dev)
node scripts/test-lead.mjs http://127.0.0.1:3000/api/lead

# أو ضد رابط الموقع المنشور على Vercel
node scripts/test-lead.mjs https://your-domain.vercel.app/api/lead
```

---

## 1. خطوات النشر على Vercel (خطوة بخطوة)

### الطريقة الأولى: عبر GitHub (موصى بها)
1. ارفع المشروع إلى مستودع GitHub.
2. ادخل إلى حسابك على [Vercel](https://vercel.com/) واضغط على **Add New... > Project**.
3. اختر مستودع المشروع من GitHub واضغط **Import**.
4. سيتعرف Vercel تلقائياً على إعدادات **Vite** وملف [`vercel.json`](vercel.json) (الأمر `npm run build` ومجلد المخرجات `dist` ودوال `/api`).
5. أضف متغيرات البيئة الموضحة في القسم التالي ثم اضغط **Deploy**.

### الطريقة الثانية: عبر Vercel CLI
```bash
npm i -g vercel
vercel dev      # للتشغيل المحلي
vercel --prod   # للنشر المباشر للإنتاج
```

---

## 2. إضافة متغيرات البيئة في Vercel

افتح **Settings > Environment Variables** في مشروعك على Vercel وأضف المتغيرات التالية:

| اسم المتغير | الوصف | مثال / ملاحظات |
|---|---|---|
| `SMTP_HOST` | خادم البريد الصادر | `smtp.gmail.com` |
| `SMTP_PORT` | منفذ SMTP | `587` |
| `SMTP_USER` | البريد الإلكتروني المرسل | `leadsmars@gmail.com` |
| `SMTP_PASS` | كلمة مرور التطبيقات (App Password) | كلمة مرور من 16 حرفاً من حساب جوجل |
| `EMAIL_FROM` | عنوان المرسل الظاهر | `leadsmars@gmail.com` |
| `EMAIL_TO` | البريد المستلم للعملاء الجدد | `leadsmars@gmail.com` |
| `GOOGLE_SHEET_ID` | معرف ملف Google Sheet | الجزء الموجود في رابط الشيت بين `/d/` و `/edit` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | بريد حساب الخدمة في Google Cloud | `xxx@xxx.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | المفتاح الخاص من ملف JSON | يبدأ بـ `-----BEGIN PRIVATE KEY-----\n...` |
| `VITE_GA_MEASUREMENT_ID` | معرف قياس Google Analytics 4 | مثال: `G-XXXXXXXXXX` |
| `VITE_GTM_ID` | معرف Google Tag Manager | مثال: `GTM-XXXXXXX` |
| `VITE_GOOGLE_ADS_ID` | معرف حساب Google Ads | مثال: `AW-XXXXXXXXXX` |
| `VITE_GOOGLE_ADS_CONVERSION_ID` | معرف التحويل في Google Ads | مثال: `AW-XXXXXXXXXX` |
| `VITE_GOOGLE_ADS_CONVERSION_LABEL` | تسمية التحويل (Conversion Label) | مثال: `AbCdEfGhIjKlMnOpQr` |

> **تنبيه مهم:** بعد إضافة أو تعديل أي متغير يبدأ بـ `VITE_` في Vercel، يجب عمل **Redeploy** للمشروع حتى يتم تضمين القيم الجديدة أثناء عملية البناء (`npm run build`).

---

## 3. إنشاء كلمة مرور التطبيقات في Gmail (`SMTP_PASS`)

1. افتح حساب جوجل الخاص بالبريد (`leadsmars@gmail.com`) وانتقل إلى [إعدادات الأمان (Google Account Security)](https://myaccount.google.com/security).
2. فعّل **التحقق بخطوتين (2-Step Verification)**.
3. ابحث عن **App passwords (كلمات مرور التطبيقات)**.
4. أنشئ كلمة مرور تطبيق باسم `Muruj Leads Vercel` وانسخ الكود المكون من **16 حرفاً** (بدون مسافات) وضعه في `SMTP_PASS`.

---

## 4. إعداد Google Sheets وحساب الخدمة (Service Account)

1. افتح [Google Cloud Console](https://console.cloud.google.com/) وفعّل **Google Sheets API** من **APIs & Services > Library**.
2. من **IAM & Admin > Service Accounts** أنشئ حساب خدمة جديد وانسخ بريده إلى `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
3. من تبويب **Keys** داخل حساب الخدمة، اختر **Add Key > Create new key > JSON**.
4. افتح ملف الـ JSON وانسخ قيمة `"private_key"` بالكامل وضعها في متغير `GOOGLE_PRIVATE_KEY`.
5. افتح ملف Google Sheet واضغط **Share** وشاركه مع بريد `GOOGLE_SERVICE_ACCOUNT_EMAIL` بصلاحية **Editor**، وانسخ معرف الشيت من الرابط إلى `GOOGLE_SHEET_ID`.

---

## 5. إنشاء إجراء التحويل في Google Ads والحصول على المعرف والتسمية

1. في حساب [Google Ads](https://ads.google.com/) اختر **Goals > Conversions > Summary > + New conversion action**.
2. اختر **Website** وأنشئ إجراء تحويل من فئة **Submit lead form** مع اختيار **One (واحدة)** في طريقة العد.
3. فعّل **Enhanced conversions (التحويلات المحسّنة)**؛ يقوم الموقع تلقائياً بتشفير الهاتف (`E.164`) والبريد الإلكتروني عبر `SHA-256` وإرسالهما مع `transaction_id` فريد لمنع التكرار.
4. انسخ **Conversion ID** إلى `VITE_GOOGLE_ADS_CONVERSION_ID` و**Conversion Label** إلى `VITE_GOOGLE_ADS_CONVERSION_LABEL`.
