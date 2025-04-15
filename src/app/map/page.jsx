"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">
      Loading map...
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-[500px] w-full bg-gray-200 flex items-center justify-center">
            Loading cameras...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Camera Map</h1>
          <Link
            href="/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Camera
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Map markers={cameras} />
        </div>
      </div>
    </div>
  );
}
