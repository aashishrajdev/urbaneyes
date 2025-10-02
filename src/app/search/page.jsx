'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  VideoCameraIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch('/api/cameras');
        const data = await response.json();
        const list = Array.isArray(data?.data) ? data.data : [];
        setCameras(list);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const query = searchQuery.toLowerCase();
  const safeCameras = Array.isArray(cameras) ? cameras : [];
  
  const filteredCameras = safeCameras.filter((camera) => {
    const name = String(camera?.name || '').toLowerCase();
    const description = String(camera?.description || '').toLowerCase();
    const coords = Array.isArray(camera?.location?.coordinates)
      ? camera.location.coordinates.join(',')
      : '';
    
    const matchesSearch = (
      name.includes(query) ||
      description.includes(query) ||
      coords.includes(query)
    );
    
    const matchesStatus = statusFilter === 'all' || camera.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="min-h-screen py-12">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Search Cameras</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Find and explore cameras by name, location, or status across your surveillance network
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card card-padding mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, description, or coordinates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-slate-600">
            {loading ? (
              <span>Loading cameras...</span>
            ) : (
              <span>
                {filteredCameras.length} camera{filteredCameras.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
                {statusFilter !== 'all' && ` with status "${statusFilter}"`}
              </span>
            )}
          </div>
          {filteredCameras.length > 0 && (
            <Link href="/map" className="btn-secondary">
              <MapPinIcon className="w-4 h-4 mr-2" />
              View on Map
            </Link>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card card-padding">
                <div className="space-y-4">
                  <div className="loading-shimmer h-6 w-3/4 rounded-lg"></div>
                  <div className="loading-shimmer h-4 w-1/2 rounded-lg"></div>
                  <div className="loading-shimmer h-4 w-2/3 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCameras.length === 0 ? (
          <div className="card card-padding text-center py-16">
            <MagnifyingGlassIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Cameras Found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'No cameras are currently registered in the system.'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link href="/add" className="btn-primary">
                <VideoCameraIcon className="w-5 h-5 mr-2" />
                Add Your First Camera
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCameras.map((camera, index) => (
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
                    {Array.isArray(camera?.location?.coordinates) ? (
                      <span>
                        {camera.location.coordinates[1].toFixed(4)}, {camera.location.coordinates[0].toFixed(4)}
                      </span>
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
                  <span className="text-xs text-slate-500">
                    ID: {camera._id?.slice(-8)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 