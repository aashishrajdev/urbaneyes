"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCamera() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    resolution: "",
    visionRange: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.id) return "Camera ID is required";
    if (!formData.location) return "Location is required";
    if (!formData.resolution) return "Resolution is required";
    if (!formData.visionRange) return "Vision Range is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`/api/cameras?id=${formData.id}`);
      const cameras = await response.json();

      if (cameras.some((camera) => camera.id === formData.id)) {
        setError("Camera ID already exists");
        return;
      }

      localStorage.setItem("cameraData", JSON.stringify(formData));
      router.push("/map");
    } catch (error) {
      setError("Failed to validate camera ID. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Camera</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "Camera ID",
              name: "id",
              placeholder: "Enter unique camera ID",
            },
            {
              label: "Location",
              name: "location",
              placeholder: "Enter camera location",
            },
            {
              label: "Resolution",
              name: "resolution",
              placeholder: "e.g. 1080p, 4K",
            },
            {
              label: "Vision Range",
              name: "visionRange",
              placeholder: "e.g. 30 meters",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-1"
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Continue to Map
          </button>
        </form>
      </div>
    </div>
  );
}
