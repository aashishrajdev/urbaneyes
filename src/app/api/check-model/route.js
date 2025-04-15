import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function GET() {
  try {
    await connectDB();
    
    // Check if the Camera model is properly defined
    const modelInfo = {
      name: Camera.modelName,
      collection: Camera.collection.name,
      schema: Camera.schema.obj,
      indexes: await Camera.collection.indexes()
    };
    
    return NextResponse.json({
      success: true,
      message: 'Camera model is properly defined',
      modelInfo
    });
  } catch (error) {
    console.error('Error checking Camera model:', error);
    return NextResponse.json({
      success: false,
      message: 'Error checking Camera model',
      error: error.message
    }, { status: 500 });
  }
} 