'use client';

import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { Township } from '@/lib/masterplan/types';

const LEGEND: { status: 'available' | 'reserved' | 'sold'; label: string; color: string }[] = [
  { status: 'available', label: 'Available', color: '#388e3c' },
  { status: 'reserved', label: 'Reserved', color: '#d84315' },
  { status: 'sold', label: 'Sold', color: '#8a8a82' },
];

interface MasterplanHudProps {
  township: Township;
}

export function MasterplanHud({ township }: MasterplanHudProps) {
  const selectedId = useMasterplanStore((s) => s.selectedPlotId);
  const setSelectedPlot = useMasterplanStore((s) => s.setSelectedPlot);

  return (
    <>
      <div className="pointer-events-none absolute left-6 top-24 z-10 sm:left-10">
        <p className="eyebrow-label text-terracotta">{township.location}</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">{township.name}</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">{township.description}</p>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 z-10 flex gap-4 sm:left-10">
        {LEGEND.map((item) => (
          <div key={item.status} className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </div>
        ))}
      </div>

      {selectedId && (
        <button
          type="button"
          onClick={() => setSelectedPlot(null)}
          className="eyebrow-label absolute bottom-8 right-6 z-10 rounded-full border border-green/60 bg-surface px-4 py-2.5 text-xs text-green transition-colors hover:bg-green hover:text-white sm:right-10"
        >
          ← Back to aerial
        </button>
      )}
    </>
  );
}
