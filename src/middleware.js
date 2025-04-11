import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;

    // Allow access to login page
    if (request.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }

    // Check if user is authenticated
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Add user info to request headers
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user', JSON.stringify(decoded));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        // Token is invalid or expired
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/Add/:path*',
        '/map/:path*',
        '/api/cameras/:path*',
    ],
}; 