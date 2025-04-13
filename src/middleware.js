import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;

    // List of protected routes that require authentication
    const protectedRoutes = ['/Add', '/map', '/api/cameras'];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // If it's not a protected route, allow access
    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // For protected routes, check authentication
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
        '/Add/:path*',
        '/map/:path*',
        '/api/cameras/:path*',
    ],
}; 