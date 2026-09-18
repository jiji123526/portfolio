const constraints = [
  {
    number: '01',
    category: 'Identity',
    title: 'One concept, many surface forms',
    body: 'Names, aliases, separators, casing, and punctuation fragment equivalent preference signals before ranking begins.',
  },
  {
    number: '02',
    category: 'Similarity',
    title: 'Related is not identical',
    body: 'Near-synonyms and neighboring concepts need partial credit without being collapsed into the same canonical tag.',
  },
  {
    number: '03',
    category: 'Control',
    title: 'Ranking needs visible rules',
    body: 'Users should be able to inspect and revise their inputs while the system keeps its evidence hierarchy explainable.',
  },
] as const;

const scoringLayers = [
  { label: 'EXACT', score: '1.0', body: 'The same tag ID.' },
  {
    label: 'ALIAS',
    score: '0.9',
    body: 'Normalized alias overlap inside the same category.',
  },
  {
    label: 'CLUSTER',
    score: '0.6',
    body: 'A hand-curated semantic neighbor.',
  },
  {
    label: 'SAME CATEGORY',
    score: '0.35',
    body: 'Different tags that still share a preference dimension.',
  },
] as const;

const nextSteps = [
  {
    title: 'Move the thesaurus from code into data',
    body: 'Store rename-safe tag relationships as weighted edges with provenance, preserving the current 0.6 baseline while allowing the resource to grow without a redeploy.',
  },
  {
    title: 'Make alias matching more precise',
    body: 'Prefer exact normalized-token intersection and gate substring containment behind word-boundary or minimum-length checks.',
  },
  {
    title: 'Create one source of truth for categories',
    body: 'Share a typed category definition between the ranking logic and interface so ordering and weights cannot drift.',
  },
  {
    title: 'Pin the scoring contract with tests',
    body: 'Verify that exact beats alias, alias beats broader similarity, core bonuses apply, and length normalization preserves the intended ordering.',
  },
  {
    title: 'Return stable, meaningful result order',
    body: 'Replace per-render shuffling with a stable sort or seeded shuffle so returning users can understand why ordering changed.',
  },
] as const;

function TagSparkPlaceholder({
  label,
  note,
}: {
  label: string;
  note: string;
}) {
  return (
    <div
      aria-label={`${label} placeholder`}
      className="tagspark-media-placeholder magnetic"
      role="img"
    >
      <div aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <strong>{label}</strong>
      <p>PLACEHOLDER · {note}</p>
    </div>
  );
}

export function TagSparkCaseContent() {
  return (
    <div className="yap-case-content tagspark-case-content">
      <section
        className="yap-problem shell case-section"
        id="tagspark-problem"
      >
        <p className="eyebrow">PROBLEM</p>
        <h2 className="yap-title-effect">
          A recommender is only as useful as the{' '}
          <mark>metadata beneath it.</mark>
        </h2>
        <p className="yap-problem-intro">
          User-generated tags are inconsistent by nature. Exact string matching
          misses aliases, near-synonyms, and category context, so subjective
          preference must become a canonical, comparable signal before ranking.
        </p>
        <div className="yap-constraint-grid">
          {constraints.map((constraint) => (
            <article key={constraint.number}>
              <div className="yap-constraint-heading">
                <span>{constraint.number}</span>
                <small>{constraint.category}</small>
              </div>
              <h3>{constraint.title}</h3>
              <p>{constraint.body}</p>
              <div className="tagspark-constraint-signal" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
        <p className="yap-problem-statement">
          How might we turn noisy, subjective tags into recommendation signals
          that remain controllable and explainable?
        </p>
      </section>

      <section
        className="tagspark-feature shell case-section"
        id="tagspark-normalization"
      >
        <div className="tagspark-feature-copy">
          <p className="eyebrow">01 · ALIAS NORMALIZATION</p>
          <h2>Surface variants collapse before comparison.</h2>
          <p>
            Each tag expands into its name and known aliases. Tokens split on
            commas, middle dots, slashes, and pipes, then pass through lowercase,
            Unicode NFKC normalization, whitespace removal, and punctuation
            stripping before set overlap is evaluated.
          </p>
          <div className="tagspark-language-flow" aria-label="Normalization flow">
            <span>surface tags</span>
            <i>→</i>
            <span>normalized tokens</span>
            <i>→</i>
            <strong>canonical alias set</strong>
          </div>
        </div>
        <TagSparkPlaceholder
          label="Alias-collapse illustration"
          note="SURFACE VARIANTS → ONE CANONICAL TAG"
        />
      </section>

      <section className="tagspark-thesaurus" id="tagspark-thesaurus">
        <div className="shell case-section">
          <p className="eyebrow">02 · HAND-BUILT SIMILARITY THESAURUS</p>
          <div className="tagspark-thesaurus-heading">
            <h2>Meaning extends beyond string identity.</h2>
            <p>
              Curated clusters compile into a tag-to-tag graph. Related concepts
              receive partial credit even when they are not aliases, making the
              resource a small, interpretable thesaurus rather than a learned
              similarity model.
            </p>
          </div>
          <aside className="tagspark-honesty-note">
            <span>HONESTY NOTE</span>
            <p>
              Cluster membership is hand-curated and every intra-cluster edge
              currently uses the fixed constant 0.6. Embeddings are a future
              extension, not the current system.
            </p>
          </aside>
          <TagSparkPlaceholder
            label="Cluster-neighbor view"
            note="CURATED TAG GRAPH · FIXED 0.6 EDGES"
          />
        </div>
      </section>

      <section
        className="tagspark-scoring shell case-section"
        id="tagspark-scoring"
      >
        <p className="eyebrow">03 · HIERARCHICAL WEIGHTED SCORING</p>
        <h2>
          Ranking follows an explicit hierarchy of <mark>stronger and weaker evidence.</mark>
        </h2>
        <p className="tagspark-section-intro">
          Every work tag uses the strongest matching layer, multiplied by its
          category weight and adjusted for core-tag bonuses. The final score is
          divided by the square root of tag count so tag-heavy works do not
          dominate by volume alone.
        </p>
        <div className="tagspark-score-grid">
          {scoringLayers.map((layer, index) => (
            <article key={layer.label}>
              <span>0{index + 1}</span>
              <small>{layer.label}</small>
              <strong>{layer.score}</strong>
              <p>{layer.body}</p>
            </article>
          ))}
        </div>
        <div className="tagspark-category-weights">
          <span>CATEGORY WEIGHTS</span>
          <p>
            Worldview / setting <strong>1.0</strong> · relationship / genre{' '}
            <strong>0.9</strong> · mood <strong>0.8</strong> · fixed pairing{' '}
            <strong>0.7</strong> · length <strong>0.5</strong> · completion{' '}
            <strong>0.4</strong>
          </p>
        </div>
        <div className="tagspark-placeholder-grid">
          <TagSparkPlaceholder
            label="Tag-select → live results"
            note="PERFECT MATCH + SIMILARITY-RANKED RESULTS"
          />
          <TagSparkPlaceholder
            label="Why this result?"
            note="LAYER, CATEGORY WEIGHT, BONUS + NORMALIZATION"
          />
        </div>
      </section>

      <section className="tagspark-filtering" id="tagspark-filtering">
        <div className="shell case-section tagspark-filtering-inner">
          <div>
            <p className="eyebrow">04 · SEMANTIC INCLUDE / EXCLUDE</p>
            <h2>Exclusion follows meaning, not only the clicked string.</h2>
          </div>
          <div>
            <p>
              Excluded concepts expand through alias sets and cluster neighbors,
              removing their variants and near-synonyms rather than only one tag
              ID. The same lexical resource supports both retrieval and control.
            </p>
            <dl>
              <div>
                <dt>INPUT</dt>
                <dd>Selected exclusion</dd>
              </div>
              <div>
                <dt>EXPANSION</dt>
                <dd>Aliases + cluster neighbors</dd>
              </div>
              <div>
                <dt>RESULT</dt>
                <dd>Semantically filtered works</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        className="tagspark-system shell case-section"
        id="tagspark-system"
      >
        <div className="tagspark-feature-copy">
          <p className="eyebrow">SYSTEM DESIGN</p>
          <h2>The lexical resource can become shared, inspectable data.</h2>
          <p>
            Today the curated graph lives in application code. A behavior-
            preserving migration would store rename-safe tag pairs, per-edge
            weights, and provenance in Postgres, then rebuild the same lookup
            shape for scoring.
          </p>
          <dl className="tagspark-system-facts">
            <div>
              <dt>CURRENT</dt>
              <dd>Hardcoded named clusters · fixed 0.6</dd>
            </div>
            <div>
              <dt>NEXT</dt>
              <dd>ID-based weighted edges · source provenance</dd>
            </div>
            <div>
              <dt>GUARDRAIL</dt>
              <dd>Regression parity before removing the fallback</dd>
            </div>
          </dl>
        </div>
        <TagSparkPlaceholder
          label="Catalog + thesaurus architecture"
          note="REACT → VERCEL API → NEON + SCHEDULED REFRESH"
        />
      </section>

      <section
        className="yap-takeaways shell case-section tagspark-takeaways"
        id="tagspark-takeaways"
      >
        <p className="eyebrow">TAKEAWAYS</p>
        <div className="yap-takeaways-heading yap-title-effect">
          <h2>
            What building <span className="yap-brand-highlight">TagSpark</span>{' '}
            clarified about recommendation systems
          </h2>
          <p className="yap-takeaways-intro">
            Metadata quality determines recommendation quality. A normalization
            layer, curated similarity resource, and explicit scoring policy can
            already produce useful, controllable rankings before model
            complexity—and provide a clear baseline for what comes next.
          </p>
        </div>
        <div className="yap-takeaway-list">
          {nextSteps.map((item, index) => (
            <details key={item.title}>
              <summary>
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <b aria-hidden="true">+</b>
              </summary>
              <p>{item.body}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
