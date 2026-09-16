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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(destination);
      return;
    }
    const root = document.documentElement;
    root.dataset.transitionDirection = direction;
    root.dataset.transition = 'leaving';
    window.setTimeout(() => router.push(destination), 520);
  };

  return <Link href={href} onClick={navigate} {...props} />;
}
