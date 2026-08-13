import type { Plot } from '@/lib/masterplan/types';

// DDJAY plot sizes (120–180 sq yd) per the journey-stop copy. Representative
// subset arranged around the internal loop road, entrance at z=0.
export const suraksaEnclavePlots: Plot[] = [
  { id: 'se-a1', plotNumber: 'SE-01', sizeSqYd: 120, facing: 'east', status: 'available', tags: ['near-entrance'], position: [-2.8, 0] },
  { id: 'se-a2', plotNumber: 'SE-02', sizeSqYd: 120, facing: 'east', status: 'available', tags: ['near-entrance'], position: [-2.8, 2] },
  { id: 'se-a3', plotNumber: 'SE-03', sizeSqYd: 135, facing: 'east', status: 'sold', tags: [], position: [-2.8, 4] },
  { id: 'se-a4', plotNumber: 'SE-04', sizeSqYd: 150, facing: 'east', status: 'available', tags: ['park-facing'], position: [-2.8, 6] },
  { id: 'se-a5', plotNumber: 'SE-05', sizeSqYd: 150, facing: 'north-east', status: 'available', tags: ['corner'], position: [-2.8, 8] },
  { id: 'se-a6', plotNumber: 'SE-06', sizeSqYd: 165, facing: 'north-east', status: 'reserved', tags: ['corner'], position: [-2.8, 10] },

  { id: 'se-b1', plotNumber: 'SE-07', sizeSqYd: 120, facing: 'west', status: 'available', tags: ['near-entrance'], position: [2.8, 0] },
  { id: 'se-b2', plotNumber: 'SE-08', sizeSqYd: 130, facing: 'west', status: 'reserved', tags: ['near-entrance'], position: [2.8, 2] },
  { id: 'se-b3', plotNumber: 'SE-09', sizeSqYd: 140, facing: 'west', status: 'available', tags: [], position: [2.8, 4] },
  { id: 'se-b4', plotNumber: 'SE-10', sizeSqYd: 155, facing: 'west', status: 'available', tags: ['park-facing'], position: [2.8, 6] },
  { id: 'se-b5', plotNumber: 'SE-11', sizeSqYd: 165, facing: 'north-west', status: 'sold', tags: ['corner'], position: [2.8, 8] },
  { id: 'se-b6', plotNumber: 'SE-12', sizeSqYd: 180, facing: 'north-west', status: 'available', tags: ['corner'], position: [2.8, 10] },
];
