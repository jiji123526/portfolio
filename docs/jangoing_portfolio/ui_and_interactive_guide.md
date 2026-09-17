# jangoing Case Study — UI Style Guide + Interactive Elements

> Goal: keep the OVERALL MOOD consistent with the rest of the portfolio (yap. etc.) — same tokens,
> type, and motion feel — but design the demos and interactive elements around jangoing ITSELF, not
> by copying yap.'s components. Shared: the look. Distinct: the content.
> Grounded in: the portfolio's design system (app/globals.css) and jangoing's actual content
> (5-stage NLU, 9 annotation queues, confirm-before-mutation, evaluation gate).

---

## 1. What to share with the rest of the portfolio (mood only)

Reuse these so jangoing clearly belongs to the same site — nothing more is required for cohesion:

```css
--paper: #f6f6f5;  --ink: #262626;  --muted: #8b8b88;  --line: #dededb;  --theme-blue: #2487ff;
```
- Font Poppins, base weight 300; headings 400/600; letter-spacing -0.02em.
- Container `.shell` = `min(100% - 48px, 1000px)`, centered.
- Section rhythm: `.eyebrow` + `.section-label` (label + hairline), and the numbered "0.1 / 0.2" sub-steps.
- `.media-placeholder` style for any image slot.
- Motion feel: the shared page transition and ambient cursor are inherited via `app/work/[slug]/page.tsx` —
  automatic, nothing to build.
- Accessibility: any animation you add needs a `@media (prefers-reduced-motion: reduce)` fallback.

That's the whole "match the mood" requirement. Everything below is jangoing-specific and does NOT need
to resemble any yap. component.

## 2. Interactive elements — designed around jangoing itself

jangoing's substance is language understanding: turning one messy utterance into a structured, reviewable
action. The demos should make THAT visible. Pick based on what best explains jangoing, not on parity with
another page. Keep a short honesty label where relevant ("Simulated locally — does not send data.").

### 2.1 · Utterance -> five-stage breakdown (flagship; fills the page-7 placeholder)
The core of the project, made interactive. User picks or types an utterance (e.g. "We're out of drinks")
and steps through the real pipeline:
Relevance -> Intent -> Entity spans -> Normalization -> Joint action.
- Each stage reveals its output: relevance class, chosen intent, highlighted entity spans in the raw text,
  canonical normalized values, then the final joint-action structure.
- This is jangoing's signature explanation — no equivalent needed elsewhere.
- Reduced motion: render the full breakdown at once.

### 2.2 · The ambiguity demo (jangoing's most distinctive idea)
"We're out of drinks" is genuinely ambiguous: a report, an add-to-list request, or a non-actionable
statement. Let the user flip between readings and see the joint action change — and show that when
confidence is low, the system asks for clarification instead of acting.
- This captures jangoing's whole thesis ("conversation is not a command line") in one control.

### 2.3 · Confirm-before-mutation (the review gate)
Show the trust model directly: natural-language input -> structured proposal -> user reviews/edits ->
confirm -> shared household state updates. The point is that the human stays in control before anything
changes.
- This is jangoing's own trust story; frame it in jangoing's terms (review gate over shared household state),
  not as a borrowed pattern.

### 2.4 · Normalization mapping (small, illustrative)
A compact visual of surface form -> canonical value: "oat milk" -> oat_milk, "a couple" -> 2, drinks ->
beverage. Can be a simple animated collapse or even a static two-column mapping — keep it light. It ties
into the FST/normalization angle for the Language Engineer role.

### 2.5 · Annotation-queue view (optional; fills the page-10 placeholder)
A compact interactive showing how one utterance is routed into one of the 9 queues (correction /
low-confidence / expiry / generated / evaluation ...), with a hover explanation per queue. Shows the data
governance side without heavy build.

## 3. Reuse vs. build

| Element | Action |
|---|---|
| Tokens, Poppins, `.shell`, `.eyebrow`, `.section-label`, `.media-placeholder` | REUSE (mood) |
| Page transition, ambient cursor | Inherited via shared layout |
| Five-stage utterance breakdown (2.1) | BUILD (flagship) — fills page-7 placeholder |
| Ambiguity demo (2.2) | BUILD — jangoing's signature idea |
| Confirm-before-mutation (2.3) | BUILD — jangoing's trust gate |
| Normalization mapping (2.4) | BUILD (light) — can be static |
| Annotation-queue view (2.5) | OPTIONAL — fills page-10 placeholder |

## 4. Repo-specific notes

- Narrative lives in `lib/project-data.ts` (jangoing copy already there); demo components go in `components/`
  and render through the shared `app/work/[slug]/page.tsx`.
- Scope new CSS in `app/globals.css` with a `jg-` prefix. You can reuse the site's existing keyframe style
  for any small animation, but the demos themselves are jangoing's own.
- The three MEDIA PLACEHOLDERs (product demo, annotated-utterance breakdown, annotation workspace) map to
  demos 2.1/2.3 and 2.5 — building them removes the placeholders.
- Track new media in `docs/MEDIA_PLAN.md`.

## 5. Honesty guardrails
- Demos are locally simulated with sample utterances.
- jangoing's runtime is a deterministic interpreter today; do not imply a trained model is live.
- The 1,400 records are bootstrap candidates, not reviewed ground truth — keep that framing if numbers appear.

## 6. Priority
1. 2.1 five-stage utterance breakdown (flagship; fills a placeholder; the core of the project)
2. 2.2 ambiguity demo (jangoing's distinctive thesis)
3. 2.3 confirm-before-mutation (trust gate)
4. 2.4 normalization mapping (light; supports the FST/normalization angle)
5. 2.5 annotation-queue view (optional; fills the second placeholder)
