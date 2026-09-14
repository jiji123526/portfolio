'use client';

import { useState } from 'react';
import type { Project } from '@/lib/project-data';

type Incident = NonNullable<Project['incidents']>['cases'][number];

const incidentMetrics = [
  {
    before: '4–18 sec',
    after: '~80 ms',
    beforeLabel: 'Observed latency',
    afterLabel: 'Post-cutover sample',
    tabLabel: 'Channel initialization',
    note: '~80 ms is a limited post-cutover Worker sample, not a long-term percentile.',
  },
  {
    before: '212.62M',
    after: 'Bounded',
    beforeLabel: 'Observed cost',
    afterLabel: 'Design response',
    tabLabel: 'Rows read',
    note: '212.62M is the accumulated rows-read metric observed for the recursive lookup.',
  },
  {
    before: 'Ambiguous',
    after: 'Idempotent',
    beforeLabel: 'Failure mode',
    afterLabel: 'Delivery guarantee',
    tabLabel: 'Retry behavior',
    note: 'Stable client message IDs let retries converge on the authoritative persisted record.',
  },
];

export function YapIncidentExplorer({ incidents }: { incidents: Incident[] }) {
  const [selected, setSelected] = useState(0);
  const incident = incidents[selected];
  const metric = incidentMetrics[selected];

  return (
    <>
      <div className="yap-incident-tabs" aria-label="Production incidents">
        {incidents.map((item, index) => (
          <button
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            key={item.title}
          >
            <span>0{index + 1}</span>
            <strong>{item.title}</strong>
            <small>{incidentMetrics[index].tabLabel}</small>
          </button>
        ))}
      </div>

      <label className="yap-incident-select" htmlFor="yap-incident">
        <span>Choose incident</span>
        <select
          id="yap-incident"
          value={selected}
          onChange={(event) => setSelected(Number(event.target.value))}
        >
          {incidents.map((item, index) => (
            <option value={index} key={item.title}>
              0{index + 1} · {item.title}
            </option>
          ))}
        </select>
      </label>

      <div className="yap-incident-console">
        <div className="yap-incident-metric">
          <div>
            <span>{metric.beforeLabel}</span>
            <strong>{metric.before}</strong>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>{metric.afterLabel}</span>
            <strong>{metric.after}</strong>
          </div>
        </div>
        <p className="yap-incident-measurement">{metric.note}</p>
        <dl>
          <div>
            <dt>SIGNAL</dt>
            <dd>{incident.signal}</dd>
          </div>
          <div>
            <dt>DIAGNOSIS</dt>
            <dd>{incident.diagnosis}</dd>
          </div>
          <div>
            <dt>RESPONSE</dt>
            <dd>{incident.response}</dd>
          </div>
          <div>
            <dt>PREVENTION</dt>
            <dd>{incident.prevention}</dd>
          </div>
        </dl>
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {incident.title}. {metric.beforeLabel}: {metric.before}.{' '}
        {metric.afterLabel}: {metric.after}.
      </span>
    </>
  );
}
