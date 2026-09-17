# TagSpark — Portfolio Case Study (Language Engineer lens)

> Repo: https://github.com/jiji123526/tag-spark  (recommendation logic: src/lib/reco.ts)
> Framing insight: TagSpark is not "a tag-based recommender." Grounded in the actual reco.ts code,
> it is a lexical-resource project: normalizing noisy, user-generated tags via alias sets, a
> hand-built similarity thesaurus, and hierarchical weighted scoring — the same normalization/
> ontology discipline as jangoing. This maps directly to the Language Engineer (AGI Data Services) role.
>
> Honesty note: clusters are hand-curated and similarity weights are fixed constants (not learned
> embeddings). Frame as a strong rule-based baseline before model complexity (same philosophy as
> jangoing's TF-IDF baseline). Do NOT call it a learned/ML similarity model.

---

## Hero

**Turning noisy, user-generated tags into a usable signal**

User-generated tags are messy: the same concept shows up under different surface forms, as aliases,
and as semantically related but distinct labels. TagSpark treats this as a lexical-resource problem,
building the normalization and similarity structure a recommender needs before it can rank anything.

*Role: Full-stack Developer · Stack: React 18, TypeScript, Vite, Tailwind, Neon (Postgres), Vercel*

## PROBLEM

A recommender is only as good as the metadata under it. Because tags are authored freely by people,
identical meaning fragments across variants, aliases, and near-synonyms. Matching on raw string
identity would miss most of the real overlap. The design problem was structuring messy human
metadata into canonical, comparable signals.

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

Metadata quality determines recommendation quality. Before any model, a normalization layer (alias
sets), a curated similarity resource (clusters), and an explicit weighted-scoring policy already
produce meaningful, controllable recommendations. A natural next step is to grow the hand-curated
clusters into embedding-based similarity, keeping the rule-based structure as an interpretable
baseline.

---

## Language Engineer requirement mapping

| Role requirement | TagSpark evidence |
|---|---|
| Language annotation / data markup | Tag alias sets and category taxonomy = structured markup over metadata |
| Analyze/extract language insights from data | Cluster design and category weighting come from analyzing tag co-occurrence and meaning |
| Build tools in Python/scripting | (TagSpark is TS; pair with Python NLP work from jangoing/GOLA.IO for the scripting requirement) |
| Dataset construction, dialog/semantic schemas | 8-dimension tag schema, alias sets, similarity graph |
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
