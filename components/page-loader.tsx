'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLoaderLabel, LOADER_LABEL_EVENT } from '@/lib/loader-label';

export function PageLoader() {
  const pathname = usePathname();
  const [label, setLabel] = useState(() => getLoaderLabel(pathname));

  useEffect(() => {
    setLabel(getLoaderLabel(pathname));
  }, [pathname]);

  useEffect(() => {
    const updateLabel = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'string') {
        setLabel(event.detail);
      }
    };

    window.addEventListener(LOADER_LABEL_EVENT, updateLabel);
    return () => window.removeEventListener(LOADER_LABEL_EVENT, updateLabel);
  }, []);

  return (
    <div className="aa-loader" aria-hidden="true">
      <div className="aa-loader__content">
        <strong>{label}</strong>
        <div className="aa-loader__progress">
          <i />
        </div>
      </div>
    </div>
  );
}
