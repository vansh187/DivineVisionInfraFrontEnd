'use client';

import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import type CameraControlsImpl from 'camera-controls';
import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { Plot } from '@/lib/masterplan/types';

interface AerialFraming {
  eye: [number, number, number];
  target: [number, number, number];
}

interface CameraRigProps {
  plots: Plot[];
  aerial: AerialFraming;
}

/**
 * Eased aerial <-> plot-level transitions driven entirely by
 * masterplanStore.selectedPlotId — the same store the AI assistant writes
 * to, so a scripted "fly to this plot" isn't a special code path.
 */
export function CameraRig({ plots, aerial }: CameraRigProps) {
  const controlsRef = useRef<CameraControlsImpl>(null);
  const selectedId = useMasterplanStore((s) => s.selectedPlotId);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (!selectedId) {
      controls.setLookAt(...aerial.eye, ...aerial.target, true);
      return;
    }

    const plot = plots.find((p) => p.id === selectedId);
    if (!plot) return;

    const [x, z] = plot.position;
    controls.setLookAt(x, 1.4, z + 2.4, x, 0.2, z, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <CameraControls
      ref={controlsRef}
      minPolarAngle={0.1}
      maxPolarAngle={Math.PI / 2.05}
      minDistance={2}
      maxDistance={16}
      dollyToCursor
    />
  );
}
