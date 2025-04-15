'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({});

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await fetch('/api/cameras');
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch cameras');
      }

      setCameras(data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cameras:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cameraId) => {
    if (!confirm('Are you sure you want to delete this camera?')) {
      return;
    }

    setDeleteStatus(prev => ({ ...prev, [cameraId]: 'deleting' }));

    try {
      const response = await fetch(`/api/cameras/${cameraId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete camera');
      }

      // Remove the camera from the state
      setCameras(prev => prev.filter(camera => camera._id !== cameraId));
      setDeleteStatus(prev => ({ ...prev, [cameraId]: 'success' }));
    } catch (err) {
      console.error('Error deleting camera:', err);
      setDeleteStatus(prev => ({ ...prev, [cameraId]: 'error' }));
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Camera Dashboard</h1>
          <Link
            href="/add"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Camera
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {cameras.map((camera) => {
              const coordinates = camera.location?.coordinates || [];
              const [longitude, latitude] = coordinates;
              
              return (
                <li key={camera._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Link href={`/cameras/${camera._id}`} className="text-sm font-medium text-indigo-600 truncate hover:text-indigo-900">
                          {camera.name}
                        </Link>
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          camera.status === 'active' ? 'bg-green-100 text-green-800' :
                          camera.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {camera.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/cameras/${camera._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(camera._id)}
                          disabled={deleteStatus[camera._id] === 'deleting'}
                          className={`text-red-600 hover:text-red-900 ${
                            deleteStatus[camera._id] === 'deleting' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {deleteStatus[camera._id] === 'deleting' ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {camera.description || 'No description'}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {latitude && longitude ? (
                          <p>
                            Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                          </p>
                        ) : (
                          <p>Location: Not set</p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
} 