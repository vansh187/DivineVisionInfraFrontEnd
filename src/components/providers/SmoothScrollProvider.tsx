'use client';

import type { ReactNode } from 'react';
import { useLenis } from '@/lib/gsap/useLenis';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
