import { TagSparkPreferenceMedia } from '@/components/tagspark-preference-media';

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
      <section className="yap-problem tagspark-problem-compact shell case-section" id="tagspark-problem">
        <p className="eyebrow">PRODUCT CONTEXT</p>
        <h2 className="yap-title-effect">The platform had no tags at all. So I built the <mark>taxonomy.</mark></h2>
        <p className="yap-problem-intro">The source platform offered no usable tagging, so there was no way to curate “works that feel like this.” Recommendation was not the first problem; constructing the language data it would depend on was.</p>
        <p className="yap-problem-statement">How do you build a controllable recommendation signal when the source platform provides no usable metadata to begin with?</p>
      </section>

      <section className="tagspark-phase-intro shell" aria-label="TagSpark phases">
        <div><span>PHASE 1 · SHIPPED</span><strong>From-scratch dataset and an interpretable baseline</strong></div>
        <i aria-hidden="true">→</i>
        <div><span>PHASE 2 · PLANNED</span><strong>Semantic axes gated by human validation</strong></div>
      </section>

      <section className="tagspark-dataset shell case-section" id="tagspark-dataset">
        <div className="tagspark-dataset-heading">
          <div><p className="eyebrow">PHASE 1 · 01 · DATASET FROM SCRATCH</p><h2>No tags existed, so I read every work and built the dataset.</h2></div>
          <p>I read all 229 works, derived the taxonomy inductively from recurring patterns, defined 9 categories and 76 tags with alias sets, then hand-annotated the full catalog. The recommendation system sits on top of that language-data work.</p>
        </div>
        <div className="tagspark-dataset-flow" aria-label="Dataset construction flow">
          <div><span>01</span><strong>READ ALL 229 WORKS</strong><p>Full-corpus review, not a sampled subset.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><strong>INDUCE THE SCHEMA</strong><p>Recurring patterns became categories, tags, and aliases.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>03</span><strong>ANNOTATE EVERY WORK</strong><p>1,630 reviewed work–tag assignments.</p></div>
        </div>
        <div className="tagspark-dataset-stats">
          {catalogSnapshot.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="tagspark-feature shell case-section" id="tagspark-control">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 1 · 02 · EXPLICIT PREFERENCE</p>
          <h2>People state their taste. TagSpark makes it comparable.</h2>
          <p>Include and exclude choices keep preference visible. Surface forms then collapse through lowercase, Unicode NFKC normalization, whitespace removal, punctuation stripping, and known aliases before the catalog is compared by canonical tag ID.</p>
          <div className="tagspark-language-flow" aria-label="Preference and normalization flow"><span>include + exclude</span><i>→</i><span>alias normalization</span><i>→</i><strong>canonical tag ids</strong></div>
        </div>
        <TagSparkPreferenceMedia />
      </section>

      <section className="tagspark-baseline" id="tagspark-baseline">
        <div className="shell case-section">
          <p className="eyebrow">PHASE 1 · 03 · NORMALIZE, RELATE, SCORE</p>
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
        <div><p className="eyebrow">PHASE 1 · 04 · CATALOG OPERATIONS</p><h2>The baseline depends on maintained, reviewable data.</h2></div>
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

      <section className="tagspark-phase-two-model shell case-section" id="tagspark-axis-design">
        <div className="tagspark-phase-two-heading">
          <div><p className="eyebrow">PHASE 2 · PLANNED · MODELING DECISION</p><h2>Not every tag belongs on an axis.</h2></div>
          <p>Phase 2 keeps explicit constraints and adds distance only where a quality can meaningfully vary by degree. It does not force all tags into one opaque latent map.</p>
        </div>
        <p className="tagspark-mini-label">MEASUREMENT POLICY</p>
        <div className="tagspark-measurement-table">
          {measurementTypes.map((item, index) => <article key={item.type}><span>0{index + 1}</span><div><strong>{item.type}</strong><p>{item.examples}</p></div><b>{item.treatment}</b></article>)}
        </div>
        <p className="tagspark-mini-label">EXPLORATORY EVIDENCE</p>
        <div className="tagspark-snapshot" aria-label="Current catalog snapshot">
          <header><span>CURRENT CATALOG SNAPSHOT</span><p>Reviewed catalog data used to frame the exploration—not a performance result.</p></header>
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
          <p className="eyebrow">PHASE 2 · MOOD AXES · NOT YET VALIDATED</p>
          <div className="tagspark-axes-heading"><h2>Continuous mood becomes a navigable space.</h2><p>The forward approach starts with darkness and relational tension, then fixes tag weights through pairwise comparison. The final axis choice stays open: continuous moods become axes, binary properties remain filters, and nominal categories remain visible groupings.</p></div>
          <div className="tagspark-axis-grid">
            <article><header><span>DARKNESS</span><small>EXPLORATORY RANGE · −3.6 TO +2.0</small></header><div><b>DARKER</b><i aria-hidden="true"><span /></i><b>LIGHTER</b></div><footer><span>낮은 밤</span><span>시고르자브종</span></footer></article>
            <article><header><span>RELATIONAL TENSION</span><small>CANDIDATE AXIS</small></header><div><b>LOWER</b><i aria-hidden="true"><span /></i><b>HIGHER</b></div><footer className="is-pending"><span>PAIRWISE LABELING PENDING</span></footer></article>
          </div>
        </div>
      </section>

      <section className="tagspark-phase-two-product shell case-section" id="tagspark-experience">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 2 · PLATFORM-AWARE EXPERIENCE</p><h2>Desktop map, mobile list—one embedding, two surfaces.</h2>
          <p>The embedding’s value is distance, not showing every point at once. Desktop can expose a 2D exploration map; mobile remains primary and translates the same signal into mood sliders, ranked works, and a “similar works” list.</p>
          <p>Cold start begins with explicit preference elicitation: choose 3–5 favorites from a diverse popular-work set, aggregate their tags into a recommendation vector, and average their coordinates only for the map. This preserves multi-modal taste for ranking even when a single map point would blur it.</p>
          <div className="tagspark-language-flow" aria-label="Planned Phase 2 product flow"><span>pick favorites</span><i>→</i><span>taste seed</span><i>→</i><span>mood controls</span><i>→</i><strong>ranked + similar works</strong></div>
        </div>
        <TagSparkPlaceholder className="tagspark-embedding-placeholder" label="Mobile mood sliders → ranked list" note="COLD START · FAVORITES → TASTE SEED" />
      </section>

      <section className="tagspark-model-section shell case-section" id="tagspark-model">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 2 · PERSONALIZATION + LEARNED SIGNAL</p>
          <h2>Explicit signals first. Learned similarity only when the data supports it.</h2>
          <p>“More like this” and “not for me” are stronger evidence than reading history because read does not mean liked. A signed anonymous token can persist those preferences without IP-based identity or fingerprinting.</p>
          <p>The existing additive scorer gains an embedding layer with its weight initially set to zero, preserving parity. Curated tags and pairwise-learned axis weights remain the backbone; a learned embedding is reconsidered only if the catalog expands beyond this small, single-domain collection.</p>
          <dl className="tagspark-model-facts">
            <div><dt>NOW</dt><dd>Curated taxonomy + explicit weighted baseline</dd></div>
            <div><dt>PHASE 2</dt><dd>Pairwise-learned axes + controlled embedding contribution</dd></div>
            <div><dt>ONLY WITH SCALE</dt><dd>Learned similarity edges across a broader domain</dd></div>
          </dl>
        </div>
        <TagSparkPlaceholder label="More like this / not for me" note="EXPLICIT SIGNAL > IMPLICIT HISTORY" />
      </section>

      <section className="tagspark-validation shell case-section" id="tagspark-validation">
        <div className="tagspark-validation-heading">
          <div><p className="eyebrow">PHASE 2 · VALIDATION + RELEASE GATES</p><h2>Subjective similarity still needs a measurement contract.</h2></div>
          <p>Pair and triplet judgments create trusted comparisons. Reviewer agreement gates the data; Bradley–Terry or logistic regression learns axis weights; retrieval value and product clarity must pass before an axis leaves the exploratory layer.</p>
        </div>
        <div className="tagspark-validation-flow" aria-label="Embedding validation pipeline">
          {['PAIR / TRIPLET REVIEW', 'AGREEMENT GATE', 'BRADLEY–TERRY', 'RETRIEVAL TEST', 'PRODUCT GATE'].map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>)}
        </div>
        <div className="tagspark-evaluation-groups">{evaluationGroups.map((group) => <article key={group.title}><strong>{group.title}</strong><p>{group.body}</p></article>)}</div>
        <aside className="tagspark-validation-note"><span>EVALUATION CONSTRAINT</span><p>The catalog currently has one primary tagger per work, so conventional inter-annotator agreement cannot yet be reported. Phase 2 requires a smaller comparison set reviewed independently by 3–5 trusted judges, following the same tag-derived similarity plus comparison-validation pattern used by FicSim.</p></aside>
      </section>

      <section className="tagspark-tagging-compact shell case-section" id="tagspark-tagging">
        <div><p className="eyebrow">SUPPORTING TRACK · REVIEWED TAGGING</p><h2>Scale catalog coverage without surrendering review.</h2><p>A future JEV-assisted workflow may propose existing taxonomy tags from source text. It supports catalog growth; it does not define the embedding and never writes directly to catalog truth.</p></div>
        <div className="tagspark-tagging-compact__flow" aria-label="Reviewed tagging support flow">
          {['SOURCE TEXT', 'TAG CANDIDATES', 'HUMAN REVIEW', 'CANONICAL CATALOG'].map((label, index) => <span key={label}>{label}{index < 3 && <i aria-hidden="true">→</i>}</span>)}
        </div>
      </section>

      <section className="yap-takeaways shell case-section tagspark-takeaways" id="tagspark-takeaways">
        <p className="eyebrow">TAKEAWAY + PHASE 2 ROADMAP</p>
        <div className="yap-takeaways-heading yap-title-effect">
          <h2>A recommender is only as trustworthy as the <span className="yap-brand-highlight">language data</span> beneath it</h2>
          <p className="yap-takeaways-intro">The strongest contribution is the full-coverage taxonomy and annotation layer. Phase 2 extends it without presenting planned axes, personalization, or learned similarity as shipped.</p>
        </div>
        <div className="yap-takeaway-list">
          {phaseTwoGates.map((item, index) => <details key={item.title}><summary><span>0{index + 1}</span><strong>{item.title}</strong><b aria-hidden="true">+</b></summary><p>{item.body}</p></details>)}
        </div>
      </section>
    </div>
  );
}
