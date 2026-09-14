'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = { src: string };

export function TunerIllustration({ src }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new window.Image();
    const timers: number[] = [];
    let observer: IntersectionObserver | undefined;
    let hasPlayed = false;

    const draw = (pixelSize = 1) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      if (pixelSize <= 1) {
        context.imageSmoothingEnabled = true;
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        return;
      }

      const block = Math.max(1, Math.round(pixelSize * ratio));
      const smallWidth = Math.max(1, Math.ceil(width / block));
      const smallHeight = Math.max(1, Math.ceil(height / block));
      const buffer = document.createElement('canvas');
      buffer.width = smallWidth;
      buffer.height = smallHeight;
      const bufferContext = buffer.getContext('2d');
      if (!bufferContext) return;
      bufferContext.drawImage(image, 0, 0, smallWidth, smallHeight);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = false;
      context.drawImage(buffer, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
    };

    const reveal = () => {
      if (hasPlayed || !image.complete) return;
      hasPlayed = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw(1);
        return;
      }
      [72, 44, 24, 10, 1].forEach((size, index) => {
        timers.push(window.setTimeout(() => draw(size), index * 70));
      });
    };

    image.onload = () => {
      draw(72);
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      }, { threshold: 0.25 });
      observer.observe(root);
    };
    image.src = src;

    const resize = new ResizeObserver(() => image.complete && draw(hasPlayed ? 1 : 72));
    resize.observe(root);

    return () => {
      timers.forEach(window.clearTimeout);
      observer?.disconnect();
      resize.disconnect();
    };
  }, [src]);

  const tune = (event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const distance = Math.hypot(x - 0.64, y - 0.64);
    const strength = Math.max(0, Math.min(1, 1 - distance / 0.55));
    root.style.setProperty('--tune', strength.toFixed(3));
    root.style.setProperty('--dial-angle', `${((x - 0.64) * 24).toFixed(2)}deg`);
  };

  const reset = () => {
    rootRef.current?.style.setProperty('--tune', '0.2');
    rootRef.current?.style.setProperty('--dial-angle', '0deg');
  };

  return (
    <div ref={rootRef} className="tuner-illustration" onPointerMove={tune} onPointerLeave={reset}>
      <Image src={src} alt="A woman tuning noisy signals into one clear signal" fill priority sizes="320px" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="tuner-noise-wash" aria-hidden="true" />
      <span className="tuner-dial-overlay" aria-hidden="true"><i /></span>
      <span className="tuner-indicator" aria-hidden="true" />
    </div>
  );
}
