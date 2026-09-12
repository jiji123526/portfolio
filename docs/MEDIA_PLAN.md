# Portfolio Media Plan

This document maps every portfolio placeholder to a specific piece of evidence. Each asset should help a reviewer understand the language problem, system behavior, or production result faster.

## Production standards

### Formats

- Use short, muted MP4 loops for flows that depend on sequence or interaction.
- Use WebP or AVIF for product screenshots; retain the original PNG as the editing source.
- Use SVG for architecture, taxonomy, evaluation, and data-flow diagrams.
- Keep each autoplay loop around 6–12 seconds, 30 fps, and ideally below 5 MB.

### Capture sizes

- Desktop product capture: 1440 × 900 or another 16:10 frame.
- Mobile product capture: 430 × 932, exported at 2× or 3× resolution.
- Case-study cover: compose for a wide 16:9 or 16:10 crop with the important action near the center.
- Homepage portrait: square source, minimum 1200 × 1200.

### Privacy and credibility

- Record with seeded demonstration data, never raw production conversations.
- Remove names, email addresses, channel IDs, access tokens, private messages, and identifiable images.
- Do not invent model scores or engagement metrics for a graphic.
- Label dataset targets as targets until the frozen evaluation run is complete.
- When showing usage, include the measurement window in the caption.

### File organization

```text
public/media/
├── profile/
├── jangoing/
├── yap/
├── tag-spark/
└── eathis/
```

Recommended naming pattern: `{project}-{section}-{subject}.{ext}`, for example `jangoing-solution-review-flow.mp4`.

## Global media

### Homepage portrait — P0

- **Placement:** homepage introduction
- **Format:** WebP or AVIF
- **Scene:** a simple professional portrait or restrained monochrome illustration with generous negative space
- **Avoid:** busy environmental backgrounds, product screenshots, or obvious generative-AI styling
- **Purpose:** make the portfolio feel authored without competing with the technical work

## Jangoing — P0 flagship case study

Jangoing should receive media first because it most directly demonstrates Language Engineer work.

### Cover: language-to-action loop — P0

- **Format:** 8–12 second MP4 loop
- **Scene:** type a natural household request → show relevance/intent/entities → review the structured proposal → confirm → inventory changes
- **Suggested utterance:** use a synthetic example containing a quantity and relative date
- **Purpose:** communicate the complete language-system loop before the reader reaches the case text

### Solution 01: reviewable interpretation — P0

- **Format:** mobile or desktop screen recording
- **Scene:** extracted entity spans, normalized values, confidence or validation state, and an editable action proposal
- **Purpose:** show that uncertainty becomes an interface rather than an invisible model decision

### Solution 02: annotation workflow — P0

- **Format:** two screenshots or a short loop
- **Scene:** annotation queue → candidate labels → human correction → reviewed state → JSONL export
- **Purpose:** prove experience with operational language-data workflows

### Solution 03: event-sourced household state — P1

- **Format:** SVG diagram paired with one product screenshot
- **Scene:** approved language action → event record → inventory and shopping-list projections
- **Purpose:** connect language understanding to durable application behavior

### System design: evaluation architecture — P0

- **Format:** SVG
- **Scene:** Next.js product and annotation UI → shared contracts → Worker/D1 → dataset export → frozen evaluation set → model comparison
- **Include:** relevance, intent, entity span, normalization, and joint-action evaluation outputs
- **Purpose:** make the end-to-end language engineering architecture immediately legible

### Impact: benchmark progression — P1

- **Format:** compact SVG or HTML data graphic
- **Scene:** 300/100 workflow pilot → 1,000/200 human-data baseline
- **Important:** present these as milestones or targets unless each dataset has been completed and versioned
- **Future replacement:** add per-label support, macro F1, joint-action accuracy, normalization accuracy, and error slices after the frozen benchmark exists

## yap. — P0 production engineering case study

### Cover: link-to-conversation loop — P0

- **Format:** 8–10 second MP4 loop
- **Scene:** owner copies channel link → guest opens it without signup → chooses a temporary identity → sends the first message
- **Purpose:** show the low-friction product behavior and realtime response

### Solution 01: room access — P1

- **Format:** side-by-side mobile captures
- **Scene:** public room entry versus optional passcode entry
- **Purpose:** show that access friction is applied only when a host requests it

### Solution 02: moderation and structure — P0

- **Format:** MP4 loop
- **Scene:** reply, reaction, notice, banned-word feedback, message report, freeze control, and owner moderation panel
- **Purpose:** demonstrate how trust policy becomes enforceable product behavior

### Solution 03: private owner DM — P0

- **Format:** split-screen screenshot or loop
- **Scene:** guest sends a private message → owner receives the thread → another visitor cannot access it
- **Purpose:** visualize the authorization boundary rather than only describing it

### Solution 04: temporary live session — P1

- **Format:** short loop
- **Scene:** host starts a live session → guests join and react → host ends it → temporary messages disappear from the live context
- **Purpose:** show the distinction between ephemeral coordination and durable channel history

### System design: realtime architecture — P0

- **Format:** SVG
- **Scene:** browser → Next.js session boundary / Cloudflare Worker → Durable Object room → D1 history → R2 protected media
- **Include:** authorization re-checks and reconnect path
- **Purpose:** establish production backend and infrastructure depth

### Impact: seven-day message activity — P0

- **Format:** restrained bar chart or sparkline
- **Data:** 196, 3,219, 253, 332, 84, 805, and 1,628 messages for September 5–11 UTC
- **Headline:** 6,517 messages in 7 days
- **Supporting labels:** median 332/day; approximately 550/day average excluding the largest spike; 350+ visitors with at least 10 visits
- **Do not use:** “931 daily messages” as the sole headline because one event-driven spike heavily influences the mean
- **Footnote:** counts include created messages that were later deleted

## TagSpark — P1 taxonomy and ranking case study

### Cover: preference-to-ranking loop — P1

- **Format:** 8–10 second mobile MP4
- **Scene:** onboarding → select contextual tags → submit → ranked recommendation cards appear
- **Purpose:** show the explicit input and resulting ranking in one continuous flow

### Solution 01: tag selection — P1

- **Format:** mobile screenshot sequence
- **Scene:** tag groups, selected states, reversible choices, and empty/complete states
- **Purpose:** show how subjective preference becomes structured input

### Solution 02: taxonomy and alias logic — P0

- **Format:** SVG
- **Scene:** selected tag → canonical tag → aliases → category weight → candidate works
- **Purpose:** foreground the language and classification decisions behind the recommendation UI

### Solution 03: scoring explanation — P1

- **Format:** animated SVG or MP4
- **Scene:** three example works receiving overlap, category, and alias scores before final ranking
- **Purpose:** make the ranking logic explainable without exposing implementation noise

### System design: catalog pipeline — P2

- **Format:** SVG
- **Scene:** React client → Vercel functions → Neon catalog → scheduled metadata scraper → refreshed recommendation response
- **Purpose:** show how catalog quality and refresh behavior support ranking quality

## eathis — P2 supporting experiment

Keep eathis visually lighter than the three selected case studies.

### Experiment thumbnail

- **Format:** one WebP or AVIF screenshot
- **Scene:** the three decision modes—eat out, cook from the fridge, and reuse leftovers—visible in one coherent composition
- **Purpose:** show breadth in decision-support products without competing with the language-engineering narrative

### Optional future flow

- **Format:** short mobile MP4
- **Scene:** choose “Cook at home” → add available ingredients → receive matched recipes with match percentage
- **Use only if:** eathis becomes a full case study rather than an experiment link

## Recommended production order

1. Jangoing cover, interpretation flow, annotation flow, and evaluation architecture
2. yap. cover, moderation flow, DM boundary, architecture, and usage chart
3. TagSpark taxonomy diagram and preference-to-ranking cover
4. Homepage portrait
5. Remaining supporting media and eathis thumbnail

The first eight assets above are enough to replace the most visible placeholders while preserving a consistent, evidence-led story.
