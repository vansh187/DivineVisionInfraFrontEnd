import type { Plot } from '@/lib/masterplan/types';

// Two rows flanking a 24m spine road (matches the journey-stop copy), entrance
// at z=0. Representative subset of the real 369-plot layout — swap for
// survey data later without touching any component.
export const opsDivineGreensPlots: Plot[] = [
  { id: 'odg-a1', plotNumber: 'A-101', sizeSqYd: 125, facing: 'east', status: 'available', tags: ['near-entrance'], position: [-3.2, 0] },
  { id: 'odg-a2', plotNumber: 'A-102', sizeSqYd: 135, facing: 'east', status: 'available', tags: ['near-entrance'], position: [-3.2, 2.2] },
  { id: 'odg-a3', plotNumber: 'A-103', sizeSqYd: 150, facing: 'east', status: 'available', tags: ['park-facing'], position: [-3.2, 4.4] },
  { id: 'odg-a4', plotNumber: 'A-104', sizeSqYd: 150, facing: 'east', status: 'sold', tags: ['park-facing'], position: [-3.2, 6.6] },
  { id: 'odg-a5', plotNumber: 'A-105', sizeSqYd: 160, facing: 'east', status: 'available', tags: [], position: [-3.2, 8.8] },
  { id: 'odg-a6', plotNumber: 'A-106', sizeSqYd: 160, facing: 'east', status: 'reserved', tags: [], position: [-3.2, 11] },
  { id: 'odg-a7', plotNumber: 'A-107', sizeSqYd: 180, facing: 'north-east', status: 'available', tags: ['corner'], position: [-3.2, 13.2] },
  { id: 'odg-a8', plotNumber: 'A-108', sizeSqYd: 180, facing: 'north-east', status: 'available', tags: ['corner', 'club-facing'], position: [-3.2, 15.4] },

  { id: 'odg-b1', plotNumber: 'B-101', sizeSqYd: 125, facing: 'west', status: 'available', tags: ['near-entrance'], position: [3.2, 0] },
  { id: 'odg-b2', plotNumber: 'B-102', sizeSqYd: 130, facing: 'west', status: 'available', tags: ['near-entrance'], position: [3.2, 2.2] },
  { id: 'odg-b3', plotNumber: 'B-103', sizeSqYd: 145, facing: 'west', status: 'reserved', tags: [], position: [3.2, 4.4] },
  { id: 'odg-b4', plotNumber: 'B-104', sizeSqYd: 145, facing: 'west', status: 'available', tags: [], position: [3.2, 6.6] },
  { id: 'odg-b5', plotNumber: 'B-105', sizeSqYd: 160, facing: 'west', status: 'available', tags: ['park-facing'], position: [3.2, 8.8] },
  { id: 'odg-b6', plotNumber: 'B-106', sizeSqYd: 165, facing: 'west', status: 'sold', tags: ['park-facing'], position: [3.2, 11] },
  { id: 'odg-b7', plotNumber: 'B-107', sizeSqYd: 175, facing: 'north-west', status: 'available', tags: ['corner'], position: [3.2, 13.2] },
  { id: 'odg-b8', plotNumber: 'B-108', sizeSqYd: 180, facing: 'north-west', status: 'available', tags: ['corner', 'club-facing'], position: [3.2, 15.4] },
];
