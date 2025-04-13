"use client";

import { useState } from "react";

export default function AddCamera() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    resolution: "",
    visionRange: "",
    status: "active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add camera");
      }

      // Reset form
      setFormData({
        id: "",
        name: "",
        location: "",
        resolution: "",
        visionRange: "",
        status: "active",
      });

      alert("Camera added successfully!");
    } catch (error) {
      console.error("Error adding camera:", error);
      alert("Failed to add camera. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Camera</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Camera ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Camera Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="resolution" className="block text-sm font-medium text-gray-700">
            Resolution
          </label>
          <input
            type="text"
            id="resolution"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="visionRange" className="block text-sm font-medium text-gray-700">
            Vision Range
          </label>
          <input
            type="text"
            id="visionRange"
            name="visionRange"
            value={formData.visionRange}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Camera
          </button>
        </div>
      </form>
    </div>
  );
} 