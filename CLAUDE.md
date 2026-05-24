# CLAUDE.md guidelines for Starter Scaffold

This document outlines command shortcuts and coding standards for developers working with this Next.js template.

## Command Line Shortcuts

### Restoring Packages
```bash
npm install
```

### Local Dev Server
```bash
npm run dev
```

### Production Build Verification
```bash
npm run build
```

### Linting Checks
```bash
npm run lint
```

---

## Coding Standards

### React & Components
- **Server Components**: Write layout containers and page structures as React Server Components (RSC) to minimize client-side bundle size.
- **Client Components**: Restrict client components (using `"use client"`) to interactive elements like navbar toggles, mobile drawers, sliders, or observers.
- **Tailwind CSS v4**: Avoid arbitrary color values. Use semantic utility classes mapping to configured theme variables (`bg-bg`, `text-ink`, `bg-accent`, `bg-bg-section`).
- **Imports**: Utilize absolute path alias mapping (e.g. `@/components/...` or `@/lib/...`).

### Copy and Branding
- Do NOT hardcode copy inside pages. Re-theme or edit brand metadata exclusively in `src/lib/business.ts` and `src/lib/content.ts`.
