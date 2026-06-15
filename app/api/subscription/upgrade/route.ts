import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    const body = await request.json();

    // In production, integrate with Stripe or M-Pesa
    return NextResponse.json({
      success: true,
      message: `Upgraded to ${body.planType} plan`,
      newPlan: body.planType,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upgrade' }, { status: 400 });
  }
}
