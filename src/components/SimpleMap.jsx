'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker({ initialPosition, onLocationSelect }) {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    },
  });

  return position ? (
    <Marker
      position={position}
      icon={icon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const m = e.target;
          const latlng = m.getLatLng();
          const next = [latlng.lat, latlng.lng];
          setPosition(next);
          onLocationSelect({ lat: latlng.lat, lng: latlng.lng });
        },
      }}
    >
      <Popup>
        Selected Location<br />
        Lat: {position[0].toFixed(6)}<br />
        Lng: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
}

function MapInvalidator() {
  const map = useMap();
  useEffect(() => {
    // Give the layout a tick to stabilize, then force Leaflet to recalc size
    const id = setTimeout(() => {
      map.invalidateSize();
    }, 0);
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', onResize);
    };
  }, [map]);
  return null;
}

export default function SimpleMap({ onLocationSelect, initialPosition = [20.5937, 78.9629], height = 400 }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      key={`${initialPosition[0]}-${initialPosition[1]}`}
      center={initialPosition}
      zoom={13}
      style={{ height, minHeight: height, width: '100%', cursor: 'crosshair' }}
      scrollWheelZoom={true}
    >
      <MapInvalidator />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {onLocationSelect && (
        <LocationMarker 
          initialPosition={initialPosition}
          onLocationSelect={onLocationSelect}
        />
      )}
    </MapContainer>
  );
} 