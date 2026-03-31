'use client';

import { Card } from '@/components/ui/card';
import { Alert } from '@/lib/types';
import { AlertCircle, Cloud, Anchor, Truck, TrendingUp } from 'lucide-react';

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="h-4 w-4" />;
      case 'port':
        return <Anchor className="h-4 w-4" />;
      case 'carrier':
        return <Truck className="h-4 w-4" />;
      case 'demand':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/20 border-red-500/30 text-red-400';
      case 'medium':
        return 'bg-orange-900/20 border-orange-500/30 text-orange-400';
      case 'low':
        return 'bg-blue-900/20 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-900/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <Card className="bg-card border-border col-span-1 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Real-Time Alerts</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {alerts.length} active disruptions detected
        </p>
      </div>

      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={`border-l-2 border-l-accent rounded border p-3 ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {alert.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium">
                    {alert.affectedShipments} shipment{alert.affectedShipments !== 1 ? 's' : ''} affected
                  </span>
                  <span className="text-muted-foreground text-xs">{alert.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No active alerts</p>
        </div>
      )}
    </Card>
  );
}
