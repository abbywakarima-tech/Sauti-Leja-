import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Mock database - replace with Prisma in production
const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phoneNumber, password, fullName, businessName, businessType, location, preferredLanguage } = body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user exists (mock)
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (mock)
    const user = {
      id: Date.now().toString(),
      email,
      phoneNumber,
      fullName,
      businessName,
      businessType,
      location,
      preferredLanguage,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(user);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      token,
      user: { ...user, password: undefined },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
