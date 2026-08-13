import type { Township } from '@/lib/masterplan/types';
import { opsDivineGreensPlots } from './plots/opsDivineGreens';
import { suraksaEnclavePlots } from './plots/suraksaEnclave';

export const townships: Township[] = [
  {
    slug: 'ops-divine-greens',
    name: 'OPS Divine Greens',
    location: 'Karnal · Bang on NH-1',
    description:
      '369 plots around a 24-metre spine road, with the Florence Club, cricket pitch, tennis court, amphitheatre and two children’s parks inside the gate.',
    bounds: { width: 10, depth: 18 },
    plots: opsDivineGreensPlots,
  },
  {
    slug: 'suraksha-enclave',
    name: 'Suraksha Enclave Phase 2',
    location: 'Sector 15, Ganaur · Sonipat',
    description:
      'DDJAY-approved, 250 metres off the highway. Phase 1 is already occupied, so the neighbourhood exists before you book.',
    bounds: { width: 9, depth: 12 },
    plots: suraksaEnclavePlots,
  },
];

export function getTownshipBySlug(slug: string): Township | undefined {
  return townships.find((t) => t.slug === slug);
}
