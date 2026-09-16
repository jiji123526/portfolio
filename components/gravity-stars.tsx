'use client';

import { useEffect, useRef } from 'react';

type Star = {
  anchorX: number;
  anchorY: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  opacity: number;
};

const INFLUENCE_RADIUS = 155;
const MAX_DISPLACEMENT = 72;

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(width: number, height: number) {
  const random = seededRandom(20260915);
  const count = Math.max(80, Math.min(180, Math.round((width * height) / 9000)));

  return Array.from({ length: count }, (): Star => ({
    anchorX: random() * width,
    anchorY: random() * height,
    offsetX: 0,
    offsetY: 0,
    velocityX: 0,
    velocityY: 0,
    radius: 0.55 + random() * 0.7,
    opacity: 0.4 + random() * 0.58,
  }));
}

export function GravityStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const pointer = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      active: false,
    };
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#fff';

      for (const star of stars) {
        context.globalAlpha = star.opacity;
        context.beginPath();
        context.arc(
          star.anchorX + star.offsetX,
          star.anchorY + star.offsetY,
          star.radius,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const step = () => {
      frame = 0;
      let isMoving = false;

      for (const star of stars) {
        const currentX = star.anchorX + star.offsetX;
        const currentY = star.anchorY + star.offsetY;
        const deltaX = currentX - pointer.x;
        const deltaY = currentY - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        const pointerSpeed = Math.hypot(
          pointer.velocityX,
          pointer.velocityY,
        );

        if (
          pointer.active &&
          pointerSpeed > 0.08 &&
          distance > 0 &&
          distance < INFLUENCE_RADIUS
        ) {
          const influence = 1 - distance / INFLUENCE_RADIUS;
          const force = Math.pow(influence, 1.7);
          const sweep = force * 0.19;
          const wake = Math.min(pointerSpeed, 18) * force * 0.035;

          star.velocityX +=
            pointer.velocityX * sweep + (deltaX / distance) * wake;
          star.velocityY +=
            pointer.velocityY * sweep + (deltaY / distance) * wake;
        }

        star.velocityX *= 0.92;
        star.velocityY *= 0.92;
        star.offsetX += star.velocityX;
        star.offsetY += star.velocityY;

        const displacement = Math.hypot(star.offsetX, star.offsetY);
        if (displacement > MAX_DISPLACEMENT) {
          const scale = MAX_DISPLACEMENT / displacement;
          star.offsetX *= scale;
          star.offsetY *= scale;
        }

        if (
          Math.abs(star.velocityX) > 0.01 ||
          Math.abs(star.velocityY) > 0.01
        ) {
          isMoving = true;
        }
      }

      pointer.velocityX *= 0.82;
      pointer.velocityY *= 0.82;
      draw();
      if (
        isMoving ||
        Math.abs(pointer.velocityX) > 0.01 ||
        Math.abs(pointer.velocityY) > 0.01
      ) {
        frame = window.requestAnimationFrame(step);
      }
    };

    const requestStep = () => {
      if (!frame) frame = window.requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      stars = createStars(width, height);
      draw();
    };

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || coarsePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      const now = performance.now();

      if (pointer.lastTime) {
        const frameDuration = Math.max(8, Math.min(40, now - pointer.lastTime));
        const frameScale = 16.667 / frameDuration;
        const nextVelocityX = (nextX - pointer.lastX) * frameScale;
        const nextVelocityY = (nextY - pointer.lastY) * frameScale;
        pointer.velocityX = pointer.velocityX * 0.28 + nextVelocityX * 0.72;
        pointer.velocityY = pointer.velocityY * 0.28 + nextVelocityY * 0.72;
      }

      pointer.x = nextX;
      pointer.y = nextY;
      pointer.lastX = nextX;
      pointer.lastY = nextY;
      pointer.lastTime = now;
      pointer.active = true;
      requestStep();
    };

    const leave = () => {
      pointer.active = false;
      pointer.lastTime = 0;
      pointer.velocityX = 0;
      pointer.velocityY = 0;
      requestStep();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    resize();

    return () => {
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="aa-stars" ref={canvasRef} aria-hidden="true" />;
}
