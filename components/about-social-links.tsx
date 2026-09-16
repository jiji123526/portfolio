'use client';

import { useEffect, useRef, useState } from 'react';

export function AboutSocialLinks({
  email,
  linkedin,
  resume,
}: {
  email: string;
  linkedin: string;
  resume?: string;
}) {
  const [isOnHero, setIsOnHero] = useState(true);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColor = () => {
      const hero = document.querySelector<HTMLElement>(
        '.aa-about-reference__hero',
      );
      const links = linksRef.current;
      if (!hero || !links) return;

      setIsOnHero(
        hero.getBoundingClientRect().bottom > links.getBoundingClientRect().top,
      );
    };

    updateColor();
    window.addEventListener('scroll', updateColor, { passive: true });
    window.addEventListener('resize', updateColor);
    return () => {
      window.removeEventListener('scroll', updateColor);
      window.removeEventListener('resize', updateColor);
    };
  }, []);

  return (
    <div
      className={`aa-social-links${isOnHero ? ' is-on-hero' : ''}`}
      ref={linksRef}
    >
      <a href={email}>Email</a>
      {resume ? <a href={resume}>Resume</a> : <span>Resume</span>}
      <a href={linkedin} rel="noreferrer" target="_blank">
        LinkedIn
      </a>
    </div>
  );
}
