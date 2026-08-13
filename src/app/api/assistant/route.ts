import { NextResponse } from 'next/server';
import { getTownshipBySlug } from '@/data/townships';
import { matchPlots } from '@/lib/ai/matchPlots';
import { parsePromptHeuristically } from '@/lib/ai/heuristicIntentParser';
import type { AssistantRequest, AssistantResponse } from '@/lib/ai/assistantSchema';

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AssistantRequest>;

  if (!body.message || !body.townshipSlug) {
    return NextResponse.json({ error: 'message and townshipSlug are required' }, { status: 400 });
  }

  const township = getTownshipBySlug(body.townshipSlug);
  if (!township) {
    return NextResponse.json({ error: `Unknown township: ${body.townshipSlug}` }, { status: 404 });
  }

  // --- Real integration point ---------------------------------------------
  // Swap this heuristic for a Claude tool-use call using
  // `plotFilterToolSchema` from assistantSchema.ts, e.g.:
  //
  //   const msg = await anthropic.messages.create({
  //     model: 'claude-sonnet-5',
  //     tools: [plotFilterToolSchema],
  //     tool_choice: { type: 'tool', name: 'filter_plots' },
  //     messages: [{ role: 'user', content: body.message }],
  //   });
  //   const toolUse = msg.content.find((b) => b.type === 'tool_use');
  //   const filter = toolUse?.input as PlotFilter;
  //
  // No API key is configured yet — this route ships with a dependency-free
  // heuristic parser so the assistant is genuinely functional as a demo.
  // -------------------------------------------------------------------------
  const filter = parsePromptHeuristically(body.message);
  const matches = matchPlots(township.plots, filter);

  const reply = matches.length
    ? `Found ${matches.length} matching plot${matches.length === 1 ? '' : 's'} in ${township.name}: ${matches
        .map((p) => p.plotNumber)
        .join(', ')}.`
    : `No plots in ${township.name} match that yet — try a different facing, status, or feature.`;

  const response: AssistantResponse = {
    reply,
    matchedPlotIds: matches.map((p) => p.id),
    filter,
  };

  return NextResponse.json(response);
}
