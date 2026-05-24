<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# _starter Agent Development Guidelines

Welcome to the Next.js `_starter` template scaffold! If you are an AI coding agent tasked with customizing or cloning this repository to build a new template, follow these strict development rules.

## Key Conventions & Compliance Rules

### 1. Single Source of Truth (SSOT)
- **Do NOT hardcode page copy, emails, phone numbers, or image links inside React component files.**
- All copywriting, item lists, and layout-specific details must reside exclusively in `src/lib/content.ts`.
- All company profiles, address details, and social links must reside exclusively in `src/lib/business.ts`.
- Ensure component layouts are driven dynamically by importing `content` and `business`.

### 2. Tailwind CSS v4 Override Patterns
- Do NOT add a `tailwind.config.js` or `tailwind.config.ts` file. This project utilizes Tailwind CSS v4.
- Theme customizations, color variables, and font mapping must be written in the `@theme` block in `src/app/globals.css`.
- Ensure all styled elements map back to variable names (`bg-bg`, `text-ink`, `bg-accent`) instead of arbitrary hardcoded color hexes to maintain easy re-skinning.

### 3. Google Fonts & Layout Shell
- Fonts are loaded via `next/font/google` in `src/app/layout.tsx`.
- The Jost variable `--font-sans` maps to the `font-sans` Tailwind class, and Fraunces `--font-serif` maps to the `font-serif` Tailwind class. Adjust these font families inside `layout.tsx` when re-skinning.

### 4. Dynamic SEO & Asset Compilation
- The favicon, apple icon, and Open Graph card are compiled dynamically at build-time using `src/app/icon.tsx`, `src/app/apple-icon.tsx`, and `src/app/opengraph-image.tsx`.
- Maintain standard Next.js ImageResponse rules (Edge-friendly styles, flexbox layout, inline styles for image nodes).
- Check that sitemaps and robots are generated dynamically by importing `business` variables to maintain clean crawler maps.

### 5. Accessibility (A11y) & UX Guidelines
- Ensure all interactive overlays, modals, and navigation systems follow WCAG AA guidelines:
  - Mobile menus must lock body scroll, trap focus, listen to Escape keys, and provide accessible close triggers.
  - Buttons and link elements must have a minimum tap target height of `48px`.
  - Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<summary>`, `<details>`).
  - Text overlays on top of background images must incorporate dark scrim overlays (e.g. `bg-black/40` or gradient overlays) to keep text readable.

### 6. Motion & Animation
- The `motion` package (formerly Framer Motion) is installed and ready to use. Import from `motion/react` — NOT from `framer-motion`.
- Generic primitives live in `src/components/motion/`:
  - `<Reveal>` — in-view fade/slide-up wrapper.
  - `<Stagger>` + `<StaggerItem>` — orchestrated child reveals for lists/grids.
  - These are a **floor, not a ceiling**. They exist so motion is always available — they are NOT meant to be sprinkled across every section as your motion design.
- **Each build MUST author bespoke, theme-specific motion.** Do not just wrap everything in `<Reveal>`. A spa template should feel different from a SaaS template from a brutalist portfolio. Choose easing curves, durations, transforms, and choreography that reinforce the brand. Use the Motion primitives directly (`motion.div`, `whileHover`, `whileInView`, `useScroll`, layout animations, etc.) for anything beyond the trivial reveal case.
- **Respect reduced motion.** All primitives call `useReducedMotion()` and short-circuit animation. When you author bespoke motion, do the same — guard with `useReducedMotion()` or wrap subtrees in `<MotionConfig reducedMotion="user">`. The `prefers-reduced-motion` media query in `globals.css` also disables CSS-keyframe animations globally.
- Mark any component using Motion with `"use client"`. Server components cannot use Motion hooks or `whileInView`.
