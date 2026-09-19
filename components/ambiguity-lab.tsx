'use client';

import { useState } from 'react';
import styles from './ambiguity-lab.module.css';

type AmbiguityContext = 'none' | 'inventory' | 'shopping';

type Interpretation = {
  label: string;
  decision: string;
  description: string;
  readings: readonly string[];
  question?: string;
  intent?: string;
  action?: string;
  review?: string;
};

const interpretations: Record<AmbiguityContext, Interpretation> = {
  none: {
    label: 'NEEDS CLARIFICATION',
    decision: 'NEEDS CLARIFICATION',
    description: 'The intended state change is not clear enough to execute.',
    readings: [
      'Mark milk as out of stock',
      'Add milk to the shopping list',
      'Keep it as household context',
    ],
    question:
      'Should I mark milk as out of stock or add it to the shopping list?',
  },
  inventory: {
    label: 'PROPOSED INVENTORY UPDATE',
    decision: 'REVIEW REQUIRED',
    description:
      'The active inventory context makes an availability update more likely.',
    readings: ['Set milk quantity to 0'],
    intent: 'SET_QUANTITY',
    action: 'Milk quantity → 0',
    review: 'Review required before updating inventory.',
  },
  shopping: {
    label: 'PROPOSED SHOPPING ACTION',
    decision: 'REVIEW REQUIRED',
    description:
      'The active shopping context makes a replenishment request more likely.',
    readings: ['Add milk to the shopping list'],
    intent: 'ADD_TO_SHOPPING_LIST',
    action: 'Add Milk · Quantity not specified',
    review: 'Review required before updating the shared list.',
  },
};

const contextOptions: Array<{ label: string; value: AmbiguityContext }> = [
  { label: 'No context', value: 'none' },
  { label: 'Inventory', value: 'inventory' },
  { label: 'Shopping', value: 'shopping' },
];

export function AmbiguityLab() {
  const [context, setContext] = useState<AmbiguityContext>('none');
  const result = interpretations[context];
  const isClarification = context === 'none';

  return (
    <section className={styles.lab}>
      <header className={styles.labHeader}>
        <span>TRY AN AMBIGUOUS REQUEST</span>
        <p className={styles.utterance}>
          “We&apos;re out of <mark>milk</mark>.”
        </p>
        <div className={styles.entityLine}>
          <span>ITEM</span>
          <code>“milk” → milk</code>
        </div>
      </header>

      <div
        aria-label="Choose interpretation context"
        className={styles.contextSelector}
        role="group"
      >
        {contextOptions.map((option) => (
          <button
            aria-pressed={context === option.value}
            key={option.value}
            onClick={() => setContext(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className={styles.resultContent} key={context}>
        <div className={styles.resultGrid}>
          <section className={styles.readings}>
            <div className={styles.readingsHeading}>
              <span>{isClarification ? 'POSSIBLE READINGS' : 'PROPOSED READING'}</span>
              {!isClarification && <b>{result.label}</b>}
            </div>
            <ul className={styles.readingList}>
              {result.readings.map((reading, index) => (
                <li key={reading}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{reading}</p>
                </li>
              ))}
            </ul>

            {!isClarification && (
              <dl className={styles.parse}>
                <div>
                  <dt>INTENT</dt>
                  <dd><code>{result.intent}</code></dd>
                </div>
                <div>
                  <dt>ENTITY</dt>
                  <dd>ITEM · milk</dd>
                </div>
                <div>
                  <dt>PROPOSED ACTION</dt>
                  <dd>{result.action}</dd>
                </div>
              </dl>
            )}
          </section>

          <aside
            className={`${styles.decision} ${
              isClarification ? styles.clarification : styles.resolved
            }`}
          >
            <span>DECISION</span>
            <strong>{result.decision}</strong>
            <p>{result.description}</p>
          </aside>
        </div>

        <section className={styles.response}>
          <span className={styles.indicator} aria-hidden="true">J</span>
          <div>
            <small>{isClarification ? 'JANGOING ASKS' : 'HUMAN REVIEW'}</small>
            <p>{isClarification ? result.question : result.review}</p>
          </div>
        </section>

        {!isClarification && (
          <div className={styles.actions}>
            <button type="button">Edit interpretation</button>
            <button className={styles.primaryAction} type="button">
              Review action
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
