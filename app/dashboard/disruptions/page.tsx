'use client';

import { Card } from '@/components/ui/card';
import { mockAlerts } from '@/lib/mock-data/alerts';
import { Alert } from '@/lib/types';
import { AlertCircle, Cloud, Anchor, Truck, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function DisruptionsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="h-5 w-5" />;
      case 'port':
        return <Anchor className="h-5 w-5" />;
      case 'carrier':
        return <Truck className="h-5 w-5" />;
      case 'demand':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500 bg-red-900/10';
      case 'medium':
        return 'border-l-orange-500 bg-orange-900/10';
      case 'low':
        return 'border-l-blue-500 bg-blue-900/10';
      default:
        return 'border-l-gray-500 bg-gray-900/10';
    }
  };

  const filteredAlerts =
    selectedSeverity === 'all'
      ? mockAlerts
      : mockAlerts.filter((a) => a.severity === selectedSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disruption Detection</h1>
        <p className="text-muted-foreground mt-1">
          Real-time alerts and disruption analysis across your supply chain
        </p>
      </div>

      {/* Severity Filter */}
      <div className="flex gap-2">
        {['all', 'high', 'medium', 'low'].map((severity) => (
          <button
            key={severity}
            onClick={() => setSelectedSeverity(severity)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedSeverity === severity
                ? 'bg-accent text-accent-foreground'
                : 'bg-card border border-border text-foreground hover:border-accent'
            }`}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 border-card p-6 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex gap-4">
              <div className="text-accent mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {alert.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {alert.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      alert.severity === 'high'
                        ? 'bg-red-900/40 text-red-400'
                        : alert.severity === 'medium'
                          ? 'bg-orange-900/40 text-orange-400'
                          : 'bg-blue-900/40 text-blue-400'
                    }`}
                  >
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs">AFFECTED SHIPMENTS</p>
                    <p className="text-2xl font-bold text-accent mt-1">
                      {alert.affectedShipments}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">SOURCE</p>
                    <p className="text-foreground font-medium mt-1">{alert.source}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">REPORTED</p>
                    <p className="text-foreground font-medium mt-1">{alert.timestamp}</p>
                  </div>
                </div>

                {alert.action && (
                  <div className="bg-accent/10 border-l-2 border-l-accent mt-4 p-3 rounded">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Recommended Action: </span>
                      {alert.action}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="bg-card border-border p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground mt-4">No alerts found for this severity level</p>
        </Card>
      )}
    </div>
  );
}
