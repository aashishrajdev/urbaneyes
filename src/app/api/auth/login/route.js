import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        // Check for default admin credentials
        if (username === 'admin' && password === 'admin') {
            const token = jwt.sign(
                { username, isAdmin: true },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1d' }
            );
            return NextResponse.json({ token });
        }

        // Check for other users in the database
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // In a real app, you would hash the password and compare
        if (user.password !== password) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json(
            { error: 'Login failed: ' + error.message },
            { status: 500 }
        );
    }
} 