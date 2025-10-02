"use client";

import Link from "next/link";
import { 
  MapIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  PlusIcon,
  ShieldCheckIcon,
  EyeIcon,
  CpuChipIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  const features = [
    {
      icon: MapIcon,
      title: "Camera Map",
      description: "View camera locations on an interactive map"
    },
    {
      icon: EyeIcon,
      title: "Camera List",
      description: "Browse and manage your camera collection"
    },
    {
      icon: ShieldCheckIcon,
      title: "User Login",
      description: "Simple authentication system"
    },
    {
      icon: CpuChipIcon,
      title: "Add Cameras",
      description: "Add new cameras with location and details"
    }
  ];

  const stats = [
    { label: "Cameras", value: "12", icon: EyeIcon },
    { label: "Locations", value: "3", icon: GlobeAltIcon },
    { label: "Users", value: "5", icon: ShieldCheckIcon },
    { label: "Uptime", value: "99.9%", icon: CpuChipIcon }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl pulse-glow" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="container-page">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-slate-700 mb-8 slide-up">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live System Status: All Systems Operational
            </div>
            
            <h1 className="section-title mb-6 slide-up">
              Welcome to <span className="gradient-text">UrbanEye</span>
            </h1>
            
            <p className="section-subtitle max-w-3xl mx-auto mb-12 fade-in">
              A simple camera management system to{" "}
              <span className="font-semibold text-slate-800">
                add, view, and organize
              </span>{" "}
              your surveillance cameras with{" "}
              <span className="font-semibold text-slate-800">
                map integration
              </span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 scale-in">
              <Link href="/map" className="btn-primary text-lg px-8 py-4">
                <MapIcon className="w-5 h-5 mr-2" />
                View Live Map
              </Link>
              <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Open Dashboard
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="card card-padding text-center scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Basic Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple tools to manage your camera collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card card-padding text-center group hover:scale-105 transition-all duration-300 scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="container-page">
          <div className="card card-padding text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Try out the basic camera management features and see how easy it is to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/add" className="btn-primary text-lg px-8 py-4">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Your First Camera
              </Link>
              <Link href="/search" className="btn-accent text-lg px-8 py-4">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Explore Cameras
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/20">
        <div className="container-page py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="text-xl font-bold gradient-text">UrbanEye</span>
              </div>
              <p className="text-slate-600">
                © {new Date().getFullYear()} UrbanEye. Built for smarter, safer cities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-slate-600">
              <Link href="/About" className="hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
