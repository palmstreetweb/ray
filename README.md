# Theme-Agnostic Starter Template Scaffold

This is a clean, production-grade, theme-neutral Next.js base designed to speed up the scaffolding, custom skinning, and launching of landing pages.

## Tech Stack
- **Framework**: Next.js App Router (16.2.x) & React 19
- **Styles**: Tailwind CSS v4 & PostCSS
- **Language**: TypeScript & ES6+

---

## Getting Started

### 1. Installation
Install project dependencies using `npm`:
```bash
npm install
```

### 2. Development
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the page.

### 3. Build & Verification
Compile the production bundle and verify TypeScript and ESLint compliance:
```bash
npm run build
```

---

## Architecture & Re-Skinning Blueprint

The starter operates on an **isolation of concerns** principle: layout structure and style declarations are decoupled from copywriting, metadata, and assets. Re-skinning or rebranding takes just minutes by adjusting three central touchpoints:

### Touchpoint 1: Business Profile Details (`src/lib/business.ts`)
Stores the single source of truth for structural contact information, socials, and web domain profiles.
```typescript
export const business = {
  name: "STARTER CO",
  tagline: "Build templates faster with our clean agnostic starter.",
  email: "hello@starter.palmstreetweb.design",
  phone: "(555) 123-4567",
  address: "123 Palm Street, Suite 100, San Francisco, CA 94107",
  url: "https://starter.palmstreetweb.design",
  socials: [ ... ]
};
```

### Touchpoint 2: Copywriting & Content Map (`src/lib/content.ts`)
Houses all page-level copy, FAQ accordions, list items, and public image mappings. Modifying copy here instantly populates the entire landing page.

### Touchpoint 3: CSS Theme & Font Pairing (`src/app/globals.css` & `src/app/layout.tsx`)
Configure all color tokens as CSS variables inside `globals.css` under the `:root` pseudo-selector. These variables map directly into Tailwind CSS v4 `@theme` configuration directives:
```css
:root {
  --bg: #FFFFFF;
  --bg-section: #F3F4F6;
  --accent: #2563EB; /* Primary Accent Color */
  --accent-hover: #1D4ED8;
  --ink: #111827; /* Main Text Color */
  --ink-muted: #4B5563;
  --on-accent: #FFFFFF;
}
```
Swap font pairings inside `src/app/layout.tsx` by importing and configuring Google Fonts via `next/font/google`.

---

## Directory Structure
```
├── src/
│   ├── app/                # App Router files (pages, layouts, SEO routes)
│   │   ├── globals.css     # Global styles & Tailwind v4 `@theme` overrides
│   │   ├── layout.tsx      # Main layout configuration & Google Fonts loading
│   │   ├── page.tsx        # single-page landing structure combining sections
│   │   ├── sitemap.ts      # Dynamic sitemap index builder
│   │   ├── robots.ts       # Crawler rules config
│   │   ├── icon.tsx        # Dynamic favicon generator
│   │   ├── apple-icon.tsx  # Dynamic apple touch-icon builder
│   │   └── opengraph-image.tsx # Dynamic og:image card generator
│   ├── components/         # Section UI components (Nav, Hero, FAQ, CTA, etc.)
│   └── lib/                # Config files (business profile and page copy)
├── public/
│   └── images/             # Local optimized stock photo assets
├── package.json
└── tsconfig.json
```
