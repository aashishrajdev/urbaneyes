'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker position={position}>
        </Marker>
    ) : null;
}

export default function MapPage() {
    const router = useRouter();
    const [position, setPosition] = useState(null);
    const [cameraData, setCameraData] = useState(null);

    useEffect(() => {
        // Get the camera data from localStorage
        const data = localStorage.getItem('cameraData');
        if (data) {
            setCameraData(JSON.parse(data));
        }
    }, []);

    const handleSubmit = async () => {
        if (!position) {
            alert('Please select a location on the map');
            return;
        }

        try {
            // Combine the camera data with the selected coordinates
            const finalData = {
                ...cameraData,
                coordinates: {
                    latitude: position[0],
                    longitude: position[1]
                }
            };

            // Here we'll add the database connection logic later
            // For now, we'll just store the complete data in localStorage
            localStorage.setItem('completeCameraData', JSON.stringify(finalData));
            
            // Redirect back to the main page or wherever needed
            router.push('/');
        } catch (error) {
            alert('Failed to save location data. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Camera Location</h2>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <p className="text-gray-600 mb-2">Click on the map to select the camera location</p>
                    {position && (
                        <p className="text-sm text-gray-600">
                            Selected coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
                        </p>
                    )}
                </div>
                
                <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-md mb-4">
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
                    </MapContainer>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Location
                </button>
            </div>
        </div>
    );
} 