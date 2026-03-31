'use client';

import { Card } from '@/components/ui/card';
import { mockCascades } from '@/lib/mock-data/cascades';
import { mockShipments } from '@/lib/mock-data/shipments';
import { Zap, AlertTriangle } from 'lucide-react';

export default function CascadesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cascade Prediction</h1>
        <p className="text-muted-foreground mt-1">
          Analyze cascading delays and dependent shipment impacts
        </p>
      </div>

      {/* Cascade Cards */}
      <div className="space-y-4">
        {mockCascades.map((cascade) => {
          const originShipment = mockShipments.find((s) => s.id === cascade.originShipment);

          return (
            <Card key={cascade.id} className="bg-card border-border border-l-4 border-l-accent p-6">
              <div className="flex gap-4">
                <div className="text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  {/* Origin Shipment */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-foreground">
                      Origin Shipment: {cascade.originShipment}
                    </h3>
                    {originShipment && (
                      <div className="text-muted-foreground mt-2 text-sm">
                        <p>{originShipment.origin} → {originShipment.destination}</p>
                        <p>Carrier: {originShipment.carrier}</p>
                      </div>
                    )}
                  </div>

                  {/* Timeline Impact */}
                  <div className="bg-muted/20 rounded-lg p-4 mb-6">
                    <p className="text-muted-foreground mb-4 text-sm font-semibold">
                      CASCADING IMPACT TIMELINE
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent">
                          {cascade.timeline.hours24}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Shipments Affected<br />in 24h
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-orange-400">
                          {cascade.timeline.hours48}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Shipments Affected<br />in 48h
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-400">
                          {cascade.timeline.hours72}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Shipments Affected<br />in 72h
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dependent Shipments */}
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-3 text-sm font-semibold">
                      DEPENDENT SHIPMENTS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cascade.dependentShipments.map((shipmentId) => (
                        <span
                          key={shipmentId}
                          className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {shipmentId}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground mb-4 text-sm font-semibold">
                      PROJECTED BUSINESS IMPACT
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-destructive/10 rounded p-3">
                        <p className="text-destructive text-2xl font-bold">
                          {cascade.impact.warehousesAffected}
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Warehouses Affected
                        </p>
                      </div>
                      <div className="bg-orange-900/30 rounded p-3">
                        <p className="text-orange-400 text-2xl font-bold">
                          {cascade.impact.projectedStockouts}
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Projected Stockouts
                        </p>
                      </div>
                      <div className="bg-accent/10 rounded p-3">
                        <p className="text-accent text-2xl font-bold">
                          ${(cascade.impact.estimatedLoss / 1000).toFixed(0)}K
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Estimated Loss
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {mockCascades.length === 0 && (
        <Card className="bg-card border-border p-12 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground mt-4">No cascade predictions at this time</p>
        </Card>
      )}
    </div>
  );
}
