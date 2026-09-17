# Jiwoo Jeong — Language Engineer

I build language data systems: annotation schemas, evaluation workflows, and normalization pipelines that turn messy human language into reliable, reviewable structure. Native Korean, fluent English, with hands-on NLP annotation, dataset construction, and model-evaluation experience across production products.

> **Language is messy. Systems shouldn't be.**

**Focus:** linguistic annotation · dialog/semantic schemas · data normalization · reproducible evaluation · bootstrapping language data in a fast-moving environment.

**Core skills:** Python · annotation schema & guideline design · intent/entity/relevance taxonomies · normalization (surface → canonical) · evaluation methodology (classification, entity, normalization, joint-action) · SQL · Git/agile · TypeScript/React/Next.js.

**Live:** [jiwoojeong.com](https://jiwoojeong.com)

---

## Selected work

### Jangoing — Language data & evaluation
*A review-first language system for a Raspberry Pi–based conversational kitchen device.*

The clearest demonstration of end-to-end language-engineering: I designed the annotation policy, the data pipeline, and the evaluation gate that turn everyday household speech into grounded, reviewable actions.

- **Annotation schemas:** relevance, an 11-intent ontology, entity-span policy, normalization, and multi-action labeling
- **Normalization:** deterministic surface → canonical mapping (e.g. "oat milk" → `oat_milk`, "a couple" → `2`) and temporal grounding for relative dates
- **Data governance:** nine annotation queues, versioned JSONL exports, phrase-family leakage checks, and a reproducible evaluation gate (intent, entity, normalization, joint-action exact match)
- **Trust model:** confirm-before-mutation — language becomes a reviewable proposal, not an automatic action
- **Multilingual roadmap:** English-first with a Korean-English ASR phase ahead

**Live:** [jangoing-web.vercel.app](https://jangoing-web.vercel.app) · **Repo:** [github.com/jiji123526/jangoing](https://github.com/jiji123526/jangoing)
**Impact:** Built the annotation schema, review workflow, dataset pipeline, and reproducible baseline to collect Jangoing's first reviewed English benchmark.

### TagSpark — Taxonomy & ranking
*Structuring subjective preferences into transparent, tag-based rankings.*

A lexical-resource project: normalizing noisy, user-generated tags into comparable signals before any ranking happens.

- **Normalization:** alias-set construction with Unicode NFKC folding and token-overlap matching
- **Hand-built thesaurus:** curated tag clusters compiled into a similarity graph
- **Weighted scoring:** hierarchical exact → alias → category → cluster similarity, with per-dimension category weights and length normalization
- Catalog APIs, Neon Postgres, and scheduled metadata refreshes

**Live:** [kwkrecom.vercel.app](https://kwkrecom.vercel.app) · **Repo:** [github.com/jiji123526/tag-spark](https://github.com/jiji123526/tag-spark)
**Impact:** Shipped a production recommendation flow with a live catalog and scheduled data refresh.

### yap. — Production realtime systems
*A link-first anonymous conversation platform built around explicit trust and moderation boundaries.*

Evidence I can take a system from concept to production and operate it under real traffic.

- Realtime multi-tenant chat, private owner DMs, media, and temporary live sessions
- Server-enforced authorization, rate limits, moderation, and recoverable deletion
- Idempotent retries, bounded reconnects, cursor pagination, and durable-storage authority
- Stage-level latency diagnostics and a count-validated production database cutover
- Cloudflare Workers, D1, Durable Objects, R2, Next.js, and Vercel

**Live:** [yapndot.com](https://yapndot.com) · **Repo:** [github.com/jiji123526/letmetellu](https://github.com/jiji123526/letmetellu)
**Impact:** 400+ active users · 6,517 messages created during the September 5–11, 2026 (UTC) production window.

---

## Roadmap

Planned additions to this portfolio site (not yet shipped):

- **AI assistant** — a floating chat widget that answers recruiter questions, grounded strictly in this site's project data (`lib/project-data.ts`) with streamed responses and no hallucination. Built on the Claude API; designed to decline anything not in the data.
- **Contact form** — a message form with email notification (Resend), starting email-only and optionally backed by Neon Postgres for a durable record.
- **Admin inbox** — a password-gated, server-authorized view for managing contact submissions.

These are in design; this section will move into the feature list once each is deployed and verified.

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
- Environment variables: none currently required (AI assistant / contact form will add server-only secrets when shipped)

---

## Content accuracy

Metrics stay tied to a named source and time window. Engagement totals, benchmark sizes, evaluation results, and model-quality claims are updated only after they can be reproduced from production queries or versioned evaluation artifacts.
