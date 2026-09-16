'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
} from 'react';

type Hobby = {
  title: string;
  note: string;
};

type ConstellationStar = readonly [
  x: number,
  y: number,
  scale: number,
  hobby?: Hobby,
];

const stars: ConstellationStar[] = [
  [42, 302, 1.08, { title: 'Electric guitar', note: 'Rhythm' }],
  [100, 230, 0.86],
  [160, 165, 0.9, { title: 'Muay Thai', note: 'Discipline' }],
  [210, 118, 0.94],
  [214, 78, 0.8, { title: 'Skiing', note: 'Flow' }],
  [210, 52, 0.88],
  [228, 32, 1, { title: 'Cooking', note: 'Iteration' }],
  [112, 270, 0.92],
  [230, 252, 0.9, { title: 'Skateboarding', note: 'Balance' }],
  [275, 258, 0.84],
  [390, 270, 0.88, { title: 'Drawing', note: 'Observation' }],
  [430, 284, 1],
  [463, 273, 0.86, { title: 'Photography', note: 'Framing' }],
  [488, 305, 0.92],
  [461, 324, 0.86, { title: 'Printmaking & carving', note: 'Craft' }],
  [430, 316, 0.82],
];

const scrambleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%';
const constellationIntro = 'A few things that keep me curious';
const constellationPrompt = 'Choose a star';

function useConstellationTypewriter() {
  const [copy, setCopy] = useState({
    intro: '',
    prompt: '',
    activeLine: null as 0 | 1 | null,
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCopy({
        intro: constellationIntro,
        prompt: constellationPrompt,
        activeLine: null,
      });
      return;
    }

    let timeout = 0;
    let line: 0 | 1 = 0;
    let character = 0;

    const typeNextCharacter = () => {
      const text = line === 0 ? constellationIntro : constellationPrompt;
      const key = line === 0 ? 'intro' : 'prompt';
      character += 1;

      setCopy((current) => ({
        ...current,
        [key]: text.slice(0, character),
        activeLine: line,
      }));

      if (character < text.length) {
        timeout = window.setTimeout(typeNextCharacter, 48);
        return;
      }

      if (line === 0) {
        timeout = window.setTimeout(() => {
          line = 1;
          character = 0;
          setCopy((current) => ({ ...current, activeLine: 1 }));
          typeNextCharacter();
        }, 220);
      }
    };

    const beginTyping = () => {
      setCopy({ intro: '', prompt: '', activeLine: 0 });
      typeNextCharacter();
    };

    const transition = document.documentElement.dataset.transition;
    const startDelay =
      !transition || transition === 'initial'
        ? 3400
        : transition === 'ready'
          ? 180
          : 960;
    timeout = window.setTimeout(beginTyping, startDelay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return copy;
}

function useScrambledText(value: string, duration: number) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!value) {
      setDisplayValue('');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const target = value.toUpperCase();

    const scramble = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const revealed = Math.floor(progress * target.length);

      setDisplayValue(
        Array.from(target, (character, index) => {
          if (character === ' ' || character === '&') return character;
          if (index < revealed || progress === 1) return character;
          return scrambleCharacters[
            Math.floor(Math.random() * scrambleCharacters.length)
          ];
        }).join(''),
      );

      if (progress < 1) frame = window.requestAnimationFrame(scramble);
    };

    frame = window.requestAnimationFrame(scramble);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, value]);

  return displayValue;
}

export function AboutConstellation() {
  const [selected, setSelected] = useState<number | null>(null);
  const typedCopy = useConstellationTypewriter();
  const selectedHobby = selected === null ? null : stars[selected][3];
  const scrambledTitle = useScrambledText(selectedHobby?.title ?? '', 520);
  const scrambledNote = useScrambledText(selectedHobby?.note ?? '', 420);

  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--aa-about-pointer-x',
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      '--aa-about-pointer-y',
      `${event.clientY - rect.top}px`,
    );
  };

  const chooseWithKeyboard = (
    event: KeyboardEvent<SVGGElement>,
    index: number,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelected(index);
  };

  return (
    <div
      className="aa-about-reference__constellation"
      data-cursor-interactive
      onPointerMove={movePointer}
    >
      <div className="aa-about-reference__constellation-note" aria-hidden="true">
        <Image
          alt=""
          height={1714}
          src="/about/pisces-note-v2.png"
          width={4096}
        />
      </div>
      <svg viewBox="0 0 530 360" role="group" aria-label="Pisces constellation">
        <g className="aa-about-reference__constellation-lines" aria-hidden="true">
          <polyline points="42,302 100,230 160,165 210,118 214,78 210,52 228,32" />
          <polyline points="42,302 112,270 230,252 275,258 390,270 430,284" />
          <polyline points="430,284 463,273 488,305 461,324 430,316 430,284" />
        </g>
        <g className="aa-about-reference__constellation-stars">
          {stars.map(([x, y, scale, hobby], index) => (
            <g
              aria-label={hobby ? `${hobby.title}: ${hobby.note}` : undefined}
              className={`${hobby ? 'is-interactive' : ''} ${selected === index ? 'is-selected' : ''}`.trim()}
              key={`${x}-${y}`}
              onClick={hobby ? () => setSelected(index) : undefined}
              onKeyDown={
                hobby ? (event) => chooseWithKeyboard(event, index) : undefined
              }
              role={hobby ? 'button' : undefined}
              style={{ '--star-delay': `${index * -0.19}s` } as CSSProperties}
              tabIndex={hobby ? 0 : undefined}
              transform={`translate(${x} ${y}) scale(${scale})`}
            >
              {hobby && <circle className="aa-about-reference__star-hit" r="18" />}
              <circle className="aa-about-reference__star-dot" r="5.4" />
            </g>
          ))}
        </g>
      </svg>

      <div className="aa-view-pointer aa-about-reference__constellation-pointer">
        <span>ABOUT</span>
        <span>ME</span>
      </div>

      <div className="aa-about-reference__constellation-copy">
        <span className="aa-about-reference__type-line aa-about-reference__type-line--intro">
          {typedCopy.intro}
          {typedCopy.activeLine === 0 && (
            <span className="aa-about-reference__type-cursor" aria-hidden="true" />
          )}
        </span>
        {selectedHobby ? (
          <p>
            <strong>{scrambledTitle}</strong>
            <i>{scrambledNote}</i>
          </p>
        ) : (
          <p className="aa-about-reference__type-line aa-about-reference__type-line--prompt is-prompt">
            {typedCopy.prompt}
            {typedCopy.activeLine === 1 && (
              <span className="aa-about-reference__type-cursor" aria-hidden="true" />
            )}
          </p>
        )}
      </div>
      <span className="sr-only" aria-live="polite">
        {selectedHobby
          ? `${selectedHobby.title}: ${selectedHobby.note}`
          : 'Choose a star'}
      </span>
    </div>
  );
}
