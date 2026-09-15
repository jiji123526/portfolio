'use client';

import type { CSSProperties } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PortfolioDock } from '@/components/portfolio-dock';
import { TransitionLink } from '@/components/transition-link';
import { YapAmbientThumbnail } from '@/components/yap-ambient-thumbnail';
import type { HomeContent } from '@/lib/home-content';

type HomeProject = {
  slug: string;
  title: string;
  summary: string;
  metric: string;
  category: string;
  role: string;
  duration: string;
};

const specialties = [
  'Product Design',
  'Language Systems',
  'Human-Centered Interfaces',
  'Interaction Design',
];

function ImagePlaceholder({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`aa-image-placeholder ${className}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

function ProjectCopy({ project }: { project: HomeProject }) {
  return (
    <div className="aa-project-copy">
      <h3>
        <span data-project-morph="title">{project.title}</span>
      </h3>
      <div className="aa-project-tags">
        <span data-project-morph="category">{project.category}</span>
        <span data-project-morph="metric">{project.metric}</span>
      </div>
      <p data-project-morph="summary">{project.summary}</p>
      <dl>
        <div data-project-morph="role">
          <dt>Role:</dt>
          <dd>{project.role}</dd>
        </div>
        <div data-project-morph="duration">
          <dt>Project Duration</dt>
          <dd>{project.duration}</dd>
        </div>
      </dl>
      <TransitionLink
        className="aa-project-link"
        data-project-morph="link"
        direction="forward"
        href={`/work/${project.slug}`}
      >
        View Project <span aria-hidden="true">↗</span>
      </TransitionLink>
    </div>
  );
}

function ProjectVisual({
  project,
  index,
}: {
  project: HomeProject;
  index: number;
}) {
  const isYap = project.slug === 'yap-anonymous-chat';

  return (
    <TransitionLink
      className={`aa-project-visual aa-project-visual--${index + 1}${
        isYap ? ' aa-project-visual--yap' : ''
      }`}
      direction="forward"
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title}`}
    >
      {isYap ? (
        <div className="aa-project-visual__yap-thumbnail" aria-hidden="true">
          <YapAmbientThumbnail />
        </div>
      ) : (
        <ImagePlaceholder label={`${project.title} image placeholder`} />
      )}
      <span className="aa-project-visual__number">0{index + 1}</span>
      {!isYap && (
        <span className="aa-project-visual__title">{project.title}</span>
      )}
    </TransitionLink>
  );
}

export function HomeLanguageExperience({
  content,
  projects,
}: {
  content: HomeContent;
  projects: HomeProject[];
}) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectPanels = useRef<Array<HTMLElement | null>>([]);
  const projectCopyStage = useRef<HTMLDivElement | null>(null);
  const previousMorphRects = useRef<Map<string, DOMRect> | null>(null);
  const activeProjectIndexRef = useRef(0);
  const activeProject = projects[activeProjectIndex] || projects[0]!;

  const captureProjectMorphRects = () => {
    const stage = projectCopyStage.current;
    if (!stage) return;

    const rects = new Map<string, DOMRect>();
    stage
      .querySelectorAll<HTMLElement>('[data-project-morph]')
      .forEach((element) => {
        const key = element.dataset.projectMorph;
        if (key) rects.set(key, element.getBoundingClientRect());
        element.getAnimations().forEach((animation) => animation.cancel());
      });
    previousMorphRects.current = rects;
  };

  useLayoutEffect(() => {
    const previousRects = previousMorphRects.current;
    const stage = projectCopyStage.current;
    if (!previousRects || !stage) return;
    previousMorphRects.current = null;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    stage
      .querySelectorAll<HTMLElement>('[data-project-morph]')
      .forEach((element) => {
        const key = element.dataset.projectMorph;
        const previousRect = key ? previousRects.get(key) : null;
        if (!previousRect) return;

        const currentRect = element.getBoundingClientRect();
        if (!currentRect.width || !currentRect.height) return;

        const translateX = previousRect.left - currentRect.left;
        const translateY = previousRect.top - currentRect.top;
        const scaleX = previousRect.width / currentRect.width;
        const scaleY = previousRect.height / currentRect.height;

        if (key === 'title') {
          const gapCount = Math.max((element.textContent?.length ?? 1) - 1, 1);
          const computedLetterSpacing = Number.parseFloat(
            window.getComputedStyle(element).letterSpacing,
          );
          const finalLetterSpacing = Number.isFinite(computedLetterSpacing)
            ? computedLetterSpacing
            : 0;
          const initialLetterSpacing =
            finalLetterSpacing +
            (previousRect.width - currentRect.width) / gapCount;

          element.animate(
            [
              {
                letterSpacing: `${initialLetterSpacing}px`,
                transform: `translate(${translateX}px, ${translateY}px)`,
              },
              {
                letterSpacing: `${finalLetterSpacing}px`,
                transform: 'translate(0, 0)',
              },
            ],
            {
              duration: 520,
              easing:
                'linear(0, .18 7.5%, .52 20%, .78 32%, .94 45%, 1.02 58%, 1.03 68%, 1.014 78%, 1.003 90%, 1)',
            },
          );
          return;
        }

        element.animate(
          [
            {
              transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
              transformOrigin: 'top left',
            },
            {
              transform: 'translate(0, 0) scale(1, 1)',
              transformOrigin: 'top left',
            },
          ],
          {
            duration: 520,
            easing:
              'linear(0, .18 7.5%, .52 20%, .78 32%, .94 45%, 1.02 58%, 1.03 68%, 1.014 78%, 1.003 90%, 1)',
          },
        );
      });
  }, [activeProjectIndex]);

  useEffect(() => {
    const panels = projectPanels.current.filter(
      (panel): panel is HTMLElement => panel !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(
                a.boundingClientRect.top +
                  a.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ) -
              Math.abs(
                b.boundingClientRect.top +
                  b.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ),
          )[0];

        if (!activeEntry) return;
        const index = Number(
          (activeEntry.target as HTMLElement).dataset.projectIndex,
        );
        if (!Number.isInteger(index) || index === activeProjectIndexRef.current)
          return;

        captureProjectMorphRects();
        activeProjectIndexRef.current = index;
        setActiveProjectIndex(index);
      },
      { rootMargin: '-49% 0px -49% 0px', threshold: 0 },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => {
      observer.disconnect();
    };
  }, [projects]);

  const showProject = (index: number) => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    projectPanels.current[index]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  return (
    <main className="aa-home">
      <div className="aa-loader" aria-hidden="true">
        <div className="aa-loader__content">
          <strong>{content.name}</strong>
          <div className="aa-loader__progress">
            <i />
          </div>
        </div>
      </div>

      <section className="aa-hero" id="home" aria-label="Introduction">
        <div className="aa-stars" aria-hidden="true" />

        <header className="aa-topbar">
          <span>{content.name}</span>
        </header>

        <div className="aa-hero-copy">
          <span className="aa-specializing">[working across]</span>
          {specialties.map((specialty, index) => (
            <p key={specialty} style={{ '--line': index } as CSSProperties}>
              {specialty}
            </p>
          ))}
          <ImagePlaceholder
            className="aa-hero-placeholder aa-hero-placeholder--left"
            label="Image placeholder"
          />
          <ImagePlaceholder
            className="aa-hero-placeholder aa-hero-placeholder--right"
            label="Image placeholder"
          />
        </div>

        <ImagePlaceholder
          className="aa-hero-placeholder aa-hero-placeholder--bottom"
          label="Artwork placeholder"
        />

        <a className="aa-scroll-cue" href="#work">
          <span>[scroll]</span>
          <i aria-hidden="true">⌄</i>
        </a>
      </section>

      <section className="aa-work aa-work--desktop" id="work">
        <aside className="aa-work-selector">
          <div className="aa-work-selector__inner">
            <div className="aa-work-title">
              <span>Work</span>
              <strong>Selected</strong>
            </div>
            <div className="aa-work-projects">
              <ol>
                {projects.map((project, index) => (
                  <li key={project.slug}>
                    <button
                      type="button"
                      className={
                        activeProjectIndex === index ? 'is-active' : ''
                      }
                      onClick={() => showProject(index)}
                    >
                      Project {index + 1}
                    </button>
                  </li>
                ))}
              </ol>
              <span className="aa-work-track" aria-hidden="true">
                <i
                  style={{
                    transform: `translateY(${activeProjectIndex * 30}px)`,
                  }}
                />
              </span>
            </div>
          </div>
        </aside>

        <aside className="aa-work-middle">
          <div className="aa-project-copy-stage" ref={projectCopyStage}>
            <div className="aa-project-copy-layer">
              <ProjectCopy project={activeProject} />
            </div>
          </div>
        </aside>

        <div className="aa-work-visuals">
          {projects.map((project, index) => (
            <article
              className={
                project.slug === 'yap-anonymous-chat'
                  ? 'aa-work-visual-panel--yap'
                  : undefined
              }
              data-project-index={index}
              key={project.slug}
              ref={(panel) => {
                projectPanels.current[index] = panel;
              }}
            >
              <ProjectVisual index={index} project={project} />
            </article>
          ))}
        </div>
      </section>

      <section className="aa-work-mobile" aria-label="Selected work">
        <p>[selected projects]</p>
        {projects.map((project, index) => (
          <article key={project.slug}>
            <ProjectCopy project={project} />
            <ProjectVisual index={index} project={project} />
          </article>
        ))}
      </section>

      <section className="aa-process" id="about">
        <div className="aa-process-heart" aria-hidden="true">
          <span>♡</span>
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="aa-process-body">
          <a className="aa-work-word" href="#work">
            work
          </a>

          <div className="aa-process-footer">
            <p>
              I create detail-driven design that feels alive,{' '}
              <strong>
                anchored in fundamentals, charged with emotion, and adaptable
                for the future.
              </strong>{' '}
              Tools help me innovate efficiently while ensuring every experience
              is{' '}
              <strong>
                intentional, authentic, and <em>distinctly human.</em>
              </strong>
            </p>

            <div className="aa-process-picture">
              <ImagePlaceholder label="Portrait placeholder" />
              <span className="aa-process-tape">IMAGE PLACEHOLDER</span>
              <i className="aa-process-scribble aa-process-scribble--one" />
              <i className="aa-process-scribble aa-process-scribble--two" />
            </div>

            <ImagePlaceholder
              className="aa-process-object aa-process-object--left"
              label="Image placeholder"
            />
            <ImagePlaceholder
              className="aa-process-object aa-process-object--right"
              label="Image placeholder"
            />
          </div>
        </div>
      </section>

      <div className="aa-social-links">
        <a href={content.links.email}>Email</a>
        {content.links.resume ? (
          <a href={content.links.resume}>Resume</a>
        ) : (
          <span>Resume</span>
        )}
        <a href={content.links.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>

      <PortfolioDock current="home" />
    </main>
  );
}
