'use client';

import { useMemo, useState, type CSSProperties } from 'react';

type Reading = 'report' | 'shopping' | 'clarify';

const readings: Record<
  Reading,
  { label: string; intent: string; confidence: string; action: string }
> = {
  report: {
    label: 'Inventory report',
    intent: 'REPORT_DEPLETED',
    confidence: '0.62',
    action: 'Record a depleted category after review',
  },
  shopping: {
    label: 'Shopping request',
    intent: 'ADD_TO_SHOPPING_LIST',
    confidence: '0.57',
    action: 'Add beverage to the household shopping list',
  },
  clarify: {
    label: 'Context only',
    intent: 'CLARIFICATION_REQUIRED',
    confidence: '0.41',
    action: 'Ask what the speaker wants to do',
  },
};

const queues = [
  ['Correction', 'A user changed the proposed interpretation.'],
  ['Confirmed', 'A proposal was accepted in normal product use.'],
  ['Low confidence', 'The interpreter could not resolve a safe action.'],
  ['Expiry', 'A temporal phrase needs date grounding review.'],
  [
    'Generated review',
    'A synthetic coverage candidate needs a human decision.',
  ],
  [
    'Preference / context',
    'Useful household context without an immediate action.',
  ],
  ['Domain non-actionable', 'Kitchen language with no executable request.'],
  ['Unrelated negative', 'Speech outside the supported household domain.'],
  [
    'Evaluation holdout',
    'A reviewed production candidate reserved for evaluation.',
  ],
] as const;

export function JangoingProductDemo() {
  const [quantity, setQuantity] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div
      className="jg-product-demo"
      aria-label="Simulated confirm-before-mutation product flow"
    >
      <div className="jg-demo-toolbar">
        <span>JANGOING / HOUSEHOLD</span>
        <span>SIMULATED LOCALLY</span>
      </div>
      <div className="jg-demo-conversation">
        <p className="jg-demo-utterance">
          “Add two cartons of oat milk tomorrow.”
        </p>
        <div className="jg-proposal-card">
          <div>
            <span>STRUCTURED PROPOSAL</span>
            <strong>Add to inventory</strong>
          </div>
          <dl>
            <div>
              <dt>ITEM</dt>
              <dd>oat_milk</dd>
            </div>
            <div>
              <dt>QUANTITY</dt>
              <dd>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                {quantity}
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </dd>
            </div>
            <div>
              <dt>UNIT</dt>
              <dd>carton</dd>
            </div>
            <div>
              <dt>DATE</dt>
              <dd>tomorrow</dd>
            </div>
          </dl>
          <button
            className="jg-confirm-button"
            type="button"
            onClick={() => setConfirmed(true)}
          >
            {confirmed
              ? 'Confirmed · shared state updated'
              : 'Review and confirm'}
          </button>
        </div>
      </div>
      <p className="jg-honesty-label">
        Simulated locally — does not send data.
      </p>
    </div>
  );
}

export function JangoingLanguageLab() {
  const [reading, setReading] = useState<Reading>('clarify');
  const selected = readings[reading];
  const stages = useMemo(
    () => [
      ['A · RELEVANCE', reading === 'clarify' ? 'contextual' : 'actionable'],
      ['B · INTENT', selected.intent],
      ['C · ENTITY SPAN', '“drinks” → CATEGORY'],
      ['D · NORMALIZATION', 'drinks → beverage'],
      ['E · JOINT ACTION', selected.action],
    ],
    [reading, selected],
  );

  return (
    <div className="jg-language-lab">
      <div className="jg-lab-heading">
        <div>
          <span>AMBIGUITY LAB</span>
          <strong>“We’re out of drinks.”</strong>
        </div>
        <p>
          One surface form can support several readings. Choose the intended
          meaning to inspect the complete semantic parse.
        </p>
      </div>
      <fieldset className="jg-reading-tabs">
        <legend className="sr-only">Choose an utterance reading</legend>
        {(Object.keys(readings) as Reading[]).map((key) => (
          <button
            key={key}
            type="button"
            className={reading === key ? 'is-active' : ''}
            onClick={() => setReading(key)}
          >
            {readings[key].label}
          </button>
        ))}
      </fieldset>
      <ol className="jg-stage-breakdown">
        {stages.map(([label, value], index) => (
          <li
            key={label}
            style={{ '--jg-delay': `${index * 55}ms` } as CSSProperties}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
      <div className="jg-confidence-row">
        <span>INTERPRETATION CONFIDENCE</span>
        <strong>{selected.confidence}</strong>
        <i>
          <b style={{ width: `${Number(selected.confidence) * 100}%` }} />
        </i>
        <p>
          {reading === 'clarify'
            ? 'Below the action threshold: ask, do not mutate.'
            : 'Review is still required before household state changes.'}
        </p>
      </div>
      <p className="jg-honesty-label">
        Deterministic sample output — no trained model is running in this demo.
      </p>
    </div>
  );
}

export function JangoingQueueExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="jg-queue-explorer">
      <fieldset className="jg-queue-map">
        <legend className="sr-only">Annotation queues</legend>
        {queues.map(([name], index) => (
          <button
            key={name}
            type="button"
            className={active === index ? 'is-active' : ''}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {name}
          </button>
        ))}
      </fieldset>
      <aside aria-live="polite">
        <span>ROUTED TO</span>
        <h3>{queues[active][0]}</h3>
        <p>{queues[active][1]}</p>
        <dl>
          <div>
            <dt>INPUT</dt>
            <dd>Reviewed interaction evidence</dd>
          </div>
          <div>
            <dt>OUTPUT</dt>
            <dd>Annotation candidate, not a dataset split</dd>
          </div>
        </dl>
      </aside>
      <p className="jg-honesty-label">
        Queues may overlap. Human review, deduplication, and leakage checks
        happen before split assignment.
      </p>
    </div>
  );
}
