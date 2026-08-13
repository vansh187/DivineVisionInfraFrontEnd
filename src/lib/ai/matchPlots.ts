import type { Plot } from '@/lib/masterplan/types';
import type { PlotFilter } from './assistantSchema';

/**
 * Pure, deterministic plot search — independent of any LLM. Given a
 * structured filter (produced either by the heuristic parser or, once
 * wired up, a real LLM tool call) it returns exactly the plots that match.
 * Unit-testable with plain filter objects, no network or mocking required.
 */
export function matchPlots(plots: Plot[], filter: PlotFilter): Plot[] {
  return plots.filter((plot) => {
    if (filter.facing?.length && !filter.facing.includes(plot.facing)) return false;
    if (filter.status?.length && !filter.status.includes(plot.status)) return false;
    if (filter.tags?.length && !filter.tags.every((tag) => plot.tags.includes(tag))) return false;
    if (filter.minSizeSqYd !== undefined && plot.sizeSqYd < filter.minSizeSqYd) return false;
    if (filter.maxSizeSqYd !== undefined && plot.sizeSqYd > filter.maxSizeSqYd) return false;
    return true;
  });
}
