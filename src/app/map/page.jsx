'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Selected Location</Popup>
        </Marker>
    );
}

export default function MapPage() {
    const [position, setPosition] = useState(null);
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const response = await fetch('/api/map-test');
                const data = await response.json();
                if (data.cameras) {
                    setCameras(data.cameras);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load cameras: ' + err.message);
                setLoading(false);
            }
        };

        fetchCameras();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Camera Map</h1>
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Click on the map to select a location. Current position: {position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : 'Not selected'}
                    </p>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
            </div>
            
            <div className="flex-1 relative">
                <MapContainer
                    center={[20.5937, 78.9629]} // Center of India
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={position} setPosition={setPosition} />
                    
                    {cameras.map((camera) => (
                        <Marker
                            key={camera.id}
                            position={[camera.coordinates.latitude, camera.coordinates.longitude]}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold">{camera.name}</h3>
                                    <p>{camera.location}</p>
                                    <p className={`text-sm ${camera.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                        Status: {camera.status}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="text-white">Loading cameras...</div>
                    </div>
                )}
            </div>
        </div>
    );
} 