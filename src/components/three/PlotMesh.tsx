'use client';

import { useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { Plot } from '@/lib/masterplan/types';

const STATUS_COLOR: Record<Plot['status'], string> = {
  available: '#388e3c',
  reserved: '#d84315',
  sold: '#8a8a82',
};

interface PlotMeshProps {
  plot: Plot;
}

export function PlotMesh({ plot }: PlotMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const isHovered = useMasterplanStore((s) => s.hoveredPlotId === plot.id);
  const isSelected = useMasterplanStore((s) => s.selectedPlotId === plot.id);
  const isHighlighted = useMasterplanStore((s) => s.highlightedPlotIds.includes(plot.id));
  const setHoveredPlot = useMasterplanStore((s) => s.setHoveredPlot);
  const setSelectedPlot = useMasterplanStore((s) => s.setSelectedPlot);

  const footprint = useMemo(() => {
    const t = Math.min(Math.max((plot.sizeSqYd - 120) / 60, 0), 1);
    return 0.9 + t * 0.5;
  }, [plot.sizeSqYd]);

  const baseColor = useMemo(() => new THREE.Color(STATUS_COLOR[plot.status]), [plot.status]);
  const active = isHovered || isSelected || isHighlighted;

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const targetY = active ? 0.16 : 0.05;
    mesh.position.y += (targetY - mesh.position.y) * 0.15;
  });

  const [x, z] = plot.position;

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredPlot(plot.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredPlot(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedPlot(plot.id);
  };

  return (
    <RoundedBox
      ref={meshRef}
      args={[footprint, 0.1, footprint]}
      radius={0.05}
      smoothness={2}
      position={[x, 0.05, z]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={active ? 0.9 : 0.25}
        transparent
        opacity={plot.status === 'sold' ? 0.5 : active ? 0.95 : 0.7}
        roughness={0.4}
        metalness={0.15}
      />
    </RoundedBox>
  );
}
