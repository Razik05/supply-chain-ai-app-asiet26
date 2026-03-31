'use client';

import { Card } from '@/components/ui/card';
import { Shipment } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { Progress } from '@/components/ui/progress';

interface ShipmentsOverviewProps {
  shipments: Shipment[];
}

export function ShipmentsOverview({ shipments }: ShipmentsOverviewProps) {
  const statusCounts = {
    'on-time': shipments.filter((s) => s.status === 'on-time').length,
    delayed: shipments.filter((s) => s.status === 'delayed').length,
    'at-risk': shipments.filter((s) => s.status === 'at-risk').length,
    delivered: shipments.filter((s) => s.status === 'delivered').length,
  };

  return (
    <Card className="bg-card border-border col-span-1 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Active Shipments</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {shipments.length} total shipments in transit
        </p>
      </div>

      <div className="space-y-4">
        {shipments.slice(0, 5).map((shipment) => (
          <div key={shipment.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {shipment.origin} → {shipment.destination}
                </p>
                <p className="text-muted-foreground text-xs">{shipment.id}</p>
              </div>
              <StatusBadge status={shipment.status} size="sm" />
            </div>
            <Progress value={shipment.progress} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{shipment.progress}% complete</span>
              <span>ETA: {shipment.eta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-border mt-6 border-t pt-4">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div>
            <p className="text-2xl font-bold text-green-400">{statusCounts['on-time']}</p>
            <p className="text-muted-foreground mt-1">On Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">{statusCounts.delayed}</p>
            <p className="text-muted-foreground mt-1">Delayed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">{statusCounts['at-risk']}</p>
            <p className="text-muted-foreground mt-1">At Risk</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">{statusCounts.delivered}</p>
            <p className="text-muted-foreground mt-1">Delivered</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
