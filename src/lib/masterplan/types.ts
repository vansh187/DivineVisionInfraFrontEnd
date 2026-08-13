export type PlotStatus = 'available' | 'reserved' | 'sold';

export type PlotFacing =
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'north-east'
  | 'north-west'
  | 'south-east'
  | 'south-west';

export interface Plot {
  id: string;
  plotNumber: string;
  sizeSqYd: number;
  facing: PlotFacing;
  status: PlotStatus;
  /** Freeform spatial/feature tags — e.g. 'near-entrance', 'corner', 'park-facing'. Matched by the AI assistant. */
  tags: string[];
  /** World-space [x, z] position on the township ground plane. */
  position: [number, number];
}

export interface Township {
  slug: string;
  name: string;
  location: string;
  description: string;
  /** Half-width/depth of the ground plane, for camera framing and road geometry. */
  bounds: { width: number; depth: number };
  plots: Plot[];
}
