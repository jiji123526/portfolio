'use client';

import { useEffect, useRef } from 'react';

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[data-cursor-interactive]',
  '.aa-word-globe',
].join(',');

export function AmbientCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    const root = document.documentElement;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let x = -40;
    let y = -40;

    const render = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      cursor.dataset.hidden = target?.closest(interactiveSelector)
        ? 'true'
        : 'false';
      cursor.dataset.visible = 'true';
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const leave = () => {
      cursor.dataset.visible = 'false';
    };

    root.classList.add('has-ambient-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      root.classList.remove('has-ambient-cursor');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="aa-ambient-cursor" ref={cursorRef} aria-hidden="true" />;
}
