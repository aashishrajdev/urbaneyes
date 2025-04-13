"use client";

import Link from "next/link";

export default function RootPage() {
  return (
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
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/home"
              className="px-6 py-3 text-white bg-blue-600 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Features
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
