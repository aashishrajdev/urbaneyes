import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        // Check if camera with same ID already exists
        const existingCamera = await Camera.findOne({ id: data.id });
        if (existingCamera) {
            return NextResponse.json(
                { error: 'Camera with this ID already exists' },
                { status: 400 }
            );
        }

        const camera = await Camera.create(data);
        return NextResponse.json(camera, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create camera: ' + error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const cameras = await Camera.find({});
        return NextResponse.json(cameras);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch cameras: ' + error.message },
            { status: 500 }
        );
    }
} 