"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/Home">
              <div className="flex-shrink-0">
                <span className="text-white font-bold text-xl cursor-pointer">
                  UrbanEye
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-4">
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

          {/* Auth Buttons */}
          <ClerkProvider>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </ClerkProvider>
        </div>
      </div>
    </nav>
  );
}
