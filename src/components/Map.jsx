'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

    return <Marker position={position} icon={icon} />;
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
                />
            ))}
        </MapContainer>
    );
} 