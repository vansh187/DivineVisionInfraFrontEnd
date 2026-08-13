'use client';

import { useEffect, useState } from 'react';
import { isWebglSupported } from './webglSupport';

/**
 * null until determined client-side (avoids an SSR/CSR hydration mismatch);
 * false when WebGL is unavailable or the user prefers reduced motion.
 */
export function useCanRender3D(): boolean | null {
  const [canRender, setCanRender] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanRender(!prefersReducedMotion && isWebglSupported());
  }, []);

  return canRender;
}
