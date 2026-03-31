import { RouteOption } from '../types';

export const mockRoutes: RouteOption[] = [
  {
    id: 'ROUTE-001',
    name: 'Current Route (Shanghai → LA)',
    cost: 8500,
    duration: 12,
    riskScore: 68,
    distance: 7285,
    waypoints: ['Shanghai', 'Hong Kong', 'Singapore', 'Suez Canal', 'Los Angeles'],
    isOptimal: false,
  },
  {
    id: 'ROUTE-002',
    name: 'Cost-Optimized Alternative',
    cost: 6200,
    duration: 14.5,
    riskScore: 45,
    distance: 8120,
    waypoints: ['Shanghai', 'Busan', 'Long Beach', 'Los Angeles'],
    isOptimal: true,
  },
  {
    id: 'ROUTE-003',
    name: 'Speed-Optimized Alternative',
    cost: 12800,
    duration: 10.5,
    riskScore: 72,
    distance: 6950,
    waypoints: ['Shanghai', 'Port Said', 'Rotterdam', 'Los Angeles'],
    isOptimal: false,
  },
  {
    id: 'ROUTE-004',
    name: 'Risk-Minimized Route',
    cost: 9100,
    duration: 13.2,
    riskScore: 28,
    distance: 7820,
    waypoints: ['Shanghai', 'Los Angeles (Direct - Air-Bridge)'],
    isOptimal: false,
  },
];
