import type { Project } from '@/lib/project-data';
import { ChannelOwnerControlsDemo } from './channel-owner-controls-demo';
import { ImpactCount } from './impact-count';
import { LinkToRoomDemo } from './link-to-room-demo';
import { LiveSessionLifecycleDemo } from './live-session-lifecycle-demo';
import { PlatformOperationsInspection } from './platform-operations-inspection';
import { PrivateVisibilityDemo } from './private-visibility-demo';
import { YapIncidentExplorer } from './yap-incident-explorer';
import { YapSystemDiagram } from './yap-system-diagram';

const constraints = [
  {
    number: '01',
    category: 'Participation',
    title: 'No-account entry',
    description:
      'A shared link should open directly into a room with the composer ready.',
    diagram: (
      <>
        <span>Shared link</span>
        <i>→</i>
        <span>Room</span>
        <i>→</i>
        <span>Message</span>
      </>
    ),
    kind: 'entry',
  },
  {
    number: '02',
    category: 'Trust',
    title: 'Control without widening visibility',
    description:
      'Moderation authority should stay explicit without broadening access beyond the scoped evidence required for review.',
    diagram: (
      <>
        <span>Guest</span>
        <i>Server boundary</i>
        <span>Owner</span>
      </>
    ),
    kind: 'trust',
  },
  {
    number: '03',
    category: 'Delivery',
    title: 'Durable first, realtime second',
    description:
      'The durable write defines the record before realtime delivery accelerates it.',
    diagram: (
      <>
        <span>Request</span>
        <i>→</i>
        <span>Commit</span>
        <i>→</i>
        <span>Deliver</span>
      </>
    ),
    kind: 'delivery',
  },
];

const solutionSlots = [
  'link-entry',
  'channel-owner-controls',
  'private-visibility',
  'live-session',
];

function YapSolutionVisual({ index }: { index: number }) {
  if (index === 0) return <LinkToRoomDemo />;
  if (index === 1) return <ChannelOwnerControlsDemo />;
  if (index === 2) return <PrivateVisibilityDemo />;
  if (index === 3) return <LiveSessionLifecycleDemo />;
  return null;
}

export function YapCaseContent({ project }: { project: Project }) {
  const transformation = project.transformation!;
  const operations = project.platformOperations!;
  const incidents = project.incidents!;
  const transformationParts = transformation.body.split(' This required ');
  const boundaryAndMigration = transformationParts[1]?.split(' I later ') ?? [];

  return (
    <div className="yap-case-content">
      <section className="yap-problem shell case-section">
        <p className="eyebrow">PROBLEM</p>
        <h2 className="yap-title-effect">
          Joining should feel <mark>as light as opening a link.</mark>{' '}
          Ownership, privacy, and safety should remain <mark>explicit.</mark>
        </h2>
        <p className="yap-problem-intro">{project.challengeIntro}</p>

        <div className="yap-constraint-grid">
          {constraints.map((constraint) => (
            <article key={constraint.category}>
              <div className="yap-constraint-heading">
                <span>{constraint.number}</span>
                <small>{constraint.category}</small>
              </div>
              <h3>{constraint.title}</h3>
              <p>{constraint.description}</p>
              <div
                className={`yap-constraint-diagram is-${constraint.kind}`}
                aria-hidden="true"
              >
                {constraint.diagram}
              </div>
            </article>
          ))}
        </div>

        <p className="yap-problem-statement">{project.statement}</p>
      </section>

      <section className="yap-transformation">
        <div className="shell case-section">
          <p className="eyebrow">FROM PERSONAL ROOM TO PLATFORM</p>
          <div className="yap-transformation-copy">
            <h2>
              <span className="yap-transformation-line">Personal room</span>
              <span className="yap-transformation-line yap-transformation-destination">
                <span
                  className="yap-transformation-arrow"
                  aria-hidden="true"
                >
                  →
                </span>{' '}
                multi-tenant platform
              </span>
            </h2>
            <div>
              <p>{transformationParts[0]}</p>
              {transformationParts[1] && (
                <p>
                  This required {boundaryAndMigration[0]}
                </p>
              )}
              {boundaryAndMigration[1] && (
                <p>I later {boundaryAndMigration[1]}</p>
              )}
            </div>
          </div>
          <div className="yap-platform-timeline">
            <article>
              <span>01 · Original behavior</span>
              <strong>Single personal room</strong>
              <p>Vanilla JS and Supabase established the product behavior.</p>
            </article>
            <article>
              <span>02 · Platform boundaries</span>
              <strong>Explicit ownership and identity</strong>
              <p>
                Anonymous, authenticated, owner, and admin authority became
                separate states.
              </p>
            </article>
            <article>
              <span>03 · Verified migration</span>
              <strong>History preserved</strong>
              <p>
                References and record counts were checked before and after
                migration.
              </p>
            </article>
          </div>
          <div className="yap-integrity-checks">
            <p>Migration integrity checks</p>
            <div className="yap-transformation-stats">
              {transformation.stats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="yap-solutions shell case-section">
        <p className="eyebrow">{project.solutionsLabel}</p>
        <aside
          className="yap-demo-guide reveal"
          aria-labelledby="yap-demo-guide-title"
        >
          <span className="yap-demo-guide__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M7 4l17 15-8.2 1.1 4.8 7.3-4.1 2.6-4.7-7.2L7 29V4Z" />
              <path d="M23.5 5.5l2-2M25.5 11h3M19 3V0" />
            </svg>
          </span>
          <div>
            <span>INTERACTIVE PRODUCT DEMOS</span>
            <h2 id="yap-demo-guide-title">Try the flows yourself.</h2>
            <p>
              Click, tap, or use the keyboard to enter a room, change owner
              settings, compare private visibility,
              <br />
              and run a temporary live session.
            </p>
            <p>Everything is simulated locally.</p>
          </div>
        </aside>
        {project.solutions.map((solution, index) => (
          <article
            className={`yap-solution-row reveal ${index > 0 ? 'yap-solution-row--wide-demo' : ''}`}
            key={solution.title}
          >
            <div className="yap-solution-copy">
              <span>0{index + 1}</span>
              <h2 className="yap-title-effect">
                {index === 0 ? (
                  <>
                    A room begins with a{' '}
                    <span className="yap-link-title">
                      <span
                        className="yap-link-title__icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M10.6 13.4a4.8 4.8 0 0 0 6.8 0l2-2a4.8 4.8 0 0 0-6.8-6.8l-1.1 1.1" />
                          <path d="M13.4 10.6a4.8 4.8 0 0 0-6.8 0l-2 2a4.8 4.8 0 0 0 6.8 6.8l1.1-1.1" />
                        </svg>
                      </span>
                      <span>link.</span>
                    </span>
                  </>
                ) : index === 1 ? (
                  <>
                    Anonymous does not mean{' '}
                    <span className="yap-chaotic-word" aria-label="chaotic.">
                      <span aria-hidden="true">c</span>
                      <span aria-hidden="true">h</span>
                      <span aria-hidden="true">a</span>
                      <span aria-hidden="true">o</span>
                      <span aria-hidden="true">t</span>
                      <span aria-hidden="true">i</span>
                      <span aria-hidden="true">c</span>
                      <span aria-hidden="true">.</span>
                    </span>
                  </>
                ) : index === 2 ? (
                  <>
                    <span className="yap-private-title">
                      <span
                        className="yap-private-title__icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24">
                          <rect x="5" y="10" width="14" height="10" rx="2" />
                          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                        </svg>
                      </span>
                      <span className="yap-private-title__label">
                        Private messages
                      </span>
                    </span>{' '}
                    have a visible boundary.
                  </>
                ) : index === 3 ? (
                  <span className="yap-live-title">
                    <span
                      className="yap-live-title__dot"
                      aria-hidden="true"
                    />
                    <span className="yap-live-title__copy">
                      <span>Live is intentionally</span>
                      <span className="yap-temporary-title">
                        temporary.
                        <span
                          className="yap-temporary-title__timer"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </span>
                ) : (
                  solution.title
                )}
              </h2>
              <p>{solution.body}</p>
            </div>
            <div className="yap-demo-slot" data-demo={solutionSlots[index]}>
              <YapSolutionVisual index={index} />
            </div>
          </article>
        ))}
      </section>

      {project.architecture && (
        <section className="architecture shell case-section yap-architecture">
          <div className="architecture-copy">
            <p className="eyebrow">SYSTEM DESIGN</p>
            <h2>{project.architecture.title}</h2>
            <p>{project.architecture.body}</p>
            {project.architecture.detail && (
              <p>{project.architecture.detail}</p>
            )}
          </div>
          <YapSystemDiagram />
        </section>
      )}

      <section className="yap-operations">
        <div className="shell case-section">
          <p className="eyebrow">PLATFORM OPERATIONS</p>
          <h2>{operations.title}</h2>
          <p className="yap-operations-intro">{operations.intro}</p>

          <table
            className="yap-authority-comparison"
            aria-label="Moderation authority comparison"
          >
            <thead>
              <tr>
                <th scope="col">Channel owner</th>
                <th scope="col">Platform admin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Room-level moderation</td>
                <td>Escalated abuse</td>
              </tr>
              <tr>
                <td>Local notices</td>
                <td>Global notices</td>
              </tr>
              <tr>
                <td>Channel restrictions</td>
                <td>Platform restrictions</td>
              </tr>
            </tbody>
          </table>

          <PlatformOperationsInspection />

          <aside className="yap-security-boundary">
            <span>SECURITY BOUNDARY</span>
            <h3>{operations.boundary.title}</h3>
            <p>
              Interface visibility and server authorization are separate
              controls. {operations.boundary.body}
            </p>
          </aside>
        </div>
      </section>

      <section className="yap-incidents">
        <div className="shell case-section">
          <p className="eyebrow">INCIDENTS THAT CHANGED THE ARCHITECTURE</p>
          <YapIncidentExplorer incidents={incidents.cases} />
          <aside className="yap-additional-hardening">
            <span>ADDITIONAL HARDENING</span>
            <p>{incidents.additionalHardening}</p>
          </aside>
        </div>
      </section>

      <section className="yap-impact">
        <div className="shell yap-impact-inner">
          <p className="eyebrow">PRODUCTION EVIDENCE</p>
          <div className="yap-impact-main">
            <ImpactCount value={6517} />
            <span>messages created in one production week</span>
            <small>September 5–11, 2026 (UTC)</small>
          </div>
          <div className="yap-impact-stats">
            <article>
              <strong>332</strong>
              <span>Median messages per day</span>
            </article>
            <article>
              <strong>~550</strong>
              <span>Average excluding the largest spike</span>
            </article>
            <article>
              <strong>433</strong>
              <span>Active senders during the period</span>
            </article>
          </div>
          <div className="yap-impact-notes">
            <p>
              <span>COUNTING NOTE</span>
              <span className="yap-impact-note-body">
                Scope: public conversations and private DMs. Created-message
                totals include messages later deleted by users.
              </span>
            </p>
            <p>
              <span>CALCULATION NOTE</span>
              <span className="yap-impact-note-body">
                Median and adjusted average use the September 5–11, 2026 (UTC)
                window; the adjusted average excludes the largest event-driven
                spike.
              </span>
            </p>
          </div>
        </div>
      </section>

      {project.takeaways && (
        <section className="yap-takeaways shell case-section">
          <p className="eyebrow">TAKEAWAYS</p>
          <h2>What operating the product changed in my practice</h2>
          <div className="yap-takeaway-list">
            {project.takeaways.map((item, index) => (
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
      )}
    </div>
  );
}
