'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.transition === 'leaving') {
      root.dataset.transition = 'preparing';
      void root.offsetWidth;
      const frame = window.requestAnimationFrame(() => {
        root.dataset.transition = 'ready';
        window.setTimeout(() => { delete root.dataset.transitionDirection; }, 560);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    root.dataset.transition = 'ready';
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reduced) {
      reveals.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach((element) => observer.observe(element));

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'));
    const cleanups = magnetic.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        element.style.setProperty('--mx', `${x}px`);
        element.style.setProperty('--my', `${y}px`);
      };
      const reset = () => { element.style.setProperty('--mx', '0px'); element.style.setProperty('--my', '0px'); };
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', reset);
      return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); };
    });

    const focus = Array.from(document.querySelectorAll<HTMLElement>('.scroll-focus'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--page-progress', `${progress}`);
      focus.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const local = Math.max(0, Math.min(1, 1 - Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
        element.style.setProperty('--focus', `${local}`);
      });
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    return () => {
      observer.disconnect(); cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener('scroll', requestUpdate); window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
