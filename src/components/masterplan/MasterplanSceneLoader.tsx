'use client';

import dynamic from 'next/dynamic';
import type { Township } from '@/lib/masterplan/types';

const MasterplanScene = dynamic(
  () => import('./MasterplanScene').then((m) => m.MasterplanScene),
  { ssr: false },
);

export function MasterplanSceneLoader({ township }: { township: Township }) {
  return <MasterplanScene township={township} />;
}
