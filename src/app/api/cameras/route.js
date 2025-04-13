import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
    try {
        await client.connect();
        const database = client.db('urbaneyes');
        const cameras = await database.collection('cameras').find({}).toArray();
        return NextResponse.json(cameras);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch cameras' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    try {
        const cameraData = await request.json();
        await client.connect();
        const database = client.db('urbaneyes');
        const result = await database.collection('cameras').insertOne(cameraData);
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add camera' }, { status: 500 });
    } finally {
        await client.close();
    }
} 