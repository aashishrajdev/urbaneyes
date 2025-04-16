"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    if (step === 1 && (!formData.name || !formData.description)) {
      setError("Please fill in all required fields");
      return;
    }
    if (step === 2 && !formData.location) {
      setError("Please select a location on the map");
      return;
    }
    setError("");
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

      // Validate resolution
      if (!formData.resolution) {
        throw new Error("Please select a resolution");
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
        resolution: formData.resolution,
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Camera
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Fill in the details to add a new camera to the system.</p>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Camera Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description *
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Location *
                    </label>
                    <div className="mt-1 h-[400px] w-full">
                      <Map
                        initialPosition={
                          formData.location
                            ? [
                                formData.location.coordinates[1],
                                formData.location.coordinates[0],
                              ]
                            : [20.5937, 78.9629]
                        }
                        onLocationSelect={handleLocationSelect}
                      />
                    </div>
                    {selectedLocation && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium">
                          Selected Location:
                        </p>
                        <p className="text-sm text-gray-600">
                          Latitude:{" "}
                          {selectedLocation?.lat?.toFixed(6) || "Not selected"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Longitude:{" "}
                          {selectedLocation?.lng?.toFixed(6) || "Not selected"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="resolution"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Resolution
                    </label>
                    <input
                      type="text"
                      name="resolution"
                      id="resolution"
                      value={formData.resolution}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., 1920x1080"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="visionRange"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vision Range (in meters)
                    </label>
                    <input
                      type="number"
                      name="visionRange"
                      id="visionRange"
                      value={formData.visionRange}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., 100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? "Adding..." : "Add Camera"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
