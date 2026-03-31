import { CascadePrediction } from '../types';

export const mockCascades: CascadePrediction[] = [
  {
    id: 'CASCADE-001',
    originShipment: 'SHP-003',
    dependentShipments: ['SHP-008', 'SHP-012', 'SHP-015'],
    timeline: {
      hours24: 2,
      hours48: 5,
      hours72: 8,
    },
    impact: {
      warehousesAffected: 4,
      projectedStockouts: 12,
      estimatedLoss: 285000,
    },
  },
  {
    id: 'CASCADE-002',
    originShipment: 'SHP-002',
    dependentShipments: ['SHP-009', 'SHP-014'],
    timeline: {
      hours24: 1,
      hours48: 3,
      hours72: 6,
    },
    impact: {
      warehousesAffected: 2,
      projectedStockouts: 5,
      estimatedLoss: 145000,
    },
  },
  {
    id: 'CASCADE-003',
    originShipment: 'SHP-006',
    dependentShipments: ['SHP-011', 'SHP-016', 'SHP-018', 'SHP-020'],
    timeline: {
      hours24: 3,
      hours48: 7,
      hours72: 12,
    },
    impact: {
      warehousesAffected: 6,
      projectedStockouts: 18,
      estimatedLoss: 425000,
    },
  },
];
