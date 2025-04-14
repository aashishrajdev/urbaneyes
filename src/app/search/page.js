"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchCameras() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);

  useEffect(() => {
    // Fetch cameras from API
    const fetchCameras = async () => {
      try {
        const response = await fetch("/api/cameras");
        const data = await response.json();
        setCameras(data);
        setFilteredCameras(data);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  useEffect(() => {
    // Filter cameras based on search term
    const filtered = cameras.filter(
      (camera) =>
        camera.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camera.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCameras(filtered);
  }, [searchTerm, cameras]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Cameras</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by ID, name, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {camera.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  camera.status === "active"
                    ? "bg-green-100 text-green-800"
                    : camera.status === "maintenance"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {camera.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">ID:</span> {camera.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {camera.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Resolution:</span> {camera.resolution}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Vision Range:</span> {camera.visionRange}
              </p>
            </div>
            <div className="mt-4">
              <Link
                href={`/map?camera=${camera.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View on Map →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No cameras found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 