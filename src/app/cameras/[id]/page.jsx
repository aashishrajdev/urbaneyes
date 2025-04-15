'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the Map component
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
});

export default function CameraDetails() {
    const params = useParams();
    const [camera, setCamera] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCamera = async () => {
            try {
                const response = await fetch(`/api/cameras/${params.id}`);
                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch camera details');
                }

                console.log('Fetched camera data:', data.data);
                setCamera(data.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching camera:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCamera();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Extract coordinates from the camera location
    const coordinates = camera.location?.coordinates || [];
    // Note: MongoDB stores coordinates as [longitude, latitude]
    const [longitude, latitude] = coordinates;

    // Check if we have valid coordinates
    const hasValidLocation = latitude && longitude && 
                           typeof latitude === 'number' && 
                           typeof longitude === 'number' &&
                           !isNaN(latitude) && 
                           !isNaN(longitude);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Camera Details</h1>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{camera.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Camera details and location information.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{camera.description || 'No description available'}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Resolution</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{camera.resolution}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Vision Range</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{camera.visionRange} meters</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        camera.status === 'active' ? 'bg-green-100 text-green-800' :
                                        camera.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {camera.status}
                                    </span>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Location</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {hasValidLocation ? (
                                        <div>
                                            <div className="mb-4">
                                                <p className="font-medium">Coordinates:</p>
                                                <p>Latitude: {latitude.toFixed(6)}</p>
                                                <p>Longitude: {longitude.toFixed(6)}</p>
                                            </div>
                                            <div className="mt-4 h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
                                                <Map 
                                                    initialPosition={[latitude, longitude]}
                                                    markers={[{ 
                                                        id: camera._id, 
                                                        coordinates: [latitude, longitude],
                                                        name: camera.name,
                                                        status: camera.status
                                                    }]}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-yellow-600">
                                            <p>Location not set</p>
                                            <p className="text-sm mt-1">Please update the camera location in the edit page.</p>
                                            <div className="mt-4">
                                                <Link
                                                    href={`/edit/${camera._id}`}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Edit Camera
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
} 