# Xenvro

Xenvro is a resume analysis application built with React Router 7, React 19,
TypeScript, Vite, Tailwind CSS 4, and Puter.js integrations for auth, file
storage, key-value storage, and AI-assisted resume feedback.

## What The App Does

The current app flow is:

- Sign in through Puter auth.
- Upload a PDF resume plus target company and job details.
- Convert the PDF to an image preview.
- Store resume metadata under `resume:<uuid>`.
- Generate structured AI feedback for ATS, content, structure, tone, and
  skills.
- View the detailed resume analysis on `/resume/:id`.

Current routes:

- `/` home page with the hero section and prior analyzed resumes
- `/auth` authentication gate
- `/upload` resume upload and analysis flow
- `/resume/:id` analysis details page



## Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the local dev server:

```bash
npm run dev
```

The app is served at `http://localhost:5173`.

### Type Checking

Run route type generation and TypeScript checks:

```bash
npm run typecheck
```

### Production Build

Create a production build:

```bash
npm run build
```

Start the built server:

```bash
npm run start
```

## Project Structure

- `app/routes.ts` route definitions
- `app/root.tsx` app document shell
- `app/routes/home.tsx` home route
- `app/routes/auth.tsx` auth page
- `app/routes/upload.tsx` upload and analysis flow
- `app/routes/resume.tsx` resume detail page
- `app/components/layout/` reusable layout pieces
- `app/components/sections/` page sections
- `app/components/ui/` UI primitives
- `app/hooks/` reusable hooks
- `app/lib/` shared utilities and Puter store
- `constants/` prompt and seed data helpers
- `types/` shared TypeScript types

