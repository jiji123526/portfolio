'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useStickyDrift(
  targetRef: RefObject<HTMLElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  options: { distance?: number; media?: string } = {},
) {
  const { distance = 28, media = '(min-width: 810px)' } = options;

  useEffect(() => {
    const target = targetRef.current;
    const section = sectionRef.current;
    if (!target || !section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const enabledViewport = window.matchMedia(media);
    let frame = 0;
    let current = 0;
    let destination = 0;

    const render = () => {
      const delta = destination - current;
      current += delta * 0.16;

      if (Math.abs(delta) < 0.04) current = destination;
      target.style.setProperty('--aa-sticky-drift', `${current.toFixed(2)}px`);

      frame = current === destination ? 0 : window.requestAnimationFrame(render);
    };

    const update = () => {
      if (reducedMotion.matches || !enabledViewport.matches) {
        destination = 0;
      } else {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / travel));
        destination = progress * -distance;
      }

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    reducedMotion.addEventListener('change', update);
    enabledViewport.addEventListener('change', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      reducedMotion.removeEventListener('change', update);
      enabledViewport.removeEventListener('change', update);
      if (frame) window.cancelAnimationFrame(frame);
      target.style.removeProperty('--aa-sticky-drift');
    };
  }, [distance, media, sectionRef, targetRef]);
}
