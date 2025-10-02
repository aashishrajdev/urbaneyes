'use client';

import { 
  ShieldCheckIcon, 
  EyeIcon, 
  MapIcon, 
  CpuChipIcon,
  GlobeAltIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const features = [
    {
      icon: EyeIcon,
      title: "Camera List",
      description: "View and manage your camera collection"
    },
    {
      icon: MapIcon,
      title: "Map View",
      description: "See camera locations on a map"
    },
    {
      icon: ShieldCheckIcon,
      title: "User Login",
      description: "Basic authentication system"
    },
    {
      icon: CpuChipIcon,
      title: "Add Cameras",
      description: "Add new cameras with details and location"
    }
  ];

  const stats = [
    { label: "Demo Cities", value: "3", icon: GlobeAltIcon },
    { label: "Cameras", value: "12", icon: EyeIcon },
    { label: "Team Members", value: "3", icon: UserGroupIcon },
    { label: "Version", value: "1.0", icon: BuildingOfficeIcon }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container-page">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="section-title mb-6">About UrbanEye</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            A simple camera management system for organizing and viewing surveillance cameras
          </p>
        </div>

        {/* Mission Section */}
        <div className="card card-padding mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is UrbanEye?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              UrbanEye is a basic camera management system that lets you add, view, and organize surveillance cameras. 
              You can see camera locations on a map, manage camera details, and keep track of your camera collection 
              in one simple interface.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What You Can Do</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Basic features for managing your camera collection
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

        {/* Stats Section */}
        <div className="card card-padding mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Status</h2>
            <p className="text-lg text-slate-600">Demo application stats</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="card card-padding">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Technology Stack</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Built with Next.js, React, and MongoDB, UrbanEye is a simple web application for managing cameras. 
              It's designed to be easy to use and understand.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">Next.js & React for modern UI</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">MongoDB for scalable data storage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">Leaflet for interactive mapping</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">Clerk for secure authentication</span>
              </div>
            </div>
          </div>

          <div className="card card-padding">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Simple & Easy</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Easy to Use</h3>
                  <p className="text-slate-600 text-sm">Simple interface for managing cameras</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Map Integration</h3>
                  <p className="text-slate-600 text-sm">See camera locations on a map</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Basic Features</h3>
                  <p className="text-slate-600 text-sm">Add, view, and organize cameras</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Free to Use</h3>
                  <p className="text-slate-600 text-sm">No cost, just basic functionality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="card card-padding text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Have questions about UrbanEye? Feel free to reach out if you need help with the basic features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <EnvelopeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email</h3>
                <p className="text-slate-600 text-sm">info@urbaneye.com</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <PhoneIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Phone</h3>
                <p className="text-slate-600 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Office</h3>
                <p className="text-slate-600 text-sm">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 