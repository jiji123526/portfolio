# TagSpark Case Study — UI Style Guide + Interactive Elements (grounded in production code)

> Goal: make the TagSpark case-study page consistent with the portfolio (jiji123526/portfolio) and add
> interactive elements in the spirit of yap.'s demos — but grounded in TagSpark's ACTUAL production code
> (jiji123526/tag-spark), not assumptions.
> Verified files: src/lib/reco.ts, src/lib/utils.ts, src/lib/types.ts, src/pages/Recommend.tsx.

---

## 0. Ground truth from the production code (use these exact facts)

**Data model (src/lib/types.ts):**
```ts
Tag     { id: number; name: string; category: string; aliases?: string[] }
Work    { id; title; author; source_url; views; likes; comments; posted_at; aliases?; author_aliases? }
WorkTag { work_id; tag_id; weight }   // weight is 1.0 or 2.0 (2.0 = "core" tag)
```

**Real normalization pipeline (src/lib/utils.ts):**
- `normalizeToken(s)`: lowercase -> Unicode NFKC normalize -> strip whitespace -> keep only `\p{L}\p{N}`
  (drops punctuation/symbols). A genuine text-normalization step.
- `buildAliasSet(name, aliases)`: splits on `,`, `·`, `/`, `|`, normalizes each token, unions into a Set.
- `aliasOverlap(a, b)`: true on exact token equality OR substring containment (`x.includes(y)`).

**Real scoring (src/lib/reco.ts):** layered per work tag, weighted by category:
- EXACT 1.0 (same tag id) [+CORE_BONUS 0.25 if weight 2.0]
- ALIAS 0.9 (alias/substring overlap within same category) [+0.125 if core]
- SAME_CAT 0.35 (same category, different tag) [+0.0625 if core]
- cluster similarity (SIMILARITY_INTRA 0.6, category-agnostic) from hand-curated `TAG_CLUSTERS_BY_NAME`
- CAT_WEIGHT: 세계관/설정 1.0, 관계/장르 0.9, 분위기 0.8, 씨피고정 0.7, 분량 0.5, 완결여부 0.4
- length-normalized: `raw / sqrt(tagCount)` when NORMALIZE = true

**Real results UI (src/pages/Recommend.tsx):**
- Loads `/api/reco-data` (works, tags, workTags).
- TWO result sections: "완벽 매치 추천작" (exact matches, shuffled) and "이런 포타는 어떠세요?"
  (similar, sorted by `similarity` desc, `PAGE_SIZE = 10`).
- Tags on a work are ordered by weight -> category order (세계관→장르→설정→관계→분위기→분량→완결여부) → name.
- Accessibility already present: `role="button"`, `tabIndex`, `onKeyDown` (Enter/Space), `aria-label`.

## 1. Design tokens (reuse from portfolio app/globals.css :root)

```css
--paper: #f6f6f5;  --ink: #262626;  --muted: #8b8b88;  --line: #dededb;  --theme-blue: #2487ff;
```
- Font Poppins, base weight 300 (headings 400/600, letter-spacing -0.02em).
- Container `.shell` = `min(100% - 48px, 1000px)`, centered.
- Section rhythm: reuse `.eyebrow` + `.section-label` (label + flexible hairline), `.media-placeholder`.

## 2. Motion conventions to inherit

- Page transition on `body > main` (translateY + cubic-bezier(0.76,0,0.24,1)) is inherited via the
  shared `app/work/[slug]/page.tsx` layout — nothing to build per page.
- Ambient cursor `.aa-ambient-cursor` (#49a1ff) is global; mark interactive TagSpark elements with
  `[data-cursor-interactive]`.
- REQUIRED: every animation needs a `@media (prefers-reduced-motion: reduce)` fallback (resting state +
  `animation: none !important`), exactly like the existing `yap-thumbnail-*` keyframes.

## 3. Interactive elements — grounded in what the code actually does

### 3.1 · Tag-select -> two-section live results (flagship)
Mirror the real Recommend.tsx: user toggles preference tag chips, and results render in the SAME two
sections the product uses — "완벽 매치 추천작" (contains all selected tags) and "이런 포타는 어떠세요?"
(similarity-ranked). This is faithful to production, not a fictional demo.
- Chips: selected = `--theme-blue`; unselected = `--line` border. Reuse category ordering
  (세계관→장르→설정→관계→분위기→분량→완결여부).
- Use a small bundled sample of the real `reco-data` shape (works/tags/workTags) so scoring order matches.
- Honesty label (yap. style): "Simulated locally with a small sample catalog — same two-section logic
  and scoring order as the live recommender."
- Reduced motion: reorder instantly (no slide).

### 3.2 · "Why this result?" score breakdown (explainability — strongest for Language Engineer)
On hover/tap of a result, show which layer fired per matched tag: EXACT 1.0 / ALIAS 0.9 /
SAME_CAT 0.35 / cluster 0.6, times its CAT_WEIGHT, plus the core-tag bonus and the sqrt length-
normalization. Pull the exact constants from reco.ts so the numbers are real.
- Style: small stacked bars / labeled list in `--muted`; highlight the winning layer in `--theme-blue`.

### 3.3 · Alias-collapse micro-animation (ties to normalization narrative)
Show real `buildAliasSet` behavior: variants split on `, · / |`, get normalized (lowercase, NFKC,
punctuation stripped), and collapse into one canonical token set. Animate a couple of surface variants
merging into one chip.
- Implement as CSS keyframes mirroring `yap-thumbnail-*` (staggered opacity + translateY) + reduced-motion fallback.

### 3.4 · Cluster-neighbor hover (optional, matches homepage "tuner" spirit)
Render a few nodes from an actual `TAG_CLUSTERS_BY_NAME` entry (e.g. 부부 / 육아 / 이혼 / 정략결혼);
hovering a tag highlights its cluster neighbors at SIMILARITY_INTRA. Lightweight SVG, highlight in `--theme-blue`.

## 4. Reuse vs. build

| Element | Action |
|---|---|
| Tokens, Poppins, `.shell`, `.eyebrow`, `.section-label`, `.media-placeholder` | REUSE |
| Page transition, ambient cursor | Inherited via shared layout |
| Two-section tag-select demo (3.1) | BUILD (flagship) — mirror Recommend.tsx |
| Score breakdown (3.2) | BUILD — use real reco.ts constants |
| Alias-collapse keyframes (3.3) | BUILD — mirror yap-thumbnail keyframes |
| Cluster hover (3.4) | OPTIONAL |

## 5. Repo-specific implementation notes

- Case studies render via `app/work/[slug]/page.tsx`; narrative lives in `lib/project-data.ts` — add
  TagSpark there. Put demo components in `components/`; scope CSS in `app/globals.css` with a `.ts-` prefix
  (matching the existing `yap-thumbnail-*` naming rhythm).
- The TagSpark repo itself already ships accessible interactions (role/tabIndex/aria) and a real
  `/api/reco-data` contract; the portfolio demo should stay faithful to that shape.
- Track new media (tag-select demo, score-breakdown) in `docs/MEDIA_PLAN.md`.

## 6. Honesty guardrails (do not overstate)

- Cluster similarity is a HAND-CURATED constant graph (SIMILARITY_INTRA 0.6), not learned embeddings.
- `aliasOverlap` uses substring containment — powerful but simple; describe it accurately.
- Frame the whole thing as a strong, interpretable rule-based baseline (same philosophy as jangoing's
  TF-IDF baseline), with embeddings as a possible next step. This is truthful and still impressive.

## 7. Priority
1. 3.1 two-section tag-select demo (faithful to production; highest payoff)
2. 3.2 score breakdown (explainability; best for Language Engineer reviewers)
3. 3.3 alias-collapse animation (cheap CSS; ties to normalization story)
4. 3.4 cluster hover (optional polish)
