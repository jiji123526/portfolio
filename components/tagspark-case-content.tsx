const constraints = [
  {
    number: '01',
    category: 'Preference',
    title: 'Taste needs an explicit input',
    body: 'People choose the themes, relationships, moods, and story conditions they want instead of waiting for a hidden profile to infer them.',
  },
  {
    number: '02',
    category: 'Language',
    title: 'Human tags are inconsistent',
    body: 'Names, aliases, separators, and neighboring concepts fragment equivalent or related preference signals before ranking begins.',
  },
  {
    number: '03',
    category: 'Catalog',
    title: 'Recommendations depend on maintained data',
    body: 'Works, tag relationships, publication dates, and engagement metadata must stay consistent enough for ranking and browsing to remain useful.',
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
    label: 'SAME CATEGORY',
    score: '0.35',
    body: 'A different tag in the same preference dimension.',
  },
  {
    label: 'CLUSTER CONTRIBUTION',
    score: '0.6',
    body: 'Each matching hand-curated semantic relationship adds evidence.',
  },
] as const;

const nextSteps = [
  {
    title: 'Move the thesaurus from code into data',
    body: 'Store rename-safe tag relationships as weighted edges with provenance, preserving the current 0.6 baseline while allowing the resource to grow without a redeploy.',
  },
  {
    title: 'Connect semantic exclusion to production',
    body: 'The current product filters selected exclusion IDs directly. Connect the existing alias- and cluster-expansion helper only after its behavior is covered by focused tests.',
  },
  {
    title: 'Make alias matching more precise',
    body: 'Prefer exact normalized-token intersection and gate substring containment behind minimum-length or boundary-aware checks.',
  },
  {
    title: 'Create one source of truth for categories',
    body: 'Share a typed category definition between ranking, selection, and result views so weights and display ordering cannot drift.',
  },
  {
    title: 'Pin the scoring contract with tests',
    body: 'Cover short-circuit behavior, additive category and cluster evidence, core bonuses, normalization, exclusions, and stable result ordering.',
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
        <p className="eyebrow">PRODUCT CONTEXT</p>
        <h2 className="yap-title-effect">
          Korean web-fiction discovery, shaped by{' '}
          <mark>explicit taste.</mark>
        </h2>
        <p className="yap-problem-intro">
          TagSpark is a mobile recommendation product for exploring Korean web
          fiction through tags. People state what they want to include or avoid,
          then browse perfect matches separately from related recommendations.
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
          How might we turn subjective Korean-language tags into a recommendation
          signal people can directly control?
        </p>
      </section>

      <section
        className="tagspark-feature shell case-section"
        id="tagspark-control"
      >
        <div className="tagspark-feature-copy">
          <p className="eyebrow">01 · EXPLICIT PREFERENCE CONTROL</p>
          <h2>Include and exclude choices keep taste inspectable.</h2>
          <p>
            Instead of inferring a hidden profile, TagSpark lets people search,
            add, remove, and reverse preference tags. Included tags define the
            desired result; excluded tag IDs filter out unwanted works before the
            remaining catalog is ranked.
          </p>
          <div className="tagspark-language-flow" aria-label="Preference flow">
            <span>include</span>
            <i>+</i>
            <span>exclude</span>
            <i>→</i>
            <strong>controllable query</strong>
          </div>
        </div>
        <TagSparkPlaceholder
          label="Include / exclude selection"
          note="TAG SEARCH · REVERSIBLE PREFERENCE CHIPS"
        />
      </section>

      <section
        className="tagspark-feature shell case-section"
        id="tagspark-normalization"
      >
        <div className="tagspark-feature-copy">
          <p className="eyebrow">02 · ALIAS NORMALIZATION</p>
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
          <p className="eyebrow">03 · CURATED SIMILARITY GRAPH</p>
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
        <p className="eyebrow">04 · LAYERED ADDITIVE SCORING</p>
        <h2>
          Ranking combines stronger matches with <mark>additive context.</mark>
        </h2>
        <p className="tagspark-section-intro">
          Exact and alias matches short-circuit weaker lexical checks. Otherwise,
          same-category evidence and each curated cluster relationship can add to
          the score. Category weights and core-tag bonuses are applied before the
          total is divided by the square root of tag count.
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
            note="PLANNED · SCORE CONTRIBUTION VIEW"
          />
        </div>
      </section>

      <section className="tagspark-filtering" id="tagspark-results">
        <div className="shell case-section tagspark-filtering-inner">
          <div>
            <p className="eyebrow">05 · RESULT MODEL</p>
            <h2>Perfect matches and related results stay visibly separate.</h2>
          </div>
          <div>
            <p>
              Perfect matches contain every included tag and are currently
              shuffled in the interface. Similar results are grouped by exact
              overlap count, then ordered by the weighted similarity score.
            </p>
            <dl>
              <div>
                <dt>PERFECT MATCH</dt>
                <dd>Contains every included tag ID</dd>
              </div>
              <div>
                <dt>SIMILAR</dt>
                <dd>Overlap buckets, then weighted score</dd>
              </div>
              <div>
                <dt>CURRENT LIMIT</dt>
                <dd>No user-facing score explanation yet</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="tagspark-feature shell case-section">
        <div className="tagspark-placeholder-grid">
          <TagSparkPlaceholder
            label="Exact vs similar result groups"
            note="CURRENT PRODUCT UI"
          />
          <TagSparkPlaceholder
            label="Result rationale"
            note="PLANNED · SCORE CONTRIBUTION VIEW"
          />
        </div>
      </section>

      <section
        className="tagspark-system shell case-section"
        id="tagspark-operations"
      >
        <div className="tagspark-feature-copy">
          <p className="eyebrow">06 · CATALOG + OPERATIONS</p>
          <h2>Recommendation quality depends on a maintained catalog.</h2>
          <p>
            Works, tags, and their relationships live in Neon Postgres behind
            Vercel APIs. A scheduled Postype refresh updates engagement and
            publication metadata, while unavailable works are marked so stale
            catalog entries do not silently enter recommendations.
          </p>
          <dl className="tagspark-system-facts">
            <div>
              <dt>DATA</dt>
              <dd>Works · tags · work-tag relations in Neon</dd>
            </div>
            <div>
              <dt>MAINTENANCE</dt>
              <dd>Scheduled Postype metadata refresh</dd>
            </div>
            <div>
              <dt>SAFETY</dt>
              <dd>Validation, deduplication, unavailable-work marker</dd>
            </div>
          </dl>
        </div>
        <TagSparkPlaceholder
          label="Catalog operations architecture"
          note="REACT → VERCEL API → NEON + SCHEDULED REFRESH"
        />
      </section>

      <section
        className="yap-takeaways shell case-section tagspark-takeaways"
        id="tagspark-takeaways"
      >
        <p className="eyebrow">LIMITATIONS + NEXT STEPS</p>
        <div className="yap-takeaways-heading yap-title-effect">
          <h2>
            What the current <span className="yap-brand-highlight">TagSpark</span>{' '}
            baseline makes clear
          </h2>
          <p className="yap-takeaways-intro">
            The shipped baseline makes its tradeoffs visible: exact results are
            shuffled, semantic exclusion is not wired into production, and rank
            rationale is not yet exposed. Those constraints define concrete next
            steps rather than being presented as finished capabilities.
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
