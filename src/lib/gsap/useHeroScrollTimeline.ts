'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseHeroScrollTimelineOptions {
  sectionRef: RefObject<HTMLElement | null>;
  canvasWrapRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLElement | null>;
  /** Mutated directly (not React state) so the R3F frame loop can read it without re-rendering. */
  scrollProgressRef: RefObject<number>;
}

/**
 * As the hero scrolls past: fades/lifts the copy, scales + fades the 3D
 * canvas wrapper, and pushes scroll progress into a plain ref the terrain
 * shader reads each frame (driving its "morph" — noise turns more turbulent
 * as you scroll).
 */
export function useHeroScrollTimeline({
  sectionRef,
  canvasWrapRef,
  copyRef,
  scrollProgressRef,
}: UseHeroScrollTimelineOptions) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });

      if (canvasWrapRef.current) {
        gsap.to(canvasWrapRef.current, {
          scale: 1.35,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (copyRef.current) {
        gsap.to(copyRef.current, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '60% top',
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [sectionRef, canvasWrapRef, copyRef, scrollProgressRef]);
}
