'use client';

import { Card } from '@/components/ui/card';
import { mockRoutes } from '@/lib/mock-data/routes';
import { Navigation, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map-view'), { ssr: false });

export default function RoutesPage() {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const [mapRoute, setMapRoute] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  if (mapRoute) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setMapRoute(null)}
          className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          ← Back to Routes
        </button>
        <h2 className="text-2xl font-bold text-foreground">{mapRoute.name}</h2>
        <p className="text-muted-foreground">Live ship tracking — {mapRoute.waypoints[0]} → {mapRoute.waypoints[mapRoute.waypoints.length - 1]}</p>
        <div className="rounded-xl overflow-hidden border border-border" style={{ height: '600px' }}>
          <MapView route={mapRoute} />
        </div>
      </div>
    );
  }

  const currentRoute = mockRoutes[0];
  const alternativeRoutes = mockRoutes.slice(1);
  const activeRoute = selectedRoute
    ? mockRoutes.find(r => r.id === selectedRoute) || currentRoute
    : currentRoute;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Route Optimization</h1>
        <p className="text-muted-foreground mt-1">Compare alternative routes and their trade-offs</p>
      </div>

      {/* Current / Active Route */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Current Route</h2>
        <Card
          className="border-border p-6 cursor-pointer transition-all border-2 border-blue-500 bg-blue-500/5"
          onClick={() => setExpandedRoute(expandedRoute === activeRoute.id ? null : activeRoute.id)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{activeRoute.name}</h3>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">Active</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Cost</p>
                    <p className="text-foreground font-bold">${activeRoute.cost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="text-foreground font-bold">{activeRoute.duration} days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Risk Score</p>
                    <p className={`font-bold ${activeRoute.riskScore > 60 ? 'text-red-400' : activeRoute.riskScore > 40 ? 'text-orange-400' : 'text-green-400'}`}>
                      {activeRoute.riskScore}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Distance</p>
                    <p className="text-foreground font-bold">{activeRoute.distance} nm</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-accent transition-colors">
              {expandedRoute === activeRoute.id ? '▼' : '▶'}
            </button>
          </div>

          {expandedRoute === activeRoute.id && (
            <div className="border-t border-border mt-6 pt-6">
              <h4 className="font-semibold text-foreground mb-4">Route Waypoints</h4>
              <div className="space-y-2">
                {activeRoute.waypoints.map((waypoint: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">{idx + 1}</div>
                    <span className="text-foreground">{waypoint}</span>
                    {idx < activeRoute.waypoints.length - 1 && (
                      <span className="text-muted-foreground text-sm ml-auto">{Math.round(activeRoute.distance / (activeRoute.waypoints.length - 1))} nm</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={(e) => { e.stopPropagation(); setMapRoute(activeRoute); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  🗺️ View Map
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Alternative Routes */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Alternative Routes</h2>
        <div className="space-y-4">
          {alternativeRoutes.map((route) => (
            <Card
              key={route.id}
              className={`border-border p-6 cursor-pointer transition-all ${route.isOptimal ? 'border-2 border-accent bg-accent/5' : ''}`}
              onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{route.name}</h3>
                    {route.isOptimal && (
                      <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-semibold">Recommended</span>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Cost</p>
                        <p className="text-foreground font-bold">${route.cost.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Duration</p>
                        <p className="text-foreground font-bold">{route.duration} days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Risk Score</p>
                        <p className={`font-bold ${route.riskScore > 60 ? 'text-red-400' : route.riskScore > 40 ? 'text-orange-400' : 'text-green-400'}`}>
                          {route.riskScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Distance</p>
                        <p className="text-foreground font-bold">{route.distance} nm</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  {expandedRoute === route.id ? '▼' : '▶'}
                </button>
              </div>

              {expandedRoute === route.id && (
                <div className="border-t border-border mt-6 pt-6">
                  <h4 className="font-semibold text-foreground mb-4">Route Waypoints</h4>
                  <div className="space-y-2">
                    {route.waypoints.map((waypoint: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">{idx + 1}</div>
                        <span className="text-foreground">{waypoint}</span>
                        {idx < route.waypoints.length - 1 && (
                          <span className="text-muted-foreground text-sm ml-auto">{Math.round(route.distance / (route.waypoints.length - 1))} nm</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedRoute(route.id); setExpandedRoute(null); }}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Select Route
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMapRoute(route); }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      🗺️ View Map
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-accent/10 border-2 border-accent p-6">
        <h3 className="text-lg font-semibold text-accent mb-2">AI Recommendation</h3>
        <p className="text-foreground">
          Based on current conditions, the Cost-Optimized Alternative offers the best
          value with a {((1 - 6200 / 8500) * 100).toFixed(0)}% cost savings and manageable 14.5-day transit time.
          Weather patterns suggest this route will avoid disruptions in the Indian Ocean.
        </p>
      </Card>
    </div>
  );
}
