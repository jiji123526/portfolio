'use client';

import { useEffect, useRef } from 'react';
import { homeContent } from '@/lib/home-content';
import { TransitionLink } from '@/components/transition-link';
import { useStickyDrift } from '@/components/use-sticky-drift';

const expertise = [
  'Language Data',
  'Annotation & QA',
  'Qualitative Error Analysis',
  'Computational Linguistics',
  'NLP & LLM Evaluation',
  'Python & SQL',
  'Full-stack Development',
];

const experiences = [
  {
    mark: 'A',
    company: 'Amazon AGI-DS',
    role: 'Machine Learning Data Associate',
    period: 'Feb 2026 - Present',
    description:
      'Producing and validating language data used to train and evaluate agentic AI systems.',
    bullets: [
      'Analyze ambiguous user-agent interactions through semantic, pragmatic, discourse, and conversational context to determine intended meaning and consistent data outcomes.',
      'Test new workflows and annotation conventions in pilot initiatives, identify edge cases, and provide structured feedback for broader implementation.',
    ],
    tags: ['Language Data', 'Agentic AI', 'Data Quality'],
  },
  {
    mark: 'I',
    company: 'ITFACT',
    role: 'Speech-to-Text Solutions Intern',
    period: '2021 - 2022',
    description:
      'Evaluated technical-meeting speech-to-text output and analyzed recurring terminology, segmentation, and contextual errors with Python.',
    bullets: [
      'Proposed a pre-meeting vocabulary workflow that improved transcription accuracy by approximately 12-15% in technical meeting environments.',
      'Troubleshot cloud-hosted data pipelines and standardized QA and delivery procedures, supporting same-day resolution of a critical ETL parsing issue.',
    ],
    tags: ['Speech-to-Text', 'Python', 'Data QA'],
  },
  {
    mark: 'J',
    company: 'Jangoing',
    projectSlug: 'jangoing-kitchen-intelligence',
    role: 'Language Engineer & NLP Systems Designer',
    period: '2026 - Present',
    description:
      'Building a review-first English language and evaluation system for a multi-user household product and future Raspberry Pi kitchen assistant.',
    bullets: [
      'Designed a five-stage NLU framework that separates relevance, an 11-intent ontology, entity spans, household-scoped normalization, and joint-action validation into independently testable decisions.',
      'Built structured, editable proposals that require user confirmation before changing inventory or shopping state, while logging corrections, cancellations, and unsupported requests as reviewable learning evidence.',
      'Created nine annotation queues, versioned JSONL exports, dataset manifests, deduplication rules, and phrase-family leakage checks to keep generated training candidates separate from independently reviewed evaluation data.',
      'Connected the language layer to a working Next.js, Cloudflare Worker, and D1 product with household authorization, append-only events, shared-state projections, and a reproducible Python baseline and evaluation pipeline.',
    ],
    tags: ['NLP', 'Annotation & Evaluation', 'Python', 'Next.js', 'D1'],
  },
  {
    mark: 'Y',
    company: 'yap.',
    projectSlug: 'yap-anonymous-chat',
    role: 'Full-Stack Product Engineer',
    period: '2026 - Present',
    description:
      'Designing, building, and operating a link-first anonymous realtime chat platform across product strategy, UX/UI, edge architecture, trust and safety, and production operations.',
    bullets: [
      'Re-architected the original single-room Vanilla JS and Supabase product as a multi-tenant Next.js and Cloudflare system with explicit channel ownership, separate anonymous and authenticated identities, D1 persistence, Durable Object delivery, and protected R2 media.',
      'Designed zero-account room entry, owner moderation controls, scoped private messages, temporary live sessions, platform-admin review queues, and support flows with server-side authorization at each trust boundary.',
      'Diagnosed production reliability issues, reducing database-scoped channel initialization from 4–18 seconds to a limited ~80 ms post-cutover sample and replacing a reply lookup that accumulated 212.62M rows read with bounded, indexed reads.',
      'Built route-health monitoring, alerting, queue triage, and reversible incident workflows while the product handled 6,517 created messages across public conversations and private DMs in one measured production week.',
    ],
    tags: ['Next.js', 'Cloudflare Workers', 'D1', 'Durable Objects', 'R2'],
  },
  {
    mark: 'T',
    company: 'TagSpark',
    projectSlug: 'tag-spark-recommendations',
    role: 'Language Systems & Full-Stack Developer',
    period: 'Ongoing',
    description:
      'Building a mobile-first Korean web-fiction recommender that turns manually curated catalog tags into explicit, inspectable preference queries and ranking evidence.',
    bullets: [
      'Structured noisy Korean tags across eight preference dimensions and normalized aliases so multiple surface forms resolve to stable catalog tag IDs before ranking.',
      'Implemented reversible include/exclude controls, separated perfect matches from related recommendations, and made ranking behavior explicit through exact, alias, category, curated-cluster, and core-tag contributions.',
      'Maintained the PostgreSQL catalog with scheduled Postype metadata refreshes and an unavailable-work marker so stale works are removed from recommendation paths without erasing their records.',
    ],
    tags: [
      'Korean Lexical Resources',
      'Recommendation Systems',
      'TypeScript',
      'PostgreSQL',
    ],
  },
  {
    mark: 'G',
    company: 'GOLA.IO',
    role: 'NLP Project Lead',
    period: '2024 - 2025',
    description:
      'Built a Python and spaCy corpus-analysis pipeline that turns structurally noisy literary texts into reproducible lexical and syntactic datasets.',
    bullets: [
      'Cleaned and reconstructed sentence data from Shakespeare plays and Sherlock Holmes texts, handling broken boundaries, repeated tokens, punctuation, and source-specific CSV formats before analysis.',
      'Extracted part-of-speech distributions, adjacent POS patterns, clause-level signals, word frequencies, common word pairs, and word-length statistics into analysis-ready CSV outputs.',
      'Prototyped structure-constrained sentence generation from POS-grouped vocabulary to examine how corpus-derived lexical choices behave across English clause patterns.',
    ],
    tags: ['Corpus Linguistics', 'spaCy', 'Python', 'Data Processing'],
  },
  {
    mark: 'Q',
    company: 'Q-Bank',
    role: 'NLP Developer / Linguist',
    period: '2024 - 2025',
    description:
      'Built a personalized SAT Math practice product that assembles question sets from explicit domain, skill, and per-skill difficulty selections.',
    bullets: [
      'Structured an 800-question bank across three math domains, 13 skills, and three difficulty levels, then implemented exact skill-and-difficulty filtering for configurable practice sessions.',
      'Designed the full learning loop from domain selection and answer checking to retry hints, incorrect-question capture, weak-skill summaries, and targeted feedback.',
      'Prototyped GPT-assisted follow-up questions constrained to the missed item’s domain, skill, and difficulty, alongside Firebase email and Google authentication.',
    ],
    tags: ['React', 'TypeScript', 'Adaptive Practice', 'LLM Evaluation'],
  },
  {
    mark: 'A',
    company: 'Accio Chat',
    role: 'ML Developer / Linguist',
    period: 'Summer 2025',
    description:
      'Built a character-based conversational chatbot using LoRA fine-tuning, few-shot learning, prompt engineering, PyTorch, and curated dialogue data.',
    bullets: [
      'Evaluated coherence, contextual relevance, instruction adherence, and character consistency before deploying with AWS Lambda and EC2.',
    ],
    tags: ['LoRA', 'PyTorch', 'LLM Evaluation'],
  },
  {
    mark: 'C',
    company: 'Weekly Coding Class',
    role: 'Program Lead & Volunteer Instructor',
    period: '2021 - 2023',
    description:
      'Led a two-year coding education program for middle-school students and coordinated curriculum development with volunteer engineers.',
    bullets: [
      'Adapted lessons for varied experience levels and standardized instructional materials for clarity, consistency, and accessibility.',
    ],
    tags: ['Leadership', 'Curriculum', 'Teaching'],
  },
];

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.5 8.2v9.3M6.5 5.2v.1M10.5 17.5v-5.2c0-2.2 3.1-2.4 3.1 0v5.2M10.5 8.2v9.3M3 3h18v18H3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect height="14" rx="1" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function AboutExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);

  useStickyDrift(railRef, sectionRef, {
    distance: 26,
    media: '(min-width: 1200px)',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>('.aa-about-path__reveal'),
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Experience, expertise, education, and contact"
      className="aa-about-path"
      id="about-details"
      ref={sectionRef}
    >
      <div className="aa-about-path__inner">
        <aside
          className="aa-about-path__rail aa-about-path__reveal"
          ref={railRef}
        >
          <div className="aa-about-path__rail-group">
            <h2>Expertise</h2>
            <div className="aa-about-path__tags aa-about-path__tags--large">
              {expertise.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="aa-about-path__rail-group">
            <h2>Education</h2>
            <p>
              <strong>Linguistics &amp; Computer Science</strong>
              <span> | UCLA</span>
            </p>
          </div>

          <div className="aa-about-path__rail-group">
            <h2>Reach Me</h2>
            <div className="aa-about-path__contact">
              <a
                aria-label="LinkedIn"
                href={homeContent.links.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
              </a>
              <a aria-label="Email" href={homeContent.links.email}>
                <MailIcon />
              </a>
              {homeContent.links.resume ? (
                <a
                  aria-label="CV"
                  href={homeContent.links.resume}
                  rel="noreferrer"
                  target="_blank"
                >
                  CV
                </a>
              ) : (
                <span aria-label="CV coming soon" className="is-disabled">
                  CV
                </span>
              )}
            </div>
          </div>
        </aside>

        <div className="aa-about-path__experience">
          <p className="aa-about-path__eyebrow">[Experience]</p>
          <div className="aa-about-path__timeline">
            {experiences.map((experience) => (
              <article
                className="aa-about-path__entry aa-about-path__reveal"
                key={experience.company}
              >
                <header>
                  <div className="aa-about-path__entry-heading">
                    <span aria-hidden="true" className="aa-about-path__mark">
                      {experience.mark}
                    </span>
                    {experience.projectSlug ? (
                      <TransitionLink
                        className="aa-about-path__project-link"
                        direction="forward"
                        href={`/work/${experience.projectSlug}`}
                      >
                        <h2>{experience.company}</h2>
                        <span aria-hidden="true">↗</span>
                      </TransitionLink>
                    ) : (
                      <h2>{experience.company}</h2>
                    )}
                  </div>
                  <span className="aa-about-path__experience-kind">
                    {experience.company === 'Amazon AGI-DS' ||
                    experience.company === 'ITFACT'
                      ? 'Professional Experience'
                      : 'Project'}
                  </span>
                </header>
                <div className="aa-about-path__meta">
                  <strong>{experience.role}</strong>
                  <span>{experience.period}</span>
                </div>
                <p className="aa-about-path__description">
                  {experience.description}
                </p>
                {experience.bullets && (
                  <ul className="aa-about-path__bullets">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span aria-hidden="true">✓</span>
                        <p>{bullet}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="aa-about-path__tags">
                  {experience.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
