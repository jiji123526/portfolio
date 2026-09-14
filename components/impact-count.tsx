'use client';

import { useEffect, useRef, useState } from 'react';

const formatter = new Intl.NumberFormat('en-US');

export function ImpactCount({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!element || reducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.unobserve(entry.target);

        const startedAt = performance.now();
        const duration = 1100;
        setDisplayValue(0);

        const update = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            frame = window.requestAnimationFrame(update);
          }
        };

        frame = window.requestAnimationFrame(update);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="impact-count">
      <strong ref={elementRef} aria-hidden="true">
        {formatter.format(displayValue)}
      </strong>
      <span className="sr-only">{formatter.format(value)}</span>
    </div>
  );
}
