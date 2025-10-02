'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  EyeIcon, 
  TrashIcon, 
  MapPinIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

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

      setCameras(prev => prev.filter(camera => camera._id !== cameraId));
      setDeleteStatus(prev => ({ ...prev, [cameraId]: 'success' }));
    } catch (err) {
      console.error('Error deleting camera:', err);
      setDeleteStatus(prev => ({ ...prev, [cameraId]: 'error' }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'inactive':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'maintenance':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container-page">
          <div className="card card-padding">
            <div className="space-y-4">
              <div className="loading-shimmer h-8 w-1/3 rounded-lg"></div>
              <div className="loading-shimmer h-4 w-1/2 rounded-lg"></div>
              <div className="loading-shimmer h-4 w-2/3 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container-page">
          <div className="card card-padding border-red-200 bg-red-50">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error Loading Cameras</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeCameras = cameras.filter(c => c.status === 'active').length;
  const inactiveCameras = cameras.filter(c => c.status === 'inactive').length;
  const maintenanceCameras = cameras.filter(c => c.status === 'maintenance').length;

  return (
    <div className="min-h-screen py-12">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="section-title mb-2">Camera Dashboard</h1>
            <p className="section-subtitle">Monitor and manage your surveillance network</p>
          </div>
          <Link href="/add" className="btn-primary mt-4 lg:mt-0">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Camera
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Cameras</p>
                <p className="text-2xl font-bold text-slate-900">{cameras.length}</p>
              </div>
              <VideoCameraIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCameras}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{inactiveCameras}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceCameras}</p>
              </div>
              <ClockIcon className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Cameras Grid */}
        {cameras.length === 0 ? (
          <div className="card card-padding text-center py-16">
            <VideoCameraIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Cameras Found</h3>
            <p className="text-slate-600 mb-6">Get started by adding your first camera to the system.</p>
            <Link href="/add" className="btn-primary">
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Your First Camera
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cameras.map((camera, index) => {
              const coordinates = camera.location?.coordinates || [];
              const [longitude, latitude] = coordinates;
              
              return (
                <div key={camera._id} className="card card-padding group hover:scale-105 transition-all duration-300 scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <VideoCameraIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          <Link href={`/cameras/${camera._id}`}>
                            {camera.name}
                          </Link>
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(camera.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(camera.status)}`}>
                            {camera.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {camera.description || 'No description available'}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {latitude && longitude ? (
                        <span>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
                      ) : (
                        <span>Location not set</span>
                      )}
                    </div>
                    {camera.resolution && (
                      <div className="flex items-center text-sm text-slate-500">
                        <span className="w-4 h-4 mr-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        </span>
                        <span>{camera.resolution}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <Link
                      href={`/cameras/${camera._id}`}
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(camera._id)}
                      disabled={deleteStatus[camera._id] === 'deleting'}
                      className={`text-red-600 hover:text-red-800 transition-colors ${
                        deleteStatus[camera._id] === 'deleting' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {deleteStatus[camera._id] === 'deleting' ? (
                        <ClockIcon className="w-4 h-4 animate-spin" />
                      ) : (
                        <TrashIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 