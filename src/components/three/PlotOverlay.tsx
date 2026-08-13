'use client';

import { Html } from '@react-three/drei';
import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { Plot } from '@/lib/masterplan/types';

const STATUS_LABEL: Record<Plot['status'], string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};

interface PlotOverlayProps {
  plots: Plot[];
}

/** Glassmorphism detail card anchored to whichever plot is hovered or selected. */
export function PlotOverlay({ plots }: PlotOverlayProps) {
  const hoveredId = useMasterplanStore((s) => s.hoveredPlotId);
  const selectedId = useMasterplanStore((s) => s.selectedPlotId);

  const activeId = selectedId ?? hoveredId;
  const plot = plots.find((p) => p.id === activeId);
  if (!plot) return null;

  const [x, z] = plot.position;

  return (
    <Html position={[x, 0.9, z]} center occlude distanceFactor={8} className="pointer-events-none">
      <div className="w-56 -translate-y-full rounded-xl border border-hairline bg-surface/95 p-4 text-left shadow-[0_18px_40px_rgba(19,21,17,0.22)] backdrop-blur-xl">
        <div className="eyebrow-label text-terracotta">{plot.plotNumber}</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-ink">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">Size</div>
            <div>{plot.sizeSqYd} sq yd</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">Facing</div>
            <div className="capitalize">{plot.facing.replace('-', ' ')}</div>
          </div>
          <div className="col-span-2">
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">Status</div>
            <div className={plot.status === 'available' ? 'text-green' : 'text-ink-muted'}>
              {STATUS_LABEL[plot.status]}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
