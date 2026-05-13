# Xenvro Agent Context

This file is the first place an AI coding agent should read before editing this
repo. Keep it short and update it whenever the project structure, major feature
direction, or important conventions change.

## Project Summary

Xenvro is a React Router 7 + React 19 + TypeScript application. The product
direction is a resume analyzer inspired by an AI resume analyzer tutorial, but
the UI should intentionally look different from that tutorial. Backend behavior
may stay similar, while the frontend should use a polished mix of component
libraries and custom styling.

The current visible app is the home route rendering a generated financial hero
section. The hero copy and brand text are still placeholder content from the
downloaded component and should be rewritten for Xenvro before production.

## Tech Stack

- Framework: React Router 7 in framework mode
- Runtime/build: Vite, TypeScript
- UI styling: Tailwind CSS 4, shadcn registry support, custom CSS utilities
- Animation: `motion`
- Icons: `lucide-react`
- Package manager: npm with `package-lock.json`

Useful scripts:

- `npm run dev` starts the local React Router dev server.
- `npm run build` creates the production build.
- `npm run typecheck` runs React Router type generation and TypeScript checks.

## Source Map

- `app/routes.ts` defines routes.
- `app/routes/home.tsx` is the index route.
- `app/root.tsx` owns document shell, metadata rendering, and global CSS import.
- `app/app.css` contains Tailwind imports, theme tokens, shadcn variables, and
  legacy resume-app utility classes.
- `app/components/layout/` stores reusable page layout components such as the
  responsive header/navbar and reusable scene wrappers.
- `app/components/sections/` stores page sections such as hero blocks.
- `app/components/ui/` stores reusable UI primitives and generated shadcn-style
  components.
- `app/hooks/` stores reusable React hooks.
- `app/lib/` stores shared utilities such as `cn`.
- `components.json` configures shadcn, aliases, and the `@ui-layouts` registry.

Path aliases use `~/*` for `app/*`.

## Current Component State

The `@ui-layouts/hero-financial` component was added and then normalized into
the app structure:

- Hero section: `app/components/sections/herosection.tsx`
- Layout components:
  - `app/components/layout/header.tsx`
  - `app/components/layout/scene-background.tsx`
- Supporting UI primitives:
  - `app/components/ui/side-drawer.tsx`
  - `app/components/ui/scroll-reveal.tsx`
- Supporting hook: `app/hooks/use-media-query.tsx`
- Shared class utility: `app/lib/utils.ts`

The home route imports the hero from `~/components/sections/herosection`.

## Component Structure Rules

When adding future components:

- Put full-width page sections in `app/components/sections/`.
- Put reusable atmospheric wrappers in `app/components/layout/` when their
  visuals are shared across multiple sections or pages.
- Put reusable primitives, buttons, drawers, cards, dialogs, and shadcn UI pieces
  in `app/components/ui/`.
- Put hooks in `app/hooks/`, not inside `app/components/`.
- Put shared helpers in `app/lib/`.
- Avoid folder names with spaces. Use lowercase kebab-case for filenames and
  directories.
- Keep generated component code working first, then gradually adapt naming,
  copy, and styling to Xenvro.
- Prefer `~/...` imports over relative paths that climb many directories.
- Keep component-specific images/assets near the component only if they are used
  by that component alone; otherwise use a shared assets location.

## UI Direction

The app should not visually clone the tutorial project. Use the tutorial mainly
as a behavior/backend reference. For UI, prefer a distinct, polished resume
analysis product feel: clear hierarchy, strong first viewport, restrained
motion, readable spacing, and production-quality component organization.

Before shipping the current hero, replace placeholder finance/UI-Layouts copy,
placeholder nav items, and any irrelevant imagery with Xenvro-specific content.

## Maintenance Notes For Agents

At the start of a future task:

1. Read this file.
2. Check `git status --short` to see what changed.
3. Inspect only the modified or directly relevant files first.
4. Update this file when project conventions, structure, or feature direction
   materially changes.

Do not revert user changes unless the user explicitly asks for that.
