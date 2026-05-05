# Portfolio (Next.js)

Personal portfolio site built with **Next.js** (App Router), **React**, **Tailwind CSS v4**, and **next-intl** for localized routes. Content lives in `content/` as Markdown and JSON.

## Features

- **App Router** – Server components, static generation for pages and articles, API route for the contact form.
- **Internationalization** – English and French (locale prefix: `/en`, `/fr`) via [next-intl](https://next-intl.dev/).
- **Content** – Section pages and articles from Markdown; projects, FAQ, and stack from JSON under `content/`.
- **Contact form** – Optional email delivery with [Resend](https://resend.com/) when an API key is set.
- **Analytics** – Optional [Plausible](https://plausible.io/) via `NEXT_PUBLIC_*` variables.
- **Styling** – Tailwind CSS v4, dark theme, responsive layout, Geist/Manrope-style typography.
- **Tooling** – TypeScript, ESLint (`eslint-config-next`), `pnpm` as the package manager.

## Requirements

- **Node.js** 20+ (recommended)
- **pnpm** 9+ (`corepack enable` or install from [pnpm.io](https://pnpm.io))

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
   | `RESEND_API_KEY` or `NUXT_PRIVATE_RESEND_API_KEY` | Enables `/api/emails/send` for the contact form. |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible site domain; if unset, analytics script is not loaded. |
   | `NEXT_PUBLIC_PLAUSIBLE_SCRIPT` | Optional override for self-hosted Plausible (defaults to `https://plausible.io/js/script.js`). |

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

## Project structure (high level)

- `src/app/` – App Router: `[locale]` routes, layouts, API routes.
- `src/components/` – React UI components.
- `src/lib/` – Site config, content loaders, MDC-style block parsing for section markdown.
- `src/messages/` – next-intl JSON messages (`en`, `fr`).
- `content/` – `en/` and `fr/` markdown + JSON (projects, FAQ); `stack.json` for the about page stack grid.
- `public/icons/` – SVG icons for social and stack links.

Site-specific copy (name, socials, meeting link, SEO defaults) is in **`src/lib/site-config.ts`**.

## Content notes

- Section pages use numbered markdown files (for example `content/en/1.index.md`) with `::block` / `#slot` sections; these are parsed in `src/lib/mdc.ts`.
- Article images in frontmatter should prefer **`https://raw.githubusercontent.com/...`** URLs for `next/image` optimization; `github.com` blob URLs are allowed in `next.config.ts` but raw URLs are more reliable.

## License

Apache-2.0 (see repository license file).
