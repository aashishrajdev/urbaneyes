import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urbaneye';
    
    console.log('Checking MongoDB connection to:', MONGODB_URI);
    
    // Try to connect to MongoDB
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    
    // Check if we can access the database
    const collections = await connection.connection.db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name),
      uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') // Hide credentials
    });
  } catch (error) {
    console.error('MongoDB connection check failed:', error);
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error.message,
      uri: (process.env.MONGODB_URI || 'mongodb://localhost:27017/urbaneye').replace(/\/\/[^:]+:[^@]+@/, '//***:***@') // Hide credentials
    }, { status: 500 });
  }
} 