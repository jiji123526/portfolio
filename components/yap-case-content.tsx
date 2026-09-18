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

const solutionRationales = [
  {
    userProblem:
      'A signup form makes people leave before the conversation even starts.',
    designDecision:
      'A shared link opens directly into a room with the composer ready: no login, nickname, or profile.',
    whyThisWay:
      'Friction belongs only where the conversation needs it, through optional passcodes, never at the front door.',
  },
  {
    userProblem:
      "Anonymity invites participation, but without controls it also invites chaos, and owners feel they can't keep a room safe.",
    designDecision:
      'Passcodes, chat freezes, and word filters change the room instantly without making the owner leave the conversation.',
    whyThisWay:
      'Moderation authority should stay explicit and immediate without widening visibility. Control, not surveillance.',
  },
  {
    userProblem:
      'In an anonymous space, “wait, who can see this?” is the fear that quietly breaks trust.',
    designDecision:
      'The sender and owner share the same private thread; other visitors continue to see only public messages.',
    whyThisWay:
      'Privacy has to be a visible boundary, not a hidden rule. People share honestly when they can see who is on the other side.',
  },
  {
    userProblem:
      'The weight of a permanent record discourages the light, in-the-moment exchanges people actually want.',
    designDecision:
      'A host opens a separate live session whose messages and reactions disappear when it ends, while the normal room stays intact.',
    whyThisWay:
      'Making impermanence an explicit state gives people permission to be casual without worrying about a lasting record.',
  },
] as const;

const experienceRefinements = [
  {
    feedback:
      'New messages pulled me back down while I was scrolling up to read earlier messages.',
    change:
      'Held the reader’s position until they return to the bottom, alongside anchor-based scroll correction for long histories.',
  },
  {
    feedback:
      'Users wanted notifications so they could keep up with new activity without continuously watching the chat.',
    change: 'Added notifications for new chat activity.',
  },
  {
    feedback:
      'Users wanted clearer time context when reading and returning to conversations.',
    change: 'Added timestamps to chat messages.',
  },
  {
    feedback:
      'The interface felt visually tiring: the colors were hard on the eyes, text felt large, and messages felt cramped.',
    change:
      'Refined the interface as one system with a softer palette, a calmer type scale, and more space between messages.',
  },
] as const;

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
      <section className="yap-problem shell case-section" id="yap-problem">
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

      <section className="yap-transformation" id="yap-transformation">
        <div className="shell case-section">
          <p className="eyebrow">FROM PERSONAL ROOM TO PLATFORM</p>
          <div className="yap-transformation-copy">
            <h2>
              <span className="yap-transformation-line">Personal room</span>
              <span className="yap-transformation-line yap-transformation-destination">
                <span className="yap-transformation-arrow" aria-hidden="true">
                  →
                </span>{' '}
                multi-tenant platform
              </span>
            </h2>
            <div>
              <p>{transformationParts[0]}</p>
              {transformationParts[1] && (
                <p>This required {boundaryAndMigration[0]}</p>
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

      <section className="yap-solutions shell case-section" id="yap-solutions">
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
                      <span className="yap-link-title__icon" aria-hidden="true">
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
                    <span className="yap-live-title__dot" aria-hidden="true" />
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
              <dl className="yap-ux-rationale" aria-label="UX rationale">
                <div>
                  <dt>User problem</dt>
                  <dd>{solutionRationales[index].userProblem}</dd>
                </div>
                <div>
                  <dt>Design decision</dt>
                  <dd>{solutionRationales[index].designDecision}</dd>
                </div>
                <div>
                  <dt>Why this way</dt>
                  <dd>{solutionRationales[index].whyThisWay}</dd>
                </div>
              </dl>
            </div>
            <div className="yap-demo-slot" data-demo={solutionSlots[index]}>
              <YapSolutionVisual index={index} />
            </div>
          </article>
        ))}
      </section>

      {project.architecture && (
        <section
          className="architecture shell case-section yap-architecture"
          id="yap-architecture"
        >
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

      <section className="yap-operations" id="yap-operations">
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

      <section className="yap-listening" id="yap-listening">
        <div className="shell case-section">
          <p className="eyebrow">LISTENING</p>
          <header className="yap-listening-heading">
            <h2>Listening to real users, then shipping</h2>
            <p>
              yap. asks for feedback on each user&apos;s 10th visit — late
              enough for the response to be grounded in real experience. I
              review what returning users report, identify recurring themes, and
              ship changes from that evidence instead of guessing at
              improvements.
            </p>
          </header>

          <div className="yap-feedback-loop">
            <div className="yap-feedback-loop__heading">
              <span>FEEDBACK → ITERATION</span>
              <h3>What users told me → what I shipped</h3>
            </div>

            <section>
              <h4>Experience refinements</h4>
              <div className="yap-feedback-table-wrap">
                <table className="yap-feedback-table">
                  <thead>
                    <tr>
                      <th scope="col">User feedback</th>
                      <th scope="col">What I changed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experienceRefinements.map((item) => (
                      <tr key={item.feedback}>
                        <td>{item.feedback}</td>
                        <td>{item.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h4>Reliability fix from feedback</h4>
              <div className="yap-feedback-table-wrap">
                <table className="yap-feedback-table">
                  <thead>
                    <tr>
                      <th scope="col">User feedback</th>
                      <th scope="col">What I changed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Rapid repeat taps and retries after a lost server
                        response could create duplicate messages during slow or
                        interrupted connections.
                      </td>
                      <td>
                        Combined stable send IDs, idempotent retries, database
                        duplicate prevention, and persistence-based UI updates
                        so one send attempt converges on one stored message—even
                        after reconnecting, re-entering the channel, or losing
                        the original response.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="yap-listening-principle">
            <span>HOW I DECIDE WHAT TO BUILD NEXT</span>
            <p>
              Usage data tells me what happens; returning-user feedback tells me
              what experienced users want. Reading both together — and staying
              aware that neither explains why a new user might leave early —
              keeps the roadmap evidence-led without overstating what the data
              can prove.
            </p>
          </aside>
        </div>
      </section>

      {project.takeaways && (
        <section
          className="yap-takeaways shell case-section"
          id="yap-takeaways"
        >
          <p className="eyebrow">TAKEAWAYS</p>
          <div className="yap-takeaways-heading yap-title-effect">
            <h2>
              What operating <span className="yap-brand-highlight">yap.</span>{' '}
              taught me beyond the interface
            </h2>
            <p className="yap-takeaways-intro">
              <span className="yap-brand-highlight">yap.</span> was the first
              product that pushed me past interface design and into the
              realities of running a system: durable state, realtime delivery,
              moderation, support, route health, and operator tooling. The
              biggest shift was realizing that product design does not stop at
              the user flow. It extends into how the product fails, recovers,
              and gets operated.
            </p>
          </div>
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
