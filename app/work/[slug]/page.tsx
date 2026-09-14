import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalArrow } from '@/components/external-arrow';
import { JangoingCaseContent } from '@/components/jangoing-case-content';
import { TransitionLink } from '@/components/transition-link';
import { YapCaseContent } from '@/components/yap-case-content';
import { YapHeroDemo } from '@/components/yap-hero-demo';
import { getProject, projects } from '@/lib/project-data';
import { MotionEffects } from '../../motion-effects';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  if (slug === 'yap-anonymous-chat') {
    return {
      description:
        'A case study on designing and operating yap., a link-first anonymous chat platform with explicit privacy, moderation, and realtime delivery boundaries.',
    };
  }
  return {
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];
  const transformation = project.transformation;
  const operations = project.platformOperations;
  const incidents = project.incidents;
  const isJangoing = project.slug === 'jangoing-kitchen-intelligence';
  const isYap = project.slug === 'yap-anonymous-chat';

  return (
    <main className={`case-study ${isYap ? 'yap-case-study' : ''}`}>
      <MotionEffects />
      <nav className="case-top-nav" aria-label="Project navigation">
        <div className="case-nav-inner">
          <TransitionLink href="/" direction="back">
            <span aria-hidden="true">&#8249;</span> Home
          </TransitionLink>
          <TransitionLink
            href={`/work/${nextProject.slug}`}
            direction="forward"
          >
            Next project <span aria-hidden="true">&#8250;</span>
          </TransitionLink>
        </div>
      </nav>

      {isYap ? (
        <header className="yap-case-opening">
          <div className="yap-hero-stage">
            <div className="yap-demo-wrap">
              <div className="yap-hero-stage-copy">
                <span>ANONYMOUS ENTRY, IN ONE STEP</span>
                <h2>Enter from a shared link and start talking.</h2>
                <p>
                  This walkthrough is simulated locally and does not send data.
                </p>
              </div>
              <YapHeroDemo />
            </div>
          </div>
        </header>
      ) : (
        <header className="case-opening reveal">
          <div className="case-opening-inner">
            <div className="case-opening-copy">
              <span className="metric-pill">{project.metric}</span>
              <h1>{project.headline}</h1>
              {isJangoing && (
                <p className="opening-description">{project.brief}</p>
              )}
              <div className="opening-impact">
                <span>IMPACT</span>
                <strong>{project.impact}</strong>
              </div>
            </div>
            <div
              className="case-opening-media magnetic"
              aria-label="Project media placeholder"
            >
              <div className="cover-interface">
                <div className="cover-sidebar" />
                <div className="cover-content">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p className="media-note">
                MEDIA PLACEHOLDER ·{' '}
                {project.coverNote ??
                  'Project overview and key product moments'}
              </p>
            </div>
          </div>
        </header>
      )}

      <section
        className={`case-meta shell ${isYap ? 'yap-case-meta' : 'reveal'}`}
        aria-label="Project details"
      >
        <div className="case-facts">
          <dl>
            <div>
              <dt>ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>DURATION</dt>
              <dd>{project.duration}</dd>
            </div>
            <div>
              <dt>CLIENT</dt>
              <dd>{project.client}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt>RESPONSIBILITIES</dt>
              <dd>{project.responsibilities}</dd>
            </div>
            <div>
              <dt>TOOLS</dt>
              <dd>{project.tools}</dd>
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <div>
                <dt>LINKS</dt>
                <dd className="case-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live product <ExternalArrow />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      GitHub <ExternalArrow />
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {isJangoing ? (
        <JangoingCaseContent project={project} projectIndex={index} />
      ) : isYap ? (
        <YapCaseContent project={project} />
      ) : (
        <>
          {transformation ? (
            <section className="compact-problem shell case-section reveal">
              <p className="eyebrow">PROBLEM</p>
              <h2>{project.brief}</h2>
              <p className="compact-problem-intro">{project.challengeIntro}</p>
              <div className="insight-grid">
                {project.process?.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <p className="compact-statement">{project.statement}</p>
            </section>
          ) : (
            <>
              <section className="brief shell case-section reveal">
                <p className="eyebrow">PROJECT BRIEF</p>
                <h2>{project.brief}</h2>
                <p className="caption">
                  The brief was narrowed by defining the audience, context, and
                  measurable outcome.
                </p>
              </section>
              <section className="process-section shell case-section reveal">
                <p className="eyebrow">NAVIGATING AMBIGUITY</p>
                <h2>
                  {project.process ? (
                    <>
                      I defined the product around{' '}
                      <strong>three connected constraints.</strong>
                    </>
                  ) : (
                    <>
                      I started by answering <strong>who</strong> and{' '}
                      <strong>why</strong>—the unknowns that shaped our research
                      direction.
                    </>
                  )}
                </h2>
                <div className="insight-grid">
                  {(
                    project.process ?? [
                      {
                        label: 'Literature review',
                        title: 'A timely shift',
                        body: 'The landscape was changing toward more human-centered practices.',
                      },
                      {
                        label: 'Stakeholder interviews',
                        title: 'A familiar behavior',
                        body: 'Existing workflows revealed an easier path for adoption.',
                      },
                      {
                        label: 'Concept testing',
                        title: 'A complex system',
                        body: 'Real-world constraints gave the concept a meaningful proving ground.',
                      },
                    ]
                  ).map((item) => (
                    <article key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section className="challenge-block reveal">
                <div className="shell case-section">
                  <p className="eyebrow">CORE TENSIONS</p>
                  <h2>What had to be true at the same time</h2>
                  <p className="section-note">
                    {project.challengeIntro ??
                      'Based on interviews, surveys, and workflow observation'}
                  </p>
                  <div className="challenge-list">
                    {project.challenges.map((challenge, i) => (
                      <article key={challenge}>
                        <span>Challenge {i + 1}</span>
                        <p>{challenge}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
              <section className="statement case-section shell scroll-focus">
                <p className="eyebrow">REFRAMED PROBLEM STATEMENT</p>
                <h2>
                  {project.statement ??
                    'How might we make a complex choice feel informed, inclusive, and actionable?'}
                </h2>
              </section>
            </>
          )}

          {transformation && (
            <section className="transformation-block reveal">
              <div className="shell case-section">
                <p className="eyebrow">FROM PERSONAL ROOM TO PLATFORM</p>
                <p className="transformation-copy">{transformation.body}</p>
                <div className="transformation-stats">
                  {transformation.stats.map((stat) => (
                    <article key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="solutions shell case-section">
            <p className="eyebrow reveal">
              {project.solutionsLabel ?? 'SOLUTION'}
            </p>
            {project.solutions.map((solution, i) => (
              <article className="solution-row reveal" key={solution.title}>
                <div>
                  <span>0{i + 1}</span>
                  <h2>{solution.title}</h2>
                  <p>{solution.body}</p>
                </div>
                <div
                  className={`solution-visual tone-${((index + i) % 3) + 1} magnetic`}
                  aria-label="Solution media placeholder"
                >
                  <div className="mini-ui">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="media-note">
                    MEDIA PLACEHOLDER ·{' '}
                    {solution.mediaNote ??
                      'Feature flow or prototype recording'}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {project.limitation && (
            <section className="limitation-block reveal">
              <div className="shell case-section">
                <p className="eyebrow">LIMITATION</p>
                <h2>{project.limitation.title}</h2>
                <p className="limitation-copy">{project.limitation.body}</p>
                <div className="tension-grid">
                  <article>
                    <span>THE VALUE</span>
                    <p>{project.limitation.tension[0]}</p>
                  </article>
                  <article>
                    <span>THE RESPONSIBILITY</span>
                    <p>{project.limitation.tension[1]}</p>
                  </article>
                </div>
              </div>
            </section>
          )}

          {project.architecture && (
            <section className="architecture shell case-section reveal">
              <div className="architecture-copy">
                <p className="eyebrow">SYSTEM DESIGN</p>
                <h2>{project.architecture.title}</h2>
                <p>{project.architecture.body}</p>
                {project.architecture.detail && (
                  <p>{project.architecture.detail}</p>
                )}
              </div>
              <div className="architecture-placeholder magnetic">
                <div className="architecture-flow">
                  {(
                    project.architecture.nodes ?? [
                      'Browser',
                      'Next.js',
                      'Worker',
                      'Data',
                    ]
                  ).flatMap((node, i, nodes) => [
                    <span key={`${node}-node`}>{node}</span>,
                    ...(i < nodes.length - 1
                      ? [
                          <i key={`${node}-arrow`} aria-hidden="true">
                            →
                          </i>,
                        ]
                      : []),
                  ])}
                </div>
                <p className="media-note">
                  MEDIA PLACEHOLDER · {project.architecture.mediaNote}
                </p>
              </div>
            </section>
          )}

          {operations && (
            <section className="operations-block reveal">
              <div className="shell case-section">
                <p className="eyebrow">PLATFORM OPERATIONS</p>
                <h2>{operations.title}</h2>
                <p className="operations-intro">{operations.intro}</p>
                <div className="operations-grid">
                  {operations.cards.map((card, i) => (
                    <article key={card.title}>
                      <span>0{i + 1}</span>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </div>
                <aside className="operations-boundary">
                  <span>SECURITY BOUNDARY</span>
                  <h3>{operations.boundary.title}</h3>
                  <p>{operations.boundary.body}</p>
                </aside>
              </div>
            </section>
          )}

          {incidents && (
            <section className="incidents-block reveal">
              <div className="shell case-section">
                <p className="eyebrow">
                  INCIDENTS THAT CHANGED THE ARCHITECTURE
                </p>
                <div className="incident-grid">
                  {incidents.cases.map((incident, i) => (
                    <article key={incident.title}>
                      <span>0{i + 1}</span>
                      <h2>{incident.title}</h2>
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
                    </article>
                  ))}
                </div>
                <aside className="additional-hardening">
                  <span>ADDITIONAL HARDENING</span>
                  <p>{incidents.additionalHardening}</p>
                </aside>
              </div>
            </section>
          )}

          {project.reliability && (
            <section className="reliability-block reveal">
              <div className="shell case-section">
                <p className="eyebrow">PRODUCTION RELIABILITY</p>
                <h2>{project.reliability.title}</h2>
                <p className="reliability-copy">{project.reliability.body}</p>
                <div className="evidence-grid">
                  {project.reliability.evidence.map((item) => (
                    <article key={item.value}>
                      <strong>{item.value}</strong>
                      <p>{item.label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="impact-block">
            <div className="shell impact-grid">
              <div>
                <p className="eyebrow">IMPACT</p>
                <h2>{project.impact}</h2>
              </div>
              <div>
                <p className="eyebrow">
                  {project.impactLabel ?? 'WHAT SHIPPED'}
                </p>
                <p>
                  {project.impactBody ??
                    'Progress came from making uncertainty visible, testing early, and giving every stakeholder a clear role in the process.'}
                </p>
              </div>
            </div>
          </section>

          {project.takeaways && (
            <section className="takeaways shell case-section">
              <p className="eyebrow">TAKEAWAYS</p>
              <h2>What building the product changed in my practice</h2>
              <div className="takeaway-list">
                {project.takeaways.map((item, i) => (
                  <details className="reveal" key={item.title} open={i === 0}>
                    <summary>
                      <span>{item.title}</span>
                      <b aria-hidden="true">+</b>
                    </summary>
                    <p>{item.body}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </>
      )}
      <section className="next-project shell">
        <TransitionLink href="/" direction="back">
          Home
        </TransitionLink>
        <TransitionLink href={`/work/${nextProject.slug}`} direction="forward">
          Next project <span aria-hidden="true">&#8594;</span>
        </TransitionLink>
      </section>
      <footer className="footer shell">
        <nav className="text-links">
          <a href="mailto:jiwoo315@ucla.edu">Contact me</a>
          <a
            href="https://github.com/jiji123526"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ExternalArrow />
          </a>
        </nav>
        <p>Copyright © 2026 Jiwoo Jeong</p>
      </footer>
    </main>
  );
}
