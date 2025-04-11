'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCamera() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        location: '',
        resolution: '',
        visionRange: ''
    });  
    
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
        setError(''); // Clear error when user types
    };

    const validateForm = () => {
        if (!formData.id) return 'Camera ID is required';
        if (!formData.location) return 'Location is required';
        if (!formData.resolution) return 'Resolution is required';
        if (!formData.visionRange) return 'Vision Range is required';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            // Check if camera ID already exists
            const response = await fetch(`/api/cameras?id=${formData.id}`);
            const cameras = await response.json();
            
            if (cameras.some(camera => camera.id === formData.id)) {
                setError('Camera ID already exists');
                return;
            }

            // Store form data temporarily
            localStorage.setItem('cameraData', JSON.stringify(formData));
            
            // Redirect to map page for location pinpointing
            router.push('/map');
        } catch (error) {
            setError('Failed to validate camera ID. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Camera</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter unique camera ID"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter camera location"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter camera resolution"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter vision range"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Continue to Map
                    </button>
                </form>
            </div>
        </div>
    );
}
