"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Central list of allowed resolutions (must match model enum)
const RESOLUTIONS = [
  "640x480",
  "800x600",
  "1024x768",
  "1280x720",
  "1366x768",
  "1600x900",
  "1920x1080",
  "1920x1200",
  "2560x1440",
  "2560x1600",
  "3200x1800",
  "3840x2160",
  "4096x2160",
];


const SimpleMap = dynamic(() => import("@/components/SimpleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function AddCamera() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: null,
    resolution: "",
    visionRange: "",
    status: "active",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear any existing errors when user starts typing
    if (error) {
      setError("");
    }
    
    if (name === "resolution") {
      // Normalize common user inputs like 1920X1080 or extra spaces
      const normalized = String(value).trim().replace(/X/g, "x");
      setFormData((prev) => ({
        ...prev,
        resolution: normalized,
      }));
      return;
    }
    
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log('Form data updated:', name, value, newData);
      return newData;
    });
  };

  const handleLocationSelect = (location) => {
    if (
      !location ||
      typeof location.lat !== "number" ||
      typeof location.lng !== "number"
    ) {
      setError("Please select a valid location on the map");
      return;
    }

    setSelectedLocation(location);
    setFormData((prev) => ({
      ...prev,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    }));
    setError("");
  };

  const nextStep = () => {
    // Clear any existing errors
    setError("");
    
    if (step === 1 && (!formData.name || !formData.description || !formData.resolution)) {
      setError("Please fill in all required fields");
      return;
    }
    if (step === 2 && !formData.location) {
      setError("Please select a location on the map");
      return;
    }
    
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.location) {
        throw new Error("Please fill in all required fields");
      }

      // Validate location data
      if (
        !formData.location.coordinates ||
        formData.location.coordinates.length !== 2
      ) {
        throw new Error(
          "Invalid location data. Please select a location on the map."
        );
      }

      // Validate resolution against allowlist
      const resolution = String(formData.resolution || "").trim().replace(/X/g, "x");
      if (!resolution || !RESOLUTIONS.includes(resolution)) {
        throw new Error("Please select a valid resolution from the list");
      }

      // Validate vision range
      if (
        !formData.visionRange ||
        isNaN(formData.visionRange) ||
        formData.visionRange <= 0
      ) {
        throw new Error("Please enter a valid vision range (in meters)");
      }

      // Format the data according to the Camera model requirements
      const submissionData = {
        name: formData.name,
        description: formData.description,
        location: {
          type: "Point",
          coordinates: formData.location.coordinates, // Already in [longitude, latitude] format
        },
        resolution,
        visionRange: Number(formData.visionRange),
        status: formData.status || "active",
      };

      // Ensure no id fields are present
      delete submissionData.id;
      delete submissionData._id;

      console.log("Form Data:", formData);
      console.log("Submission Data:", submissionData);

      const response = await fetch("/api/cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      console.log("API Response:", data);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add camera");
      }

      setSuccess("Camera added successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-page">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="section-title mb-4">Add New Camera</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Set up a new surveillance camera in your network with our guided setup process
            </p>
          </div>

          {/* Progress Steps */}
          <div className="card card-padding mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stepNumber}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      step >= stepNumber ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {stepNumber === 1 && 'Basic Info'}
                      {stepNumber === 2 && 'Location'}
                      {stepNumber === 3 && 'Settings'}
                    </p>
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="card">
            <div className="card-padding">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-red-500">⚠️</div>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-green-500">✅</div>
                    <p className="text-green-700 font-medium">{success}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-6">Camera Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                            Camera Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="e.g., Main Street Camera 01"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                            Description *
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Describe the camera's purpose and coverage area..."
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="resolution" className="block text-sm font-semibold text-slate-700 mb-2">
                            Resolution *
                          </label>
                          <select
                            name="resolution"
                            id="resolution"
                            value={formData.resolution}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                          >
                            <option value="">Select resolution</option>
                            {RESOLUTIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="visionRange" className="block text-sm font-semibold text-slate-700 mb-2">
                            Vision Range (meters)
                          </label>
                          <input
                            type="number"
                            name="visionRange"
                            id="visionRange"
                            value={formData.visionRange}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="e.g., 100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Camera Location</h3>
                      <p className="text-slate-600 mb-6">Click on the map to set the camera's location</p>
                      
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div style={{ height: 500 }}>
                          <SimpleMap
                            initialPosition={
                              formData.location
                                ? [
                                    formData.location.coordinates[1],
                                    formData.location.coordinates[0],
                                  ]
                                : [20.5937, 78.9629]
                            }
                            onLocationSelect={handleLocationSelect}
                            height={500}
                          />
                        </div>
                      </div>
                      
                      {selectedLocation && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">📍</span>
                            </div>
                            <div>
                              <p className="font-semibold text-blue-900">Location Selected</p>
                              <p className="text-sm text-blue-700">
                                Latitude: {selectedLocation?.lat?.toFixed(6)} | 
                                Longitude: {selectedLocation?.lng?.toFixed(6)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-6">Final Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
                            Camera Status
                          </label>
                          <select
                            key="status-select"
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </div>

                        {/* Summary */}
                        <div className="p-6 bg-slate-50 rounded-xl">
                          <h4 className="font-semibold text-slate-900 mb-4">Setup Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Name:</span>
                              <span className="font-medium">{formData.name || 'Not set'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Resolution:</span>
                              <span className="font-medium">{formData.resolution || 'Not set'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Location:</span>
                              <span className="font-medium">
                                {selectedLocation ? 'Set' : 'Not set'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Status:</span>
                              <span className="font-medium capitalize">{formData.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-slate-200">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      ← Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Adding Camera...
                        </>
                      ) : (
                        'Add Camera'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
