'use client';

import { useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { terrainVertexShader, terrainFragmentShader } from './shaders/terrain';

interface TerrainMeshProps {
  scrollProgressRef: RefObject<number>;
}

/**
 * Noise-displaced topography plane. Elevation and cursor reactivity happen
 * entirely on the GPU (vertex shader) — scroll progress and pointer are fed
 * in as uniforms each frame rather than triggering React re-renders.
 */
export function TerrainMesh({ scrollProgressRef }: TerrainMeshProps) {
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 },
      uColorBase: { value: new THREE.Color('#0b0e14') },
      uColorGlow: { value: new THREE.Color('#d4af37') },
    }),
    [],
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    mouseTarget.current.set(state.pointer.x, state.pointer.y);
    (uniforms.uMouse.value as THREE.Vector2).lerp(mouseTarget.current, 0.06);
    uniforms.uScrollProgress.value = scrollProgressRef.current ?? 0;
  });

  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -0.7, 0]}>
      <planeGeometry args={[8, 8, 220, 220]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
