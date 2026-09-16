'use client';

import { useEffect, useState } from 'react';
import { PortfolioDock } from '@/components/portfolio-dock';

export function ScrollTriggeredDock({ triggerId }: { triggerId: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(triggerId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: '0px',
        threshold: 0,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerId]);

  if (!isVisible) return null;

  return (
    <div className="aa-scroll-dock">
      <PortfolioDock
        current="work"
        homeHref="/"
        workHref="/#work"
        aboutHref="/about"
      />
    </div>
  );
}
