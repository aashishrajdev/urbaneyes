"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col justify-between relative overflow-hidden">
      {/* Blurry Background Orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-200 opacity-20 rounded-full blur-2xl animate-pulse-slow" />

      {/* Hero Content */}
      <main className="flex-grow z-10 flex items-center justify-center">
        <div className="max-w-7xl mx-auto py-20 px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight animate-slide-up">
            Welcome to <span className="text-blue-600">UrbanEye</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Empowering cities with{" "}
            <span className="font-semibold text-blue-700">
              smart surveillance
            </span>{" "}
            for a <span className="italic">safer tomorrow</span>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 animate-fade-in-delay">
            <Link
              href="/map"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
            >
              View Map
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg shadow-md text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 hover:scale-105"
            >
              Search Cameras
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 bg-white bg-opacity-60 backdrop-blur-sm border-t border-gray-200 shadow-inner py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-gray-600 space-y-4 sm:space-y-0">
          <div>
            <p className="font-semibold text-gray-800">
              UrbanEye © {new Date().getFullYear()}
            </p>
            <p>Built for smarter, safer cities.</p>
          </div>

          <div className="flex space-x-6 text-blue-600 text-xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-blue-800 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-800 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-800 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="space-x-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 2s ease-out 0.5s;
          animation-fill-mode: both;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
