# Product Design Portfolio

A responsive portfolio inspired by the layout rhythm of Lucy Choi's portfolio, rebuilt from scratch without copying its media or case-study content.

## Edit the portfolio

- Update name, profile copy, and contact links in `app/page.tsx`.
- Update project cards and case studies in `lib/project-data.ts`.
- Replace the CSS placeholders with your own images or videos when ready.

## Development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Deploy to Vercel

1. Import `jiji123526/portfolio` from the Vercel dashboard.
2. Keep **Framework Preset** set to `Next.js`.
3. Keep **Root Directory** as the repository root (`./`).
4. Use the default commands: `npm install` and `npm run build`.
5. No environment variables are required for the current portfolio.

Pushes to `main` deploy to production after the Git integration is connected.
