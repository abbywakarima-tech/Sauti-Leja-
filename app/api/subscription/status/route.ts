import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);

    return NextResponse.json({
      planType: 'starter',
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
