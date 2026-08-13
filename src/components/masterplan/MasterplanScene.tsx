'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Preload } from '@react-three/drei';
import type { Township } from '@/lib/masterplan/types';
import { CameraRig } from '@/components/three/CameraRig';
import { PlotMesh } from '@/components/three/PlotMesh';
import { PlotOverlay } from '@/components/three/PlotOverlay';
import { useMasterplanStore } from '@/lib/store/masterplanStore';

interface MasterplanSceneProps {
  township: Township;
}

export function MasterplanScene({ township }: MasterplanSceneProps) {
  const setSelectedPlot = useMasterplanStore((s) => s.setSelectedPlot);
  const centerZ = township.bounds.depth / 2 - 1;

  const aerial = {
    eye: [0, township.bounds.depth * 0.85, centerZ + 0.001] as [number, number, number],
    target: [0, 0, centerZ] as [number, number, number],
  };

  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true }} performance={{ min: 0.5 }}>
      <PerspectiveCamera makeDefault position={aerial.eye} fov={45} />
      <ambientLight intensity={0.55} color="#f5f1e8" />
      <directionalLight position={[6, 10, 4]} intensity={0.9} color="#d4af37" />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, centerZ]}
        onClick={() => setSelectedPlot(null)}
      >
        <planeGeometry args={[township.bounds.width, township.bounds.depth + 4]} />
        <meshStandardMaterial color="#12161f" roughness={0.95} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, centerZ]}>
        <planeGeometry args={[2.6, township.bounds.depth + 2]} />
        <meshStandardMaterial color="#1b2030" roughness={0.85} />
      </mesh>

      {township.plots.map((plot) => (
        <PlotMesh key={plot.id} plot={plot} />
      ))}

      <PlotOverlay plots={township.plots} />

      <CameraRig plots={township.plots} aerial={aerial} />

      <Preload all />
    </Canvas>
  );
}
