'use client';

import { useState, type FormEvent } from 'react';
import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { AssistantResponse } from '@/lib/ai/assistantSchema';

interface AssistantWidgetProps {
  townshipSlug: string;
}

interface ChatEntry {
  role: 'user' | 'assistant';
  text: string;
}

/**
 * "Divine Visionary" — the AI assistant widget. Highlighting matching plots
 * on the map is just calling the same masterplanStore setter that plot
 * hover/click already use (see PlotMesh.tsx) — no special code path.
 */
export function AssistantWidget({ townshipSlug }: AssistantWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [history, setHistory] = useState<ChatEntry[]>([
    { role: 'assistant', text: 'Ask me things like "show me east-facing plots near the entrance."' },
  ]);
  const setHighlightedPlots = useMasterplanStore((s) => s.setHighlightedPlots);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || pending) return;

    setHistory((h) => [...h, { role: 'user', text: message }]);
    setInput('');
    setPending(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, townshipSlug }),
      });
      const data = (await res.json()) as AssistantResponse;
      setHighlightedPlots(data.matchedPlotIds ?? []);
      setHistory((h) => [...h, { role: 'assistant', text: data.reply }]);
    } catch {
      setHistory((h) => [...h, { role: 'assistant', text: 'Something went wrong reaching the assistant.' }]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="absolute bottom-24 right-6 z-20 sm:right-10">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-2xl border border-hairline bg-surface/95 shadow-[0_18px_50px_rgba(19,21,17,0.24)] backdrop-blur-xl">
          <div className="border-b border-hairline px-4 py-3">
            <p className="eyebrow-label text-terracotta">Divine Visionary</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {history.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.role === 'user'
                    ? 'ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-green px-3 py-2 text-sm text-white'
                    : 'mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-bg px-3 py-2 text-sm text-ink'
                }
              >
                {entry.text}
              </div>
            ))}
            {pending && <div className="mr-auto text-sm text-ink-muted">Searching plots…</div>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-hairline p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="East-facing plots near the entrance…"
              className="flex-1 rounded-full border border-hairline bg-transparent px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-green focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-green px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
            >
              Ask
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="eyebrow-label flex items-center gap-2 rounded-full border border-green/60 bg-surface/90 px-5 py-3 text-xs text-green shadow-[0_10px_30px_rgba(43,46,40,0.16)] backdrop-blur-xl transition-colors hover:bg-green hover:text-white"
      >
        {open ? 'Close' : 'Divine Visionary'}
      </button>
    </div>
  );
}
