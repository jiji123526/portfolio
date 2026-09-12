# Jiwoo Jeong — Language Engineer & AI Product Builder

A portfolio focused on language data, evaluation workflows, recommendation systems, and production AI products.

> **Language is messy. Systems shouldn’t be.**

Jiwoo builds language data, evaluation workflows, and production systems that turn ambiguous human input into reliable product behavior. The portfolio presents each project as an engineering case study: the language or data problem, the system decisions, what shipped, and the evidence behind the result.

## Selected work

### Jangoing — Language data and evaluation

A conversational kitchen intelligence system that converts everyday household language into grounded, reviewable actions.

- Intent, entity, relevance, normalization, and multi-action annotation schemas
- Deterministic temporal grounding for relative dates
- Human review and correction workflows
- Versioned dataset export and reproducible evaluation tooling
- Product, API, persistence, and future Raspberry Pi voice integration

### yap. — Production realtime systems

A link-first anonymous conversation platform built around explicit trust and moderation boundaries.

- Realtime multi-tenant chat, private owner DMs, media, and temporary live sessions
- Server-enforced authorization, rate limits, moderation, and recoverable deletion
- Idempotent retries, bounded reconnects, cursor pagination, and durable-storage authority
- Stage-level latency diagnostics and a count-validated production database cutover
- Cloudflare Workers, D1, Durable Objects, R2, Next.js, and Vercel
- 6,517 messages created during the September 5–11 UTC production window

### TagSpark — Taxonomy and ranking

A recommendation system that structures subjective preferences into understandable tag-based rankings.

- Tag taxonomy, category weighting, and alias matching
- Explicit preference input and ranked recommendations
- Catalog APIs, Neon Postgres, and scheduled metadata refreshes

### Other experiments

`eathis` explores decision support across eating out, cooking with available ingredients, and reusing leftovers. It appears separately from the core language-engineering work.

## Portfolio structure

- `app/page.tsx` — homepage positioning and project index
- `app/work/[slug]/page.tsx` — shared case-study layout
- `lib/project-data.ts` — project narratives, roles, metrics, and media notes
- `app/globals.css` — responsive layout, typography, and motion styling
- `components/external-arrow.tsx` — cross-browser external-link icon
- [`docs/MEDIA_PLAN.md`](docs/MEDIA_PLAN.md) — shot list and production guidance for every media placeholder

The visual layout and motion rhythm were rebuilt from scratch from a portfolio reference. All project narratives, metrics, and future media belong to Jiwoo’s own work.

## Development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The site deploys to Vercel from the `main` branch.

- Framework preset: Next.js
- Root directory: repository root (`./`)
- Install command: `npm install`
- Build command: `npm run build`
- Environment variables: none currently required

## Content accuracy

Metrics should remain tied to a named source and time window. Engagement totals, benchmark sizes, evaluation results, and model-quality claims should only be updated after they can be reproduced from production queries or versioned evaluation artifacts.
