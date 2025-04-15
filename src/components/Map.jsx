'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the icon
const icon = L.icon({
    iconUrl: '/images/marker-icon.svg',
    shadowUrl: '/images/marker-shadow.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Default center coordinates (India)
const defaultCenter = [20.5937, 78.9629];

// LocationMarker component for handling clicks
function LocationMarker({ initialPosition, onLocationSelect }) {
    const [position, setPosition] = useState(defaultCenter);

    useEffect(() => {
        if (initialPosition && Array.isArray(initialPosition) && initialPosition.length === 2) {
            const [lat, lng] = initialPosition;
            if (typeof lat === 'number' && typeof lng === 'number') {
                setPosition([lat, lng]);
            }
        }
    }, [initialPosition]);

    const map = useMapEvents({
        click(e) {
            const newPosition = [e.latlng.lat, e.latlng.lng];
            setPosition(newPosition);
            if (onLocationSelect) {
                onLocationSelect(newPosition);
            }
        },
    });

    return (
        <Marker position={position} icon={icon}>
            <Popup>Selected Location</Popup>
        </Marker>
    );
}

export default function Map({ initialPosition, markers = [], onLocationSelect }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
    }

    // Ensure initialPosition is valid, otherwise use default
    let center = defaultCenter;
    if (initialPosition && Array.isArray(initialPosition) && initialPosition.length === 2) {
        const [lat, lng] = initialPosition;
        if (typeof lat === 'number' && typeof lng === 'number') {
            center = [lat, lng];
        }
    }

    // Filter out invalid markers
    const validMarkers = markers.filter(marker => {
        if (!marker || !marker.coordinates || !Array.isArray(marker.coordinates) || marker.coordinates.length !== 2) {
            return false;
        }
        const [lat, lng] = marker.coordinates;
        return typeof lat === 'number' && typeof lng === 'number';
    });

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker initialPosition={initialPosition} onLocationSelect={onLocationSelect} />
            {validMarkers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={marker.coordinates}
                    icon={icon}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-lg">{marker.name}</h3>
                            {marker.description && <p className="text-sm text-gray-600">{marker.description}</p>}
                            {marker.status && (
                                <p className="text-sm mt-1">
                                    Status: <span className={`font-medium ${
                                        marker.status === 'active' ? 'text-green-600' :
                                        marker.status === 'inactive' ? 'text-red-600' :
                                        'text-yellow-600'
                                    }`}>{marker.status}</span>
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Lat: {marker.coordinates[0].toFixed(6)}, Lng: {marker.coordinates[1].toFixed(6)}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
} 