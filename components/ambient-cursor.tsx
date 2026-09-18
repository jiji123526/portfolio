'use client';

import { useEffect, useRef } from 'react';

const morphTargets = [
  '.aa-project-title-link:not(.is-disabled)',
  '.aa-project-visual',
  '.aa-word-globe__stage',
  '.aa-about-reference__constellation',
].join(',');

function getMorphState(target: Element | null) {
  const morphTarget = target?.closest(morphTargets);

  if (
    morphTarget?.matches(
      '.aa-project-title-link:not(.is-disabled), .aa-project-visual',
    )
  ) {
    return { kind: 'view', label: 'VIEW' };
  }

  if (morphTarget?.matches('.aa-word-globe__stage')) {
    return { kind: 'find', label: 'FIND ME!' };
  }

  if (morphTarget?.matches('.aa-about-reference__constellation')) {
    return { kind: 'about', label: 'ABOUT\nME' };
  }

  return { kind: 'dot', label: '' };
}

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
    let activeKind = 'dot';

    const render = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      cursor.dataset.theme = document.querySelector(
        'main.jangoing-case-study',
      )
        ? 'jangoing'
        : 'default';
      const morphState = getMorphState(target);
      if (morphState.kind !== activeKind) {
        activeKind = morphState.kind;
        cursor.dataset.kind = morphState.kind;
        const label = cursor.firstElementChild;
        if (label) label.textContent = morphState.label;
      }
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

  return (
    <div
      className="aa-ambient-cursor"
      data-kind="dot"
      ref={cursorRef}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
