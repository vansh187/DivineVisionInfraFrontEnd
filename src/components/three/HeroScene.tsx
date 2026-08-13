'use client';

import type { RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Preload } from '@react-three/drei';
import { TerrainMesh } from './TerrainMesh';

interface HeroSceneProps {
  scrollProgressRef: RefObject<number>;
}

export function HeroScene({ scrollProgressRef }: HeroSceneProps) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} performance={{ min: 0.5 }}>
      <PerspectiveCamera makeDefault position={[0, 1.6, 4.2]} fov={42} />
      <TerrainMesh scrollProgressRef={scrollProgressRef} />
      <Preload all />
    </Canvas>
  );
}
