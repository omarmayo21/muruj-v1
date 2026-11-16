---
name: Muruj Compound Smouha (كمبوند مروج سموحة)
description: Mediterranean Limestone & Cypress Architectural Atelier for Muruj Compound in Smouha, Alexandria
colors:
  cypress-primary: "#0D3B2E"
  cypress-deep: "#08241C"
  cypress-elevated: "#144B3B"
  bronze-accent: "#B8864B"
  bronze-deep: "#8C6230"
  bronze-highlight: "#DEC094"
  limestone-bg: "#F6F3EC"
  travertine-surface: "#EBE5D8"
  hairline-border: "#D8D0C1"
  ink-primary: "#13221D"
  ink-secondary: "#263B34"
  ink-muted: "#475E56"
typography:
  display:
    fontFamily: "Cairo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.65rem)"
    fontWeight: 800
    lineHeight: 1.22
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Cairo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.28
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Cairo, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.4
  body:
    fontFamily: "Cairo, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Cairo, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cypress-primary}"
    textColor: "{colors.limestone-bg}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cypress-elevated}"
  button-bronze:
    backgroundColor: "{colors.bronze-accent}"
    textColor: "{colors.cypress-deep}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  card-atelier:
    backgroundColor: "{colors.limestone-bg}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Muruj Compound Smouha (كمبوند مروج سموحة)

## Overview

**Creative North Star: "Mediterranean Limestone & Cypress Architectural Atelier"**

The visual system treats Muruj Compound Smouha's 182-feddan master-planned urban community as an authoritative Alexandrian architectural monograph and private sales pavilion. Rather than relying on generic real-estate portal card-clutter, the interface combines sun-warmed Alexandrian limestone (`#F6F3EC`) and travertine (`#EBE5D8`) surfaces with deep Mediterranean cypress forest (`#0D3B2E`) structural anchors and burnished bronze (`#B8864B`) accents derived directly from the official AlForat Development identity.

Every surface is engineered for bilingual RTL/LTR clarity (`dir="rtl"` Arabic default, `dir="ltr"` English toggle), high-trust conversion, and blueprint-grade inspection of real unit specifications, dimensioned floor plans, and verified payment structures.

**Key Characteristics:**
- Warm Alexandrian limestone and travertine stone surfaces paired with deep cypress forest conversion desks.
- Crisp 1px architectural drafting hairlines (`#D8D0C1`) organizing key project metrics into scannable ledgers.
- Bilingual Cairo typography with `tabular-nums` for unit areas (`m²`), down-payment percentages, and E.164 phone numbers.
- Self-contained vector country flags and Lucide stroke-consistent (`1.75px`) architectural iconography.

## Colors

The palette balances warm mineral neutrals with deep botanical cypress greens and burnished architectural bronze.

### Primary
- **Cypress Forest** (`#0D3B2E`): Primary structural anchor used for the Lead Registration Desk, primary action buttons, table headers, and active navigation states.
- **Obsidian Cypress** (`#08241C`): Deepest surface used inside lead form inputs, footer ground, and full-screen lightbox backdrops.
- **Elevated Cypress** (`#144B3B`): Hover state for primary cypress buttons and interactive dark surfaces.

### Secondary
- **Burnished Architectural Bronze** (`#B8864B`): High-salience conversion button fill inside the dark Cypress Lead Desk, focus rings, and brand emblem accents.
- **Accessible Dark Bronze** (`#8C6230`): High-contrast bronze text and badges on light limestone/travertine grounds.
- **Champagne Bronze** (`#DEC094`): Secondary labels and metadata inside dark cypress containers.

### Neutral
- **Alexandrian Limestone** (`#F6F3EC`): Primary page canvas and card surface.
- **Warm Travertine** (`#EBE5D8`): Alternating section ground and architectural ledger cell background.
- **Drafting Hairline** (`#D8D0C1`): 1px structural borders separating ledger cells, cards, and tables.
- **Slate-Pine Ink** (`#13221D`): Primary heading and body copy color (`>13:1` contrast on limestone).
- **Deep Pine Secondary Ink** (`#263B34`): Long-form body copy and descriptions (`>9:1` contrast on limestone).
- **Muted Pine Caption Ink** (`#475E56`): Captions and metadata labels (`>5.5:1` contrast on limestone; never neutral gray).

### Named Rules
**The Tinted-Ink Rule.** Secondary and muted text on warm stone or dark cypress surfaces is always tinted from the pine/champagne hue family (`#263B34`, `#475E56`, `#DEC094`), never neutral gray.

**The Conversion Desk Contrast Rule.** While content sections rest on calm limestone and travertine grounds, the Lead Registration Form owns a dedicated deep cypress (`#0D3B2E`) pavilion with a burnished bronze (`#B8864B`) submit button so the primary conversion action is unmistakable.

## Typography

**Display Font:** Cairo (with system-ui sans-serif fallback)
**Body Font:** Cairo (with system-ui sans-serif fallback)

**Character:** Geometric, high-legibility Arabic/Latin typeface that maintains crisp horizontal alignment in both RTL Arabic and LTR English while supporting heavy architectural display weights (`800`) and tabular numerals.

### Hierarchy
- **Display** (`800`, `clamp(1.875rem, 3.2vw, 2.65rem)`, `1.22` line-height): Hero and page-level `<h1>` titles.
- **Headline** (`800`, `clamp(1.5rem, 2.4vw, 1.875rem)`, `1.28` line-height): Section `<h2>` headings.
- **Title** (`800`, `1.125rem`, `1.4` line-height): Unit card headings, floor-plan titles, and amenity headings.
- **Body** (`400–500`, `1rem`, `1.65` line-height, max `72ch`): Project narrative, FAQ answers, and specifications.
- **Label** (`700`, `0.75rem`, `1.4` line-height): Ledger keys, status badges, and table column headers.

### Named Rules
**The No-Kicker Rule.** Headings (`<h1>`–`<h3>`) never carry an eyebrow or kicker label above them; the heading itself leads the section with generous top spacing.

**The Tabular Measurement Rule.** Every area (`106 م²`–`479 م²`), percentage (`10%`, `15%`, `20%`), distance (`3.2 كم`), and phone number uses `font-variant-numeric: tabular-nums`.

## Layout

Pages use a `1280px` (`max-w-7xl`) centered container with `16px` mobile (`px-4`), `24px` tablet (`sm:px-6`), and `32px` desktop (`lg:px-8`) horizontal padding. Sections alternate rhythmically between `#F6F3EC` (Limestone) and `#EBE5D8` (Travertine) separated by `1px solid #D8D0C1` hairlines.

On the Home page, Section 1 uses an asymmetric 5:7 desktop split (headline, primary CTAs, and a 2×3 architectural fact ledger on one side; an interactive 4-slide gallery with thumbnail strip on the other), followed immediately in Section 2 by a centered `1024px` (`max-w-5xl`) Lead Registration Desk.

## Elevation & Depth

Depth is conveyed primarily through tonal stone layering (`#F6F3EC` on `#EBE5D8`) and 1px drafting hairlines (`#D8D0C1`), reinforced by two soft, Y-offset ambient shadows reserved for primary cards and the conversion desk.

### Shadow Vocabulary
- **Atelier Surface Shadow** (`box-shadow: 0 14px 34px -10px rgba(13, 59, 46, 0.10), 0 4px 12px -4px rgba(19, 34, 29, 0.06)`): Used on elevated unit showcases, floor-plan frames, and hero galleries.
- **Conversion Desk Shadow** (`box-shadow: 0 24px 52px -14px rgba(8, 36, 28, 0.24), 0 8px 20px -6px rgba(19, 34, 29, 0.12)`): Reserved for the Cypress Lead Form container and sticky mobile action bar.

## Shapes

- **Outer Containers & Cards:** Gently rounded architectural corners (`12px` / `rounded-xl`).
- **Interactive Controls & Inputs:** Crisp `8px` (`rounded-lg`) radius with `1px` borders.
- **Drafting Ledgers:** `1px` gap-grid (`bg-hairline gap-px`) creating continuous internal hairlines without nested card boxes.

## Components

### Buttons
- **Shape:** Gently rounded (`8px` radius).
- **Primary (On Light):** Cypress Forest (`#0D3B2E`) background, Limestone (`#F6F3EC`) bold text, `14px 24px` padding; transitions to `#144B3B` on hover.
- **Primary Conversion (Inside Dark Lead Desk):** Burnished Bronze (`#B8864B`) background, Obsidian Cypress (`#08241C`) bold text, `16px 32px` padding; transitions to `#CCA068` on hover.
- **Secondary:** Travertine (`#EBE5D8`) or Limestone (`#F6F3EC`) background with `1px solid #D8D0C1` or `#0D3B2E` border.

### Cards / Containers
- **Corner Style:** `12px` radius (`rounded-xl`).
- **Background:** Limestone (`#F6F3EC`) on Travertine sections, or Travertine (`#EBE5D8`) on Limestone sections.
- **Border:** `1px solid #D8D0C1` (`border-hairline`).
- **Rule:** Never nest a bordered card inside another bordered card; use hairline dividers or table rows for internal structure.

### Inputs / Fields
- **Style:** `8px` radius, `1px solid rgba(246, 243, 236, 0.25)` border over `#08241C` background inside the Lead Form.
- **Focus:** `2px` ring and border shift to Burnished Bronze (`#CCA068`).
- **International Phone Field:** Left-aligned (`dir="ltr"`) composite input with a searchable country dropdown of all 240+ countries, inline vector flag, dial code (`+20` default), and `libphonenumber-js` E.164 validation.

### Navigation
- **Sticky Header:** `backdrop-blur-md` over `rgba(246, 243, 236, 0.95)` with `1px solid #D8D0C1` bottom border, AlForat logo, route links, `EN/عربي` language toggle, phone link, and primary `احجز الآن` CTA.
- **Mobile Floating Bar:** Fixed bottom 2-column bar (`واتساب المبيعات` + `اتصل الآن`) for thumb-friendly mobile ad conversion.

## Do's and Don'ts

### Do:
- **Do** keep the Hero section first and the Lead Form immediately second on the Home page.
- **Do** validate phone numbers per country via `libphonenumber-js` and format them in full E.164 format (`+20...`).
- **Do** set explicit `width` and `height` attributes on every `<img>` element to maintain zero Cumulative Layout Shift (CLS).
- **Do** use only verified unit areas (`106 م²`–`479 م²`), villa types (`V1–V4`), landmarks, and payment plans from the 4 official sources.

### Don't:
- **Don't** place kicker or eyebrow labels above headings (`<h1>`, `<h2>`, `<h3>`).
- **Don't** invent unit prices, areas, or delivery dates not present in the sources.
- **Don't** expose third-party broker logos, phone numbers, or external hotlinked images.
- **Don't** fire the Google Ads conversion event on `/thank-you` unless `sessionStorage` confirms a real form submission on that visit.

