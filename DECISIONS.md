# Architectural and Design Decisions — Next.js Starter Scaffold

This document outlines key technical decisions and layout choices implemented within the reusable Next.js `_starter` scaffold.

## Styling & Design Choices

### 1. Tailwind CSS v4 & Native PostCSS
- **Decision**: Avoided JavaScript-based configuration files (`tailwind.config.js`) to align with Tailwind CSS v4 conventions.
- **Implementation**: Styled tokens (e.g. colors, font configurations) are declared as CSS variables in `src/app/globals.css` and mapped to Tailwind's `@theme` compiler directives.
- **Rationale**: Simplifies re-skinning templates. Changing the hex colors in a single CSS root block updates the entire landing page instantly.

### 2. High-Contrast Legibility & Dark Scrims
- **Decision**: Adherence to WCAG AA color contrast guidelines.
- **Implementation**: Background overlays (scrims) are pre-configured on hero sections (e.g. `bg-black/40`) to maintain a high contrast ratio for white text overlaid on top of stock photography.
- **Rationale**: Prevents low-contrast visual regression when swapping background images.

### 3. Google Fonts Pairing
- **Decision**: Pre-loaded **Inter (sans-serif)** and **Fraunces (serif)** font families.
- **Implementation**: Configured using `next/font/google` in `layout.tsx` to compile layout-shift-free font variables.
- **Rationale**: Creates an elegant editorial contrast. Sans-serif brings structured modern lines for headings and actions, while serif provides a comfortable layout style for narrative texts.

---

## Technical & SEO Decisions

### 1. App Router, React 19, and `src/` Layout
- **Decision**: Organised components and models under a `/src` directory using the Next.js App Router convention.
- **Implementation**: Pages are Server Components by default. Client interactions (navbar states, Escape key listeners) are decoupled into specialized components using the `"use client"` boundary directive.
- **Rationale**: Enhances overall Largest Contentful Paint (LCP) performance and SEO metrics by generating static HTML on the server.

### 2. Dynamic Open Graph Cards & Web Icons
- **Decision**: Generating PNG assets dynamically using Next.js `ImageResponse` engines instead of checking in static binary files.
- **Implementation**:
  - `icon.tsx` / `apple-icon.tsx`: Dynamically render letters from the brand name (`business.name`).
  - `opengraph-image.tsx`: Renders social preview images dynamically based on brand tagline and name.
- **Rationale**: Ensures the starter compiles immediately. Scaffolding new landing pages requires no custom image editor work to generate favicons or OG files.

### 3. Semantic Accordion blocks (FAQ)
- **Decision**: Implemented FAQ accordions using native HTML `<details>` and `<summary>` elements.
- **Implementation**: Styled directly inside `src/components/FAQ.tsx` with group transitions for rotating indicators.
- **Rationale**: Ensures accessibility without requiring complex state machinery, avoiding hydration mismatches and maintaining fast Interaction to Next Paint (INP) times.
