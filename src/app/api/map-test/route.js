import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function GET() {
    try {
        await connectDB();
        
        // Get all cameras with coordinates
        const cameras = await Camera.find({ 
            'coordinates.latitude': { $exists: true },
            'coordinates.longitude': { $exists: true }
        });
        
        return NextResponse.json({
            message: "Map data retrieved successfully",
            cameras: cameras.map(camera => ({
                id: camera.id,
                name: camera.name,
                location: camera.location,
                coordinates: camera.coordinates,
                status: camera.status
            }))
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to retrieve map data: ' + error.message },
            { status: 500 }
        );
    }
} 