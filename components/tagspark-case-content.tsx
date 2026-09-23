import { TagSparkPreferenceMedia } from '@/components/tagspark-preference-media';

const baselineSignals = [
  ['EXACT TAG', '1.0'], ['ALIAS OVERLAP', '0.9'], ['SAME CATEGORY', '0.35'],
  ['CURATED NEIGHBOR', '0.6'], ['CORE TAG', '+0.25'],
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
  { title: 'Move relationships into data', body: 'Migrate hard-coded tag similarities into reviewable database records before adding new semantic signals.' },
  { title: 'Calibrate tags, then works', body: 'Use 91 tag comparisons to seed each axis, generate a preliminary map, then spend work-level review only on uncertain neighborhoods.' },
  { title: 'Release validated controls', body: 'Add axis-distance to ranking at weight zero, require measurable retrieval value, and expose only axes that pass agreement and product-clarity gates.' },
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
          <div><dt>MAINTENANCE</dt><dd>Daily rolling refresh for up to 20 prioritized records</dd></div>
          <div><dt>SAFETY</dt><dd>Validation, deduplication, and unavailable-work state</dd></div>
        </dl>
      </section>

      <section className="tagspark-phase-transition" id="tagspark-phase-two">
        <div className="shell case-section">
          <p className="eyebrow">PHASE 2 · THE PRODUCT GOAL</p>
          <h2>Move from matching tags to <mark>navigating taste.</mark></h2>
          <div className="tagspark-transition-grid">
            <p>Phase 1 answers “which works match these tags?” Phase 2 asks “which direction should I move from here?” It adds validated distance for qualities such as darkness and relational tension without replacing explicit filters or reviewed catalog truth.</p>
            <ul><li>Keep exact preferences and exclusions as hard constraints.</li><li>Learn only a few named, interpretable axes.</li><li>Turn validated distance into sliders, similar works, and a more useful reading queue.</li></ul>
          </div>
          <div className="tagspark-phase-two-roadmap" aria-label="Phase 2 execution roadmap">
            {['FREEZE BASELINE', 'MOVE RELATIONS TO DB', 'COMPARE TAGS', 'GENERATE PRE-MAP', 'COMPARE UNCERTAIN WORKS', 'RELEASE CONTROLS'].map((label, index) => (
              <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="tagspark-phase-two-model shell case-section" id="tagspark-calibration">
        <div className="tagspark-phase-two-heading">
          <div><p className="eyebrow">PHASE 2 · 01 · CALIBRATE</p><h2>Estimate the cheap signal first. Review works only where it matters.</h2></div>
          <p>The plan separates tag-level calibration from work-level refinement. That makes the first map inexpensive to build and focuses human judgment on close, disputed, or low-confidence placements.</p>
        </div>
        <div className="tagspark-calibration-grid">
          <article><span>STEP 01 · TAG COMPARISON</span><strong>91 candidate tag pairs</strong><p>Compare which tag contributes more to darkness or relational tension. Bradley–Terry or logistic regression turns those judgments into initial axis weights.</p><b>OUTPUT · AXIS_TAG_WEIGHT</b></article>
          <article><span>STEP 02 · PRE-MAP</span><strong>Place all 229 works</strong><p>Aggregate reviewed work–tag assignments with the initial tag weights. This produces a diagnostic map, not a product result.</p><b>OUTPUT · INITIAL WORK POSITIONS</b></article>
          <article><span>STEP 03 · WORK COMPARISON</span><strong>Review uncertain neighborhoods</strong><p>Sample close pairs, disagreements, and sparse regions instead of comparing every work. Use those judgments to refine the axis.</p><b>OUTPUT · CALIBRATED DISTANCE</b></article>
        </div>
        <p className="tagspark-mini-label">KEEP THE SIGNALS SEPARATE</p>
        <div className="tagspark-signal-roles">
          <article><strong>TAG_SIMILARITY</strong><p>Reviewed relation between tags used by the Phase 1 recommender.</p><span>NOW · FIXED 0.6</span></article>
          <article><strong>AXIS_TAG_WEIGHT</strong><p>A tag’s learned contribution to a named continuous quality.</p><span>PHASE 2 · FROM TAG PAIRS</span></article>
          <article><strong>WORK COMPARISON</strong><p>Human supervision that corrects uncertain work positions.</p><span>PHASE 2 · ACTIVE REVIEW</span></article>
          <article><strong>AXIS DISTANCE</strong><p>An optional ranking contribution, disabled until validation passes.</p><span>RELEASE WEIGHT · STARTS AT 0</span></article>
        </div>
        <aside className="tagspark-projection-note">
          <div><span>GLOBAL PROJECTION CHECK</span><strong>11.9%</strong><small>2D PCA EXPLAINED VARIANCE · PC1 6.3% + PC2 5.6%</small></div>
          <p>A single global map preserved too little structure to become the product model. That result narrowed Phase 2 to a few named axes that can be reviewed and validated independently.</p>
        </aside>
      </section>

      <section className="tagspark-axes" id="tagspark-axes">
        <div className="shell case-section">
          <p className="eyebrow">PHASE 2 · 02 · MODEL ONLY WHAT VARIES BY DEGREE</p>
          <div className="tagspark-axes-heading"><h2>Two candidate axes. Everything else keeps its proper type.</h2><p>Darkness and relational tension can vary continuously. Completion and adult content remain filters; genre and worldview remain visible categories. Phase 2 does not force the entire taxonomy into an opaque embedding.</p></div>
          <div className="tagspark-axis-grid">
            <article><header><span>DARKNESS</span><small>EXPLORATORY HAND-WEIGHTED PLACEMENT</small></header><div><b>DARKER</b><i aria-hidden="true"><span /></i><b>LIGHTER</b></div><footer className="is-pending"><span>RANGE NOT YET CALIBRATED</span></footer></article>
            <article><header><span>RELATIONAL TENSION</span><small>CANDIDATE AXIS</small></header><div><b>LOWER</b><i aria-hidden="true"><span /></i><b>HIGHER</b></div><footer className="is-pending"><span>TAG COMPARISON PENDING</span></footer></article>
          </div>
        </div>
      </section>

      <section className="tagspark-phase-two-product shell case-section" id="tagspark-experience">
        <div className="tagspark-feature-copy">
          <p className="eyebrow">PHASE 2 · 03 · PRODUCT VALUE</p><h2>Turn validated distance into a better reading queue.</h2>
          <p>Readers keep the explicit include and exclude controls from Phase 1. Validated axes add direction: make the results darker, reduce relational tension, or find nearby works without losing hard constraints.</p>
          <p>Mobile remains the primary surface with sliders, ranked works, and “similar works.” A desktop map may expose the same distances for exploration, but the map is a view—not the model or the product goal.</p>
          <div className="tagspark-language-flow" aria-label="Planned Phase 2 product flow"><span>explicit constraints</span><i>+</i><span>validated axis</span><i>→</i><span>adjust direction</span><i>→</i><strong>ranked reading queue</strong></div>
        </div>
        <TagSparkPlaceholder className="tagspark-embedding-placeholder" label="Mood direction → constrained results" note="VALIDATED AXES · NOT A GENERIC EMBEDDING MAP" />
      </section>

      <section className="tagspark-validation shell case-section" id="tagspark-validation">
        <div className="tagspark-validation-heading">
          <div><p className="eyebrow">PHASE 2 · 04 · RELEASE CONTRACT</p><h2>No axis reaches ranking just because the map looks plausible.</h2></div>
          <p>Each axis must reproduce trusted comparisons, improve retrieval, preserve Phase 1 exclusions, and make sense as a product control. Until then, axis-distance remains disabled and the interpretable baseline stays in production.</p>
        </div>
        <div className="tagspark-validation-flow" aria-label="Embedding validation pipeline">
          {['INDEPENDENT PAIRS', 'AGREEMENT GATE', 'FIT AXIS WEIGHTS', 'RETRIEVAL TEST', 'WEIGHT 0 → CONTROLLED RELEASE'].map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>)}
        </div>
        <div className="tagspark-evaluation-groups">{evaluationGroups.map((group) => <article key={group.title}><strong>{group.title}</strong><p>{group.body}</p></article>)}</div>
        <aside className="tagspark-validation-note"><span>EVALUATION CONSTRAINT</span><p>The catalog currently has one primary tagger per work, so conventional inter-annotator agreement cannot yet be reported. Phase 2 requires a smaller comparison set reviewed independently by 3–5 trusted judges, following the same tag-derived similarity plus comparison-validation pattern used by FicSim.</p></aside>
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
