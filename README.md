# Jiwoo Jeong — Language Engineer & AI Product Builder

A portfolio focused on language data, evaluation workflows, recommendation systems, and production AI products.

> **Language is messy. Systems shouldn't be.**

Jiwoo builds language data, evaluation workflows, and production systems that turn ambiguous human input into reliable product behavior. Each project is presented as an engineering case study: the language or data problem, the system decisions, what shipped, and the evidence behind the result.

**Live:** [jiwoojeong.com](https://jiwoojeong.com)

---

## Selected work

### Jangoing — Language data & evaluation
*A review-first language system for a Raspberry Pi–based conversational kitchen device.*

Converts everyday household language into grounded, reviewable actions instead of automatic mutations.

- Relevance, intent, entity-span, normalization, and multi-action annotation schemas
- Deterministic temporal grounding for relative dates
- Human review and correction workflows (confirm-before-mutation)
- Nine annotation queues feeding versioned dataset exports and a reproducible evaluation gate
- Product, API, event-sourced persistence, and a future Raspberry Pi voice path

**Live:** [jangoing-web.vercel.app](https://jangoing-web.vercel.app) · **Repo:** [github.com/jiji123526/jangoing](https://github.com/jiji123526/jangoing)
**Impact:** Built the annotation schema, review workflow, dataset pipeline, and reproducible baseline to collect Jangoing's first reviewed English benchmark.

### yap. — Production realtime systems
*A link-first anonymous conversation platform built around explicit trust and moderation boundaries.*

- Realtime multi-tenant chat, private owner DMs, media, and temporary live sessions
- Server-enforced authorization, rate limits, moderation, and recoverable deletion
- Idempotent retries, bounded reconnects, cursor pagination, and durable-storage authority
- Stage-level latency diagnostics and a count-validated production database cutover
- Cloudflare Workers, D1, Durable Objects, R2, Next.js, and Vercel

**Live:** [yapndot.com](https://yapndot.com) · **Repo:** [github.com/jiji123526/letmetellu](https://github.com/jiji123526/letmetellu)
**Impact:** 400+ active users · 6,517 messages created during the September 5–11, 2026 (UTC) production window.

### TagSpark — Taxonomy & ranking
*Structuring subjective preferences into transparent, tag-based rankings.*

- Tag taxonomy, category weighting, and alias matching
- Explicit preference input and ranked recommendations (exact-match + weighted similarity)
- Catalog APIs, Neon Postgres, and scheduled metadata refreshes

**Live:** [kwkrecom.vercel.app](https://kwkrecom.vercel.app) · **Repo:** [github.com/jiji123526/tag-spark](https://github.com/jiji123526/tag-spark)
**Impact:** Shipped a production-ready recommendation flow with a live catalog and scheduled data refresh.

---

## Portfolio structure

```
app/
  page.tsx              # homepage positioning and project index
  work/[slug]/page.tsx  # shared case-study layout
  globals.css           # responsive layout, typography, and motion styling
components/              # shared UI + per-project interactive demos
  external-arrow.tsx     # cross-browser external-link icon
lib/
  project-data.ts       # project narratives, roles, metrics, media notes, and case-study content
docs/
  MEDIA_PLAN.md         # shot list and production guidance for every media placeholder
hooks/                  # shared React hooks
public/                 # static assets
```

The visual layout and motion rhythm were rebuilt from scratch from a portfolio reference. All project narratives, metrics, and media belong to Jiwoo's own work.

---

## Development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev          # start the dev server
npm run build        # production build
```

## Deployment

Deploys to Vercel from the `main` branch.

- Framework preset: Next.js
- Root directory: repository root (`./`)
- Install command: `npm install`
- Build command: `npm run build`
- Environment variables: none currently required

---

## Content accuracy

Metrics stay tied to a named source and time window. Engagement totals, benchmark sizes, evaluation results, and model-quality claims are updated only after they can be reproduced from production queries or versioned evaluation artifacts.
