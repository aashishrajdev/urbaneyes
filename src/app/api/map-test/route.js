import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function GET() {
    try {
        await connectDB();
        
        // Get all cameras
        const cameras = await Camera.find({});
        
        // Format the camera data for the map
        const formattedCameras = cameras.map(camera => {
            // Ensure location and coordinates exist
            if (!camera.location || !camera.location.coordinates) {
                return null;
            }
            
            // Swap coordinates to [latitude, longitude] for Leaflet
            const [longitude, latitude] = camera.location.coordinates;
            
            return {
                id: camera._id,
                name: camera.name,
                description: camera.description,
                status: camera.status,
                coordinates: [latitude, longitude] // [latitude, longitude] for Leaflet
            };
        }).filter(camera => camera !== null); // Remove any null entries

        return NextResponse.json({ success: true, data: formattedCameras });
    } catch (error) {
        console.error('Error fetching cameras for map:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch cameras for map' },
            { status: 500 }
        );
    }
} 