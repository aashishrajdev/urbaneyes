'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to UrbanEyes
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Smart surveillance for safer cities
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/map"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View Map
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              Search Cameras
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 