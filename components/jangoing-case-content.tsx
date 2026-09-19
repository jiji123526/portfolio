import { JangoingCrossLingual } from './jangoing-cross-lingual';
import { AmbiguityLab } from './ambiguity-lab';
import { JangoingAnnotationWorkspace } from './jangoing-annotation-workspace';

const stages = [
  {
    label: 'A',
    term: '4-class actionability classification',
    title: 'Is it actionable?',
    body: 'Four classes separate actionable requests from contextual preference, domain-related but non-actionable speech, and unrelated conversation.',
  },
  {
    label: 'B',
    term: '11-intent semantic ontology',
    title: 'What action is supported?',
    body: 'An 11-intent ontology distinguishes supported actions, clarification needs, and meaningful but unsupported requests.',
  },
  {
    label: 'C',
    term: 'sequence labeling / span policy',
    title: 'Which words carry arguments?',
    body: 'ITEM, CATEGORY, QUANTITY, UNIT, LOCATION, and EXPIRY_DATE are labeled as spans; action cues remain evidence for intent.',
  },
  {
    label: 'D',
    term: 'rule-based finite-state normalization',
    title: 'How does language map to state?',
    body: 'Surface language stays intact while values map to canonical, household-scoped forms such as “oat milk” → oat_milk.',
  },
  {
    label: 'E',
    term: 'structured semantic parse',
    title: 'Does the full interpretation hold?',
    body: 'The final structure connects relevance, one or more actions, assigned entities, normalized values, and clarification requirements.',
  },
];

const annotationPrinciples = [
  'AI drafts, humans decide.',
  'Generated candidates may bootstrap training, but never serve as evaluation ground truth.',
  'Deduplication, phrase-family leakage checks, dataset hashes, and versioned manifests protect comparisons.',
];

const productEnvironmentCards = [
  {
    category: 'HOUSEHOLD',
    title: 'Shared Household',
    body: 'Google-authenticated users can create, join, and switch households through invitation codes. Owners and members interact with the same household-scoped inventory and shopping state.',
  },
  {
    category: 'STATE',
    title: 'Inventory',
    body: 'Members can manage inventory, shopping lists, quantities, expiry dates, categories, low-stock status, and leftovers through the current MVP.',
  },
  {
    category: 'REVIEW',
    title: 'Reviewable Actions',
    body: 'Natural-language updates become structured, editable proposals before they modify shared household state.',
  },
];

const roadmap = [
  {
    title: 'Freeze the first reviewed English benchmark',
    body: 'Complete human review, deduplication, leakage checks, and versioned train–evaluation manifests before reporting baseline performance.',
  },
  {
    title: 'Add multi-turn, household-grounded context',
    body: 'Evaluate whether prior turns and authorized household state improve interpretation without weakening permission, clarification, or review boundaries.',
  },
  {
    title: 'Evaluate Korean–English ASR on Raspberry Pi',
    body: 'Measure transcription quality, latency, household-noise robustness, and code-switching separately from semantic interpretation so ASR and NLU failures remain distinguishable.',
  },
  {
    title: 'Add explainable recommendations',
    body: 'Ground diet, replenishment, and deal suggestions in household state and user goals, with visible sources, rationale, and user controls.',
  },
];

export function JangoingCaseContent() {
  return (
    <>
      <section className="product-environment reveal" id="jangoing-environment">
        <div className="shell case-section">
          <p className="eyebrow">
            A REAL PRODUCT ENVIRONMENT FOR LANGUAGE LEARNING
          </p>
          <h2>
            The language system is developed inside a working multi-user
            household product.
          </h2>
          <p className="product-environment-intro">
            Jangoing’s web application is not a separate inventory project or a
            disposable prototype. It provides the shared household context,
            review interactions, and production feedback needed to develop the
            language system—and will become the deployment surface for the
            trained model.
          </p>
          <div className="product-environment-grid">
            {productEnvironmentCards.map((card, index) => (
              <article key={card.title}>
                <div className="jangoing-card-kicker">
                  <span>0{index + 1}</span>
                  <small>{card.category}</small>
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <p className="jangoing-environment-statement">
            Confirmations, edits, cancellations, and unsupported requests become
            evidence for evaluation.
          </p>
          <aside className="language-context-note">
            <span>LANGUAGE CONTEXT NOTE</span>
            <p>
              Requests are grounded in the correct user, permissions, household
              membership, inventory state, and prior context before they can
              become actions.
            </p>
          </aside>
          <p className="current-future-copy">
            The MVP uses a deterministic English-first interpreter. A trained
            model can later replace it behind the same reviewable
            structured-action contract.
          </p>
        </div>
      </section>

      <section className="language-problem shell case-section reveal" id="jangoing-problem">
        <p className="eyebrow">LANGUAGE PROBLEM</p>
        <h2>
          Conversation is not <mark>a command line.</mark>
        </h2>
        <p>
          Household speech mixes requests, context, shorthand, and observations.
          The system must decide what is actionable, what language forms an
          entity, what depends on context, and when to ask rather than act.
        </p>
        <div className="utterance-card">
          <blockquote>“We’re out of drinks.”</blockquote>
          <ul>
            <li>A report that a specific drink is gone</li>
            <li>A request to add drinks to the shopping list</li>
            <li>A contextual statement with no requested action</li>
          </ul>
        </div>
      </section>

      <section className="language-stages case-section shell reveal" id="jangoing-language-system">
        <p className="eyebrow">FIVE-STAGE NLU SYSTEM DESIGN</p>
        <h2>
          One utterance becomes five{' '}
          <mark>independently testable decisions.</mark>
        </h2>
        <div className="language-card-grid">
          {stages.map((stage) => (
            <article key={stage.label}>
              <span>{stage.label}</span>
              <div>
                <h3>{stage.title}</h3>
                <small>{stage.term}</small>
                <p>{stage.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="jangoing-feature-row">
          <div className="jangoing-feature-copy">
            <span>01</span>
            <h3>One sentence can support multiple readings.</h3>
            <dl>
              <div>
                <dt>USER PROBLEM</dt>
                <dd>Ordinary household language does not always state an explicit action.</dd>
              </div>
              <div>
                <dt>DESIGN DECISION</dt>
                <dd>Separate relevance, intent, spans, normalization, and joint interpretation.</dd>
              </div>
              <div>
                <dt>WHY THIS WAY</dt>
                <dd>The system can ask instead of mutating household state when confidence is insufficient.</dd>
              </div>
            </dl>
          </div>
          <div className="jangoing-media-placeholder jangoing-ambiguity-card">
            <AmbiguityLab />
            <strong>Ambiguity Lab</strong>
            <p>RELEVANCE → INTENT → SPANS → NORMALIZATION → DECISION</p>
          </div>
        </div>
        <aside className="jg-normalization-note">
          <span>DETERMINISTIC CANONICALIZATION CONTRACT</span>
          <div className="jg-normalization-table">
            <div><b>SURFACE FORM</b><b>CANONICAL VALUE</b></div>
            <div><q>oat milk</q><code>oat_milk</code></div>
            <div><q>a couple</q><code>2</code></div>
            <div><q>in the fridge</q><code>fridge</code></div>
          </div>
          <p>Deterministic canonicalization keeps the structured-action contract stable while the interpreter evolves.</p>
        </aside>
      </section>

      <section className="language-tint reveal" id="jangoing-data">
        <div className="shell case-section">
          <p className="eyebrow">ANNOTATION + DATASET GOVERNANCE</p>
          <h2>
            Annotation queues route evidence by what it can teach the model.
          </h2>
          <p className="annotation-intro">
            Nine overlapping review queues route production feedback,
            linguistic edge cases, generated coverage, relevance boundaries,
            and evaluation candidates.
          </p>
          <div className="language-flow">
            raw utterance <i>→</i> deterministic or AI-assisted draft <i>→</i>{' '}
            relevance, action, span, and normalization review <i>→</i> reviewed
            annotation <i>→</i> task-specific JSONL
          </div>
          <p className="queue-boundary">
            Queues prioritize annotation work; they do not determine the final
            dataset split. A sample may appear in multiple queues, while its
            training or evaluation purpose is assigned separately. Evaluation
            holdout remains a candidate queue until human review, deduplication,
            leakage checks, and version approval are complete.
          </p>
          <div className="candidate-stats">
            <article>
              <strong>800</strong>
              <span>synthetic-v1 candidates</span>
            </article>
            <article>
              <strong>600</strong>
              <span>relevance candidates</span>
            </article>
            <article>
              <strong>1,400</strong>
              <span>total annotation candidates</span>
            </article>
          </div>
          <p className="dataset-warning">
            These 1,400 records are bootstrap candidates, not reviewed ground
            truth and not a valid final evaluation set.
          </p>
          <div className="principle-list">
            {annotationPrinciples.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="jangoing-feature-row">
            <div className="jangoing-feature-copy">
              <span>02</span>
              <h3>Human review turns routed evidence into reliable data.</h3>
              <dl>
                <div>
                  <dt>USER PROBLEM</dt>
                  <dd>Production evidence arrives with different risks, gaps, and annotation needs.</dd>
                </div>
                <div>
                  <dt>DESIGN DECISION</dt>
                  <dd>Use nine overlapping queues for work routing while keeping dataset splits independent.</dd>
                </div>
                <div>
                  <dt>WHY THIS WAY</dt>
                  <dd>Review priority can change without contaminating the frozen evaluation boundary.</dd>
                </div>
              </dl>
            </div>
            <JangoingAnnotationWorkspace />
          </div>
        </div>
      </section>

      <section className="evidence-section shell case-section reveal" id="jangoing-evaluation">
        <p className="eyebrow">BASELINE + EVALUATION STATUS</p>
        <h2>
          A simple baseline tests the data system before model complexity
          increases.
        </h2>
        <div className="jg-evaluation-status">
          <span>CURRENT STATUS</span>
          <p>Baseline pipeline implemented</p>
          <p>Reviewed benchmark not yet frozen</p>
          <p>Metrics not yet reported</p>
        </div>
        <div className="two-column-copy">
          <div>
            <h3>Reproducible baseline before model complexity</h3>
            <p>
              A CPU-friendly TF-IDF and logistic-regression pipeline is
              implemented as the first reproducible baseline. Results will be
              reported only after the reviewed benchmark and frozen evaluation
              split are ready.
            </p>
          </div>
          <div>
            <h3>Evaluation methodology, not just labels</h3>
            <p>
              The gate scores intent classification, entity extraction,
              normalization, and joint-action exact match. Diagnostics are
              sliced by phrase family, unseen items, indirect requests, and
              contextual dependency, so an aggregate score cannot hide
              systematic language failures.
            </p>
          </div>
        </div>
        <div className="jg-evaluation-targets">
          <article>
            <span>PILOT TARGET</span>
            <strong>300 reviewed training</strong>
            <p>100 independent evaluation</p>
          </article>
          <article>
            <span>BASELINE TARGET</span>
            <strong>1,000 reviewed training</strong>
            <p>200 independent evaluation</p>
          </article>
        </div>
        <div className="jg-artifact-links">
          <span>VIEW ARTIFACTS</span>
          <a href="https://github.com/jiji123526/jangoing/blob/main/docs/ENG/annotation/ANNOTATION_CONVENTIONS.md" target="_blank" rel="noreferrer">Annotation conventions ↗</a>
          <a href="https://github.com/jiji123526/jangoing/blob/main/docs/ENG/ml/TEXT_DATASET_DESIGN_V1.md" target="_blank" rel="noreferrer">Dataset design ↗</a>
          <a href="https://github.com/jiji123526/jangoing/blob/main/docs/ENG/ml/MODEL_EVALUATION.md" target="_blank" rel="noreferrer">Model evaluation ↗</a>
          <a href="https://github.com/jiji123526/jangoing/blob/main/ml/train_baseline.py" target="_blank" rel="noreferrer">Baseline training ↗</a>
        </div>
      </section>

      <section className="jg-cross-lingual language-tint reveal" id="jangoing-cross-lingual">
        <div className="shell case-section">
          <JangoingCrossLingual />
        </div>
      </section>

      <section className="safety-path language-tint reveal" id="jangoing-architecture">
        <div className="shell case-section">
          <p className="eyebrow">CURRENT SYSTEM + REVIEWED LEARNING LOOP</p>
          <h2>
            Reviewed interactions update household state and accumulate
            evidence for the next model.
          </h2>
          <p className="review-diagram-caption">
            The web MVP collects typed requests and corrections. A future
            Raspberry Pi changes the input surface, while the same
            authorization, structured proposal, review, and learning paths
            remain in place.
          </p>
          <div
            className="review-loop-diagram"
            aria-label="Jangoing reviewed interaction, product-state, and language-learning loop"
          >
            <div className="review-diagram-legend" aria-label="Diagram legend">
              <span>
                <i />
                Current
              </span>
              <span>
                <i className="future" />
                Future
              </span>
              <span>
                <i className="feedback" />
                Reviewed learning feedback
              </span>
            </div>

            <section
              className="review-input-stage"
              aria-label="Input surfaces and language layer"
            >
              <div className="review-inputs">
                <article className="review-node">
                  <span>CURRENT</span>
                  <strong>Web MVP</strong>
                  <small>Typed user input</small>
                </article>
                <div className="future-device-path">
                  <article className="review-node future">
                    <span>FUTURE</span>
                    <strong>Raspberry Pi</strong>
                    <small>Spoken user input</small>
                  </article>
                  <i aria-hidden="true">→</i>
                  <article className="review-node future">
                    <span>FUTURE</span>
                    <strong>ASR</strong>
                    <small>Speech to text</small>
                  </article>
                  <i className="asr-language-arrow" aria-hidden="true">
                    →
                  </i>
                </div>
              </div>
              <i className="review-flow-arrow input-arrow" aria-hidden="true">
                →
              </i>
              <div className="language-layer-group">
                <article className="review-node language-layer">
                  <span>SHARED LANGUAGE LAYER</span>
                  <strong>Language layer</strong>
                  <small>English-first rules now</small>
                  <small className="future-copy">Contextual model later</small>
                </article>
                <div className="context-sidecar">
                  <i aria-hidden="true">←</i>
                  <article className="review-node">
                    <span>GROUNDED CONTEXT</span>
                    <strong>Authorized household context</strong>
                    <small>User · membership · permissions</small>
                    <small>Inventory · shopping state</small>
                  </article>
                </div>
              </div>
            </section>

            <i className="review-flow-arrow downward" aria-hidden="true">
              ↓
            </i>
            <article className="review-node central-review-node">
              <span>CENTRAL REVIEW GATE</span>
              <strong>Structured proposal + user review</strong>
              <small>
                Structured-action contract · confirm before mutation
              </small>
            </article>
            <div className="review-branch-fork" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>

            <div className="review-branches">
              <section
                className="review-branch product-state-branch"
                aria-labelledby="product-state-path"
              >
                <p id="product-state-path">PRODUCT STATE PATH</p>
                <span className="branch-origin">CONFIRMED ACTION</span>
                <div className="vertical-review-flow">
                  <article className="review-node">
                    <strong>Authorization + Worker API</strong>
                  </article>
                  <i aria-hidden="true">↓</i>
                  <article className="review-node">
                    <strong>Append-only household event</strong>
                  </article>
                  <i aria-hidden="true">↓</i>
                  <article className="review-node">
                    <strong>Inventory and shopping projections</strong>
                  </article>
                </div>
              </section>

              <section
                className="review-branch learning-evidence-branch"
                aria-labelledby="learning-evidence-path"
              >
                <p id="learning-evidence-path">LEARNING EVIDENCE PATH</p>
                <span className="branch-origin">
                  PROPOSED INTERPRETATION + REVIEWED OUTCOME
                </span>
                <div className="vertical-review-flow evidence-flow">
                  <article className="review-node">
                    <strong>Inference logging</strong>
                  </article>
                  <i aria-hidden="true">↓</i>
                  <article className="review-node">
                    <strong>9 annotation queues</strong>
                    <small>Routing, not splitting</small>
                  </article>
                  <i aria-hidden="true">↓</i>
                  <article className="review-node">
                    <strong>Human review</strong>
                    <small>Actions · spans · normalization</small>
                  </article>
                  <i aria-hidden="true">↓</i>
                  <article className="review-node reviewed-corpus">
                    <strong>Versioned reviewed corpus</strong>
                  </article>
                </div>

                <div className="corpus-fork" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="dataset-splits">
                  <div>
                    <article className="review-node">
                      <span>TRAINING ONLY</span>
                      <strong>Training split</strong>
                    </article>
                    <i aria-hidden="true">↓</i>
                    <article className="review-node">
                      <strong>Candidate model</strong>
                    </article>
                  </div>
                  <div>
                    <article className="review-node">
                      <span>HELD OUT</span>
                      <strong>Frozen evaluation split</strong>
                      <small>Never used for training</small>
                    </article>
                  </div>
                </div>
                <div className="evaluation-convergence" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <article className="review-node evaluation-gate">
                  <strong>Evaluation gate</strong>
                  <small>Candidate × frozen evaluation</small>
                </article>
                <i className="review-flow-arrow downward" aria-hidden="true">
                  ↓
                </i>
                <article className="review-node approved-model">
                  <span>PASSED REVIEWED EVALUATION</span>
                  <strong>Approved model version</strong>
                </article>
              </section>
            </div>

            <svg
              className="review-feedback-svg"
              viewBox="0 0 1000 1530"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="review-feedback-arrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="8"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 Z" />
                </marker>
              </defs>
              <path
                d="M914 1388 H958 Q975 1388 975 1371 V79 Q975 62 958 62 H672 Q655 62 655 79 V108"
                markerEnd="url(#review-feedback-arrow)"
              />
            </svg>
            <span className="review-feedback-label">Deploy approved model</span>
            <p className="mobile-feedback-return">
              <span aria-hidden="true">↑</span> Deploy approved model to
              Language layer
            </p>
            <p className="review-loop-label">
              interact → review → annotate → train → evaluate → deploy →
              interact again
            </p>
          </div>
        </div>
      </section>

      <section
        className="yap-takeaways shell case-section reveal"
        id="jangoing-roadmap"
      >
        <p className="eyebrow">NEXT PHASES</p>
        <div className="yap-takeaways-heading yap-title-effect">
          <h2>
            What I’m validating next.
          </h2>
          <p className="yap-takeaways-intro">
            The next phase freezes a trustworthy English benchmark, adds
            household-grounded context, separates ASR from semantic evaluation,
            and tests recommendations only after the review contract holds.
          </p>
        </div>
        <div className="yap-takeaway-list jangoing-takeaway-list">
          {roadmap.map((item, index) => (
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
    </>
  );
}
