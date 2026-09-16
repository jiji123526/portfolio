'use client';

import { useEffect, useRef } from 'react';
import { homeContent } from '@/lib/home-content';
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
    company: 'Amazon Autonomy',
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
    mark: 'G',
    company: 'GOLA.IO',
    role: 'NLP Project Lead',
    period: '2024 - 2025',
    description:
      'Developed Python NLP pipelines and annotation categories for syntactic, semantic, and discourse analysis of literary texts.',
    bullets: [
      'Established three stable model-training labels while separating fine-grained linguistic distinctions into feature fields, improving consistency without losing analytical depth.',
    ],
    tags: ['NLP', 'Annotation Design', 'Python'],
  },
  {
    mark: 'Q',
    company: 'Q-Bank',
    role: 'NLP Developer / Linguist',
    period: '2024 - 2025',
    description:
      'Built a Python NLP pipeline that generates personalized SAT and TOEFL practice content across configurable topics and difficulty levels.',
    bullets: [
      'Evaluated generated content for grammaticality, semantic coherence, answerability, and ambiguity, then used recurring errors to refine prompts and quality criteria.',
    ],
    tags: ['Content Generation', 'Evaluation', 'Python'],
  },
  {
    mark: 'Y',
    company: 'yap.',
    role: 'Full-Stack Developer',
    period: 'Summer 2025',
    description:
      'Built a bilingual, mobile-first anonymous chat platform with live chat, media sharing, channel creation, and profile customization.',
    bullets: [
      'Implemented authentication, ownership flows, admin moderation, account recovery, synced preferences, and deployment across Vercel and Cloudflare.',
    ],
    tags: ['Next.js', 'Cloudflare Workers', 'D1'],
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
    mark: 'T',
    company: 'TagSpark',
    role: 'Full-Stack Developer',
    period: '2025 - Present',
    description:
      'Built a full-stack platform that classifies and normalizes noisy web-novel metadata across eight dimensions.',
    bullets: [
      'Implemented exact-match, include/exclude, and similarity-based recommendations using SQL data processing and a React/TypeScript interface.',
    ],
    tags: ['Classification', 'SQL', 'React'],
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
              <strong>B.A. Computer Science &amp; Linguistics</strong>
              <span> | UCLA · Sep 2026</span>
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
                  <span aria-hidden="true" className="aa-about-path__mark">
                    {experience.mark}
                  </span>
                  <h2>{experience.company}</h2>
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
