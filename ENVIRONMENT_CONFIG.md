# Environment Configuration Guide

## Runtime

- **Node.js 22** (see `.nvmrc`). Use `nvm use` before installing dependencies.

## Environment Variables

Set these in `.env.local` (local) or in the deployment environment.

| Variable                       | Scope                     | Required                  | Description                                                                                                                                                       |
| ------------------------------ | ------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_STRAPI_URL`       | Public (browser + server) | Recommended               | Strapi base URL. Falls back to `https://ambitious-cat-3135f7987e.strapiapp.com`.                                                                                  |
| `NEXT_PUBLIC_STRAPI_API_TOKEN` | Public (browser + server) | Optional                  | Strapi API token sent as `Authorization: Bearer` by `fetchFromStrapi()`. Only needed if the Public role returns 403. It ends up in the client bundle: **read-only tokens only**. |
| `IENTRANCE_API_URL`            | Server-only               | Recommended               | Base URL of the iENTRANCE catalogue API. Falls back to `https://ientrance.fablims.com/api`.                                                                       |
| `IENTRANCE_API_KEY`            | Server-only               | Yes (catalogue)           | API key sent as `x-api-key` from the server. Never prefix it with `NEXT_PUBLIC_` and never commit it.                                                             |

No other variables are read by the application.

### Example `.env.local`

```bash
NEXT_PUBLIC_STRAPI_URL=https://ambitious-cat-3135f7987e.strapiapp.com
# NEXT_PUBLIC_STRAPI_API_TOKEN=<read-only token>

IENTRANCE_API_URL=https://ientrance.fablims.com/api
IENTRANCE_API_KEY=<secret>
```

## Using a Local Strapi Server

1. Point the frontend to the local instance:

```bash
# In .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

2. Start the local Strapi server:

```bash
cd backend
npm run develop
```

3. Restart the Next.js dev server to pick up the environment changes.

## Image Loading

`next.config.js` allows `next/image` to load from:

- `https://ambitious-cat-3135f7987e.strapiapp.com`
- `https://ambitious-cat-3135f7987e.media.strapiapp.com`
- `http://localhost:1337` — **development only** (not allowed when `NODE_ENV=production`)

## Technical Implementation

Strapi access is centralized in `/src/lib`:

- `config.ts`
  - `API_CONFIG`: environment-aware URLs and tokens
  - `fetchFromStrapi()`: unified Strapi fetch (optional `allowNotFound`)
  - `getStrapiMediaUrl()`: keeps absolute media URLs, prefixes relative ones with `NEXT_PUBLIC_STRAPI_URL`
  - `getImageUrl()`: resolves the various Strapi image field shapes
- `fetchAllStrapiPages.ts`: loops over every Strapi page (`pagination[pageSize]=100`) so collections are not capped at 25 items; used by all contexts in `/src/context`
- `safeHref.ts`: validates CMS-provided links (only `http:`, `https:`, `mailto:`, `tel:`, `/…` and `#…`)

Article detail pages (`/src/app/(articoli)/[slug]`) call `GET /api/articoli/:slug`, which returns only the published article: a 404 renders the Next.js not-found page, any other upstream error surfaces through the error boundary.

## Image Handling

### Featured Image Support

Events support a `featuredImage` field for the header image:

- **Priority**: `featuredImage` takes precedence over `photoGallery[0]`
- **Fallback**: If no `featuredImage`, uses first image from `photoGallery`
- **Default**: Falls back to `/images/examples/copertina-summer-school.jpg`
