"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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
    <Marker position={position} icon={icon}>
      <Popup>
        Selected Location
        <br />
        Lat: {position[0].toFixed(6)}
        <br />
        Lng: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
}

function Markers({ markers }) {
  return markers.map((marker, index) => (
    <Marker key={index} position={marker.position} icon={icon}>
      <Popup>
        <div dangerouslySetInnerHTML={{ __html: marker.popup }} />
      </Popup>
    </Marker>
  ));
}

export default function LeafletMap({
  onLocationSelect,
  initialPosition = [20.5937, 78.9629],
  markers = [],
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
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
      {markers.length > 0 && <Markers markers={markers} />}
    </MapContainer>
  );
}
