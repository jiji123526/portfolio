import type { Project } from '@/lib/project-data';

type Props = { project: Project; projectIndex: number };

const stages = [
  { label: 'STAGE A · RELEVANCE', title: 'Is this utterance actionable?', body: 'Four classes separate actionable requests from contextual_preference, domain_non_actionable, and unrelated speech. Grocery vocabulary alone is not evidence of an action.' },
  { label: 'STAGE B · INTENT', title: 'What kind of action is supported?', body: 'The ontology covers 11 intents: add_item, update_expiry, set_low_threshold, consume_item, mark_low, mark_out, throw_away, add_to_buy, query_inventory, needs_clarification, and unknown. Unknown means meaningful but unsupported—not unrelated.' },
  { label: 'STAGE C · ENTITY SPAN', title: 'Which words carry arguments?', body: 'ITEM, CATEGORY, QUANTITY, UNIT, LOCATION, and EXPIRY_DATE are labeled as spans. Phrases such as “out of,” “low,” and “buy” usually remain linguistic evidence for intent rather than entities.' },
  { label: 'STAGE D · NORMALIZATION', title: 'How does language map to household state?', body: '“Add two cartons of oat milk” preserves the ITEM span “oat milk” while mapping it to oat_milk, quantity 2, and unit carton. Existing canonical values are preferred; new values become household-scoped candidates.' },
  { label: 'STAGE E · JOINT ACTION', title: 'Does the complete interpretation hold?', body: 'Evaluation considers relevance, one or more actions, intent per action, entity-to-action assignment, normalized values, phrase family, and whether clarification is required.' },
];

const annotationPrinciples = [
  'AI output is a draft, not a label.',
  'Generated records are candidates, not ground truth.',
  'Every proposed field remains editable.',
  'Phrase families expose coverage and template leakage.',
  'Multi-action examples remain structured.',
  'Spans and normalization are evaluated separately.',
  'Independent examples are reserved for evaluation.',
];

const metrics = ['Relevance macro-F1', 'Per-intent precision · recall · F1', 'Entity-span precision · recall · F1', 'Normalization accuracy', 'End-to-end exact action match', 'Unknown false-accept rate', 'Multi-action exact match', 'Correction rate', 'Confirmation time', 'p50 / p95 inference latency'];
const slices = ['Phrase family', 'Direct request vs indirect state report', 'Seen vs unseen item', 'Utterance length', 'Action count', 'Ambiguity', 'Relative date expression', 'Contextual dependency', 'Household vocabulary', 'Future ASR noise'];

function ExistingMedia({ project, item, index, projectIndex }: { project: Project; item: number; index: string; projectIndex: number }) {
  const solution = project.solutions[item];
  return <div className="language-existing-media"><span>{index}</span><div className={`solution-visual tone-${((projectIndex + item) % 3) + 1} magnetic`} aria-label="Solution media placeholder"><div className="mini-ui"><span /><span /><span /></div><p className="media-note">MEDIA PLACEHOLDER · {solution.mediaNote ?? 'Feature flow or prototype recording'}</p></div></div>;
}

export function JangoingVision() {
  return <section className="language-vision shell case-section reveal">
    <p className="eyebrow">FINAL PHYSICAL-DEVICE VISION</p>
    <h2>A review-first language understanding system for a Raspberry Pi–based conversational kitchen device.</h2>
    <p>Jangoing’s web application is the current development and companion environment: it collects reviewed language, exposes structured interpretations for correction, manages household state, and supports reproducible model experiments. The intended interaction surface is a physical device that can detect relevant requests in everyday conversation and propose safe actions or recommendations.</p>
    <aside><span>RESEARCH QUESTION</span><p>How can a physical household assistant recognize relevant requests inside ordinary conversation, use only permitted context, and turn uncertain interpretations into safe and correctable actions?</p></aside>
  </section>;
}

export function JangoingCaseContent({ project, projectIndex }: Props) {
  return <>
    <section className="language-problem shell case-section reveal">
      <p className="eyebrow">LANGUAGE &amp; INTERACTION PROBLEM</p>
      <h2>Conversation is not a command line.</h2>
      <p>A physical assistant must separate background talk from relevant requests, resolve household aliases and permitted context, distinguish ASR errors from NLU errors, and clarify uncertainty without assuming a screen. A wrong interpretation can change real shared state.</p>
      <div className="utterance-card"><blockquote>“We’re out of drinks.”</blockquote><ul><li>A status report about a specific drink</li><li>A request to add a category to the shopping list</li><li>A contextual reference to a previously mentioned drink</li><li>Background for a later recommendation request</li><li>A non-actionable observation</li></ul></div>
      <p className="language-principle">The task is not simply predicting a label. It requires deciding what is actionable, which words constitute entities, which information comes from context, and when the system should ask rather than act.</p>
    </section>

    <section className="language-stages case-section shell reveal">
      <p className="eyebrow">NLU TASK DECOMPOSITION</p><h2>One utterance becomes five independently testable decisions.</h2>
      <div className="language-card-grid">{stages.map((stage) => <article key={stage.label}><span>{stage.label}</span><h3>{stage.title}</h3><p>{stage.body}</p></article>)}</div>
      <ExistingMedia project={project} item={0} index="01" projectIndex={projectIndex} />
    </section>

    <section className="language-tint reveal"><div className="shell case-section">
      <p className="eyebrow">ANNOTATION SCHEMA &amp; WORKFLOW</p><h2>Corrections become governed language evidence.</h2>
      <div className="language-flow">raw utterance <i>→</i> deterministic interpretation or AI-assisted draft <i>→</i> relevance review <i>→</i> action and phrase-family review <i>→</i> entity-span correction <i>→</i> canonical-value selection <i>→</i> reviewed annotation <i>→</i> task-specific JSONL</div>
      <div className="principle-list">{annotationPrinciples.map((item) => <p key={item}>{item}</p>)}</div>
      <ExistingMedia project={project} item={1} index="02" projectIndex={projectIndex} />
    </div></section>

    <section className="dataset-section shell case-section reveal">
      <p className="eyebrow">DATASET STRATEGY &amp; GOVERNANCE</p><h2>Coverage and evidence use different trust policies.</h2>
      <div className="candidate-stats"><article><strong>800</strong><span>synthetic-v1 candidates</span></article><article><strong>600</strong><span>relevance candidates</span></article><article><strong>1,400</strong><span>total annotation candidates</span></article></div>
      <p className="dataset-warning">These 1,400 records are bootstrap candidates, not reviewed ground truth and not a valid final evaluation set.</p>
      <div className="two-column-copy"><div><h3>What the relevance set covers</h3><p>200 contextual or preference examples, 300 domain-adjacent hard negatives, 100 unrelated negatives, and 35 phrase families.</p><h3>Known synthetic limits</h3><p>Coverage centers on 8 of 11 contract intents; actionable records are single-action; some entity types remain sparse; and template-derived phrase families remain. None become final training labels without human review.</p></div><div><h3>Governance rules</h3><p>Synthetic data bootstraps training only. Model-influenced writing stays a training candidate, while independently authored natural examples are evaluation candidates. Splits follow deduplication and phrase-family leakage checks; approved evaluation data is separated into validation and a frozen test set.</p><p>Dataset hashes and split manifests make comparisons reproducible. Production exports use pseudonymous identifiers and exclude unrelated personal content and secrets.</p></div></div>
    </section>

    <section className="modeling-section shell case-section reveal">
      <p className="eyebrow">CURRENT BASELINE MODELING</p><h2>Deterministic and English-first in production; deliberately simple in evaluation.</h2>
      <div className="two-column-copy"><div><h3>Current baseline</h3><p>A CPU-friendly TF-IDF and logistic-regression classifier provides a reproducible single-intent floor. It validates the dataset pipeline, surfaces class imbalance and leakage, and reveals early failure patterns before model complexity increases.</p></div><div><h3>Explicit limits</h3><p>Multi-action records are excluded rather than collapsed to their first intent. Learned context resolution, a production Transformer or LLM classifier, and Korean-English speech understanding are not yet implemented.</p><p>OpenAI API assists annotation drafts only; it is neither ground truth nor the production runtime model.</p></div></div>
    </section>

    <section className="evaluation-section reveal"><div className="shell case-section">
      <p className="eyebrow">EVALUATION FRAMEWORK</p><h2>Measure each language decision before claiming end-to-end quality.</h2>
      <div className="evaluation-columns"><article><span>EVALUATION DESIGN</span><div className="chip-list">{metrics.map((x) => <b key={x}>{x}</b>)}</div></article><article><span>DIAGNOSTIC SLICES</span><div className="chip-list">{slices.map((x) => <b key={x}>{x}</b>)}</div></article></div>
      <div className="status-strip"><div><span>CURRENT COLLECTION STATUS</span><p>The collection, review, export, and baseline tooling is implemented; no benchmark performance result is claimed before the reviewed splits are ready.</p></div><div><span>NEXT MEASUREMENT GATE</span><p>Freeze an independently written evaluation split, record its hash and manifest, then report task-level and joint-action results with error slices.</p></div></div>
    </div></section>

    <section className="integration-section shell case-section reveal">
      <p className="eyebrow">PRODUCT-STATE INTEGRATION &amp; SAFETY</p><h2>Language becomes a proposal before it becomes state.</h2>
      <div className="language-flow">utterance <i>→</i> structured interpretation <i>→</i> visible proposal <i>→</i> confirmation or correction <i>→</i> append-only event <i>→</i> inventory and shopping projections <i>→</i> reusable evaluation evidence</div>
      <p className="language-principle">Every natural-language state-changing interpretation remains reviewable before it updates shared household state.</p>
      <p>The future Raspberry Pi interface will use the same confirmed event path. Voice input will not bypass review, clarification, authorization, or logging safeguards.</p>
      <ExistingMedia project={project} item={2} index="03" projectIndex={projectIndex} />
    </section>

    <section className="text-before-voice language-tint reveal"><div className="shell case-section">
      <p className="eyebrow">WHY TEXT COMES BEFORE VOICE</p><h2>Text understanding is evaluated before speech recognition so that ASR errors and language-understanding errors remain independently measurable.</h2>
      <div className="language-flow">typed English benchmark <i>→</i> stable relevance and action evaluation <i>→</i> controlled ASR transcripts <i>→</i> Korean-English code-switching <i>→</i> personalized vocabulary adaptation <i>→</i> Raspberry Pi microphone pipeline</div>
      <p>Adding speech before annotation conventions and safe state mutation are stable would mix ASR and NLU failures, reduce data quality, and make causes harder to diagnose. Raspberry Pi latency and compute constraints become meaningful evaluation targets only after the language pipeline is measurable.</p>
    </div></section>

    <section className="architecture shell case-section reveal">
      <div className="architecture-copy"><p className="eyebrow">RASPBERRY PI TARGET ARCHITECTURE</p><h2>Future device pipeline</h2><p>Microphone → explicit activation → speech activity detection → ASR → relevance and permitted context retrieval → structured proposal → spoken or companion-app confirmation → household event → inventory, shopping, or recommendation response.</p><p>The Pi is planned as the microphone and speaker interface, local activation and lightweight preprocessing layer, household endpoint, and optional cache/privacy boundary connected to the cloud language service and the same household account context as the companion app.</p></div>
      <div className="architecture-placeholder magnetic"><div className="architecture-flow">{(project.architecture?.nodes ?? []).flatMap((node, i, nodes) => [<span key={`${node}-node`}>{node}</span>, ...(i < nodes.length - 1 ? [<i key={`${node}-arrow`} aria-hidden="true">→</i>] : [])])}</div><p className="media-note">MEDIA PLACEHOLDER · {project.architecture?.mediaNote}</p></div>
    </section>

    <section className="current-status reveal"><div className="shell case-section">
      <p className="eyebrow">CURRENT IMPLEMENTATION &amp; COLLECTION TARGETS</p><h2>The evaluation environment exists; the reviewed benchmark is the next gate.</h2>
      <div className="two-column-copy"><div><h3>Implemented</h3><p>Authenticated inventory and shopping workflows; reviewed natural-language commands; inference and correction logging; production annotation UI; relevance, intent, entity, normalization, and phrase-family schemas; AI-assisted drafts with human verification; task-specific JSONL export; reproducible TF-IDF tooling; append-only events and derived projections; deterministic temporal grounding.</p></div><div><h3>Collection gates</h3><p><strong>Workflow pilot target:</strong> 300 reviewed training examples and 100 independent evaluation examples.</p><p><strong>Baseline milestone:</strong> 1,000 reviewed training examples and 200 independent evaluation examples.</p></div></div>
    </div></section>

    <section className="roadmap-section shell case-section reveal">
      <p className="eyebrow">CONTEXT · MULTILINGUAL · DEVICE · RECOMMENDATION ROADMAP</p>
      <ol>{['Complete the reviewed English text benchmark.','Establish relevance, intent, span, normalization, and joint-action baselines.','Add learned multi-turn context retrieval.','Add household-specific aliases and personal language adapters.','Build Korean-English code-switching evaluation data.','Add ASR while keeping ASR and NLU metrics separate.','Deploy the validated interaction pipeline to Raspberry Pi.','Add spoken clarification and confirmation.','Introduce explainable meal and substitution recommendations.','Add verified shopping-deal retrieval and ranking.'].map((x) => <li key={x}>{x}</li>)}</ol>
      <aside><span>RECOMMENDATION SEQUENCE</span><p>rules and retrieval baseline → safety and dietary filtering → candidate generation → learned ranking → outcome evaluation</p></aside>
    </section>

    <section className="takeaways shell case-section"><p className="eyebrow">LANGUAGE ENGINEERING TAKEAWAYS</p><h2>What the system clarified</h2><div className="takeaway-list">{project.takeaways?.map((item, i) => <details className="reveal" key={item.title} open={i === 0}><summary><span>{item.title}</span><b aria-hidden="true">+</b></summary><p>{item.body}</p></details>)}</div></section>
  </>;
}
