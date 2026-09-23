# TagSpark — Portfolio Case Study (Language Engineer lens)

> Repo: https://github.com/jiji123526/tag-spark  (recommendation logic: src/lib/reco.ts)
> Framing insight: TagSpark began where the source platform had no usable tagging at all. The primary
> contribution is a from-scratch language dataset: all 229 works were read, a 9-category / 76-tag
> taxonomy was induced from recurring patterns, and every work was hand-annotated. Alias
> normalization, the curated thesaurus, and weighted ranking sit on top of that dataset.
>
> Honesty note: clusters are hand-curated and similarity weights are fixed constants (not learned
> embeddings). Frame as a strong rule-based baseline before model complexity (same philosophy as
> jangoing's TF-IDF baseline). Do NOT call it a learned/ML similarity model.

---

## Hero

**Building the language data a controllable recommender needs**

The source platform offered no usable tags, so curated discovery was impossible. I read all 229
works, derived the schema inductively, and annotated the complete catalog before building the
normalization and recommendation layers.

*Role: Full-stack Developer · Stack: React 18, TypeScript, Vite, Tailwind, Neon (Postgres), Vercel*

## PROBLEM

A recommender is only as good as the metadata under it, and this source platform had none. The first
problem was therefore dataset construction: turn a fully read corpus into an inductive taxonomy,
annotation schema, alias resource, and full-coverage catalog that could support controllable search.

## 00 · Dataset from scratch

I read all 229 works, induced 9 categories and 76 tags from recurring patterns, defined alias sets,
and manually tagged every work. The resulting 1,630 work–tag assignments are not a sample; they are
the reviewed language-data foundation for the full catalog.

## 01 · Alias normalization

Each tag expands into an alias set (its name plus known variants), and matches are decided by set
overlap rather than exact string equality. Surface variants of the same concept collapse into one
signal. This is the same normalization discipline behind my NLP annotation work: map surface forms
to a canonical identity before comparing.

*(code: buildAliasSet, aliasOverlap)*

## 02 · A hand-built similarity thesaurus

Semantically related tags are grouped into curated clusters and compiled into a tag-to-tag
similarity graph. Related concepts earn partial credit even when they are not the same tag, so
recommendations capture meaning, not just string identity. Building and maintaining this cluster
resource is, in effect, authoring a small thesaurus/ontology by hand.

*(code: TAG_CLUSTERS_BY_NAME -> buildSimilarityGraphFromClusters, SIMILARITY_INTRA)*

## 03 · Hierarchical, weighted scoring

Scoring is layered, from strongest to weakest evidence:
1. exact tag match
2. alias match within the same category
3. same-category (different tag)
4. cross-category cluster similarity

Each layer is weighted by a per-dimension category weight (e.g. worldview/setting weigh more than
volume/completion status), and scores are length-normalized (divide by sqrt of tag count) so
tag-heavy works do not dominate. This is a deliberate precision/recall tradeoff expressed in code.

*(code: buildSimilarityScorer / scoreWork, CAT_WEIGHT, NORMALIZE)*

## 04 · Semantic include / exclude

Exclusions expand through aliases and cluster neighbors, so filtering out a concept also removes its
variants and near-synonyms, not just the exact tag the user clicked.

*(code: expandExcludedTagIds, filterOutExcludedWorks)*

## TAKEAWAYS

Language-data quality determines recommendation quality. Before any model, the full-coverage
taxonomy and annotation layer make normalization, curated similarity, and explicit weighted scoring
possible. Phase 2 adds validated mood axes and personalization without replacing that reviewed
foundation or presenting learned similarity as the current system.

## PHASE 2 · PRODUCT DIRECTION

Phase 2 separates tags by measurement type: continuous moods become candidate axes, binary
properties stay filters, and nominal properties remain categories. Desktop may expose a 2D map;
mobile translates the same distance signal into sliders, ranked results, and similar works.

Cold start remains content-based. A visitor selects 3–5 favorites, their tags form a recommendation
vector, and their coordinates form a map point. Explicit “more like this” / “not for me” feedback is
preferred over reading history. Pair and triplet judgments, reviewer agreement, and Bradley–Terry or
logistic regression gate axis weights. Learned similarity is reconsidered only if the small,
single-domain catalog expands enough to support it.

## WHAT I'D IMPROVE NEXT

TagSpark works, but building it made the next set of problems clear. Naming them is part of the work.

**01 · From a hardcoded thesaurus to data.** Today the similarity thesaurus lives in code
(`TAG_CLUSTERS_BY_NAME`) with a single global weight. It is interpretable and correct, but it can't
grow without a redeploy, and every relationship carries the same strength. Next: move the graph into a
`tag_similarity` table with per-edge weights and provenance, keeping the curated edges as an
interpretable backbone I can later augment with embedding-derived similarity.

**02 · More precise alias matching.** Matching currently accepts substring containment
(`aliasOverlap`), which is fast but can link tokens that merely share characters. Next: prefer exact
normalized-token intersection, and gate substring matching behind a minimum length or word-boundary
check. A small change with a real gain in linguistic precision.

**03 · A single source of truth for categories.** Category weights and ordering are defined in two
places (`reco.ts` and `Recommend.tsx`), and `Tag.category` is an untyped string. Next: a shared
category union type and one source of truth so the two never drift.

**04 · Tests around the scoring contract.** Scoring is the heart of the product but has no guardrail.
Next: unit tests that pin the intended ordering (exact beats alias beats same-category beats cluster
similarity, the core-tag bonus applies, length normalization holds) so future changes can't silently
reorder recommendations.

**05 · Stable, meaningful result order.** Exact matches are shuffled on every render, so a returning
user sees a different order. Next: a stable sort (recency or engagement) or a seeded shuffle.

Why name these at all: a recommender is only as trustworthy as the data and rules under it. The value
isn't just what shipped, it's knowing precisely where the seams are and in what order I'd strengthen them.

---

## Language Engineer requirement mapping

| Role requirement | TagSpark evidence |
|---|---|
| Language annotation / data markup | Full annotation of 229 works; 9-category / 76-tag inductive taxonomy and alias sets |
| Analyze/extract language insights from data | Cluster design and category weighting come from analyzing tag co-occurrence and meaning |
| Build tools in Python/scripting | (TagSpark is TS; pair with Python NLP work from jangoing/GOLA.IO for the scripting requirement) |
| Dataset construction, dialog/semantic schemas | From-scratch full-corpus dataset; 9-category tag schema, alias sets, similarity graph |
| Grammars / FSTs (preferred) | Normalization discipline is adjacent; the literal FST claim belongs to jangoing Stage D |
| Version control + agile (preferred) | Git/GitHub, Vercel CI/CD, daily scrape cron |
| Database queries / data analysis (preferred) | Neon Postgres, work/tag/work_tag relational model |

## Consistency with jangoing (one identity, two projects)

- jangoing: conversational language -> structure + normalization (annotation, intent ontology, Stage D normalization)
- TagSpark: tag metadata -> normalization + similarity thesaurus + weighted scoring
- Shared thread: "normalize noisy human language data into usable, canonical signals." This
  consistency is a strong asset for the Language Engineer role.

## Notes before publishing
- Generalize domain from "web-novel" to "user-generated / creative-work metadata" so the skill
  reads domain-independent (optional — web-novel is fine if you prefer specificity).
- Keep the honesty note: hand-curated clusters + fixed weights = rule-based baseline, not learned model.
- Consider adding a MEDIA screenshot (tag selection -> recommendation results) as TagSpark has none yet.
