"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            About UrbanEye
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Revolutionizing Smart City Surveillance for Safer Communities
          </p>
        </div>
      </div>

      {/* About Content Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              UrbanEye is a cutting-edge surveillance platform engineered to
              enhance public safety and urban monitoring. By offering real-time
              monitoring, recording, and intelligent analysis of CCTV feeds, it
              helps law enforcement and local authorities detect incidents early
              and respond swiftly to potential threats.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From monitoring remote villages to managing activity in bustling
              transit zones, our solution ensures surveillance is smarter,
              faster, and more accessible — making cities and communities safer
              for everyone.
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-full flex justify-center">
            <Image
              src="/camera.png" // Ensure you have this in your /public directory
              alt="Surveillance Camera"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Core Benefits Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-12">
            Why UrbanEye?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {/* Benefit 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">📹</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Advanced Surveillance
                </h3>
                <p className="mt-2 text-gray-600">
                  AI-powered monitoring tools allow for real-time detection of
                  unusual or suspicious activity.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">🗺️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Location Accuracy
                </h3>
                <p className="mt-2 text-gray-600">
                  Each camera is mapped precisely for optimal coverage and rapid
                  incident response.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">🔐</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Public Safety Focus
                </h3>
                <p className="mt-2 text-gray-600">
                  Empowering law enforcement and communities to act quickly and
                  effectively.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">⚙️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Simple Interface
                </h3>
                <p className="mt-2 text-gray-600">
                  Designed for ease of use by both tech professionals and public
                  service teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
