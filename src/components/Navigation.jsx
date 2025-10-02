"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  HomeIcon, 
  MapIcon, 
  PlusIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChartBarIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path;
  };

  const navItems = [
    { href: "/Home", label: "Home", icon: HomeIcon },
    { href: "/dashboard", label: "Dashboard", icon: ChartBarIcon },
    { href: "/map", label: "Map", icon: MapIcon },
    { href: "/search", label: "Search", icon: MagnifyingGlassIcon },
    { href: "/add", label: "Add Camera", icon: PlusIcon },
  ];

  return (
    <nav className="glass-effect border-b border-white/20 backdrop-blur-xl sticky top-0 z-50">
      <div className="container-page">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link href="/Home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold gradient-text">
              UrbanEye
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-white/20 text-slate-900 shadow-lg"
                      : "text-slate-600 hover:bg-white/10 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-white/10 hover:text-slate-900 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-white/20 text-slate-900"
                        : "text-slate-600 hover:bg-white/10 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
