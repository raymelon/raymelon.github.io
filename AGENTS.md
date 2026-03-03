# AGENTS.md - Development Guidelines

**CRITICAL: This is the Next.js project. Read this file if working in the root `Portfolio2025/`.**

---

## CRITICAL INDEPENDENCE NOTICE

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   THIS REPO (Portfolio2025/) IS 100% INDEPENDENT OF THE ASTRO PROJECT      ║
║   IN THE SUBDIRECTORY (pseudokid-dot-dev/). THEY ARE NOT A MONOREPO.       ║
║   THEY DO NOT SHARE CODE. THEY DO NOT SHARE DEPENDENCIES.                   ║
║   THEY ARE DEPLOYED SEPARATELY. THEY HAVE NOTHING TO DO WITH EACH OTHER.  ║
║                                                                              ║
║   Portfolio2025/ = Next.js app (React, Tailwind, Radix UI)                 ║
║   pseudokid-dot-dev/ = Astro app (vanilla JS, CSS, Zod)                    ║
║                                                                              ║
║   DO NOT, UNDER ANY CIRCUMSTANCES, MIX THESE TWO PROJECTS.                  ║
║   DO NOT IMPORT CODE FROM ONE TO THE OTHER.                                 ║
║   DO NOT ASSUME THEY SHARE ANY CONFIGURATION.                               ║
║   DO NOT TRY TO "CONNECT" THEM IN ANY WAY.                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## Project Overview

- **Framework:** Next.js 14.2.4 with TypeScript
- **Styling:** Tailwind CSS with `tailwind-merge` and `clsx`
- **UI Components:** Radix UI primitives, custom UI components in `src/components/ui/`
- **Animation:** Framer Motion, MagicUI components
- **Analytics:** Mixpanel, Firebase, Tinybird
- **Content:** MDX for blog posts
- **Project Root:** `C:\Users\raymel\Documents\Sides\Portfolio2025\`

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx eslint --fix src/file.tsx` | Fix ESLint issues in specific file |

**Important:** Always run `npm run lint` and `npm run build` after making changes.

## TypeScript Guidelines

- Strict mode enabled but `strictNullChecks` is false
- Use path aliases: `@/*` maps to `./src/*`
- Prefer explicit types over `any`

```typescript
// Good
interface Props {
  title: string;
  description?: string;
}

// Avoid
const handleEvent = (event: any) => { ... }
```

## Import Patterns

- Use path aliases for src imports (`@/components/...`)
- Group imports: React/Next → External libraries → Internal components/utils

```tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

## Tailwind CSS Conventions

- Use `cn()` utility for conditional classes (from `src/lib/utils.ts`)
- Follow Radix UI patterns for component props
- Use `tailwind-merge` for overriding Tailwind classes

```tsx
import { cn } from "@/lib/utils";

<Card className={cn(
  "border-0",
  isActive && "border-2 border-primary"
)} />
```

## Component Structure

- Place UI components in `src/components/ui/`
- Place feature components in `src/components/`
- Use PascalCase for component files
- Prefer functional components with hooks

```tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2",
        variant === "default" && "bg-blue-500 text-white",
        className
      )}
      {...props}
    />
  );
}
```

## Naming Conventions

- **Files:** kebab-case for utils, PascalCase for components
- **Components:** PascalCase
- **Functions/variables:** camelCase
- **Types/interfaces:** PascalCase
- **Constants:** UPPER_SNAKE_CASE

## Project Structure

```
Portfolio2025/                    # <-- YOU ARE HERE
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   ├── blog/             # Blog pages
│   │   ├── portfolio/         # Portfolio page
│   │   ├── tweets/            # Tweets page
│   │   └── n8n/               # n8n demo page
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives
│   │   ├── magicui/           # MagicUI components
│   │   └── *.tsx              # Feature components
│   ├── lib/
│   │   ├── utils.ts           # cn(), formatDate()
│   │   ├── mixpanelClient.ts # Mixpanel analytics
│   │   └── views.ts           # View tracking
│   ├── data/
│   │   ├── resume.tsx         # Resume data
│   │   ├── blog.ts            # Blog content
│   │   └── highlight-tweets.ts
│   └── firebase/
│       └── firebase-config.ts  # Firebase config
├── public/                      # Static assets
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
├── AGENTS.md                   # <-- THIS FILE
└── pseudokid-dot-dev/         # SEPARATE ASTRO PROJECT - DO NOT TOUCH
    ├── src/
    ├── public/
    ├── package.json
    ├── astro.config.mjs
    └── AGENTS.md              # Guidelines for the Astro project
```

## ESLint Configuration

- Uses `next/core-web-vitals` preset
- Run `npm run lint` to check for issues
- Common rules enforced by Next.js ESLint config

## Error Handling

- Use try/catch with console.error for async operations
- Handle null/undefined cases explicitly (no strictNullChecks)
- Use optional chaining sparingly, prefer explicit checks for critical logic

## State Management

- Use React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Use SWR for data fetching (`src/lib/views.ts`)
- Use Context for theme/global state

## Content (MDX)

- Blog posts in `src/app/blog/[slug]/`
- Use `gray-matter` for frontmatter parsing
- MDX components in `src/components/mdx.tsx`

## Analytics

- Mixpanel: `src/lib/mixpanelClient.ts`
- Firebase: `src/firebase/firebase-config.ts`
- Tinybird: `src/components/analytics/tinybird.tsx`
- View counter: `src/components/view-counter.tsx`

## Development Workflow

1. Run `npm run dev` to start dev server
2. Make changes to components, pages, or utils
3. Run `npm run lint` to check for issues
4. Run `npm run build` to verify production build
5. Test in browser

## Known Issues / Gotchas

- `strictNullChecks` is false - be careful with optional chaining
- Some components use `any` type - prefer explicit types when possible
- Blog uses MDX with custom components - check `src/components/mdx.tsx`
- Mixpanel client may fail silently in development (check env vars)
- This is NOT the same as the Astro app in `pseudokid-dot-dev/`
- Do NOT use Astro-specific imports (`.astro` files, Astro components) in this project
- Do NOT use vanilla CSS - use Tailwind CSS in this project
