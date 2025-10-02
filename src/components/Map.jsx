"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Explicit marker icon (more reliable across environments)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

export default function Map({ markers = [], initialPosition = [20.5937, 78.9629], zoom = 13, height = 400 }) {
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Ensure map centers correctly and marker is visible when props change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const isValidPos = Array.isArray(initialPosition) && initialPosition.length === 2 &&
      typeof initialPosition[0] === 'number' && typeof initialPosition[1] === 'number';
    if (isValidPos) {
      map.setView(initialPosition, zoom, { animate: false });
      setTimeout(() => map.invalidateSize(), 0);
    }
    // Fit bounds to markers if available
    if (Array.isArray(markers) && markers.length > 1) {
      const latLngs = markers
        .map((m) => m?.coordinates)
        .filter((c) => Array.isArray(c) && c.length === 2 && typeof c[0] === 'number' && typeof c[1] === 'number');
      if (latLngs.length > 0) {
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [initialPosition, zoom, markers?.length]);

  if (!mounted) {
    return (
      <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full relative" style={{ height }}>
      <MapContainer
        key={`map-${Array.isArray(initialPosition)?initialPosition.join('-'):'center'}-${zoom}`}
        ref={mapRef}
        center={initialPosition}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
          // Center immediately to the given initial position
          if (Array.isArray(initialPosition) && initialPosition.length === 2) {
            map.setView(initialPosition, zoom);
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.coordinates} icon={icon}>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              {marker.name}
            </Tooltip>
            <Popup>
              <div>
                <h3>{marker.name}</h3>
                {marker.description && <p>{marker.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
        {markers.length === 0 && Array.isArray(initialPosition) && initialPosition.length === 2 && (
          <Marker position={initialPosition} icon={icon}>
            <Popup>
              <div>
                <h3>Selected Location</h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {/* Legend overlay */}
      <div className="absolute top-3 right-3 z-[1000]">
        <div className="backdrop-blur bg-white/80 border border-gray-200 shadow-sm rounded-md px-3 py-2 text-sm text-gray-700">
          <div className="font-medium">Cameras: {Array.isArray(markers) ? markers.length : 0}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-block w-2 h-3 bg-[#2A81CB] rounded-[2px]"></span>
            <span>Camera marker</span>
          </div>
        </div>
      </div>
    </div>
  );
}
