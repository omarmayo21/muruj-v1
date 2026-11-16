# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Vite + React + TypeScript + Tailwind CSS + React Router + Vercel Serverless Functions (`/api/lead.ts`, `/api/health.ts`) with `nodemailer`, `googleapis`, `zod`, and `react-international-phone`.

## Users
Prospective real-estate buyers and investors arriving primarily from mobile and desktop Google Ads campaigns looking to buy residential apartments, duplexes, standalone villas (AlForat V1–V4), or commercial/administrative units in Muruj Compound (كمبوند مروج سموحة), Alexandria.

## Product Purpose
A high-conversion, 4-page bilingual (Arabic RTL primary, English LTR toggle) real-estate lead-generation website for Muruj Compound in Smouha, Alexandria. Success means capturing qualified leads (Name, E.164 validated Phone, optional Email, selected Unit/Area, plus full UTM/GCLID attribution) into both SMTP email notifications and Google Sheets, and firing accurate Google Ads & GA4 conversions on the `/thank-you` page.

## Positioning
Muruj Smouha is a 182-feddan gated master-planned urban community at the entrance of Smouha, Alexandria (directly opposite Green Plaza along 14 May Bridge Road & Hilton St.), combining AlForat's luxury standalone villas (V1–V4) with finished and under-construction apartments and duplexes (106 m² to 479 m²) across multiple phases (Vee Muruj, Zinnia, U Park, Muruj Heights), backed by a 14-feddan sporting club, clubhouse, school, hospital, mosque, and commercial/administrative hub.

## Operating Context
Visitors land from paid search ads (Google Ads with `utm_*` and `gclid`/`gbraid`/`wbraid` parameters), quickly scan the hero visuals and key project facts, and either submit the immediate lead form or explore unit layouts (`/units`) and the architectural gallery & location map (`/gallery`) before registering interest or contacting sales via WhatsApp/phone.

## Capabilities and Constraints
- **Single Source of Truth:** All project facts, unit areas, floor plans, payment plans, amenities, landmarks, and imagery must come strictly from the 4 scraped sources (`solvahomes.com`, `broker.com.eg`, `alforat.com.eg`, `smouha.org`), prioritizing `alforat.com.eg` on conflicts and documenting discrepancies in `DATA_CONFLICTS.md` and unstated specs in `MISSING_DATA.md`.
- **Lead Generation Pricing Strategy:** Show verified down payments and installment durations (`10%`, `15%`, `20%` down payments; `4`, `5`, `6`, up to `10` years installments; up to `20%` cash discount) while omitting total unit prices on the UI to incentivize lead form inquiries for current unit pricing.
- **No External Broker Branding:** Strip all phone numbers, emails, and logos belonging to third-party brokers; centralize contact placeholders in `src/config/site.ts`.
- **Local Optimized Assets:** Store all project images locally in `/public/images` as optimized WebP with descriptive Arabic alt text.

## Brand Commitments
- **Language & Typography:** Arabic RTL default (`dir="rtl"`, `lang="ar"`) with English LTR toggle (`dir="ltr"`, `lang="en"`), using Cairo/Tajawal via Google Fonts (`font-display: swap`).
- **Palette:** Extracted from Muruj & AlForat official brand identity and architectural renders (deep Mediterranean/emerald forest & architectural slate, warm limestone/sandstone, and refined bronze/gold accents).

## Evidence on Hand
- Scraped HTML and structured data from all 4 source URLs plus English translation from `alforat.com.eg`.
- Architectural renders, real site photography, villa model views (V1–V4), apartment floor plans (106 m² Vee Muruj, 121 m² Muruj Heights, 140 m² Zinnia Flat A1, MWA Building A Flat 1), master plan, and location map.

## Product Principles
1. **Immediate Conversion Clarity:** Place the hero value proposition and highlight cards first, followed immediately by the frictionless lead capture form.
2. **Strict Factual Integrity:** Every number, area (m²), landmark distance, and payment term is traceable to the 4 sources; zero fabricated claims.
3. **Zero Lead Loss Architecture:** Dual-channel serverless lead delivery (SMTP + Google Sheets via `Promise.allSettled`) with persistent UTM/GCLID tracking and deduplicated `/thank-you` conversion firing.
4. **Mobile-First RTL Craft:** Engineered for mobile ad traffic with fast LCP, zero CLS, accessible touch targets, and seamless Arabic/English direction switching.

