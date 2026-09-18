'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

const sections = [
  { id: 'yap-problem', label: 'PROBLEM' },
  { id: 'yap-transformation', label: 'PLATFORM SHIFT' },
  { id: 'yap-solutions', label: 'PRODUCT FLOWS' },
  { id: 'yap-architecture', label: 'SYSTEM DESIGN' },
  { id: 'yap-operations', label: 'OPERATIONS' },
  { id: 'yap-listening', label: 'LISTENING' },
  { id: 'yap-takeaways', label: 'TAKEAWAYS' },
] as const;

type SectionId = (typeof sections)[number]['id'];

export function YapSectionNav() {
  const [activeId, setActiveId] = useState<SectionId>(sections[0].id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const targets = sections
        .map(({ id }) => document.getElementById(id))
        .filter((target): target is HTMLElement => Boolean(target));

      if (targets.length === 0) return;

      const first = targets[0].getBoundingClientRect();
      const last = targets[targets.length - 1].getBoundingClientRect();
      setIsVisible(first.top <= 82 && last.bottom > 82);

      let nextActive = targets[0].id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 96) nextActive = target.id;
      }
      setActiveId(nextActive as SectionId);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const jumpToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const targetTop = () =>
      window.scrollY + target.getBoundingClientRect().top - 82;

    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({
      behavior: reducedMotion ? 'auto' : 'smooth',
      top: targetTop(),
    });

    if (!reducedMotion) {
      window.setTimeout(() => {
        window.scrollTo({ behavior: 'auto', top: targetTop() });
      }, 720);
    }
  };

  return (
    <nav
      aria-label="YAP case study sections"
      className={`yap-section-nav${isVisible ? ' is-visible' : ''}`}
    >
      <div className="yap-section-nav__track">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              aria-label={section.label}
              aria-current={isActive ? 'location' : undefined}
              className={isActive ? 'is-active' : undefined}
              href={`#${section.id}`}
              key={section.id}
              onClick={(event) => jumpToSection(event, section.id)}
            >
              <span className="yap-section-nav__label">{section.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
