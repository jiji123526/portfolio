# TagSpark Case Study — UI Style Guide + Interactive Elements

> Goal: keep the OVERALL MOOD consistent with the rest of the portfolio (yap. etc.) — same tokens,
> type, and motion feel — but design the demos and interactive elements around TagSpark ITSELF, not
> by copying yap.'s components. Shared: the look. Distinct: the content.
> Grounded in TagSpark's ACTUAL production code (jiji123526/tag-spark).
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

## 1. What to share with the rest of the portfolio (mood only)

Reuse these so TagSpark clearly belongs to the same site — nothing more is required for cohesion:

```css
--paper: #f6f6f5;  --ink: #262626;  --muted: #8b8b88;  --line: #dededb;  --theme-blue: #2487ff;
```
- Font Poppins, base weight 300 (headings 400/600, letter-spacing -0.02em).
- Container `.shell` = `min(100% - 48px, 1000px)`, centered.
- Section rhythm: `.eyebrow` + `.section-label` (label + hairline), numbered "0.1 / 0.2" sub-steps,
  `.media-placeholder` for image slots.
- Motion feel: the shared page transition and ambient cursor are inherited via `app/work/[slug]/page.tsx`
  — automatic, nothing to build.
- Accessibility: any animation you add needs a `@media (prefers-reduced-motion: reduce)` fallback.

That's the whole "match the mood" requirement. Everything below is TagSpark-specific and does NOT need
to resemble any yap. component.

## 2. Interactive elements — designed around TagSpark itself

TagSpark's substance is turning noisy, user-generated tags into a ranked, explainable recommendation.
The demos should make THAT visible, drawn straight from the real code above. Keep a short honesty label
where relevant ("Simulated locally with a small sample catalog — does not send data.").

### 2.1 · Tag-select -> two-section live results (flagship)
Faithful to the real Recommend.tsx: the user toggles preference tag chips, and results render in the
same two sections the product uses — "완벽 매치 추천작" (contains all selected tags) and
"이런 포타는 어떠세요?" (similarity-ranked). This shows the actual product behavior, not a mock-up.
- Chips: selected = `--theme-blue`; unselected = `--line` border. Use the real category ordering
  (세계관→장르→설정→관계→분위기→분량→완결여부).
- Use a small bundled sample of the real `reco-data` shape so the ordering matches production.
- Reduced motion: reorder instantly (no slide).

### 2.2 · "Why this result?" score breakdown (explainability)
On hover/tap of a result, show which layer fired per matched tag: EXACT 1.0 / ALIAS 0.9 / SAME_CAT 0.35 /
cluster 0.6, times its CAT_WEIGHT, plus the core-tag bonus and the sqrt length-normalization. Pull the
exact constants from reco.ts so the numbers are real.
- Style: small stacked bars / labeled list in `--muted`; highlight the winning layer in `--theme-blue`.
- This is TagSpark's most distinctive demo — turning invisible scoring into an explainable view.

### 2.3 · Alias-collapse illustration (normalization made visible)
Show real `buildAliasSet` behavior: variants split on `, · / |`, get normalized (lowercase, NFKC,
punctuation stripped), and collapse into one canonical token set. Can be a light animation or even a
static "surface variants -> one canonical tag" mapping — keep it simple.
- Ties into the normalization/FST angle for the Language Engineer role.

### 2.4 · Cluster-neighbor view (optional)
Render a few nodes from an actual `TAG_CLUSTERS_BY_NAME` entry (e.g. 부부 / 육아 / 이혼 / 정략결혼);
hovering a tag highlights its cluster neighbors at SIMILARITY_INTRA. Lightweight SVG, highlight in
`--theme-blue`. Shows the hand-built thesaurus as an actual graph.

## 3. Reuse vs. build

| Element | Action |
|---|---|
| Tokens, Poppins, `.shell`, `.eyebrow`, `.section-label`, `.media-placeholder` | REUSE (mood) |
| Page transition, ambient cursor | Inherited via shared layout |
| Two-section tag-select demo (2.1) | BUILD (flagship) — faithful to Recommend.tsx |
| Score breakdown (2.2) | BUILD — use real reco.ts constants |
| Alias-collapse illustration (2.3) | BUILD (light) — can be static |
| Cluster-neighbor view (2.4) | OPTIONAL |

## 4. Repo-specific implementation notes

- Case studies render via `app/work/[slug]/page.tsx`; narrative lives in `lib/project-data.ts` — add
  TagSpark there. Put demo components in `components/`; scope CSS in `app/globals.css` with a `.ts-` prefix.
- The TagSpark repo itself already ships accessible interactions (role/tabIndex/aria) and a real
  `/api/reco-data` contract; the portfolio demo should stay faithful to that shape.
- Track new media (tag-select demo, score-breakdown) in `docs/MEDIA_PLAN.md`.

## 5. Honesty guardrails (do not overstate)

- Cluster similarity is a HAND-CURATED constant graph (SIMILARITY_INTRA 0.6), not learned embeddings.
- `aliasOverlap` uses substring containment — powerful but simple; describe it accurately.
- Frame the whole thing as a strong, interpretable rule-based baseline, with embeddings as a possible
  next step. Truthful and still impressive.

## 6. Priority
1. 2.1 two-section tag-select demo (faithful to production; highest payoff)
2. 2.2 score breakdown (explainability; best for Language Engineer reviewers)
3. 2.3 alias-collapse illustration (cheap; ties to normalization story)
4. 2.4 cluster-neighbor view (optional polish)
