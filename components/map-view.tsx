'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const waypointCoords: Record<string, [number, number]> = {
  'Shanghai': [31.2304, 121.4737],
  'Hong Kong': [22.3193, 114.1694],
  'Singapore': [1.3521, 103.8198],
  'Suez Canal': [30.4280, 32.3468],
  'Los Angeles': [33.7283, -118.2606],
  'Rotterdam': [51.9225, 4.4792],
  'Dubai': [25.2048, 55.2708],
  'Mumbai': [19.0760, 72.8777],
  'Cape of Good Hope': [-34.3568, 18.4740],
  'Panama Canal': [9.0800, -79.6800],
};

const shipIcon = L.divIcon({
  html: '🚢',
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function MapView({ route }: { route: any }) {
  const coords = route.waypoints
    .map((w: string) => waypointCoords[w])
    .filter(Boolean) as [number, number][];

  const center = coords[0] || [20, 100];
  const shipPosition = coords[Math.floor(coords.length / 2)] || center;

  return (
    <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {coords.length > 1 && <Polyline positions={coords} color="#f97316" weight={3} />}
      {coords.map((pos, idx) => (
        <Marker key={idx} position={pos}>
          <Popup>{route.waypoints[idx]}</Popup>
        </Marker>
      ))}
      <Marker position={shipPosition} icon={shipIcon}>
        <Popup>🚢 Ship is here</Popup>
      </Marker>
    </MapContainer>
  );
}
