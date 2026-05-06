# Portfolio (Next.js)

Personal portfolio site built with **Next.js** (App Router), **React**, **Tailwind CSS v4**, and **next-intl** for localized routes. Content lives in `content/` as Markdown and JSON.

## Stack versions

| Package | Version (see `package.json`) |
|--------|------------------------------|
| **React** / **React DOM** | 19.x (`^19.0.0`) |
| **Next.js** | 15.2.6 |
| **TypeScript** | 5.7.x |
| **Tailwind CSS** | 4.x |

To see the exact versions installed in your tree:

```bash
pnpm list react react-dom next
```

## Features

- **App Router** – Server components, static generation for pages and articles, API route for the contact form.
- **Internationalization** – English and Latvian (locale codes: `/en`, `/lv`) via [next-intl](https://next-intl.dev/). Legacy `/fr/**` URLs redirect to `/lv/**`.
- **Content** – Section pages and articles from Markdown; projects, FAQ, and stack from JSON under `content/`.
- **Contact form** – Optional email delivery with [Resend](https://resend.com/) when an API key is set.
- **Analytics** – Optional [Plausible](https://plausible.io/) via `NEXT_PUBLIC_*` variables.
- **Styling** – Tailwind CSS v4, dark theme, responsive layout, Geist/Manrope-style typography.
- **Tooling** – TypeScript, ESLint (`eslint-config-next`), `pnpm` as the package manager.

## Requirements

- **Node.js** 20+ (recommended)
- **pnpm** 9+ (`corepack enable` or install from [pnpm.io](https://pnpm.io)). This repo lists pnpm in `packageManager`; using **`npm install`** on a pnpm layout can trigger npm bugs (e.g. `edgesOut`). Prefer **`pnpm install`**.

## Quick setup

1. **Clone** this repository.

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment variables**

   ```bash
   cp .env.example .env
   ```

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | Optional [Neon](https://neon.tech) Postgres (pooled URI). Enables DB logging for admin image uploads and a `portfolio_projects` table for future CMS sync. |
   | `CMS_SECRET` | Password for `/admin` content editor. |
   | `RESEND_API_KEY` or `NUXT_PRIVATE_RESEND_API_KEY` | Enables `/api/emails/send` for the contact form. |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible site domain; if unset, analytics script is not loaded. |
   | `NEXT_PUBLIC_PLAUSIBLE_SCRIPT` | Optional override for self-hosted Plausible (defaults to `https://plausible.io/js/script.js`). |

   After setting `DATABASE_URL`, create tables once (with dependencies installed via **`pnpm install`**):

   ```bash
   pnpm run db:migrate
   ```

4. **Development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) — you will be redirected to a locale (e.g. `/en`).

5. **Production build**

   ```bash
   pnpm build
   pnpm start
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (Turbopack). |
| `pnpm build` | Production build. |
| `pnpm start` | Run the production server (after `build`). |
| `pnpm lint` | ESLint. |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`). |
| `pnpm run db:migrate` | Create Neon tables (needs `DATABASE_URL`). |

## Project structure (high level)

- `src/app/` – App Router: `[locale]` routes, layouts, API routes.
- `src/components/` – React UI components.
- `src/lib/` – Site config, content loaders, MDC-style block parsing for section markdown.
- `src/messages/` – next-intl JSON messages (`en`, `lv`).
- `content/` – `en/` and `lv/` markdown + JSON (projects, FAQ); `stack.json` supplies linked tool names on About (minimal text list).
- `public/icons/` – SVG icons for social and any non-About uses; About stack is text-only on the site.

Site-specific copy (name, socials, meeting link, SEO defaults) is in **`src/lib/site-config.ts`**.

## Content notes

- Section pages use numbered markdown files (for example `content/en/1.index.md`) with `::block` / `#slot` sections; these are parsed in `src/lib/mdc.ts`.
- Article images in frontmatter should prefer **`https://raw.githubusercontent.com/...`** URLs for `next/image` optimization; `github.com` blob URLs are allowed in `next.config.ts` but raw URLs are more reliable.

## License

Apache-2.0 (see repository license file).
