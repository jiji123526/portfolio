'use client';

import { useState } from 'react';
import type { Project } from '@/lib/project-data';
import { YapSystemDiagram } from './yap-system-diagram';

const incidentMetrics = [
  { before: '4–18 sec', after: '~80 ms', label: 'Channel initialization' },
  { before: '212.62M', after: 'Bounded', label: 'Rows read' },
  { before: 'Ambiguous', after: 'Idempotent', label: 'Retry behavior' },
];

function LinkSolutionDemo() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="yap-feature-demo yap-link-demo">
      <span className="yap-demo-label">SHARED ROOM</span>
      <div className="yap-link-address"><span>yapndot.com/room/after-hours</span><i aria-hidden="true">↗</i></div>
      <div className="yap-link-participants">
        <span className="owner">Host</span>
        {joined && <span className="guest">Anonymous guest joined</span>}
      </div>
      <button type="button" onClick={() => setJoined(true)} disabled={joined}>
        {joined ? 'Room opened' : 'Open shared link'}
      </button>
    </div>
  );
}

function ModerationSolutionDemo() {
  const [step, setStep] = useState(0);
  const steps = ['Report received', 'Owner review', 'Resolution visible'];

  return (
    <div className="yap-feature-demo yap-moderation-demo">
      <span className="yap-demo-label">RECOVERABLE MODERATION</span>
      <div className="yap-moderation-track">
        {steps.map((label, index) => (
          <button
            type="button"
            aria-pressed={step === index}
            className={step === index ? 'is-active' : step > index ? 'is-complete' : ''}
            onClick={() => setStep(index)}
            key={label}
          >
            <i>{index + 1}</i><span>{label}</span>
          </button>
        ))}
      </div>
      <p>{[
        'The report enters a scoped queue with its evidence intact.',
        'The owner can review context before choosing an action.',
        'Warnings, restrictions, and appeals remain explicit state.',
      ][step]}</p>
    </div>
  );
}

function PrivateMessageSolutionDemo() {
  const [view, setView] = useState<'guest' | 'owner'>('guest');

  return (
    <div className="yap-feature-demo yap-private-demo">
      <span className="yap-demo-label">PRIVATE THREAD BOUNDARY</span>
      <div className="yap-segmented-control" aria-label="Private message viewpoint">
        <button type="button" aria-pressed={view === 'guest'} onClick={() => setView('guest')}>Guest view</button>
        <button type="button" aria-pressed={view === 'owner'} onClick={() => setView('owner')}>Owner view</button>
      </div>
      <div className="yap-private-thread">
        <span className="received">Can I ask you something privately?</span>
        <span className="sent">{view === 'owner' ? 'Yes — only you and I can read this.' : 'Private message sent to the owner.'}</span>
      </div>
      <p>{view === 'owner' ? 'Authorized owner thread' : 'This visitor’s private thread only'}</p>
    </div>
  );
}

function LiveSolutionDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className={`yap-feature-demo yap-live-demo ${active ? 'is-live' : ''}`}>
      <span className="yap-demo-label">TEMPORARY LIVE SESSION</span>
      <div className="yap-live-status">
        <i aria-hidden="true" />
        <strong>{active ? 'Live now' : 'Ready to begin'}</strong>
        <span>{active ? 'Session state stays separate from room history' : 'Nothing temporary has entered the permanent timeline'}</span>
      </div>
      <div className="yap-live-progress" aria-hidden="true"><span /></div>
      <button type="button" onClick={() => setActive((current) => !current)}>
        {active ? 'End live session' : 'Start live session'}
      </button>
    </div>
  );
}

function YapSolutionVisual({ index }: { index: number }) {
  if (index === 0) return <LinkSolutionDemo />;
  if (index === 1) return <ModerationSolutionDemo />;
  if (index === 2) return <PrivateMessageSolutionDemo />;
  return <LiveSolutionDemo />;
}

export function YapCaseContent({ project }: { project: Project }) {
  const [constraint, setConstraint] = useState(0);
  const [operation, setOperation] = useState(0);
  const [incident, setIncident] = useState(0);
  const transformation = project.transformation!;
  const operations = project.platformOperations!;
  const incidents = project.incidents!;
  const transformationParts = transformation.body.split(' I later');

  return (
    <div className="yap-case-content">
      <section className="yap-problem shell case-section reveal">
        <p className="eyebrow">PROBLEM</p>
        <h2>
          Joining should feel <mark>as light as opening a link.</mark> Ownership, privacy,
          and safety should remain <mark>explicit.</mark>
        </h2>
        <p className="yap-problem-intro">{project.challengeIntro}</p>

        <div className="yap-constraint-layout">
          <div className="yap-constraint-tabs" aria-label="Product constraints">
            {project.process?.map((item, index) => (
              <button
                type="button"
                aria-pressed={constraint === index}
                onClick={() => setConstraint(index)}
                key={item.label}
              >
                <span>0{index + 1} · {item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </button>
            ))}
          </div>

          <div className={`yap-constraint-preview constraint-${constraint}`}>
            {constraint === 0 && <>
              <span className="yap-demo-label">ENTRY PATH</span>
              <div className="constraint-link">shared link <i>→</i> room <i>→</i> first message</div>
              <strong>No signup checkpoint</strong>
            </>}
            {constraint === 1 && <>
              <span className="yap-demo-label">TRUST BOUNDARY</span>
              <div className="constraint-boundary">
                <span>Anonymous guest</span><i>Server authorization</i><span>Channel owner</span>
              </div>
              <strong>Control without widening visibility</strong>
            </>}
            {constraint === 2 && <>
              <span className="yap-demo-label">DELIVERY PRINCIPLE</span>
              <div className="constraint-realtime"><span>Request</span><i /><span>Commit</span><i /><span>Deliver</span></div>
              <strong>Durable first. Realtime second.</strong>
            </>}
          </div>
        </div>

        <p className="yap-problem-statement">{project.statement}</p>
      </section>

      <section className="yap-transformation reveal">
        <div className="shell case-section">
          <p className="eyebrow">FROM PERSONAL ROOM TO PLATFORM</p>
          <div className="yap-transformation-copy">
            <h2>The original behavior became the specification for a larger system.</h2>
            <div>
              <p>{transformationParts[0]}</p>
              {transformationParts[1] && <p>I later{transformationParts[1]}</p>}
            </div>
          </div>
          <div className="yap-platform-timeline">
            <article><span>01</span><strong>Single personal room</strong><p>Vanilla JS · Supabase</p></article>
            <article><span>02</span><strong>Multi-tenant platform</strong><p>Explicit identity and ownership boundaries</p></article>
            <article><span>03</span><strong>Verified migration</strong><p>History preserved without linking anonymous identities</p></article>
          </div>
          <div className="yap-transformation-stats">
            {transformation.stats.map((stat) => <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
          </div>
        </div>
      </section>

      <section className="yap-solutions shell case-section">
        <p className="eyebrow reveal">{project.solutionsLabel}</p>
        {project.solutions.map((solution, index) => (
          <article className="yap-solution-row reveal" key={solution.title}>
            <div className="yap-solution-copy">
              <span>0{index + 1}</span>
              <h2>{solution.title}</h2>
              <p>{solution.body}</p>
            </div>
            <YapSolutionVisual index={index} />
          </article>
        ))}
      </section>

      {project.architecture && (
        <section className="architecture shell case-section reveal yap-architecture">
          <div className="architecture-copy">
            <p className="eyebrow">SYSTEM DESIGN</p>
            <h2>{project.architecture.title}</h2>
            <p>{project.architecture.body}</p>
            {project.architecture.detail && <p>{project.architecture.detail}</p>}
          </div>
          <YapSystemDiagram />
        </section>
      )}

      <section className="yap-operations reveal">
        <div className="shell case-section">
          <p className="eyebrow">PLATFORM OPERATIONS</p>
          <h2>{operations.title}</h2>
          <p className="yap-operations-intro">{operations.intro}</p>
          <div className="yap-operations-layout">
            <div className="yap-operation-tabs">
              {operations.cards.map((card, index) => (
                <button
                  type="button"
                  aria-pressed={operation === index}
                  onClick={() => setOperation(index)}
                  key={card.title}
                >
                  <span>0{index + 1}</span><strong>{card.title}</strong>
                </button>
              ))}
            </div>
            <div className="yap-operation-detail" aria-live="polite">
              <span>ACTIVE OPERATING LAYER</span>
              <h3>{operations.cards[operation].title}</h3>
              <p>{operations.cards[operation].body}</p>
            </div>
          </div>
          <aside className="yap-security-boundary">
            <span>SECURITY BOUNDARY</span>
            <h3>{operations.boundary.title}</h3>
            <p>{operations.boundary.body}</p>
          </aside>
        </div>
      </section>

      <section className="yap-incidents reveal">
        <div className="shell case-section">
          <p className="eyebrow">INCIDENTS THAT CHANGED THE ARCHITECTURE</p>
          <div className="yap-incident-tabs">
            {incidents.cases.map((item, index) => (
              <button
                type="button"
                aria-pressed={incident === index}
                onClick={() => setIncident(index)}
                key={item.title}
              >
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <small>{incidentMetrics[index].label}</small>
              </button>
            ))}
          </div>

          <div className="yap-incident-console" aria-live="polite">
            <div className="yap-incident-metric">
              <span>BEFORE</span><strong>{incidentMetrics[incident].before}</strong>
              <i aria-hidden="true">→</i>
              <span>AFTER</span><strong>{incidentMetrics[incident].after}</strong>
            </div>
            <dl>
              <div><dt>SIGNAL</dt><dd>{incidents.cases[incident].signal}</dd></div>
              <div><dt>DIAGNOSIS</dt><dd>{incidents.cases[incident].diagnosis}</dd></div>
              <div><dt>RESPONSE</dt><dd>{incidents.cases[incident].response}</dd></div>
              <div><dt>PREVENTION</dt><dd>{incidents.cases[incident].prevention}</dd></div>
            </dl>
          </div>
          <aside className="yap-additional-hardening"><span>ADDITIONAL HARDENING</span><p>{incidents.additionalHardening}</p></aside>
        </div>
      </section>

      <section className="yap-impact">
        <div className="shell yap-impact-inner">
          <p className="eyebrow">PRODUCTION EVIDENCE</p>
          <div className="yap-impact-main"><strong>6,517</strong><span>messages created in one production week</span></div>
          <div className="yap-impact-stats">
            <article><strong>332</strong><span>Median messages per day</span></article>
            <article><strong>~550</strong><span>Average excluding the largest spike</span></article>
            <article><strong>7 days</strong><span>Public conversations and private DMs</span></article>
          </div>
          <p className="yap-impact-copy">{project.impactBody}</p>
        </div>
      </section>

      {project.takeaways && (
        <section className="yap-takeaways shell case-section">
          <p className="eyebrow">TAKEAWAYS</p>
          <h2>What operating the product changed in my practice</h2>
          <div className="yap-takeaway-list">
            {project.takeaways.map((item, index) => (
              <details key={item.title} open={index === 0}>
                <summary><span>0{index + 1}</span><strong>{item.title}</strong><b aria-hidden="true">+</b></summary>
                <p>{item.body}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
