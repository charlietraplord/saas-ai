import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Handle GET requests
    return NextResponse.json({ message: 'Hello from the API!' });
}

export async function POST(request: Request) {
    const data = await request.json();
    // Handle POST requests
    return NextResponse.json({ received: data });
}