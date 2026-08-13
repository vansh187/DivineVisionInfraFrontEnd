import type { PlotFacing, PlotStatus } from '@/lib/masterplan/types';
import type { PlotFilter } from './assistantSchema';

// Compound directions first and stripped from the text before checking the
// cardinal ones below — otherwise "north-east" would also spuriously match
// the substring "north".
const COMPASS_FACINGS: PlotFacing[] = ['north-east', 'north-west', 'south-east', 'south-west'];
const CARDINAL_FACINGS: PlotFacing[] = ['north', 'south', 'east', 'west'];

const STATUSES: PlotStatus[] = ['available', 'reserved', 'sold'];

const TAG_KEYWORDS: Record<string, string> = {
  entrance: 'near-entrance',
  gate: 'near-entrance',
  park: 'park-facing',
  corner: 'corner',
  club: 'club-facing',
};

/**
 * Placeholder for the real integration point: swap this for a Claude
 * tool-use call with `plotFilterToolSchema` (see assistantSchema.ts and the
 * comment in app/api/assistant/route.ts). Kept dependency-free and
 * deterministic so the assistant has genuine, testable behavior without an
 * LLM key configured — this is the blueprint's reference implementation,
 * not the production one.
 */
export function parsePromptHeuristically(message: string): PlotFilter {
  let text = message.toLowerCase().replace(/-/g, ' ');
  const filter: PlotFilter = {};

  const facing: PlotFacing[] = [];
  for (const f of COMPASS_FACINGS) {
    const phrase = f.replace('-', ' ');
    if (text.includes(phrase)) {
      facing.push(f);
      text = text.replace(phrase, ' ');
    }
  }
  for (const f of CARDINAL_FACINGS) {
    if (text.includes(f)) facing.push(f);
  }
  if (facing.length) filter.facing = facing;

  const status = STATUSES.filter((s) => text.includes(s));
  if (status.length) filter.status = status;

  const tags = [
    ...new Set(
      Object.entries(TAG_KEYWORDS)
        .filter(([keyword]) => text.includes(keyword))
        .map(([, tag]) => tag),
    ),
  ];
  if (tags.length) filter.tags = tags;

  return filter;
}
