'use client';

import { useEffect, useState } from 'react';

const funFacts = [
  '2026 Portfolio',
  'Obsessed with musical films',
  'Planting cherry tomato',
  'Any tips for skateboarding?',
] as const;

export function AboutFunFacts() {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(funFacts[0]);
      return;
    }

    let factIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let timeout = 0;
    let hasStarted = false;

    const chooseNextFact = () => {
      let nextIndex = factIndex;
      while (nextIndex === factIndex) {
        nextIndex = Math.floor(Math.random() * funFacts.length);
      }
      factIndex = nextIndex;
    };

    const tick = () => {
      const fact = funFacts[factIndex];

      if (isDeleting) {
        characterIndex -= 1;
        setText(fact.slice(0, characterIndex));

        if (characterIndex === 0) {
          isDeleting = false;
          chooseNextFact();
          timeout = window.setTimeout(tick, 360);
          return;
        }

        timeout = window.setTimeout(tick, 26);
        return;
      }

      characterIndex += 1;
      setText(fact.slice(0, characterIndex));

      if (characterIndex === fact.length) {
        isDeleting = true;
        timeout = window.setTimeout(tick, 1800);
        return;
      }

      timeout = window.setTimeout(tick, 52);
    };

    const beginTyping = () => {
      if (hasStarted) return;
      hasStarted = true;
      timeout = window.setTimeout(tick, 160);
    };

    const root = document.documentElement;
    const startWhenReady = () => {
      if (root.dataset.transition === 'ready') beginTyping();
    };
    const observer = new MutationObserver(startWhenReady);
    observer.observe(root, {
      attributeFilter: ['data-transition'],
      attributes: true,
    });
    startWhenReady();

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <span className="aa-about-reference__fun-fact" aria-live="polite">
      <span>{text}</span>
      <i aria-hidden="true" />
    </span>
  );
}
