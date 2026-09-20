'use client';

import { useState } from 'react';

type PreferenceMode = 'include' | 'exclude';

const suggestions = [
  { id: 'regression', label: '회귀', category: 'WORLDVIEW' },
  { id: 'capable-female-lead', label: '능력있는여주', category: 'CHARACTER' },
  { id: 'contract-romance', label: '계약연애', category: 'RELATIONSHIP' },
  { id: 'happy-ending', label: '해피엔딩', category: 'MOOD' },
] as const;

type TagId = (typeof suggestions)[number]['id'] | 'misunderstanding' | 'sad-ending';

const tagLabels: Record<TagId, string> = {
  regression: '회귀',
  'capable-female-lead': '능력있는여주',
  'contract-romance': '계약연애',
  'happy-ending': '해피엔딩',
  misunderstanding: '오해',
  'sad-ending': '새드엔딩',
};

export function TagSparkPreferenceMedia() {
  const [mode, setMode] = useState<PreferenceMode>('include');
  const [included, setIncluded] = useState<TagId[]>([
    'regression',
    'capable-female-lead',
  ]);
  const [excluded, setExcluded] = useState<TagId[]>([
    'misunderstanding',
    'sad-ending',
  ]);

  const selectTag = (id: TagId) => {
    if (mode === 'include') {
      setExcluded((current) => current.filter((tag) => tag !== id));
      setIncluded((current) =>
        current.includes(id) ? current.filter((tag) => tag !== id) : [...current, id],
      );
      return;
    }

    setIncluded((current) => current.filter((tag) => tag !== id));
    setExcluded((current) =>
      current.includes(id) ? current.filter((tag) => tag !== id) : [...current, id],
    );
  };

  const removeTag = (id: TagId, preference: PreferenceMode) => {
    if (preference === 'include') {
      setIncluded((current) => current.filter((tag) => tag !== id));
    } else {
      setExcluded((current) => current.filter((tag) => tag !== id));
    }
  };

  return (
    <figure className="tagspark-preference-media magnetic">
      <div className="tagspark-preference-media__topline">
        <span>INCLUDE / EXCLUDE SELECTION</span>
        <small>01 / 03</small>
      </div>

      <div className="tagspark-preference-media__search">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        <span>Search tags</span>
        <kbd>⌘ K</kbd>
      </div>

      <div
        aria-label="Choose whether selected tags are included or excluded"
        className="tagspark-preference-media__mode"
      >
        <button
          aria-pressed={mode === 'include'}
          className={mode === 'include' ? 'is-active' : ''}
          onClick={() => setMode('include')}
          type="button"
        >
          <i aria-hidden="true">+</i>
          Include
        </button>
        <button
          aria-pressed={mode === 'exclude'}
          className={mode === 'exclude' ? 'is-active' : ''}
          onClick={() => setMode('exclude')}
          type="button"
        >
          <i aria-hidden="true">−</i>
          Exclude
        </button>
      </div>

      <div className="tagspark-preference-media__suggestions">
        <div>
          <span>SUGGESTED TAGS</span>
          <small>Tap to {mode}</small>
        </div>
        <ul>
          {suggestions.map((tag) => {
            const activePreference = included.includes(tag.id)
              ? 'include'
              : excluded.includes(tag.id)
                ? 'exclude'
                : null;

            return (
              <li key={tag.id}>
                <button
                  className={activePreference ? `is-${activePreference}` : ''}
                  onClick={() => selectTag(tag.id)}
                  type="button"
                >
                  <small>{tag.category}</small>
                  <strong>#{tag.label}</strong>
                  <i aria-hidden="true">
                    {activePreference === 'include'
                      ? '+'
                      : activePreference === 'exclude'
                        ? '−'
                        : '○'}
                  </i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tagspark-preference-media__query">
        <section>
          <header>
            <span>INCLUDE</span>
            <b>{included.length}</b>
          </header>
          <div>
            {included.map((id) => (
              <button
                aria-label={`Remove ${tagLabels[id]} from included tags`}
                key={id}
                onClick={() => removeTag(id, 'include')}
                type="button"
              >
                #{tagLabels[id]} <i aria-hidden="true">×</i>
              </button>
            ))}
            {included.length === 0 && <small>No required tags</small>}
          </div>
        </section>

        <section>
          <header>
            <span>EXCLUDE</span>
            <b>{excluded.length}</b>
          </header>
          <div>
            {excluded.map((id) => (
              <button
                aria-label={`Remove ${tagLabels[id]} from excluded tags`}
                key={id}
                onClick={() => removeTag(id, 'exclude')}
                type="button"
              >
                #{tagLabels[id]} <i aria-hidden="true">×</i>
              </button>
            ))}
            {excluded.length === 0 && <small>No blocked tags</small>}
          </div>
        </section>
      </div>

      <div className="tagspark-preference-media__footer">
        <span>{included.length + excluded.length} ACTIVE TAGS</span>
        <strong>Ready to rank <i aria-hidden="true">→</i></strong>
      </div>
      <figcaption>SEARCH → SELECT → REVERSE OR REMOVE</figcaption>
    </figure>
  );
}
