# jangoing Portfolio Page — Improvements for Language Engineer (AGI Data Services) role

> Job: Language Engineer, AGI Data Services / Alexa Operations (L4). ID 10421923.
> Key insight: for THIS role, jangoing's ML/language-data depth is the strength, not a liability.
> The goal is NOT to "UX-ify" the page (that was for the UX Designer role) — it's to make the
> linguistic/data-engineering rigor scan clearly to a Language Engineer reviewer, and to hit the
> preferred qualifications (FSTs, multilingual, model evaluation) explicitly.
>
> Role-requirement -> jangoing mapping (jangoing already implements most of the JD):
> - "Design data collection tasks, author instructions, define quality targets" -> annotation conventions, 9 queues, quality gate
> - "Analyze/extract language insights from large data" -> 5-stage NLU, error analysis, phrase-family analysis
> - "Build tools for data analysis/authoring in Python" -> annotation workspace, dataset pipeline
> - "Use modeling tools to bootstrap/test" -> TF-IDF baseline, synthetic-v1 bootstrap
> - "Evaluate performance of language models" -> evaluation gate, joint-action exact match, holdout
> - dataset construction, dialog/semantic schemas -> 11-intent ontology, entity-span policy, joint action

---

## Improvement 1 — Make requirement keywords scannable

Add a short parenthetical in each stage/section so a Language Engineer reviewer sees their own vocabulary:

- Stage A · Relevance -> *(4-class actionability classification)*
- Stage B · Intent -> *(11-intent semantic ontology)*
- Stage C · Entity Span -> *(sequence labeling / span annotation policy)*
- Stage D · Normalization -> *(rule-based / finite-state normalization)*
- Stage E · Joint Action -> *(structured semantic parse)*
- 9 annotation queues -> *(active-learning-style data routing)*
- TF-IDF baseline -> *(reproducible baseline before model complexity)*

## Improvement 2 — Connect normalization to FSTs (targets a preferred qualification)

Preferred qualification: "Experience in writing grammars and building FSTs."
jangoing's Stage D normalization is functionally what an FST does. Add:

> **Normalization as a finite-state contract.** Surface forms map to canonical, household-scoped
> values (oat milk -> oat_milk, "a couple" -> 2). I designed this as a deterministic, rule-based
> normalization contract — the same class of finite-state transformation FSTs formalize — so the
> trained model can later replace the interpreter behind an unchanged structured-action contract.

*(Stretch: reimplement Stage D as a real Pynini FST so "built FSTs" is literally true.)*

## Improvement 3 — Promote a "Data Quality & Governance" highlight

Core JD theme: "define and implement quality targets and mechanisms."
jangoing already has: leakage checks, dedup, split manifests, dataset hashes, pseudonymous exports,
"AI output is a draft, not a label." Pull these into one highlighted section:

> **Quality and governance by design.** Reviewed-first labeling (AI drafts, humans decide), 9 routing
> queues, phrase-family leakage checks, deduplication, versioned split manifests, and dataset hashes
> keep model comparisons reproducible. Generated data bootstraps training only; the frozen evaluation
> set is human-reviewed and never used for training. Production exports are pseudonymized and exclude
> secrets and unrelated personal content.

## Improvement 4 — Foreground multilingual (basic qualification)

Basic qualification: "speech and text language data in multiple languages."

> **Cross-lingual by design.** English-first today, with a Korean-English ASR phase on the roadmap.
> As a native Korean and fluent English speaker, cross-lingual grounding is a core design concern,
> not an afterthought — and it connects directly to prior speech-to-text data work on Korean
> technical-meeting transcription.

## Improvement 5 — Frame evaluation as model-evaluation methodology

JD responsibility: "Collaborate with scientists to evaluate performance of language models."

> **Evaluation methodology, not just labels.** The evaluation gate scores intent classification,
> entity extraction, normalization, and joint-action exact match, with diagnostics sliced by phrase
> family, unseen items, indirect requests, and contextual dependency. Multi-action examples are
> excluded rather than collapsed, so single-intent baselines are not silently corrupted.

## Improvement 6 — Fill the MEDIA PLACEHOLDERs

Three placeholders weaken every version of this page. Highest value for THIS role:
- **Annotated utterance breakdown** (raw sentence -> spans -> relevance -> intent -> normalized -> joint action)
- **Annotation workspace** (queue selection -> AI draft -> review -> saved annotation)
- **Product demo** (natural-language update -> structured proposal -> confirm -> shared state)
Even static screenshots materially strengthen the "shows real language-data work" story.

---

## UX Designer vs. Language Engineer emphasis (do NOT mix)

| Element | UX Designer version | Language Engineer version (THIS role) |
|---|---|---|
| 5-stage NLU | trim, add UX lens | KEEP, strengthen with LE terminology |
| annotation queues / governance | de-emphasize | PROMOTE to a highlight |
| confirm-before-mutation | frame as UX trust pattern | frame as a data-validation mechanism |
| "designing for AI humility" | emphasize | secondary |
| FST / normalization | omit | EMPHASIZE (preferred qualification) |
| multilingual (KO-EN) | minor | foreground (basic qualification) |

## Notes / things to verify before publishing
- Degree requirement for this role is "Master's or higher." Per known background, a Computational
  Linguistics Master's is in progress — confirm exact status and state it clearly on resume/application.
- "Built FSTs" — only claim literally if Stage D is reimplemented as a real FST (e.g. Pynini).
- Keep the 1,400-candidate framing honest: bootstrap candidates, not reviewed ground truth.
