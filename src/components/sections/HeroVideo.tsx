'use client';

import Image from 'next/image';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/**
 * Real site-progress footage (mason laying the foundation course, excavation,
 * an aerial reveal of the rebar grid, a flyover of the entrance road) —
 * trimmed from the client's own walkthrough video. A slow CSS "Ken Burns"
 * zoom keeps it feeling alive without any extra JS; prefers-reduced-motion
 * swaps to the static poster frame entirely.
 */
export function HeroVideo() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <Image
        src="/hero/construction-poster.jpg"
        alt="Construction underway at OPS Divine Greens — laying the foundation brick course"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <video
      className="hero-video-zoom absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero/construction-poster.jpg"
      aria-label="Construction underway at OPS Divine Greens"
    >
      <source src="/hero/construction.webm" type="video/webm" />
      <source src="/hero/construction.mp4" type="video/mp4" />
    </video>
  );
}
