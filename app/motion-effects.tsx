'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let exitTimer = 0;

    const afterPaint = () =>
      new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve());
        });
      });

    const waitForImages = async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map(async (image) => {
          if (image.complete) {
            await image.decode().catch(() => undefined);
            return;
          }

          const preload = new window.Image();
          preload.decoding = 'async';
          if (image.srcset) preload.srcset = image.srcset;
          if (image.sizes) preload.sizes = image.sizes;
          preload.src = image.currentSrc || image.src;
          await preload.decode().catch(() => undefined);
        }),
      );
    };

    const waitForDestination = async () => {
      await afterPaint();
      await Promise.all([
        document.fonts.ready,
        waitForImages(),
        new Promise<void>((resolve) => window.setTimeout(resolve, 2350)),
      ]);
      await afterPaint();
    };

    const revealDestination = async () => {
      root.dataset.transition = 'preparing';
      void root.offsetWidth;

      await Promise.race([
        waitForDestination(),
        new Promise<void>((resolve) => window.setTimeout(resolve, 12000)),
      ]);
      if (cancelled) return;

      root.dataset.transition = 'entering';
      exitTimer = window.setTimeout(() => {
        if (cancelled) return;
        root.dataset.transition = 'ready';
        delete root.dataset.transitionDirection;
      }, 900);
    };

    void revealDestination();

    return () => {
      cancelled = true;
      window.clearTimeout(exitTimer);
    };
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

    const titleEffects = Array.from(
      document.querySelectorAll<HTMLElement>('.yap-title-effect'),
    );
    const titleEffectObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-effect-visible');
            titleEffectObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.65, rootMargin: '0px 0px -14% 0px' },
    );
    titleEffects.forEach((element) => titleEffectObserver.observe(element));

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
      observer.disconnect(); titleEffectObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener('scroll', requestUpdate); window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
