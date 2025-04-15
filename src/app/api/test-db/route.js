import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const db = await connectDB();
    
    // Check if we can access the database
    const collections = await db.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error.message
    }, { status: 500 });
  }
} 