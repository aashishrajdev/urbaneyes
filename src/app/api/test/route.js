
// This is the is testing file and routes for the database connection




import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function GET() {
    try {
        // Test database connection
        await connectDB();
        
        // Try to add a test camera
        const testCamera = {
            id: "TEST001",
            name: "Test Camera",
            location: "Test Location",
            resolution: "1080p",
            visionRange: "100m",
            status: "active"
        };

        // Check if test camera already exists
        const existingCamera = await Camera.findOne({ id: testCamera.id });
        if (!existingCamera) {
            await Camera.create(testCamera);
        }

        // Get all cameras to verify
        const cameras = await Camera.find({});
        
        return NextResponse.json({
            message: "Database connection successful",
            cameras: cameras
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Database connection failed: ' + error.message },
            { status: 500 }
        );
    }
} 