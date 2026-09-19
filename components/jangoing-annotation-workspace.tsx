'use client';

import { useState } from 'react';

type ReviewMode = 'draft' | 'reviewed';

const annotationExample = {
  queue: 'Generated coverage',
  source: 'AI-assisted draft',
  intent: 'ADD_TO_SHOPPING_LIST',
  phraseFamily: 'direct_request',
  draft: {
    entities: [
      {
        label: 'ITEM',
        text: 'two cartons of oat milk',
        normalizedValue: 'oat_milk',
      },
    ],
  },
  reviewed: {
    entities: [
      { label: 'QUANTITY', text: 'two', normalizedValue: '2' },
      { label: 'UNIT', text: 'cartons', normalizedValue: 'carton' },
      { label: 'ITEM', text: 'oat milk', normalizedValue: 'oat_milk' },
    ],
  },
} as const;

export function JangoingAnnotationWorkspace() {
  const [mode, setMode] = useState<ReviewMode>('draft');
  const reviewed = mode === 'reviewed';
  const entities = reviewed
    ? annotationExample.reviewed.entities
    : annotationExample.draft.entities;

  return (
    <div className="jangoing-media-placeholder jangoing-annotation-workspace">
      <div className="jg-annotation-demo">
        <header className="jg-annotation-toolbar">
          <div>
            <span>QUEUE</span>
            <strong>{annotationExample.queue}</strong>
          </div>
          <span className={reviewed ? 'is-reviewed' : 'is-draft'}>
            {reviewed ? 'REVIEWED' : 'DRAFT'}
          </span>
        </header>

        <div className="jg-annotation-source">
          <span>SOURCE</span>
          <strong>{annotationExample.source}</strong>
          {!reviewed && <small>NOT GROUND TRUTH</small>}
        </div>

        <div
          aria-label="Compare AI draft and human-reviewed annotation"
          className="jg-annotation-mode"
          role="group"
        >
          <button
            aria-pressed={!reviewed}
            className={!reviewed ? 'is-selected is-draft' : ''}
            onClick={() => setMode('draft')}
            type="button"
          >
            AI Draft
          </button>
          <button
            aria-pressed={reviewed}
            className={reviewed ? 'is-selected is-reviewed' : ''}
            onClick={() => setMode('reviewed')}
            type="button"
          >
            Human Reviewed
          </button>
        </div>

        <div className="jg-annotation-review-content" key={mode}>
          <section className="jg-annotation-utterance">
            <span>RAW UTTERANCE</span>
            <p>
              Add{' '}
              {reviewed ? (
                <>
                  <mark className="is-quantity">
                    two<small>QUANTITY</small>
                  </mark>{' '}
                  <mark className="is-unit">
                    cartons<small>UNIT</small>
                  </mark>{' '}
                  of{' '}
                  <mark className="is-item">
                    oat milk<small>ITEM</small>
                  </mark>
                </>
              ) : (
                <mark className="is-draft">
                  two cartons of oat milk<small>ITEM</small>
                </mark>
              )}{' '}
              to the shopping list.
            </p>
          </section>

          <div className="jg-annotation-semantics">
            <div>
              <span>INTENT</span>
              <strong>{annotationExample.intent}</strong>
            </div>
            <div>
              <span>PHRASE FAMILY</span>
              <strong>{annotationExample.phraseFamily}</strong>
            </div>
          </div>

          <section className="jg-annotation-entities">
            <div className="jg-annotation-entity-header" aria-hidden="true">
              <span>LABEL</span>
              <span>SURFACE TEXT</span>
              <span>NORMALIZED VALUE</span>
            </div>
            {entities.map((entity) => (
              <div className="jg-annotation-entity-row" key={entity.label}>
                <strong>{entity.label}</strong>
                <q>{entity.text}</q>
                <code>{entity.normalizedValue}</code>
              </div>
            ))}
            {!reviewed && (
              <p className="jg-annotation-hint">
                Span may include quantity and unit.
              </p>
            )}
          </section>

          <footer
            className={`jg-annotation-footer${reviewed ? ' is-reviewed' : ''}`}
          >
            <div>
              <strong>
                {reviewed
                  ? 'Human-verified annotation'
                  : 'AI-generated proposal'}
              </strong>
              <small>
                {reviewed
                  ? 'Ready for dataset export'
                  : 'Human review required'}
              </small>
            </div>
            {reviewed ? (
              <span aria-label="Reviewed and export eligible">✓</span>
            ) : (
              <b>Not eligible for dataset export</b>
            )}
          </footer>
        </div>
      </div>

      <strong className="jg-annotation-title">Annotation Workspace</strong>
      <p>AI DRAFT → HUMAN CORRECTION → REVIEWED ANNOTATION</p>
    </div>
  );
}
