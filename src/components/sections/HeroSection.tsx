'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useCanRender3D } from '@/lib/three/useCanRender3D';
import { useHeroScrollTimeline } from '@/lib/gsap/useHeroScrollTimeline';

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  const canRender3D = useCanRender3D();

  useHeroScrollTimeline({ sectionRef, canvasWrapRef, copyRef, scrollProgressRef });

  return (
    <header
      ref={sectionRef}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div ref={canvasWrapRef} className="absolute inset-0">
        {canRender3D ? (
          <HeroScene scrollProgressRef={scrollProgressRef} />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.16),transparent_60%)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/5 to-obsidian" />
      </div>

      <div ref={copyRef} className="relative z-10 flex flex-col items-center gap-6">
        <p className="font-mono-label text-champagne">Est. 2005 · The NH-1 corridor</p>
        <h1 className="font-display text-5xl italic leading-[0.98] text-ivory sm:text-7xl">
          One highway. <span className="text-champagne">Seven townships.</span>
        </h1>
        <p className="max-w-lg text-ivory-muted">
          Scroll — the page drives you down NH-1 from the Delhi border to Kurukshetra, stopping at
          every Divine Vision township on the way.
        </p>
      </div>
    </header>
  );
}
