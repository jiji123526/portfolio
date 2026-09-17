# Portfolio Backend Features — Implementation Plan (for jiji123526/portfolio)

> Covers three optional backend features for jiwoojeong.com: (1) AI assistant, (2) contact form,
> (3) admin inbox. The AI assistant is the priority; contact form + admin are optional add-ons.
> Stack: existing site — Next.js (App Router), TypeScript, Tailwind, Vercel; data in lib/project-data.ts;
> optional durable store: Neon Postgres (already used by TagSpark).
> Status: NONE implemented yet. Do not advertise any of these on the site/README until live and working.
>
> Reference note: an older/separate repo (lucyjiwoo/portfolio) implemented similar features, but with a
> DIFFERENT identity (msu.edu email, "Software Engineer" title) and data layout (src/data/*.ts). Use it
> only as an architecture reference — build fresh against THIS repo's lib/project-data.ts. Do NOT copy
> its /tmp persistence (see Contact form § below).

---

# PART 0 — Reference architecture (lucyjiwoo/portfolio) and how it maps to us

lucyjiwoo's site had three backend features worth learning from:

| Feature | lucyjiwoo approach | What we adopt / change |
|---|---|---|
| AI assistant (`/api/chat`) | Claude grounded on local `src/data/*.ts`, SSE streaming, sub-100ms TTFT, no DB | ADOPT the pattern; ground on our `lib/project-data.ts` instead |
| Contact form (`/api/contact`) | Save submission + email via Resend | ADOPT email; do NOT copy `/tmp` storage (ephemeral) — email-only or Neon |
| Admin (`/api/admin/*`) | URL-only page, password-gated, read/unread tracking | ADOPT password gate + server re-auth; "URL-only" is NOT the security boundary |

Good ideas to borrow: suggested starter questions in the chat; experience↔project linking so the
assistant understands relationships. Trap to avoid: lucyjiwoo persisted contact submissions to Vercel
`/tmp/submissions.json`, which is EPHEMERAL (wiped on redeploy / cold start) — never do this.

---

# PART 1 — AI ASSISTANT (priority)

## 1.1 Architecture (lightweight, grounded — no vector DB needed)

The whole portfolio dataset is tiny (3 projects). Inject it directly into the system prompt — this is
prompt-grounding, simpler than RAG and sufficient at this size.

```
Visitor → floating chat widget → POST /app/api/chat/route.ts
                                        │  builds system prompt from lib/project-data.ts
                                        ▼
                                  Claude API (streaming, SSE)
                                        │
                                        ▼
                          token-by-token response back to widget
```

- No database, no embeddings, no CMS. Data already lives in `lib/project-data.ts`.
- Editing `project-data.ts` updates both the pages AND the assistant automatically.

## 1.2 Files to add

```
app/api/chat/route.ts          # Node route: build prompt, call Claude, stream SSE
components/ChatWidget.tsx       # floating button + panel + streaming message list
lib/assistant-prompt.ts         # serializes project-data.ts into a grounding system prompt
```
Mount `<ChatWidget />` once in the shared layout so it floats on all pages.

## 1.3 Grounding strategy (the "no hallucination" part)

In `lib/assistant-prompt.ts`, serialize the project catalog into a compact, labeled block wrapped with
strict instructions:

```
You are an assistant on Jiwoo Jeong's portfolio. Answer ONLY from the PORTFOLIO DATA below.
Rules:
- If the answer is not in the data, say you don't have that information and point to the relevant page.
- Do not invent metrics, dates, employers, or features.
- Keep answers short, factual, and in the visitor's language (English or Korean).
- When you cite a project, name it (jangoing / yap. / TagSpark).

PORTFOLIO DATA:
<serialized project-data.ts: titles, summaries, roles, tools, impact, key solutions, metrics>
```

- Keep metrics verbatim (e.g. "400+ active users", "6,517 messages Sept 5–11, 2026").
- Because everything the model can say is in the prompt, it cannot cite facts you didn't write.

## 1.4 /api/chat route (sketch)

```ts
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/assistant-prompt';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();            // [{role, content}]
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = await anthropic.messages.stream({
    model: 'claude-...-latest',
    max_tokens: 600,
    system: buildSystemPrompt(),                    // grounded on project-data.ts
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event.delta.text)}\n\n`));
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  return new Response(body, { headers: { 'Content-Type': 'text/event-stream' } });
}
```

## 1.5 ChatWidget (behavior)

- Floating button bottom-right; opens a small panel. Match the portfolio mood (--paper, --ink,
  --theme-blue #2487ff; Poppins). Mark interactive with [data-cursor-interactive].
- Maintains a `messages` array; on submit, POST to /api/chat and read the SSE stream, appending tokens.
- Suggested starter questions ("What did Jiwoo build with Cloudflare Workers?",
  "Tell me about jangoing's evaluation approach").
- Accessibility: focus management, aria-live on the response area, Enter to send, reduced-motion respected.

## 1.6 Security / cost guardrails
- `ANTHROPIC_API_KEY` lives ONLY as a Vercel server env var — never in client code.
- Rate-limit /api/chat (per-IP, in-memory or KV) so the key can't be abused.
- Cap `max_tokens` and message history length; truncate long visitor input.
- Optional topic allow-list; politely decline off-topic asks.
- No PII collection in chat; don't log full transcripts with identifiers.

## 1.7 Why it's worth building (Language Engineer angle)
- A small, honest RAG-style grounding system — practical AI tooling, prompt design, and "answer only
  from evidence" discipline, echoing jangoing's "AI output is a draft, not a label."
- Can become its own mini case study: problem (repetitive recruiter questions), design (grounded prompt
  over structured data), guardrails (no hallucination, rate limits), outcome.

---

# PART 2 — CONTACT FORM (optional add-on)

Let a visitor send a message, notify Jiwoo by email, optionally store durably.

## 2.1 Two levels (pick one)
- **Level A — Email-only (recommended first):** no DB; on submit, send an email via Resend. Nothing to
  lose or manage; your inbox is the archive.
- **Level B — Email + Neon Postgres:** also insert into `contact_submissions` for a durable, queryable
  log and an optional admin inbox.

## 2.2 Files
```
components/ContactForm.tsx        # name / email / message, client validation, success + error states
app/api/contact/route.ts          # validate, rate-limit, send email, (Level B) insert to Neon
lib/email.ts                      # Resend client + sendContactNotification()
(Level B) db/migrations/00XX_contact_submissions.sql
```

## 2.3 Resend email notification (Level A core)
```ts
// lib/email.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(input: { name: string; email: string; message: string }) {
  await resend.emails.send({
    from: 'Portfolio <noreply@your-domain>',   // verified sender/domain in Resend
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: input.email,                       // reply straight to the recruiter
    subject: `Portfolio contact from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  });
}
```

## 2.4 /api/contact route (sketch)
```ts
import { sendContactNotification } from '@/lib/email';

export async function POST(req: Request) {
  const { name, email, message, website } = await req.json();
  if (website) return Response.json({ ok: true });                        // honeypot → silent 200
  if (!name?.trim() || !message?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email ?? ''))
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  if (message.length > 4000) return Response.json({ error: 'Too long' }, { status: 400 });
  // rate-limit per IP here
  await sendContactNotification({ name, email, message });
  // (Level B) await insertSubmission({ name, email, message });
  return Response.json({ ok: true });
}
```

## 2.5 (Level B) Neon table
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX contact_submissions_created_idx ON contact_submissions (created_at DESC);
```

## 2.6 Spam / abuse guardrails
- Honeypot hidden `website` field (+ optional time-to-submit check); add hCaptcha/Turnstile only if spam appears.
- Rate-limit /api/contact per IP; validate + cap message length.
- Do NOT persist to `/tmp` (lucyjiwoo trap — ephemeral). Email-only or Neon.

---

# PART 3 — ADMIN INBOX (optional, only with Contact Level B)

A private page to view/manage submissions.

## 3.1 Files
```
app/admin/page.tsx                # password-gated inbox UI
app/api/admin/route.ts            # login + list/mark-read, re-auth on every request
```

## 3.2 Auth (do it safely)
- Password-gate with env `ADMIN_PASSWORD`; on login, set a short-lived signed HttpOnly cookie
  (sign with `ADMIN_SECRET`).
- Re-check the cookie server-side on EVERY read/mutation. Never trust client state for authorization.
- "URL-only / unlisted" is NOT a security boundary (lucyjiwoo framing) — the password is the real gate.
- Optional: Vercel KV/Upstash for the session if you don't want a DB session table.

---

# ENV VARS (all server-only Vercel env)
```
ANTHROPIC_API_KEY=sk-ant-...     # AI assistant
RESEND_API_KEY=re_...            # contact form (from resend.com)
CONTACT_TO_EMAIL=you@domain      # where notifications land
# Contact Level B / admin:
DATABASE_URL=postgres://...      # Neon (reuse TagSpark pattern)
ADMIN_PASSWORD=...               # admin login
ADMIN_SECRET=...                 # cookie signing (openssl rand -hex 32)
```

# ROLLOUT ORDER
1. AI assistant: /api/chat + prompt builder + widget; test grounding locally (ask something NOT in data → it declines).
2. Add rate limiting + max-token caps; deploy with ANTHROPIC_API_KEY; verify live.
3. (Optional) Contact form Level A: ContactForm + /api/contact + Resend; verify a test submission emails you; add honeypot + rate limit.
4. (Optional) Contact form Level B: Neon table + insert.
5. (Optional) Admin inbox with password gate + server re-auth.
6. ONLY after a feature is live and working, mention it in the README/site copy.

# HONESTY / SCOPE REMINDERS
- Do not advertise any feature until it is deployed and working.
- Assistant answers must be sourced from project-data.ts; add a claim to the data first so pages and
  assistant stay consistent.
- Resend requires a verified sender domain before it delivers.
- Never reuse lucyjiwoo's `/tmp` persistence — it loses data on redeploy.
