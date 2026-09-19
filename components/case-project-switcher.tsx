'use client';

import { useEffect, useState } from 'react';
import { TransitionLink } from '@/components/transition-link';
import { projects } from '@/lib/project-data';

export function CaseProjectSwitcher({ currentSlug }: { currentSlug: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const otherProjects = projects.filter(
    (project) => project.slug !== currentSlug,
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>('.yap-case-opening');
      const threshold = hero
        ? hero.getBoundingClientRect().bottom <= window.innerHeight * 0.82
        : window.scrollY > 240;
      setIsVisible(threshold);
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

  return (
    <nav
      className={`case-project-switcher${isVisible ? ' is-visible' : ''}`}
      aria-label="Other selected work"
    >
      {otherProjects.map((project) => (
        <TransitionLink
          className={`case-project-switcher__link is-${project.slug}`}
          direction="forward"
          href={`/work/${project.slug}`}
          key={project.slug}
        >
          <span aria-hidden="true">
            {project.title === 'Jangoing'
              ? 'J'
              : project.title === 'TagSpark'
                ? 'T'
                : 'Y'}
          </span>
          <strong>{project.title}</strong>
        </TransitionLink>
      ))}
    </nav>
  );
}
