"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/Home">
              {" "}
              <div className="flex-shrink-0">
                <span className="text-white font-bold text-xl">UrbanEyes</span>
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/dashboard"
                  )}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/map"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/map"
                  )}`}
                >
                  Map
                </Link>
                <Link
                  href="/add"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/add"
                  )}`}
                >
                  Add Camera
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
