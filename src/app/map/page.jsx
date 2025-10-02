"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  PlusIcon, 
  MapIcon, 
  EyeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  VideoCameraIcon
} from "@heroicons/react/24/outline";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-2xl">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <MapIcon className="w-8 h-8 text-white" />
        </div>
        <p className="text-slate-600 font-medium">Loading interactive map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch("/api/map-test");
        const data = await response.json();

        if (data.success) {
          setCameras(data.data);
        } else {
          setError(data.message || "Failed to fetch cameras");
        }
      } catch (err) {
        setError("Failed to fetch cameras: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
      case 'maintenance':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="w-4 h-4 text-gray-500" />;
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
              <div className="loading-shimmer h-[600px] w-full rounded-2xl"></div>
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
                <h3 className="text-lg font-semibold text-red-800">Error Loading Map</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeCameras = cameras.filter(c => c.status === 'active').length;
  const totalCameras = cameras.length;

  return (
    <div className="min-h-screen py-12">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="section-title mb-2">Live Camera Map</h1>
            <p className="section-subtitle">Real-time surveillance network overview</p>
          </div>
          <Link href="/add" className="btn-primary mt-4 lg:mt-0">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Camera
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Cameras</p>
                <p className="text-2xl font-bold text-slate-900">{totalCameras}</p>
              </div>
              <VideoCameraIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Cameras</p>
                <p className="text-2xl font-bold text-green-600">{activeCameras}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="card card-padding">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Coverage Area</p>
                <p className="text-2xl font-bold text-purple-600">2.5 km²</p>
              </div>
              <MapIcon className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Interactive Map</h3>
                <p className="text-sm text-slate-600">Click on markers to view camera details</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Inactive</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Maintenance</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[600px] w-full">
            <Map 
              markers={cameras} 
              initialPosition={cameras.length > 0 ? cameras[0].coordinates : [20.5937, 78.9629]}
              zoom={cameras.length > 0 ? 10 : 6}
            />
          </div>
        </div>

        {/* Camera List */}
        {cameras.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Camera Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cameras.slice(0, 6).map((camera, index) => (
                <div key={camera.id || index} className="card card-padding scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <VideoCameraIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{camera.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(camera.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(camera.status)}`}>
                          {camera.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {camera.coordinates && (
                    <p className="text-sm text-slate-600">
                      {camera.coordinates[0].toFixed(4)}, {camera.coordinates[1].toFixed(4)}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {cameras.length > 6 && (
              <div className="text-center mt-6">
                <Link href="/dashboard" className="btn-secondary">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View All Cameras
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
