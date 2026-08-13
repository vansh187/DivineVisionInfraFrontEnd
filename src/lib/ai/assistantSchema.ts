import type { PlotFacing, PlotStatus } from '@/lib/masterplan/types';

/**
 * Structured filter an LLM call is expected to produce from a free-text
 * prompt (via tool-use / function-calling). This is the seam between
 * "understand English" (the LLM's job) and "find matching plots"
 * (deterministic, testable code — see matchPlots.ts).
 */
export interface PlotFilter {
  facing?: PlotFacing[];
  status?: PlotStatus[];
  tags?: string[];
  minSizeSqYd?: number;
  maxSizeSqYd?: number;
}

export interface AssistantRequest {
  message: string;
  townshipSlug: string;
}

export interface AssistantResponse {
  reply: string;
  matchedPlotIds: string[];
  filter: PlotFilter;
}

/**
 * Tool-call schema a real LLM integration should register (e.g. Anthropic
 * Messages API `tools`) so the model returns a structured PlotFilter
 * instead of freehanding plot ids or hallucinating plot numbers. Kept next
 * to the PlotFilter type it mirrors so the two can't drift apart.
 */
export const plotFilterToolSchema = {
  name: 'filter_plots',
  description:
    "Filter the township's plot list by facing, status, size and feature tags to answer the customer's request. Call this whenever the customer describes what kind of plot they want.",
  input_schema: {
    type: 'object',
    properties: {
      facing: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'north',
            'south',
            'east',
            'west',
            'north-east',
            'north-west',
            'south-east',
            'south-west',
          ],
        },
        description: 'Compass direction(s) the plot should face.',
      },
      status: {
        type: 'array',
        items: { type: 'string', enum: ['available', 'reserved', 'sold'] },
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description:
          "Feature tags, e.g. 'near-entrance', 'corner', 'park-facing', 'club-facing'.",
      },
      minSizeSqYd: { type: 'number' },
      maxSizeSqYd: { type: 'number' },
    },
  },
} as const;
