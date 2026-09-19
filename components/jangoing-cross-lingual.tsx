'use client';

import { useState } from 'react';

const surfaceForms = {
  English: '“Add oat milk to the shopping list.”',
  Korean: '“쇼핑 리스트에 오트밀크 추가해줘.”',
  Mixed: '“오트밀크 shopping list에 넣어줘.”',
} as const;

const evaluationGroups = [
  {
    title: 'ASR',
    metrics: [
      'WER',
      'CER',
      'Latency',
      'Household noise',
      'Far-field speech',
      'Code-switching',
    ],
  },
  {
    title: 'NLU',
    metrics: ['Relevance', 'Intent', 'Entity spans', 'Normalization'],
  },
  {
    title: 'END TO END',
    metrics: [
      'Joint-action exact match',
      'Clarification rate',
      'User correction rate',
    ],
  },
] as const;

export function JangoingCrossLingual() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof typeof surfaceForms>('English');

  return (
    <>
      <p className="eyebrow">CROSS-LINGUAL BY DESIGN</p>
      <h2>
        English first, with Korean-English speech grounding on the roadmap.
      </h2>

      <div className="jg-xling-description-grid">
        <article>
          <span>SHARED SEMANTIC CONTRACT</span>
          <p>
            English, Korean, and code-switched input should resolve to the same
            authorized, reviewable action structure. Language-specific
            processing changes, but household grounding, canonical values, and
            confirmation boundaries remain shared.
          </p>
        </article>
        <article>
          <span>SEPARATED EVALUATION</span>
          <p>
            ASR quality is measured independently from semantic interpretation
            so transcription, intent, entity-span, normalization, and
            final-action failures remain diagnosable.
          </p>
        </article>
      </div>

      <p className="jg-xling-evidence-caption">
        This direction builds on prior Korean technical-meeting speech-to-text
        data work and native Korean–English language experience.
      </p>

      <div className="jg-xling-contract">
        <p className="jg-xling-deployment-status">
          PLANNED EVALUATION · NOT YET DEPLOYED
        </p>
        <div
          className="jg-xling-tabs"
          role="tablist"
          aria-label="Compare language surface forms"
        >
          {(Object.keys(surfaceForms) as Array<keyof typeof surfaceForms>).map(
            (language) => (
              <button
                aria-controls="jangoing-surface-form"
                aria-selected={selectedLanguage === language}
                className={selectedLanguage === language ? 'is-selected' : ''}
                id={`jangoing-tab-${language.toLowerCase()}`}
                key={language}
                onClick={() => setSelectedLanguage(language)}
                role="tab"
                type="button"
              >
                {language}
              </button>
            ),
          )}
        </div>

        <div
          aria-live="polite"
          aria-labelledby={`jangoing-tab-${selectedLanguage.toLowerCase()}`}
          className="jg-xling-utterance"
          id="jangoing-surface-form"
          role="tabpanel"
        >
          <span>{selectedLanguage} surface form</span>
          <p lang={selectedLanguage === 'Korean' ? 'ko' : undefined}>
            {surfaceForms[selectedLanguage]}
          </p>
        </div>

        <div className="jg-xling-resolution" aria-hidden="true">
          <span>Different surface forms</span>
          <i>→</i>
          <span>Same reviewed action</span>
        </div>

        <div className="jg-xling-action">
          <span>SHARED STRUCTURED ACTION</span>
          <strong>ADD_TO_SHOPPING_LIST</strong>
          <dl>
            <div>
              <dt>ITEM</dt>
              <dd>oat_milk</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="jg-xling-evaluation">
        <p className="jg-xling-pipeline" aria-label="Evaluation pipeline">
          <span>SPEECH</span>
          <i>→</i>
          <span>ASR TRANSCRIPT</span>
          <i>→</i>
          <span>LANGUAGE INTERPRETATION</span>
          <i>→</i>
          <strong>REVIEWED ACTION</strong>
        </p>

        <div className="jg-xling-metrics">
          {evaluationGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <details className="jg-xling-span-policy">
        <summary>
          <span>KOREAN SPAN POLICY</span>
          <b aria-hidden="true">+</b>
        </summary>
        <div>
          <dl>
            <div>
              <dt>Raw utterance</dt>
              <dd lang="ko">“오트밀크를 추가해줘”</dd>
            </div>
            <div>
              <dt>ITEM span</dt>
              <dd lang="ko">오트밀크</dd>
            </div>
            <div>
              <dt>Case particle</dt>
              <dd lang="ko">를</dd>
            </div>
            <div>
              <dt>Normalized value</dt>
              <dd>oat_milk</dd>
            </div>
          </dl>
          <p>
            Korean case particles attach to nouns, so entity-span conventions
            must distinguish the canonical item expression from its grammatical
            marker.
          </p>
        </div>
      </details>
    </>
  );
}
