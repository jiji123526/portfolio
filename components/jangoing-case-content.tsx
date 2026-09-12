import type { Project } from '@/lib/project-data';

type Props = { project: Project; projectIndex: number };

const stages = [
  { label: 'STAGE A · RELEVANCE', title: 'Is it actionable?', body: 'Four classes separate actionable requests from contextual preference, domain-related but non-actionable speech, and unrelated conversation.' },
  { label: 'STAGE B · INTENT', title: 'What action is supported?', body: 'An 11-intent ontology distinguishes supported actions, clarification needs, and meaningful but unsupported requests.' },
  { label: 'STAGE C · ENTITY SPAN', title: 'Which words carry arguments?', body: 'ITEM, CATEGORY, QUANTITY, UNIT, LOCATION, and EXPIRY_DATE are labeled as spans; action cues remain evidence for intent.' },
  { label: 'STAGE D · NORMALIZATION', title: 'How does language map to state?', body: 'Surface language stays intact while values map to canonical, household-scoped forms such as “oat milk” → oat_milk.' },
  { label: 'STAGE E · JOINT ACTION', title: 'Does the full interpretation hold?', body: 'The final structure connects relevance, one or more actions, assigned entities, normalized values, and clarification requirements.' },
];

const annotationPrinciples = [
  'AI output is a draft, not a label.',
  'Generated data bootstraps training, not evaluation.',
  'Independent examples are reviewed before entering a frozen test set.',
];

const productEnvironmentCards = [
  { title: 'Shared household context', body: 'Google-authenticated users can create, join, and switch households through invitation codes. Owners and members interact with the same household-scoped inventory and shopping state.' },
  { title: 'Usable kitchen workflows', body: 'Members can manage inventory, shopping lists, quantities, expiry dates, categories, low-stock status, and leftovers through the current MVP.' },
  { title: 'Reviewable language actions', body: 'Natural-language updates become structured, editable proposals before they modify shared household state.' },
  { title: 'Continuous evaluation', body: 'Confirmations, corrections, cancellations, and unsupported requests are logged, routed into annotation queues, and exported as training or evaluation candidates.' },
];

const annotationQueues = [
  { category: 'Production', name: 'Correction', description: 'Production cases users already corrected' },
  { category: 'Production', name: 'Confirmed', description: 'Correct predictions from normal product usage' },
  { category: 'Targeted', name: 'Low confidence', description: 'Ambiguous, unknown, and clarification cases' },
  { category: 'Targeted', name: 'Expiry', description: 'Temporal spans and date-normalization cases' },
  { category: 'Generated', name: 'Generated review', description: 'Human review of synthetic coverage candidates' },
  { category: 'Generated', name: 'Preference / context', description: 'Goals and preferences without immediate actions' },
  { category: 'Generated', name: 'Domain non-actionable', description: 'Food-related hard negatives with no executable request' },
  { category: 'Generated', name: 'Unrelated negative', description: 'Outside-domain rejection examples' },
  { category: 'Evaluation', name: 'Evaluation holdout', description: 'Production candidates reserved for later evaluation review' },
];

function ExistingMedia({ project, item, index, projectIndex }: { project: Project; item: number; index: string; projectIndex: number }) {
  const solution = project.solutions[item];
  return <div className="language-existing-media"><span>{index}</span><div className={`solution-visual tone-${((projectIndex + item) % 3) + 1} magnetic`} aria-label="Solution media placeholder"><div className="mini-ui"><span /><span /><span /></div><p className="media-note">MEDIA PLACEHOLDER · {solution.mediaNote ?? 'Feature flow or prototype recording'}</p></div></div>;
}

export function JangoingCaseContent({ project, projectIndex }: Props) {
  return <>
    <section className="product-environment reveal"><div className="shell case-section">
      <p className="eyebrow">A REAL PRODUCT ENVIRONMENT FOR LANGUAGE LEARNING</p>
      <h2>The language system is developed inside a working multi-user household product.</h2>
      <p className="product-environment-intro">Jangoing’s web application is not a separate inventory project or a disposable prototype. It provides the shared household context, review interactions, and production feedback needed to develop the language system—and will become the deployment surface for the trained model.</p>
      <div className="product-environment-grid">{productEnvironmentCards.map((card, index) => <article key={card.title}><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}</div>
      <aside className="language-context-note"><span>LANGUAGE CONTEXT NOTE</span><p>Household identity is part of the language problem. A request must be grounded in the correct user, membership, permissions, inventory state, and prior household context before it can safely become an action.</p></aside>
      <p className="current-future-copy">The current MVP uses a deterministic English-first interpreter. Once the trained model is ready, it can replace that interpreter behind the same structured action contract while the existing authentication, confirmation, event, and shared-state workflows remain in place.</p>
      <div className="current-future-flow"><article><span>TODAY</span><p>Natural-language input <i>→</i> deterministic interpretation <i>→</i> editable proposal <i>→</i> confirmation or correction <i>→</i> shared inventory update <i>→</i> logged evidence</p></article><article><span>LATER</span><p>Everyday conversation <i>→</i> trained contextual language model <i>→</i> editable or spoken proposal <i>→</i> user confirmation <i>→</i> shared household update <i>→</i> continued production evaluation</p></article></div>
    </div></section>

    <section className="language-problem shell case-section reveal">
      <p className="eyebrow">LANGUAGE PROBLEM</p>
      <h2>Conversation is not a command line.</h2>
      <p>Household speech mixes requests, context, shorthand, and observations. The system must decide what is actionable, what language forms an entity, what depends on context, and when to ask rather than act.</p>
      <div className="utterance-card"><blockquote>“We’re out of drinks.”</blockquote><ul><li>A report that a specific drink is gone</li><li>A request to add drinks to the shopping list</li><li>A contextual statement with no requested action</li></ul></div>
    </section>

    <section className="language-stages case-section shell reveal">
      <p className="eyebrow">FIVE-STAGE NLU SYSTEM DESIGN</p><h2>One utterance becomes five independently testable decisions.</h2>
      <div className="language-card-grid">{stages.map((stage) => <article key={stage.label}><span>{stage.label}</span><h3>{stage.title}</h3><p>{stage.body}</p></article>)}</div>
      <ExistingMedia project={project} item={0} index="01" projectIndex={projectIndex} />
    </section>

    <section className="language-tint reveal"><div className="shell case-section">
      <p className="eyebrow">ANNOTATION + DATASET GOVERNANCE</p><h2>Annotation queues route evidence by what it can teach the model.</h2>
      <p className="annotation-intro">Nine overlapping queues prioritize production feedback, linguistic edge cases, generated coverage, relevance boundaries, and evaluation candidates.</p>
      <div className="language-flow">raw utterance <i>→</i> deterministic or AI-assisted draft <i>→</i> relevance, action, span, and normalization review <i>→</i> reviewed annotation <i>→</i> task-specific JSONL</div>
      <div className="annotation-queue-grid">{annotationQueues.map((queue) => <article key={queue.name}><span data-category={queue.category}>{queue.category}</span><h3>{queue.name}</h3><p>{queue.description}</p></article>)}</div>
      <p className="queue-boundary">Queues prioritize annotation work; they do not determine the final dataset split. A sample may appear in multiple queues, while its training or evaluation purpose is assigned separately. Evaluation holdout remains a candidate queue until human review, deduplication, leakage checks, and version approval are complete.</p>
      <div className="candidate-stats"><article><strong>800</strong><span>synthetic-v1 candidates</span></article><article><strong>600</strong><span>relevance candidates</span></article><article><strong>1,400</strong><span>total annotation candidates</span></article></div>
      <p className="dataset-warning">These 1,400 records are bootstrap candidates, not reviewed ground truth and not a valid final evaluation set.</p>
      <div className="principle-list">{annotationPrinciples.map((item) => <p key={item}>{item}</p>)}</div>
      <p className="section-compact-copy">Dataset hashes, split manifests, duplicate removal, and phrase-family leakage checks keep model comparisons reproducible. Production exports use pseudonymous identifiers and exclude unrelated personal content and secrets.</p>
      <ExistingMedia project={project} item={1} index="02" projectIndex={projectIndex} />
    </div></section>

    <section className="evidence-section shell case-section reveal">
      <p className="eyebrow">BASELINE + EVALUATION STATUS</p><h2>A simple baseline tests the data system before model complexity increases.</h2>
      <div className="two-column-copy"><div><h3>Current baseline</h3><p>A CPU-friendly TF-IDF and logistic-regression baseline provides reproducible single-intent classification; multi-action examples are excluded rather than collapsed. OpenAI API assists draft annotation only—it is not ground truth or the runtime model.</p></div><div><h3>Evaluation gate</h3><p>Evaluation groups classification, entity extraction, normalization, and joint-action exact match. Diagnostics focus on phrase family, unseen items, indirect requests, and contextual dependency.</p><p><strong>Pilot target:</strong> 300 reviewed training / 100 independent evaluation examples.<br /><strong>Baseline target:</strong> 1,000 reviewed training / 200 independent evaluation examples.</p></div></div>
    </section>

    <section className="safety-path language-tint reveal"><div className="shell case-section">
      <p className="eyebrow">TEXT-TO-RASPBERRY-PI PATH</p><h2>Text-first evaluation keeps future speech errors diagnosable.</h2>
      <p className="section-compact-copy">Once the English benchmark is stable, controlled speech and Korean-English evaluation can lead to the Raspberry Pi interaction surface. ASR and language-understanding errors remain independently measurable throughout that transition.</p>
      <div className="architecture-placeholder magnetic"><div className="architecture-flow">{(project.architecture?.nodes ?? []).flatMap((node, i, nodes) => [<span key={`${node}-node`}>{node}</span>, ...(i < nodes.length - 1 ? [<i key={`${node}-arrow`} aria-hidden="true">→</i>] : [])])}</div><p className="media-note">MEDIA PLACEHOLDER · {project.architecture?.mediaNote}</p></div>
    </div></section>

    <section className="roadmap-section shell case-section reveal">
      <p className="eyebrow">FOUR-PHASE ROADMAP</p>
      <ol>{['Freeze the reviewed English benchmark.','Add multi-turn context and household-specific language adaptation.','Evaluate Korean-English ASR and deploy to Raspberry Pi.','Add explainable recommendations and verified deal ranking.'].map((x) => <li key={x}>{x}</li>)}</ol>
      <p className="section-compact-copy">Detailed implementation notes, schemas, and research artifacts remain available through the project’s GitHub repository.</p>
    </section>
  </>;
}
