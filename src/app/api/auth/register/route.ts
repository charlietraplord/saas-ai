import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password, tenantName } = await request.json();

    // Validate input
    if (!name || !email || !password || !tenantName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use a transaction to create both tenant and user
    const result = await prisma.$transaction(async (tx) => {
      // Create tenant first
      const tenant = await tx.tenant.create({
        data: {
          name: tenantName,
          plan: 'FREE',
        },
      });

      // Create user with tenant reference
      const user = await tx.user.create({
        data: {
          name,
          email,
          hashedPassword,
          tenantId: tenant.id,
        },
      });

      return { tenant, user };
    });

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
