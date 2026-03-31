export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'on-time' | 'delayed' | 'at-risk' | 'delivered';
  riskScore: number;
  eta: string;
  carrier: string;
  progress: number;
}

export interface Alert {
  id: string;
  type: 'weather' | 'port' | 'carrier' | 'demand';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedShipments: number;
  source: string;
  timestamp: string;
  action?: string;
}

export interface CascadePrediction {
  id: string;
  originShipment: string;
  dependentShipments: string[];
  timeline: {
    hours24: number;
    hours48: number;
    hours72: number;
  };
  impact: {
    warehousesAffected: number;
    projectedStockouts: number;
    estimatedLoss: number;
  };
}

export interface RouteOption {
  id: string;
  name: string;
  cost: number;
  duration: number;
  riskScore: number;
  distance: number;
  waypoints: string[];
  isOptimal?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
