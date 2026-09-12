'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

type TransitionLinkProps = ComponentProps<typeof Link> & {
  direction?: 'forward' | 'back';
};

export function TransitionLink({ direction = 'forward', href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const url = new URL(event.currentTarget.href);
    const destination = `${url.pathname}${url.search}${url.hash}`;
    const root = document.documentElement;
    root.dataset.transitionDirection = direction;

    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> };
    };

    if (transitionDocument.startViewTransition) {
      const transition = transitionDocument.startViewTransition(async () => {
        router.push(destination);
        await new Promise<void>((resolve) => {
          const targetPath = url.pathname;
          const started = performance.now();
          const waitForRoute = () => {
            if (window.location.pathname === targetPath || performance.now() - started > 1800) resolve();
            else window.requestAnimationFrame(waitForRoute);
          };
          waitForRoute();
        });
      });
      const clearDirection = () => { delete root.dataset.transitionDirection; };
      transition.finished.then(clearDirection, clearDirection);
      return;
    }

    root.dataset.transition = 'leaving';
    window.setTimeout(() => router.push(destination), 520);
  };

  return <Link href={href} onClick={navigate} {...props} />;
}
