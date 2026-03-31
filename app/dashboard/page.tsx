"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockShipments } from "@/lib/mock-data/shipments";
import { mockAlerts } from "@/lib/mock-data/alerts";

export default function DashboardPage() {
  const router = useRouter();
  const [captainData, setCaptainData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("captainData");
    if (!data) { router.push("/"); return; }
    setCaptainData(JSON.parse(data));
  }, []);

  if (!captainData) return null;

  const activeShipments = mockShipments.filter(s => s.status !== 'delivered');
  const atRiskShipments = mockShipments.filter(s => s.status === 'at-risk' || s.status === 'delayed');
  const avgDelivery = (mockShipments.reduce((a, b) => a + (b.progress < 100 ? 11.2 : 0), 0) / activeShipments.length).toFixed(1);

  const statusColor = (status: string) => {
    if (status === 'on-time') return 'text-green-400';
    if (status === 'at-risk') return 'text-orange-400';
    if (status === 'delayed') return 'text-red-400';
    return 'text-blue-400';
  };

  const statusLabel = (status: string) => {
    if (status === 'on-time') return 'On Time';
    if (status === 'at-risk') return 'At Risk';
    if (status === 'delayed') return 'Delayed';
    return 'Delivered';
  };

  const severityColor = (severity: string) => {
    if (severity === 'high') return 'text-red-400 border-red-400/30 bg-red-400/5';
    if (severity === 'medium') return 'text-orange-400 border-orange-400/30 bg-orange-400/5';
    return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
  };

  const riskScores = mockShipments.map(s => s.riskScore);
  const avgRisk = Math.round(riskScores.reduce((a, b) => a + b, 0) / riskScores.length);
  const critical = mockShipments.filter(s => s.riskScore > 70).length;
  const high = mockShipments.filter(s => s.riskScore > 50 && s.riskScore <= 70).length;
  const medium = mockShipments.filter(s => s.riskScore > 30 && s.riskScore <= 50).length;
  const low = mockShipments.filter(s => s.riskScore <= 30).length;

  return (
    <div className="text-white space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome, Captain {captainData.captainName}</h2>
        <p className="text-gray-400 text-sm mt-1">{captainData.vesselName} · {captainData.cargoType} · {captainData.company}</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-sm">Active Shipments</p>
          <p className="text-3xl font-bold text-foreground mt-1">{activeShipments.length}</p>
          <p className="text-green-400 text-xs mt-1">↑ 12%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-sm">At-Risk Shipments</p>
          <p className="text-3xl font-bold text-foreground mt-1">{atRiskShipments.length}</p>
          <p className="text-red-400 text-xs mt-1">↓ 8%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-sm">Avg Delivery Time</p>
          <p className="text-3xl font-bold text-foreground mt-1">11.2 days</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-sm">System Health</p>
          <p className="text-3xl font-bold text-foreground mt-1">94%</p>
          <p className="text-green-400 text-xs mt-1">↑ 2%</p>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Shipments */}
        <div className="col-span-1 bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-1">Active Shipments</h3>
          <p className="text-muted-foreground text-xs mb-4">{mockShipments.length} total shipments in transit</p>
          <div className="space-y-4">
            {mockShipments.slice(0, 3).map(s => (
              <div key={s.id}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.origin} → {s.destination}</p>
                    <p className="text-xs text-muted-foreground">{s.id}</p>
                  </div>
                  <span className={`text-xs font-semibold ${statusColor(s.status)}`}>{statusLabel(s.status)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${s.status === 'on-time' ? 'bg-blue-500' : s.status === 'at-risk' ? 'bg-orange-500' : 'bg-red-500'}`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{s.progress}% complete</p>
                  <p className="text-xs text-muted-foreground">ETA: {s.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Alerts */}
        <div className="col-span-1 bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-1">Real-Time Alerts</h3>
          <p className="text-muted-foreground text-xs mb-4">{mockAlerts.length} active disruptions detected</p>
          <div className="space-y-3">
            {mockAlerts.slice(0, 3).map(a => (
              <div key={a.id} className={`border rounded-lg p-3 ${severityColor(a.severity)}`}>
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-xs">{a.affectedShipments} shipments affected</p>
                  <p className="text-xs text-muted-foreground">{a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="col-span-1 bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-1">Risk Analysis</h3>
          <p className="text-muted-foreground text-xs mb-4">Average risk score across all shipments</p>
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-orange-400 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-400">{avgRisk}</p>
                <p className="text-xs text-muted-foreground">Risk Score</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Critical', count: critical, color: 'bg-red-500' },
              { label: 'High', count: high, color: 'bg-orange-500' },
              { label: 'Medium', count: medium, color: 'bg-blue-500' },
              { label: 'Low', count: low, color: 'bg-green-500' },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-14">{r.label}</span>
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${r.color}`} style={{ width: `${(r.count / mockShipments.length) * 100}%` }} />
                </div>
                <span className="text-xs text-foreground w-4">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
