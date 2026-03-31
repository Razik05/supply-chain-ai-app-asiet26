'use client';

import { Card } from '@/components/ui/card';
import { Shipment } from '@/lib/types';

interface RiskMatrixProps {
  shipments: Shipment[];
}

export function RiskMatrix({ shipments }: RiskMatrixProps) {
  // Calculate risk distribution
  const riskDistribution = {
    critical: shipments.filter((s) => s.riskScore >= 70).length,
    high: shipments.filter((s) => s.riskScore >= 50 && s.riskScore < 70).length,
    medium: shipments.filter((s) => s.riskScore >= 25 && s.riskScore < 50).length,
    low: shipments.filter((s) => s.riskScore < 25).length,
  };

  const avgRiskScore =
    shipments.length > 0
      ? Math.round(
          shipments.reduce((sum, s) => sum + s.riskScore, 0) / shipments.length
        )
      : 0;

  return (
    <Card className="bg-card border-border col-span-1 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Risk Analysis</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Average risk score across all shipments
        </p>
      </div>

      <div className="mb-6 text-center">
        <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full border-4 border-accent/20 bg-gradient-to-b from-accent/10 to-transparent">
          <div className="text-center">
            <p className="text-4xl font-bold text-accent">{avgRiskScore}</p>
            <p className="text-muted-foreground text-xs mt-1">Risk Score</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-400">Critical</span>
            <span className="font-bold text-red-400">{riskDistribution.critical}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{
                width: `${(riskDistribution.critical / shipments.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-orange-400">High</span>
            <span className="font-bold text-orange-400">{riskDistribution.high}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-orange-500"
              style={{
                width: `${(riskDistribution.high / shipments.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-400">Medium</span>
            <span className="font-bold text-yellow-400">{riskDistribution.medium}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-yellow-500"
              style={{
                width: `${(riskDistribution.medium / shipments.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-400">Low</span>
            <span className="font-bold text-green-400">{riskDistribution.low}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${(riskDistribution.low / shipments.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
