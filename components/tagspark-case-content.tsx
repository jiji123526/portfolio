import { TagSparkPreferenceMedia } from '@/components/tagspark-preference-media';

const constraints = [
  { number: '01', category: 'Preference', title: 'Taste needs an explicit input', body: 'People choose the themes, relationships, moods, and story conditions they want instead of waiting for a hidden profile to infer them.' },
  { number: '02', category: 'Language', title: 'Human tags are inconsistent', body: 'Names, aliases, separators, and neighboring concepts fragment equivalent or related preference signals before ranking begins.' },
  { number: '03', category: 'Catalog', title: 'Recommendations depend on maintained data', body: 'Works, tag relationships, publication dates, and engagement metadata must stay consistent enough for ranking and browsing to remain useful.' },
] as const;

const baselineSignals = [
  ['EXACT TAG', '1.0'], ['ALIAS OVERLAP', '0.9'], ['SAME CATEGORY', '0.35'],
  ['CURATED NEIGHBOR', '0.6'], ['CORE TAG', '+0.25'],
] as const;

const measurementTypes = [
  { type: 'CONTINUOUS', examples: 'Darkness · relational tension', treatment: 'Axis or slider' },
  { type: 'BINARY', examples: 'Completed · adult · school setting', treatment: 'Filter' },
  { type: 'NOMINAL', examples: 'Genre · worldview', treatment: 'Category or grouping' },
] as const;

const catalogSnapshot = [
  ['229', 'WORKS'], ['76', 'TAGS'], ['9', 'CATEGORIES'], ['1,630', 'WORK–TAG ASSIGNMENTS'],
] as const;

const evaluationGroups = [
  { title: 'HUMAN AGREEMENT', body: 'Cohen / Fleiss Kappa · Krippendorff Alpha' },
  { title: 'RANKING AGREEMENT', body: 'Spearman correlation · Kendall tau · pair reconstruction' },
  { title: 'RETRIEVAL + GEOMETRY', body: 'Precision@K · nDCG@K · trustworthiness · exclusion violations' },
] as const;

const phaseTwoGates = [
  { title: 'Freeze the baseline', body: 'Protect exact-match recall, exclusions, normalization, and stable ordering with regression tests before introducing a second ranking layer.' },
  { title: 'Validate two candidate axes', body: 'Start with darkness and relational tension, using independent pair and triplet judgments rather than treating projection coordinates as ground truth.' },
  { title: 'Prove retrieval value', body: 'Require agreement with trusted comparisons and measurable retrieval gains without weakening Phase 1 constraints.' },
  { title: 'Release as a controlled layer', body: 'Expose only validated axes behind a feature flag, retain the interpretable baseline as fallback, and show why each work moved.' },
] as const;

function TagSparkPlaceholder({ label, note, className = '' }: { label: string; note: string; className?: string }) {
  return (
    <div className={`tagspark-media-placeholder magnetic ${className}`.trim()}>
      <div aria-hidden="true"><span /><span /><span /></div>
      <strong>{label}</strong>
      <p>MEDIA PLACEHOLDER · {note}</p>
    </div>
  );
}

export function TagSparkCaseContent() {
  return (
    <div className="yap-case-content tagspark-case-content">
      <section className="yap-problem shell case-section" id="tagspark-problem">
        <p className="eyebrow">PRODUCT CONTEXT</p>
        <h2 className="yap-title-effect">Korean web-fiction discovery, shaped by <mark>explicit taste.</mark></h2>
        <p className="yap-problem-intro">TagSpark is a mobile-first web recommender for exploring Korean web fiction through tags. People state what they want to include or avoid, then browse perfect matches separately from related recommendations.</p>
        <div className="yap-constraint-grid">
          {constraints.map((constraint) => (
            <article key={constraint.number}>
              <div className="yap-constraint-heading"><span>{constraint.number}</span><small>{constraint.category}</small></div>
              <h3>{constraint.title}</h3><p>{constraint.body}</p>
            </article>
          ))}
        </div>
        <p className="yap-problem-statement">How might we turn subjective Korean-language tags into a recommendation signal people can directly control?</p>
      </section>

      <section className="tagspark-phase-intro shell" aria-label="TagSpark phases">
        <div><span>PHASE 1 · SHIPPED</span><strong>Explicit control and an interpretable baseline</strong></div>
        <i aria-hidden="true">→</i>
        <div><span>PHASE 2 · PLANNED</span><strong>Validated semantic axes for continuous exploration</strong></div>
      </section>

      <section className="tagspark-feature shell case-section" id="tagspark-control">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 1 · 01 · EXPLICIT PREFERENCE</p>
          <h2>People state their taste. TagSpark makes it comparable.</h2>
          <p>Include and exclude choices keep preference visible. Surface forms then collapse through lowercase, Unicode NFKC normalization, whitespace removal, punctuation stripping, and known aliases before the catalog is compared by canonical tag ID.</p>
          <div className="tagspark-language-flow" aria-label="Preference and normalization flow"><span>include + exclude</span><i>→</i><span>alias normalization</span><i>→</i><strong>canonical tag ids</strong></div>
        </div>
        <TagSparkPreferenceMedia />
      </section>

      <section className="tagspark-baseline" id="tagspark-baseline">
        <div className="shell case-section">
          <p className="eyebrow">PHASE 1 · 02 · INTERPRETABLE BASELINE</p>
          <div className="tagspark-baseline-heading">
            <h2>A small, inspectable model ranks the catalog.</h2>
            <p>Exact and alias matches receive the strongest evidence. Category overlap and hand-curated neighbors add weaker context before results split into perfect matches and related recommendations.</p>
          </div>
          <div className="tagspark-baseline-flow" aria-label="Current recommendation baseline">
            {['EXACT MATCH', 'ALIAS', 'SAME CATEGORY', 'CURATED NEIGHBOR', 'WEIGHTED SCORE'].map((label, index) => (
              <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>
            ))}
          </div>
          <div className="tagspark-baseline-grid">
            <div className="tagspark-signal-table">
              <div className="tagspark-signal-table__heading"><span>SIGNAL</span><span>CONTRIBUTION</span></div>
              {baselineSignals.map(([label, score]) => <div key={label}><span>{label}</span><strong>{score}</strong></div>)}
            </div>
            <dl className="tagspark-baseline-results">
              <div><dt>PERFECT MATCH</dt><dd>Every required tag ID is present.</dd></div>
              <div><dt>RELATED</dt><dd>Grouped by exact overlap, then ordered by weighted score.</dd></div>
              <div><dt>CURRENT LIMIT</dt><dd>Curated relationships use a fixed 0.6 contribution; no learned embedding participates in ranking.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="tagspark-operations shell case-section" id="tagspark-operations">
        <div><p className="eyebrow">PHASE 1 · 03 · CATALOG OPERATIONS</p><h2>The baseline depends on maintained, reviewable data.</h2></div>
        <div className="tagspark-operations-flow" aria-label="Catalog operations flow">
          {['NEON CATALOG', 'VERCEL API', 'SCHEDULED REFRESH', 'AVAILABILITY CHECK'].map((label, index) => <div key={label}><span>{label}</span>{index < 3 && <i aria-hidden="true">→</i>}</div>)}
        </div>
        <dl className="tagspark-operations-facts">
          <div><dt>CATALOG</dt><dd>Works, canonical tags, and reviewed work–tag relations</dd></div>
          <div><dt>MAINTENANCE</dt><dd>Scheduled Postype metadata refresh</dd></div>
          <div><dt>SAFETY</dt><dd>Validation, deduplication, and unavailable-work state</dd></div>
        </dl>
      </section>

      <section className="tagspark-phase-transition" id="tagspark-phase-two">
        <div className="shell case-section">
          <p className="eyebrow">WHY A SECOND PHASE</p>
          <h2>Tags can explain a match.<br /><mark>They cannot always express distance.</mark></h2>
          <div className="tagspark-transition-grid">
            <p>Phase 1 can identify exact, aliased, categorical, and curated relationships. It cannot show how much darker, tenser, or more emotionally intense one work feels than another.</p>
            <ul><li>Every member of a curated cluster is treated as equally related.</li><li>Degrees of subjective qualities remain invisible.</li><li>Related results cannot explain the direction of their difference.</li></ul>
          </div>
        </div>
      </section>

      <section className="tagspark-phase-two-model shell case-section" id="tagspark-model">
        <div className="tagspark-phase-two-heading">
          <div><p className="eyebrow">PHASE 2 · PLANNED · MODELING DECISION</p><h2>Not every tag belongs on an axis.</h2></div>
          <p>Phase 2 keeps explicit constraints and adds distance only where a quality can meaningfully vary by degree. It does not force all tags into one opaque latent map.</p>
        </div>
        <div className="tagspark-measurement-table">
          {measurementTypes.map((item, index) => <article key={item.type}><span>0{index + 1}</span><div><strong>{item.type}</strong><p>{item.examples}</p></div><b>{item.treatment}</b></article>)}
        </div>
        <div className="tagspark-snapshot" aria-label="Prototype catalog snapshot">
          <header><span>PROTOTYPE DATASET SNAPSHOT</span><p>Reviewed catalog data used to frame the exploration—not a performance result.</p></header>
          <div>{catalogSnapshot.map(([value, label]) => <section key={label}><strong>{value}</strong><span>{label}</span></section>)}</div>
        </div>
        <div className="tagspark-research-flow" aria-label="Phase 2 concept-building process">
          {['REVIEWED TAGS', '76-D WORK VECTORS', 'PROJECTION CHECK', 'SEMANTIC AXES', 'PRODUCT CONTROLS'].map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>)}
        </div>
        <aside className="tagspark-projection-note">
          <div><span>GLOBAL PROJECTION CHECK</span><strong>11.9%</strong><small>FIRST PCA COMPONENT</small></div>
          <p>One global projection carried too little interpretable structure to become the primary product model. The result shifted Phase 2 toward a few named, independently validated semantic axes.</p>
        </aside>
      </section>

      <section className="tagspark-axes" id="tagspark-axes">
        <div className="shell case-section">
          <p className="eyebrow">PHASE 2 · CANDIDATE AXES · NOT YET VALIDATED</p>
          <div className="tagspark-axes-heading"><h2>Start with two directions people can judge.</h2><p>Candidate coordinates are hypotheses, not permanent labels. Each axis must agree with independent human comparisons before it can influence recommendations.</p></div>
          <div className="tagspark-axis-grid">
            <article><header><span>DARKNESS</span><small>EXPLORATORY RANGE · −3.2 TO +2.8</small></header><div><b>DARKER</b><i aria-hidden="true"><span /></i><b>LIGHTER</b></div><footer><span>낮은 밤</span><span>시고르자브종</span></footer></article>
            <article><header><span>RELATIONAL TENSION</span><small>CANDIDATE AXIS</small></header><div><b>LOWER</b><i aria-hidden="true"><span /></i><b>HIGHER</b></div><footer><span>Requires pairwise review</span><span>Requires pairwise review</span></footer></article>
          </div>
        </div>
      </section>

      <section className="tagspark-phase-two-product shell case-section" id="tagspark-experience">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 2 · PRODUCT EXPRESSION</p><h2>The embedding becomes a control, not a map.</h2>
          <p>Include and exclude tags remain hard constraints. Validated axes then refine distance among the remaining works, while the interface shows which tags and axis positions moved each result.</p>
          <div className="tagspark-language-flow" aria-label="Planned Phase 2 product flow"><span>hard filters</span><i>→</i><span>semantic distance</span><i>→</i><span>ranked works</span><i>→</i><strong>visible rationale</strong></div>
        </div>
        <TagSparkPlaceholder className="tagspark-embedding-placeholder" label="Multi-axis mobile exploration" note="AXIS CONTROLS → RANKED WORKS" />
      </section>

      <section className="tagspark-validation shell case-section" id="tagspark-validation">
        <div className="tagspark-validation-heading">
          <div><p className="eyebrow">PHASE 2 · VALIDATION + RELEASE GATES</p><h2>Subjective similarity still needs a measurement contract.</h2></div>
          <p>Pair and triplet judgments create the trusted comparisons. Agreement, retrieval value, and product clarity must all pass before an axis can leave the exploratory layer.</p>
        </div>
        <div className="tagspark-validation-flow" aria-label="Embedding validation pipeline">
          {['PAIR / TRIPLET REVIEW', 'AGREEMENT GATE', 'TRUSTED COMPARISONS', 'AXIS EVALUATION', 'PRODUCT GATE'].map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>)}
        </div>
        <div className="tagspark-evaluation-groups">{evaluationGroups.map((group) => <article key={group.title}><strong>{group.title}</strong><p>{group.body}</p></article>)}</div>
        <aside className="tagspark-validation-note"><span>EVALUATION CONSTRAINT</span><p>The catalog currently has one primary tagger per work, so conventional inter-annotator agreement cannot yet be reported. Phase 2 requires a smaller comparison set reviewed independently by 3–5 trusted judges.</p></aside>
      </section>

      <section className="tagspark-tagging-compact shell case-section" id="tagspark-tagging">
        <div><p className="eyebrow">SUPPORTING TRACK · REVIEWED TAGGING</p><h2>Scale catalog coverage without surrendering review.</h2><p>A future JEV-assisted workflow may propose existing taxonomy tags from source text. It supports catalog growth; it does not define the embedding and never writes directly to catalog truth.</p></div>
        <div className="tagspark-tagging-compact__flow" aria-label="Reviewed tagging support flow">
          {['SOURCE TEXT', 'TAG CANDIDATES', 'HUMAN REVIEW', 'CANONICAL CATALOG'].map((label, index) => <span key={label}>{label}{index < 3 && <i aria-hidden="true">→</i>}</span>)}
        </div>
      </section>

      <section className="yap-takeaways shell case-section tagspark-takeaways" id="tagspark-roadmap">
        <p className="eyebrow">PHASE 2 ROADMAP</p>
        <div className="yap-takeaways-heading yap-title-effect">
          <h2>Move from a useful <span className="yap-brand-highlight">baseline</span> to a validated semantic layer</h2>
          <p className="yap-takeaways-intro">Phase 2 is not presented as shipped. Each step protects the explicit control and review boundaries that make the current system inspectable.</p>
        </div>
        <div className="yap-takeaway-list">
          {phaseTwoGates.map((item, index) => <details key={item.title}><summary><span>0{index + 1}</span><strong>{item.title}</strong><b aria-hidden="true">+</b></summary><p>{item.body}</p></details>)}
        </div>
      </section>
    </div>
  );
}
