'use client';

import { geoArea, geoDistance, geoOrthographic, geoPath } from 'd3-geo';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { feature } from 'topojson-client';
import {
  presimplify,
  quantile,
  simplify,
  sphericalTriangleArea,
} from 'topojson-simplify';
import type { GeometryCollection, Topology } from 'topojson-specification';
import landTopologyData from 'world-atlas/land-110m.json';
import { PortfolioDock } from '@/components/portfolio-dock';
import { GravityStars } from '@/components/gravity-stars';
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

const GLOBE_SIZE = 260;
const GLOBE_CENTER = GLOBE_SIZE / 2;
const SEATTLE_COORDINATES: [number, number] = [-122.3321, 47.6062];
const KOREA_COORDINATES: [number, number] = [126.978, 37.5665];
const topology = landTopologyData as unknown as Topology<{
  land: GeometryCollection;
}>;
const weightedTopology = presimplify(topology, sphericalTriangleArea);
const reducedTopology = simplify(
  weightedTopology,
  quantile(weightedTopology, 0.08),
);
const rawLand = feature(reducedTopology, reducedTopology.objects.land);

const simplifiedLand = (() => {
  if (rawLand.type !== 'FeatureCollection') return rawLand;

  const land = rawLand.features[0];
  if (!land || land.geometry?.type !== 'MultiPolygon') return rawLand;

  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'MultiPolygon' as const,
      coordinates: land.geometry.coordinates.filter(
        (coordinates) =>
          geoArea({ type: 'Polygon', coordinates }) >= 0.01,
      ),
    },
  };
})();

function WordGlobe() {
  const [rotation, setRotation] = useState<[number, number]>([280, -30]);
  const [isDragging, setIsDragging] = useState(false);
  const introAnimation = useRef({ frame: 0, timeout: 0 });
  const dragStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    rotation: [number, number];
  } | null>(null);

  useEffect(() => {
    const targetRotation: [number, number] = [100, -30];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRotation(targetRotation);
      return;
    }

    const revealDelay = 3650;
    const preRoll = 48;
    introAnimation.current.timeout = window.setTimeout(() => {
      const startedAt = performance.now();
      const duration = 1250 + preRoll;

      const rotateIntoView = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setRotation([280 - 180 * eased, -30]);

        if (progress < 1) {
          introAnimation.current.frame = window.requestAnimationFrame(rotateIntoView);
        }
      };

      introAnimation.current.frame = window.requestAnimationFrame(rotateIntoView);
    }, revealDelay - preRoll);

    return () => {
      window.clearTimeout(introAnimation.current.timeout);
      window.cancelAnimationFrame(introAnimation.current.frame);
    };
  }, []);

  const paths = useMemo(() => {
    const projection = geoOrthographic()
      .translate([GLOBE_CENTER, GLOBE_CENTER])
      .scale(130)
      .clipAngle(90)
      .precision(1.5)
      .rotate(rotation);
    const path = geoPath(projection);
    const visibleCenter = projection.invert?.([GLOBE_CENTER, GLOBE_CENTER]);
    const projectMarker = (coordinates: [number, number]) => {
      const point = projection(coordinates);
      if (!point || !visibleCenter) return null;

      return {
        x: point[0],
        y: point[1],
        visible: geoDistance(coordinates, visibleCenter) < Math.PI / 2,
      };
    };

    return {
      sphere: path({ type: 'Sphere' }),
      land: path(simplifiedLand),
      seattle: projectMarker(SEATTLE_COORDINATES),
      korea: projectMarker(KOREA_COORDINATES),
    };
  }, [rotation]);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    window.clearTimeout(introAnimation.current.timeout);
    window.cancelAnimationFrame(introAnimation.current.frame);
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotation,
    };
    setIsDragging(true);
  };

  const continueDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--aa-pointer-x',
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      '--aa-pointer-y',
      `${event.clientY - rect.top}px`,
    );

    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const longitude = start.rotation[0] + (event.clientX - start.x) * 0.48;
    const latitude = Math.max(
      -68,
      Math.min(68, start.rotation[1] - (event.clientY - start.y) * 0.38),
    );
    setRotation([longitude, latitude]);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.pointerId !== event.pointerId) return;
    dragStart.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="aa-word-globe"
      data-dragging={isDragging ? 'true' : undefined}
      aria-hidden="true"
    >
      <div
        className="aa-word-globe__stage"
        onPointerDown={beginDrag}
        onPointerMove={continueDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <svg
          viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
          role="presentation"
        >
          <defs>
            <clipPath id="aa-word-globe-land-clip">
              <circle
                cx={GLOBE_CENTER}
                cy={GLOBE_CENTER}
                r={GLOBE_CENTER}
              />
            </clipPath>
          </defs>
          <g className="aa-word-globe__map">
            <path
              className="aa-word-globe__line aa-word-globe__land"
              d={paths.land ?? undefined}
              clipPath="url(#aa-word-globe-land-clip)"
              pathLength="1"
            />
            <path
              className="aa-word-globe__line aa-word-globe__sphere"
              d={paths.sphere ?? undefined}
              pathLength="1"
            />
          </g>
          {paths.seattle?.visible && (
            <g
              className="aa-word-globe__seattle"
              transform={`translate(${paths.seattle.x} ${paths.seattle.y})`}
            >
              <circle className="aa-word-globe__seattle-pulse" r="5.5" />
              <circle className="aa-word-globe__seattle-dot" r="2.4" />
              <g className="aa-word-globe__seattle-label">
                <polyline points="-4,0 -8.5,4.5 -15,4.5" />
                <text className="aa-word-globe__seattle-city" x="-18" y="5.7">
                  Seattle, WA
                </text>
                <text className="aa-word-globe__seattle-here" x="6" y="1.2">
                  I&apos;m here!
                </text>
              </g>
            </g>
          )}
          {paths.korea?.visible && (
            <g
              className="aa-word-globe__seattle aa-word-globe__seattle--korea"
              transform={`translate(${paths.korea.x} ${paths.korea.y})`}
            >
              <circle className="aa-word-globe__seattle-pulse" r="5.5" />
              <circle className="aa-word-globe__seattle-dot" r="2.4" />
              <g className="aa-word-globe__seattle-label">
                <polyline points="-4,0 -8.5,4.5 -15,4.5" />
                <text className="aa-word-globe__seattle-city" x="-18" y="5.7">
                  Seoul, Korea
                </text>
                <text className="aa-word-globe__seattle-here" x="6" y="1.2">
                  I&apos;m from here!
                </text>
              </g>
            </g>
          )}
        </svg>
        <span className="aa-word-globe__pointer">FIND ME!</span>
      </div>
    </div>
  );
}

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

function updateViewPointer(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    '--aa-view-x',
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty(
    '--aa-view-y',
    `${event.clientY - rect.top}px`,
  );
}

function ProjectCopy({ project }: { project: HomeProject }) {
  return (
    <div className="aa-project-copy">
      <h3>
        <TransitionLink
          className="aa-project-title-link"
          direction="forward"
          href={`/work/${project.slug}`}
          onPointerMove={updateViewPointer}
        >
          <span data-project-morph="title">{project.title}</span>
          <span className="aa-view-pointer" aria-hidden="true">VIEW</span>
        </TransitionLink>
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
      onPointerMove={updateViewPointer}
    >
      {isYap ? (
        <div className="aa-project-visual__yap-thumbnail" aria-hidden="true">
          <YapAmbientThumbnail />
        </div>
      ) : (
        <ImagePlaceholder label={`${project.title} image placeholder`} />
      )}
      {!isYap && (
        <span className="aa-project-visual__number">0{index + 1}</span>
      )}
      {!isYap && (
        <span className="aa-project-visual__title">{project.title}</span>
      )}
      <span className="aa-view-pointer" aria-hidden="true">VIEW</span>
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
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [isDockVisible, setIsDockVisible] = useState(false);
  const projectPanels = useRef<Array<HTMLElement | null>>([]);
  const projectCopyStage = useRef<HTMLDivElement | null>(null);
  const previousMorphRects = useRef<Map<string, DOMRect> | null>(null);
  const activeProjectIndexRef = useRef(0);
  const activeProject = projects[activeProjectIndex] || projects[0]!;

  useEffect(() => {
    const updateHeroState = () => {
      const hero = document.querySelector<HTMLElement>('.aa-hero');
      const links = document.querySelector<HTMLElement>('.aa-social-links');
      if (!hero || !links) return;

      setIsHeroActive(
        hero.getBoundingClientRect().bottom > links.getBoundingClientRect().top,
      );
      setIsDockVisible(
        hero.getBoundingClientRect().bottom <= window.innerHeight * 0.92,
      );
    };

    updateHeroState();
    window.addEventListener('scroll', updateHeroState, { passive: true });
    window.addEventListener('resize', updateHeroState);
    return () => {
      window.removeEventListener('scroll', updateHeroState);
      window.removeEventListener('resize', updateHeroState);
    };
  }, []);

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
      <section className="aa-hero" id="home" aria-label="Introduction">
        <GravityStars />
        <WordGlobe />

        <header className="aa-topbar">
          <div className="aa-topbar__identity">
            <span>{content.name}</span>
            <dl className="aa-hero-career">
              <div>
                <dt>Current role</dt>
                <dd>Machine Learning Data Associate</dd>
              </div>
              <div>
                <dt>Building toward</dt>
                <dd>Language Engineer</dd>
              </div>
              <div>
                <dt>Engineering practice</dt>
                <dd>Full-stack Systems</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="aa-hero-words" aria-label="We are the words">
          <span
            style={
              {
                '--aa-chars': 2,
                '--aa-delay': '3.7s',
                '--aa-duration': '0.2s',
                '--aa-width': '3.4ch',
                '--aa-cursor-span': '0.45s',
              } as CSSProperties
            }
          >
            WE
          </span>
          <span
            style={
              {
                '--aa-chars': 3,
                '--aa-delay': '4.15s',
                '--aa-duration': '0.3s',
                '--aa-width': '4.5ch',
                '--aa-cursor-span': '0.55s',
              } as CSSProperties
            }
          >
            ARE
          </span>
          <span
            style={
              {
                '--aa-chars': 3,
                '--aa-delay': '4.7s',
                '--aa-duration': '0.3s',
                '--aa-width': '4.3ch',
                '--aa-cursor-span': '0.55s',
              } as CSSProperties
            }
          >
            THE
          </span>
          <span
            style={
              {
                '--aa-chars': 8,
                '--aa-delay': '5.25s',
                '--aa-duration': '0.8s',
                '--aa-width': '9ch',
              } as CSSProperties
            }
          >
            WORDS!!!
          </span>
          <p>
            We are all made of words we use.
            <br />
            I design systems that listen closely to them.
          </p>
        </div>

        <button
          className={`aa-scroll-prompt${isDockVisible ? ' is-hidden' : ''}`}
          type="button"
          aria-label="Scroll to selected work"
          onClick={() => {
            const target = document.querySelector<HTMLElement>(
              window.matchMedia('(max-width: 809.98px)').matches
                ? '.aa-work-mobile'
                : '#work',
            );
            if (!target) return;
            setIsDockVisible(true);
            window.requestAnimationFrame(() => {
              target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'auto'
                  : 'smooth',
                block: 'start',
              });
            });
          }}
        >
          <span>SCROLL</span>
          <span className="aa-scroll-prompt__line" aria-hidden="true" />
        </button>

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

      <div
        className={`aa-social-links${isHeroActive ? ' is-on-hero' : ''}`}
      >
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

      <PortfolioDock
        className={isDockVisible ? 'is-home-visible' : 'is-home-hidden'}
        current="home"
        aboutHref="/about"
      />
    </main>
  );
}
