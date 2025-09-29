# Environment Configuration Guide

## Server Configuration

This project is configured to work with both local development and production Strapi servers.

### Production Server (Default)

- **URL**: `https://ambitious-cat-3135f7987e.strapiapp.com`
- **Usage**: Automatically used when `NEXT_PUBLIC_STRAPI_URL` is set in `.env.local`

### Local Development Server

- **URL**: `http://localhost:1337`
- **Requirements**: Local Strapi server must be running

## Switching Between Environments

### To use Production Server (Default)

The application is already configured to use the production server. No changes needed.

```bash
# In .env.local
NEXT_PUBLIC_STRAPI_URL=https://ambitious-cat-3135f7987e.strapiapp.com
```

### To use Local Development Server

1. Uncomment the local URL in `.env.local`:

```bash
# In .env.local
# Comment out or remove the production URL
# NEXT_PUBLIC_STRAPI_URL=https://ambitious-cat-3135f7987e.strapiapp.com

# Uncomment the local URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

2. Start the local Strapi server:

```bash
cd backend
npm run develop
```

3. Restart the Next.js development server to pick up the environment changes.

## Current Configuration

The following components automatically use the configured URL:

- ✅ Events Context (`/src/context/EventsContext.tsx`)
- ✅ Articles Context (`/src/context/ArticlesContext.tsx`)
- ✅ Pages Context (`/src/context/PagesContext.tsx`)
- ✅ Press Context (`/src/context/PressContext.tsx`)
- ✅ Events Page (`/src/app/events/[slug]/page.tsx`)
- ✅ Fetch Articles Helper (`/src/helpers/fetchAllArticles.ts`)

## Image Loading

Next.js Image component is configured to support both environments:

- **Production**: `https://ambitious-cat-3135f7987e.strapiapp.com`
- **Local**: `http://localhost:1337`

## Technical Implementation

All API calls are centralized through `/src/lib/config.ts` which provides:

- `API_CONFIG.STRAPI_BASE_URL`: Environment-aware Strapi URL
- `fetchFromStrapi()`: Unified function for Strapi API calls
- `createFetchOptions()`: Standard fetch configuration
