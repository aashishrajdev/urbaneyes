"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-bold">UrbanEye</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/Home"
                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700"
              >
                Home
              </Link>
              <Link
                href="/About"
                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700"
              >
                About
              </Link>
              <Link
                href="/login"
                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Introduction Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to UrbanEye
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              UrbanEye is a smart city surveillance system designed to enhance
              urban safety through advanced monitoring and real-time insights.
            </p>
            <div className="mt-6">
              <Link
                href="/Login"
                className="px-6 py-3 text-white bg-blue-600 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
