# AGENTS.md - Development Guidelines

**CRITICAL: This is the Astro project. Read this file if working in `pseudokid-dot-dev/`.**

---

## CRITICAL INDEPENDENCE NOTICE

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   THIS REPO (pseudokid-dot-dev) IS 100% INDEPENDENT OF THE NEXT.JS PROJECT  ║
║   IN THE PARENT DIRECTORY (Portfolio2025/). THEY ARE NOT A MONOREPO.        ║
║   THEY DO NOT SHARE CODE. THEY DO NOT SHARE DEPENDENCIES.                   ║
║   THEY ARE DEPLOYED SEPARATELY. THEY HAVE NOTHING TO DO WITH EACH OTHER.    ║
║                                                                              ║
║   Portfolio2025/ = Next.js app (React, Tailwind, Radix UI)                 ║
║   pseudokid-dot-dev/ = Astro app (vanilla JS, CSS, Zod)                    ║
║                                                                              ║
║   DO NOT, UNDER ANY CIRCUMSTANCES, MIX THESE TWO PROJECTS.                  ║
║   DO NOT IMPORT CODE FROM ONE TO THE OTHER.                                 ║
║   DO NOT ASSUME THEY SHARE ANY CONFIGURATION.                               ║
║   DO NOT TRY TO "CONNECT" THEM IN ANY WAY.                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## Project Overview

- **Framework:** Astro 2.10.15 with TypeScript (strict mode)
- **Validation:** Zod for schema validation
- **Analytics:** @vercel/analytics
- **Dev Server:** localhost:3000
- **Project Root:** `C:\Users\raymel\Documents\Sides\Portfolio2025\pseudokid-dot-dev\`

## Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI directly |

**CRITICAL: Do NOT run `npm run dev`. The user always has the dev server running at localhost:3000.**
**CRITICAL: Do NOT sample pages - check ALL pages when testing.**

**Important:** Always run `npm run build` after making changes to verify no errors.

## TypeScript Guidelines

- Uses Astro's strict TypeScript config (`astro/tsconfigs/strict`)
- All data loaded from JSON is validated at build time using Zod schemas
- Use `z.infer<typeof Schema>` for type generation from Zod schemas
- Prefer explicit return types for complex functions

Example from `src/lib/portfolio.ts`:

```typescript
import { z } from 'zod';

const productSlideSchema = z.object({
  type: z.literal('product'),
  name: z.string(),
  tagline: z.string().optional(),
  // ...
});

export type ProductSlide = z.infer<typeof productSlideSchema>;
```

## Import Patterns

- Use relative paths for local imports
- Group imports: Astro built-ins → External libraries → Local modules

```astro
---
import Layout from "../layouts/Layout.astro";
import ImageTicker from "../components/ImageTicker.astro";
import { getAllProjects, getPortfolioContent } from "../lib/portfolio";
---
```

## Astro Component Structure

```astro
---
// Frontmatter: imports, interface Props, logic
interface Props {
  title?: string;
  description?: string;
}

const { title = "Default" } = Astro.props;
---

<!-- Template: HTML + any scoped scripts -->
<Layout>
  <div>{title}</div>
</Layout>

<style>
  /* Scoped CSS - only applies to this component */
  div { color: var(--text); }
</style>

<style is:global>
  /* Global styles - use sparingly, mainly in Layout.astro */
</style>
```

## CSS Conventions (NO TAILWIND)

- Use CSS custom properties defined in `src/layouts/Layout.astro`
- Scoped `<style>` for component-specific styles
- `<style is:global>` for global resets and shared utilities

```css
:root {
  --bg: #000000;
  --surface: #0a0a0a;
  --text: #f7f7f7;
  --muted: #6b7280;
  --brand: #3b82f6;
}
```

## Error Handling

- Use try/catch with fallback values for runtime operations
- Use Zod validation at build time for external data (JSON files)
- Throw descriptive errors for build-time validation failures

```typescript
try {
  const data = JSON.parse(rawData);
  return schema.parse(data);
} catch (error) {
  console.error('Validation failed:', error);
  return fallbackData;
}
```

## Naming Conventions

- **Files:** kebab-case (e.g., `image-ticker.astro`)
- **Components:** PascalCase (e.g., `ImageTicker.astro`)
- **Functions/variables:** camelCase
- **Types/interfaces:** PascalCase
- **Constants:** camelCase or UPPER_SNAKE_CASE for true constants

## Project Structure

```
pseudokid-dot-dev/                    # <-- YOU ARE HERE
├── src/
│   ├── pages/              # Astro pages
│   │   ├── index.astro     # Main homepage
│   │   ├── brief/[slug].astro
│   │   └── deck/[group].astro
│   ├── layouts/
│   │   └── Layout.astro    # Base layout with fonts, meta, analytics
│   ├── components/
│   │   ├── ImageTicker.astro
│   │   ├── MediaCarousel.astro
│   │   ├── MediaMasonry.astro
│   │   └── Welcome.astro
│   ├── lib/
│   │   └── portfolio.ts    # Business logic, data processing, Zod schemas
│   └── data/
│       └── portfolio-slides.json  # Portfolio content (validated at build)
├── public/
│   ├── assets/portfolio/   # Media assets (images, videos)
│   ├── favicon.svg
│   └── favicon.ico
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── AGENTS.md              # <-- THIS FILE
```

## Data Validation

All portfolio data comes from `src/data/portfolio-slides.json` and is validated at build time using Zod. The schema is defined in `src/lib/portfolio.ts`. If validation fails, the build will error with descriptive messages.

## Development Workflow

1. Run `npm run dev` to start dev server (localhost:3000)
2. Make changes to components, pages, or lib/
3. Run `npm run build` to verify no errors before committing
4. Use browser devtools to test changes

## HARD RULES

- Portfolio data is loaded at build time from JSON - changes require rebuild
- Asset resolution is case-insensitive with fallback aliases in `portfolio.ts`
- Theme colors are deterministically assigned based on project name hash
- This is NOT the same as the Next.js app in the parent directory
- Do NOT use Next.js-specific imports (React, Tailwind, etc.) in this project
- Do NOT use the `@/*` path alias - use relative imports instead
- Do NOT use Tailwind -- this project uses only pure vanilla CSS
- Do NOT use git to revert or checkout things -- NEVER EVER DO THAT. IF YOU EVER NEED TO DO THAT SHIT -- ASK THE FUCKING USER

---

## DEPLOYMENT CHECKLIST (For Future Reference)

When preparing for production deployment, complete these audits in order:

### **1. SECURITY AUDIT** (Required)
- [ ] Add X-UA-Compatible meta tag to Layout.astro
- [ ] Add Referrer-Policy meta tag to Layout.astro
- [ ] Add Permissions-Policy header (via vercel.json or host config)
- [ ] Review Tally.so embed for CSP conflicts
- [ ] Verify contact modal doesn't expose sensitive data

### **2. IMAGE OPTIMIZATION** (Recommended)
- [ ] Add `loading="lazy"` to all `<img>` tags in:
  - `src/components/ImageTicker.astro`
  - `src/components/MediaCarousel.astro`
  - `src/components/MediaMasonry.astro`
  - `src/pages/brief/[slug].astro` (media sections)
  - `src/pages/deck/[group].astro` (media sections)
- [ ] Create WebP variants for JPEG images (manual or via build step)
- [ ] Consider image compression (no TinyPNG required; manual review OK)

### **3. SEO AUDIT** (Later Phase)
- [ ] Add canonical links to brief/[slug] and deck/[group] pages
- [ ] Add JSON-LD structured data (Project schema for briefs)
- [ ] Fix hardcoded OG URLs from `localhost:3000` to `https://pseudokid.dev`
- [ ] Add breadcrumb metadata to brief/deck pages
- [ ] Generate/verify sitemap includes all dynamic routes
- [ ] Consider project-specific OG images per brief page

### **4. COMPLETENESS AUDIT** (Done)
- [x] Contact modal on all pages (home, brief, deck)
- [x] 404 page contact flow (links to home/#contact - acceptable)
- [x] Mobile menu contact button wired
- [x] Keyboard navigation (Escape, Tab) works
- [x] Build passes without errors

### **5. VERCEL DEPLOYMENT**
- [ ] Create `vercel.json` if needed for security headers
- [ ] Set production domain to `https://pseudokid.dev`
- [ ] Verify environment variables (analytics, third-party scripts)
- [ ] Test all pages post-deploy (home, brief samples, deck samples, 404)
- [ ] Check mobile responsiveness on deployed site

---

## RECENT WORK HISTORY

### **March 3, 2025**
- Added contact modal to brief/[slug].astro with local modal + header/mobile button wiring
- Added complete contact modal to deck/[group].astro (copied from brief)
- Fixed brief page back navigation (changed from clickable backdrop to non-interactive div)
- Ensured backdrop safety with `pointer-events: none` on all pages
- Fixed mobile menu contact button styling (reset button defaults)
- Verified `npm run build` passes with no errors
- **Status**: Ready for deployment (security headers + lazy loading pending)
